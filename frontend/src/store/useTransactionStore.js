import { create } from "zustand";
import axiosInstance from "../lib/axiosInstance.js";
import toast from "react-hot-toast";

export const useTransactionStore = create((set) => ({
  transactions: [],
  isLoading: false,
  error: null,

  fetchTransactions: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await axiosInstance.get("/transactions");
      set({ transactions: response.data, isLoading: false });
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
      toast.error("Failed to fetch transactions.");
      set({ isLoading: false, error: error.response?.data?.message || "Server error" });
    }
  },

  addTransaction: async (newTransaction) => {
    try {
      const response = await axiosInstance.post("/transactions/create-transaction", newTransaction);
      const newTransactionData = response.data;
      
      set((state) => ({ transactions: [newTransactionData, ...state.transactions] }));
      toast.success("Transaction added successfully!");
      return true;
    } catch (error) {
      console.error("Failed to add transaction:", error);
      toast.error(error.response?.data?.message || "Failed to add transaction.");
      return false;
    }
  },

  updateTransaction: async (id, updatedData) => {
    try {
      const response = await axiosInstance.put(`/transactions/update-transaction/${id}`, updatedData);
      set((state) => ({
        transactions: state.transactions.map((t) =>
          t._id === id ? response.data : t
        ),
      }));
      toast.success("Transaction updated successfully!");
      return true;
    } catch (error) {
      console.error("Failed to update transaction:", error);
      toast.error(error.response?.data?.message || "Failed to update transaction.");
      return false;
    }
  },

  deleteTransaction: async (id) => {
    try {
      await axiosInstance.delete(`/transactions/delete-transaction/${id}`);
      set((state) => ({
        transactions: state.transactions.filter((t) => t._id !== id),
      }));
      toast.success("Transaction deleted successfully!");
      return true;
    } catch (error) {
      console.error("Failed to delete transaction:", error);
      toast.error(error.response?.data?.message || "Failed to delete transaction.");
      return false;
    }
  },
}));