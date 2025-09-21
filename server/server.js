const express = require('express');
const app = express();
const { Server } = require('socket.io');
const { createServer } = require('http');
const cors = require('cors');

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (client) => {
  console.log("A new User connected:", client.id);

  client.on("message", (msg) => {
    io.emit("message", msg);
  });

  client.on("disconnect", () => {
    console.log("User disconnected:", client.id);
  });
});

server.listen(3000, () => {
  console.log("Listening on port: 3000");
});
