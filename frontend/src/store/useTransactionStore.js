import { create } from "zustand";
import api from "../lib/axiosInstance.js";
import toast from "react-hot-toast";

export const useTransactionStore = create((set) => ({
  transactions: [],
  isLoading: false,
  error: null,

  // Fetch all transactions for the authenticated user
  fetchTransactions: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.get("/transactions");
      set({ transactions: response.data, isLoading: false });
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
      toast.error("Failed to fetch transactions.");
      set({ isLoading: false, error: error.response?.data?.message || "Server error" });
    }
  },

  // Add a new transaction
  addTransaction: async (newTransaction) => {
    try {
      const response = await api.post("/transactions/create-transaction", newTransaction);
      set((state) => ({ transactions: [response.data, ...state.transactions] }));
      toast.success("Transaction added successfully!");
    } catch (error) {
      console.error("Failed to add transaction:", error);
      toast.error(error.response?.data?.message || "Failed to add transaction.");
    }
  },

  // Update an existing transaction
  updateTransaction: async (id, updatedData) => {
    try {
      const response = await api.put(`/transactions/update-transaction/${id}`, updatedData);
      set((state) => ({
        transactions: state.transactions.map((t) =>
          t._id === id ? response.data : t
        ),
      }));
      toast.success("Transaction updated successfully!");
    } catch (error) {
      console.error("Failed to update transaction:", error);
      toast.error(error.response?.data?.message || "Failed to update transaction.");
    }
  },

  // Delete a transaction
  deleteTransaction: async (id) => {
    try {
      await api.delete(`/transactions/delete-transaction/${id}`);
      set((state) => ({
        transactions: state.transactions.filter((t) => t._id !== id),
      }));
      toast.success("Transaction deleted successfully!");
    } catch (error) {
      console.error("Failed to delete transaction:", error);
      toast.error(error.response?.data?.message || "Failed to delete transaction.");
    }
  },
}));