import express from "express";
const router = express.Router();
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transaction.controllers.js";
import { protect } from "../middleware/auth.middleware.js";

router.get("/", protect, getTransactions);
router.post("/create-transaction", protect, createTransaction);
router.put("/update-transaction/:id", protect, updateTransaction);
router.delete("/delete-transaction/:id", protect, deleteTransaction);

export default router;
