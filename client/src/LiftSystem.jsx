import React, { useEffect, useState } from "react";

const FLOORS = Array.from({ length: 15 }, (_, i) => i - 4); // B4 to 10
const LIFT_COUNT = 2;

function formatFloor(n) {
  return n < 0 ? `B${Math.abs(n)}` : n;
}

const LiftSystem = () => {
  const [lifts, setLifts] = useState(
    Array.from({ length: LIFT_COUNT }, (_, i) => ({
      id: i + 1,
      currentFloor: 0,
      queue: [],
      status: "IDLE",
    }))
  );
  const [requests, setRequests] = useState([]);

  const pressButton = (floor, direction) => {
    setRequests((prev) => [...prev, { floor, direction }]);
  };

  const pressInternalButton = (liftId, floor) => {
    setLifts((prevLifts) =>
      prevLifts.map((lift) => {
        if (lift.id === liftId) {
          let newQueue = [...lift.queue];
          if (!newQueue.includes(floor)) {
            newQueue.push(floor);

            if (lift.status === "MOVING") {
              const goingUp = lift.queue[0] > lift.currentFloor;
              newQueue.sort((a, b) => (goingUp ? a - b : b - a));
            } else {
              newQueue.sort(
                (a, b) =>
                  Math.abs(a - lift.currentFloor) -
                  Math.abs(b - lift.currentFloor)
              );
            }
          }

          return {
            ...lift,
            queue: newQueue,
            status: "MOVING",
          };
        }
        return lift;
      })
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLifts((prevLifts) => {
        return prevLifts.map((lift) => {
          if (lift.queue.length === 0) return { ...lift, status: "IDLE" };

          const target = lift.queue[0];
          let nextFloor = lift.currentFloor;
          if (target > lift.currentFloor) nextFloor++;
          else if (target < lift.currentFloor) nextFloor--;

          if (nextFloor === target) {
            lift.queue.shift();
          }

          return {
            ...lift,
            currentFloor: nextFloor,
            status: lift.queue.length === 0 ? "IDLE" : "MOVING",
          };
        });
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (requests.length === 0) return;

    setRequests((prev) => {
      let updated = [...prev];
      let unassigned = [];

      updated.forEach((req) => {
        const idleLifts = lifts.filter((l) => l.status === "IDLE");
        let bestLift = null;
        let minDist = Infinity;

        for (let lift of idleLifts) {
          const dist = Math.abs(lift.currentFloor - req.floor);
          if (dist < minDist) {
            minDist = dist;
            bestLift = lift;
          }
        }

        if (bestLift) {
          setLifts((prevLifts) =>
            prevLifts.map((l) =>
              l.id === bestLift.id
                ? {
                    ...l,
                    queue: [...l.queue, req.floor],
                    status: "MOVING",
                  }
                : l
            )
          );
        } else {
          unassigned.push(req);
        }
      });

      return unassigned;
    });
  }, [requests, lifts]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Lift Simulation</h1>
      <div className="flex">
        {FLOORS.slice()
          .reverse()
          .map((floor) => (
            <div key={floor} className="p-2 border-r border-gray-300">
              <div className="font-bold mb-1">{formatFloor(floor)}</div>
              {floor !== 10 && (
                <button
                  className="bg-green-500 text-white px-2 py-1 m-1"
                  onClick={() => pressButton(floor, "UP")}
                >
                  UP
                </button>
              )}
              {floor !== -4 && (
                <button
                  className="bg-blue-500 text-white px-2 py-1 m-1"
                  onClick={() => pressButton(floor, "DOWN")}
                >
                  DOWN
                </button>
              )}
            </div>
          ))}

        <div className="ml-10">
          <h2 className="text-xl font-semibold mb-2">Lifts</h2>
          {lifts.map((lift) => (
            <div key={lift.id} className="mb-4 border p-4 rounded shadow-md">
              <div className="mb-1 font-bold">
                Lift {lift.id}: Floor {formatFloor(lift.currentFloor)} –{" "}
                {lift.status}
              </div>
              <div className="text-sm text-gray-600 mb-2">
                Queue: {lift.queue.map(formatFloor).join(", ") || "None"}
              </div>
              <div className="grid grid-cols-5 gap-1">
                {FLOORS.map((floor) => (
                  <button
                    key={floor}
                    className="bg-gray-300 hover:bg-gray-400 px-2 py-1 text-sm rounded"
                    onClick={() => pressInternalButton(lift.id, floor)}
                  >
                    {formatFloor(floor)}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiftSystem;
