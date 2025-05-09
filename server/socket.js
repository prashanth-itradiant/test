import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Allow all for testing (not safe for prod)
  },
});

io.on("connection", (socket) => {
  console.log("🔌 A user connected:", socket.id);

  // Receive message from client
  socket.on("chat message", (msg) => {
    console.log("📩 Received:", msg);

    // Broadcast to all connected clients
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

httpServer.listen(3000, () => {
  console.log("🚀 Server listening on http://localhost:3000");
});
