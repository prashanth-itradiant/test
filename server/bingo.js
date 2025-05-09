import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

let rooms = {}; // { roomId: { host, players: [], started, selectedNumbers, turnIndex, winner } }

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Create room
  socket.on("create-room", ({ roomId, username }, callback) => {
    if (rooms[roomId]) {
      return callback({ success: false, message: "Room already exists" });
    }

    rooms[roomId] = {
      host: socket.id,
      players: [{ id: socket.id, username }],
      started: false,
      selectedNumbers: [],
      turnIndex: 0,
      winner: null,
    };

    socket.join(roomId);
    callback({ success: true, host: true });
    io.to(roomId).emit("room-players", rooms[roomId].players);
  });

  // Join room
  socket.on("join-room", ({ roomId, username }, callback) => {
    const room = rooms[roomId];
    if (!room) return callback({ success: false, message: "Room not found" });
    if (room.started)
      return callback({ success: false, message: "Game already started" });

    room.players.push({ id: socket.id, username });
    socket.join(roomId);
    callback({ success: true, host: false });

    io.to(roomId).emit("room-players", room.players);
  });

  // Start game by host
  socket.on("start-game", (roomId) => {
    const room = rooms[roomId];
    if (!room || room.host !== socket.id || room.started) return;

    room.started = true;
    room.selectedNumbers = [];
    room.turnIndex = 0;
    io.to(roomId).emit("game-started");
    // Your turn
    const currentPlayer = room.players[room.turnIndex];
    io.to(currentPlayer.id).emit("your-turn");
  });

  // Player selects number
  // Player selects number
  socket.on("select-number", (roomId, number) => {
    const room = rooms[roomId];
    if (!room || room.winner || room.selectedNumbers.includes(number)) return;

    // ✅ Fix: Correct turn check
    if (socket.id !== room.players[room.turnIndex].id) return;

    room.selectedNumbers.push(number);
    io.to(roomId).emit("number-selected", number);

    // Switch turn
    room.turnIndex = (room.turnIndex + 1) % room.players.length;
    const nextPlayer = room.players[room.turnIndex];
    io.to(nextPlayer.id).emit("your-turn");
  });

  // Handle bingo win
  socket.on("bingo-winner", (roomId) => {
    const room = rooms[roomId];
    if (!room || room.winner) return;

    const player = room.players.find((p) => p.id === socket.id);
    room.winner = player.username;
    io.to(roomId).emit("game-over", player.username);
  });

  // Cleanup on disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    for (const roomId in rooms) {
      const room = rooms[roomId];
      room.players = room.players.filter((p) => p.id !== socket.id);

      if (room.players.length === 0) {
        delete rooms[roomId];
      } else {
        // Host left, assign a new one
        if (room.host === socket.id) {
          room.host = room.players[0];
        }

        io.to(roomId).emit("room-players", room.players);
      }
    }
  });
});

server.listen(4000, () =>
  console.log("Server running at http://localhost:4000")
);
