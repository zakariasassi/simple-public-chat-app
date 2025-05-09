const cors = require('cors');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// إعداد CORS للسماح للواجهة بالاتصال
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // أو عنوان Vite الخاص بك
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("connected user");

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user exit");
  });
});

server.listen(5600, () => {
  console.log("🚀 السيرفر يعمل على المنفذ 5600");
});
