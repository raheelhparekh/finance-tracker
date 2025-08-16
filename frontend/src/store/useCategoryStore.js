import { create } from "zustand";
import axiosInstance from "../lib/axiosInstance.js";
import toast from "react-hot-toast";

export const useCategoryStore = create((set) => ({
  categories: [],
  isLoading: false,
  error: null,

  fetchCategories: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await axiosInstance.get("/categories");
      set({ categories: response.data, isLoading: false });
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      toast.error("Failed to fetch categories.");
      set({ isLoading: false, error: error.response?.data?.message || "Server error" });
    }
  },

  addCategory: async (newCategory) => {
    try {
      const response = await axiosInstance.post("/categories/create", newCategory);
      set((state) => ({ categories: [...state.categories, response.data] }));
      toast.success("Category added successfully!");
      return true;
    } catch (error) {
      console.error("Failed to add category:", error);
      toast.error(error.response?.data?.message || "Failed to add category.");
      return false;
    }
  },

  updateCategory: async (id, updatedData) => {
    try {
      const response = await axiosInstance.put(`/categories/update-category/${id}`, updatedData);
      set((state) => ({
        categories: state.categories.map((c) =>
          c._id === id ? response.data : c
        ),
      }));
      toast.success("Category updated successfully!");
      return true;
    } catch (error) {
      console.error("Failed to update category:", error);
      toast.error(error.response?.data?.message || "Failed to update category.");
      return false;
    }
  },

  deleteCategory: async (id) => {
    try {
      await axiosInstance.delete(`/categories/delete-category/${id}`);
      set((state) => ({
        categories: state.categories.filter((c) => c._id !== id),
      }));
      toast.success("Category deleted successfully!");
      return true;
    } catch (error) {
      console.error("Failed to delete category:", error);
      toast.error(error.response?.data?.message || "Failed to delete category.");
      return false;
    }
  },
}));