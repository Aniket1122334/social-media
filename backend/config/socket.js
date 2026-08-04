const { Server } = require("socket.io");
const messageModel = require("../models/messageModel");

let io;
const onlineUsers = new Map();

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173", "http://localhost:5174"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    socket.on("addUser", (userId) => {
      onlineUsers.set(userId, socket.id);

      io.emit("getOnlineUsers", [...onlineUsers.keys()]);
    });

    socket.on("disconnect", () => {
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
      io.emit("getOnlineUsers", [...onlineUsers.keys()]);
      console.log("User Disconnected:", socket.id);
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io is not initialized");
  }

  return io;
};

const getReceiverSocketId = (userId) => {
  return onlineUsers.get(userId);
};

module.exports = {
  initializeSocket,
  getIO,
  getReceiverSocketId,
};
