import express from "express";
import { login, logout, signUp } from "../controllers/user.controller.js";
import { isAuth } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", isAuth, logout);

export default router;
