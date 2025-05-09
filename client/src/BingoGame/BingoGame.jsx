import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

const generateBoard = () => {
  const numbers = Array.from({ length: 25 }, (_, i) => i + 1);
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  return numbers;
};

const App = () => {
  const [roomId, setRoomId] = useState("");
  const [board, setBoard] = useState([]);
  const [struck, setStruck] = useState([]);
  const [inRoom, setInRoom] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [yourTurn, setYourTurn] = useState(false);
  const [winner, setWinner] = useState(null);
  const [linesCompleted, setLinesCompleted] = useState(0);
  const [username, setUsername] = useState("");

  const handleCreateRoom = () => {
    const id = prompt("Enter room ID to create");
    if (!id || !username.trim()) return alert("Enter a name first");
    socket.emit("create-room", { roomId: id, username }, (res) => {
      if (res.success) {
        setRoomId(id);
        setInRoom(true);
        setIsHost(true);
        setBoard(generateBoard());
      } else {
        alert(res.message);
      }
    });
  };

  const handleJoinRoom = () => {
    const id = prompt("Enter room ID to join");
    if (!id || !username.trim()) return alert("Enter a name first");
    socket.emit("join-room", { roomId: id, username }, (res) => {
      if (res.success) {
        setRoomId(id);
        setInRoom(true);
        setBoard(generateBoard());
      } else {
        alert(res.message);
      }
    });
  };

  const handleStartGame = () => {
    socket.emit("start-game", roomId);
  };

  const handleSelectNumber = (num) => {
    if (yourTurn && !struck.includes(num)) {
      socket.emit("select-number", roomId, num);
    }
  };

  const checkLines = (newStruck) => {
    const indices = board
      .map((num, idx) => (newStruck.includes(num) ? idx : -1))
      .filter((i) => i !== -1);
    let count = 0;

    // Rows
    for (let r = 0; r < 5; r++) {
      if (indices.filter((i) => Math.floor(i / 5) === r).length === 5) count++;
    }

    // Columns
    for (let c = 0; c < 5; c++) {
      if (indices.filter((i) => i % 5 === c).length === 5) count++;
    }

    // Diagonals
    if ([0, 6, 12, 18, 24].every((i) => indices.includes(i))) count++;
    if ([4, 8, 12, 16, 20].every((i) => indices.includes(i))) count++;

    setLinesCompleted(count);
    if (count >= 5) {
      socket.emit("bingo-winner", roomId);
    }
  };

  useEffect(() => {
    socket.on("game-started", () => {
      setGameStarted(true);
      setStruck([]);
      setLinesCompleted(0);
      setWinner(null);
    });

    socket.on("your-turn", () => {
      setYourTurn(true);
    });

    socket.on("number-selected", (num) => {
      setStruck((prev) => {
        const newStruck = [...prev, num];
        checkLines(newStruck);
        return newStruck;
      });
      setYourTurn(false);
    });

    socket.on("game-over", (winnerId) => {
      setWinner(winnerId);
    });

    return () => {
      socket.off("game-started");
      socket.off("your-turn");
      socket.off("number-selected");
      socket.off("game-over");
    };
  }, [board]);

  return (
    <div className="p-4">
      {!inRoom && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
      )}
      <p>{username}</p>

      {!inRoom && (
        <>
          <button
            onClick={handleCreateRoom}
            className="m-2 p-2 bg-blue-500 text-white"
          >
            Create Room
          </button>
          <button
            onClick={handleJoinRoom}
            className="m-2 p-2 bg-green-500 text-white"
          >
            Join Room
          </button>
        </>
      )}

      {inRoom && !gameStarted && isHost && (
        <button
          onClick={handleStartGame}
          className="p-2 bg-purple-500 text-white"
        >
          Start Game
        </button>
      )}

      {inRoom && (
        <>
          <h2 className="mt-4">Room: {roomId}</h2>
          {gameStarted && (
            <>
              <h3 className="mt-2">
                {yourTurn ? "Your Turn!" : "Wait for your turn..."}
              </h3>
              <div className="grid grid-cols-5 gap-2 mt-4">
                {board.map((num, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSelectNumber(num)}
                    className={`p-4 border text-center cursor-pointer ${
                      struck.includes(num)
                        ? "bg-red-500 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {num}
                  </div>
                ))}
              </div>
              <p className="mt-4">Lines Completed: {linesCompleted}</p>
              {winner && (
                <p className="text-green-600 font-bold mt-2">
                  Winner: {winner}
                </p>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default App;
