// liftSystem.js

class Lift {
  constructor(id, initialFloor = 0) {
    this.id = id;
    this.currentFloor = initialFloor;
    this.queue = [];
    this.status = "IDLE";
  }

  addRequest(floor) {
    if (!this.queue.includes(floor)) {
      this.queue.push(floor);
      this.sortQueue();
      this.status = "MOVING";
    }
  }

  sortQueue() {
    if (this.queue.length === 0) return;

    const goingUp = this.queue[0] > this.currentFloor;
    this.queue.sort((a, b) => (goingUp ? a - b : b - a));
  }

  move() {
    if (this.queue.length === 0) {
      this.status = "IDLE";
      return;
    }

    const target = this.queue[0];

    if (this.currentFloor < target) {
      this.currentFloor++;
    } else if (this.currentFloor > target) {
      this.currentFloor--;
    }

    if (this.currentFloor === target) {
      this.queue.shift();
    }

    this.status = this.queue.length === 0 ? "IDLE" : "MOVING";
  }
}

class LiftSystem {
  constructor(floorRange, liftCount) {
    this.floors = floorRange;
    this.lifts = Array.from({ length: liftCount }, (_, i) => new Lift(i + 1));
    this.pendingRequests = [];
  }

  externalRequest(floor, direction) {
    this.pendingRequests.push({ floor, direction });
  }

  assignRequests() {
    const remaining = [];

    for (const req of this.pendingRequests) {
      let bestLift = null;
      let minDistance = Infinity;

      for (const lift of this.lifts) {
        if (lift.status === "IDLE") {
          const distance = Math.abs(lift.currentFloor - req.floor);
          if (distance < minDistance) {
            minDistance = distance;
            bestLift = lift;
          }
        }
      }

      if (bestLift) {
        bestLift.addRequest(req.floor);
      } else {
        remaining.push(req);
      }
    }

    this.pendingRequests = remaining;
  }

  internalRequest(liftId, floor) {
    const lift = this.lifts.find((l) => l.id === liftId);
    if (lift) {
      lift.addRequest(floor);
    }
  }

  step() {
    this.lifts.forEach((lift) => lift.move());
    this.assignRequests();
  }

  getStatus() {
    return this.lifts.map((lift) => ({
      id: lift.id,
      floor: lift.currentFloor,
      queue: [...lift.queue],
      status: lift.status,
    }));
  }
}

// ---- Test it below ----

const system = new LiftSystem(
  [...Array(15).keys()].map((i) => i - 4),
  5
); // Floors -4 to 10, 5 lifts

// Simulate requests
system.externalRequest(2, "up");
system.externalRequest(-2, "up");
system.internalRequest(1, 5);
system.internalRequest(1, -3);

// Simulate system steps (1 tick = 1 floor move)
for (let i = 0; i < 20; i++) {
  console.log(`Step ${i + 1}`);
  system.step();
  console.log(system.getStatus());
}
