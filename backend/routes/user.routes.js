import express from "express";
const router = express.Router();
import {
  registerUser,
  loginUser,
  logout,
  getUserProfile,
} from "../controllers/user.controllers.js";
import { protect } from "../middleware/auth.middleware.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", protect, logout);
router.get("/profile", protect, getUserProfile);

export default router;
