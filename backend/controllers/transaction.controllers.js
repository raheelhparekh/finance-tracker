import Transaction from "../models/transaction.models.js";
import Category from "../models/category.models.js";

const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id })
      .populate("category", "name type")
      .sort({ date: -1 });

    return res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const createTransaction = async (req, res) => {
  try {
    const { type, amount, category, description, date } = req.body;

    // Input validation
    if (!type || !amount || !category || !description || !date) {
      return res.status(400).json({ message: "Please add all fields" });
    }

    // Check if category exists and belongs to the user
    const categoryExists = await Category.findOne({
      _id: category,
      user: req.user._id,
    });
    if (!categoryExists) {
      return res
        .status(400)
        .json({ message: "Category not found or does not belong to you" });
    }

    let transaction = await Transaction.create({
      user: req.user._id,
      type,
      amount,
      category,
      description,
      date,
    });

    // Populate the category field before sending the response
    transaction = await transaction.populate("category", "name type");

    return res.status(201).json(transaction);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Ensure user owns the transaction
    if (transaction.user.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ message: "Not authorized to update this transaction" });
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("category", "name type");

    return res.status(200).json(updatedTransaction);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Ensure user owns the transaction
    if (transaction.user.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ message: "Not authorized to delete this transaction" });
    }

    await transaction.deleteOne();

    return res.status(200).json({ id: req.params.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
