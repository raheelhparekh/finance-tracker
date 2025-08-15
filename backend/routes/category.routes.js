import express from "express";
const router = express.Router();
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controllers.js";
import { protect } from "../middleware/auth.middleware.js";

router.get("/", protect, getCategories);
router.post("/create", protect, createCategory);
router.put("/update-category/:id", protect, updateCategory);
router.delete("/delete-category/:id", protect, deleteCategory);

export default router;
