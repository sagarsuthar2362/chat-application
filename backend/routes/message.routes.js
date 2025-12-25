import express from "express";
import { isAuth } from "../middleware/authMiddleware.js";
import {
  getAllMessages,
  sendMessage,
} from "../controllers/message.controller.js";
const router = express.Router();

router.post("/send/:receiver", isAuth, sendMessage);
router.get("/get/:receiver", isAuth, getAllMessages);

export default router;
