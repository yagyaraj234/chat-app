const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.get('/',(req,res)=>{
  res.send("Home");
})

const PORT = process.env.PORT || 5500;

io.on("connection", (socket) => {
  socket.on("chat", (message) => {
    io.emit("chat", message);
  });

  socket.on("eventsHandle", (message) => {
    io.emit("eventsHandle", message);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
