import express from "express";
import http from "http";
import { Server } from "socket.io";

export const app = express();
export const server = http.createServer(app);

const users = {};

export const io = new Server(server, {
  cors: "http://localhost:5173",
});

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId !== undefined) {
    users[userId] = socket.id;
  }
});

export const getUserSocketId = (userId) => {
  const socketId = users[userId];
  if (!socketId) return;
  return socketId;
};
