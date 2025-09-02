// server.js
const { Server } = require("socket.io");
const http = require("http");

// Create HTTP server
const server = http.createServer();

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "*", // set your Vercel domain in Railway ENV
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Client connected");

  // Listen for typing events
  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data); // send to everyone except sender
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Listen on Railway-provided port or fallback for local dev
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});