import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const PORT = process.env.PORT || 5000;
import { connectDB } from "./configs/db.js";
import "dotenv/config";
import { app, server } from "./socket/socket.js";

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://chat-backend-b77g.onrender.com",
    credentials: true,
  })
);
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("hello user");
});

//user routes for auth
import userAuthRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/message.routes.js";
app.use("/api/v1/user", userAuthRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/message", messageRoutes);

server.listen(PORT, () => {
  connectDB();
  console.log(`server running on ${PORT}`);
});
