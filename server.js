// server.js
import { Server } from "socket.io";
import http from "http";

const server = http.createServer(); // basic HTTP server
const io = new Server(server, {
  cors: {
    origin: "*", // 🔒 later restrict to your Vercel domain
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("typing", (data) => {
    // broadcast to everyone except sender
    socket.broadcast.emit("typing", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Railway will assign PORT dynamically
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});