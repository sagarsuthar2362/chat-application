import express from "express";
import {
  getAllUsers,
  getCurrentUser,
  updateProfile,
} from "../controllers/user.controller.js";
import { isAuth } from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.get("/current", isAuth, getCurrentUser);
router.get("/all", isAuth, getAllUsers);
router.put("/update-profile", isAuth, upload.single("image") ,updateProfile);

export default router;
