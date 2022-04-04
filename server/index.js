import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import http from "http";
import { addUser, getUser, getUsersInRoom, removeUser } from "./users.js";
dotenv.config({ path: "./.env" });
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const PORT = process.env.PORT || 8080;

io.on("connection", (socket) => {
  console.log("User connected");
  socket.on("join", ({ name, room }, cb) => {
    const { user, error } = addUser({ id: socket.id, name, room });
    if (error) return cb(error);

    socket.join(user.room);
    socket.emit("message", {
      user: "user",
      text: `Hi ${user.name}!, Welcome to room ${user.room}.`,
    });

    socket.broadcast.to(user.room).emit("message", {
      user: "user",
      text: `${user.name} joined the chat`,
    });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    cb();
  });

  socket.on("sendMessage", ({ message, features }, cb) => {
    const user = getUser(socket.id);

    io.to(user?.room).emit("message", {
      user: user?.name,
      text: message,
      features: features,
    });

    cb();
  });
  socket.on("disconnect", () => {
    socket.disconnect();
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "pseudo",
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

app.get("/", (req, res) => {
  res.status(200).send("Server");
});

server.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
