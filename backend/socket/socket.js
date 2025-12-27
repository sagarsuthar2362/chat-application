import express from "express";
import http from "http";
import { Server } from "socket.io";

export const app = express();
export const server = http.createServer(app);

const activeUsers = new Map();

export const io = new Server(server, {
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? "https://chat-frontend-9jcn.onrender.com"
        : "http://localhost:5173",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) {
    activeUsers.set(userId, socket.id);
  }

  io.emit("active-users", Array.from(activeUsers.keys()));

  socket.on("typing", ({ senderId, receiverId }) => {
    const receiverSocketId = activeUsers.get(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("user-typing", senderId);
    }
  });

  socket.on("stop-typing", ({ senderId, receiverId }) => {
    const receiverSocketId = activeUsers.get(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("user-stop-typing", senderId);
    }
  });

  socket.on("disconnect", () => {
    activeUsers.delete(userId);
    io.emit("active-users", Array.from(activeUsers.keys()));
  });
});

export const getUserSocketId = (userId) => {
  const socketId = activeUsers.get(userId);
  if (!socketId) return;
  return socketId;
};
