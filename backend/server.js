// const express = require("express");
// const { Server } = require("socket.io");
// const cors = require("cors");
// const http = require("http");
// const dbConnect = require("./database/dbConnect");
// const PORT = process.env.PORT || 4500;
// const app = express();

// const loginRoute = require("./controllers/loginRoute");
// const signupRoute = require("./controllers/signupRoute");

// app.use(cors());

// const server = http.createServer(app);
// // const socket = socketIo(server);

// const io = new Server();
// io.on("connection established", (socket) => {
//   console.log("New Connection", socket.id);
// });

// // Db connection
// dbConnect();

// app.get("/", (req, res) => {
//   res.send("This is Home");
// });
// app.post("/login", loginRoute);
// app.post("/signup", signupRoute);

// server.listen(PORT, () => {
//   console.log(`Server listening to ${PORT}`);
// });

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
