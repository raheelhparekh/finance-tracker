import { create } from "zustand";
import axiosInstance from "../lib/axiosInstance.js"; 
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigninUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,

  // Check if the user is authenticated on app load
  checkAuth: async () => {
    try {
      set({ isCheckingAuth: true });
      const response = await axiosInstance.get("/users/profile");
      console.log("check auth response", response.data);

      set({ authUser: response.data });
      toast.success("User is authenticated!");
    } catch (error) {
      console.error("Authentication check failed", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // Login a user
  login: async (data) => {
    try {
      set({ isLoggingIn: true });
      const response = await axiosInstance.post("/users/login", data);
      console.log("login response", response.data);

      set({ authUser: response.data });
      toast.success("Login successful!");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error.response?.data?.message || "Error logging in");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // Register a new user
  signUp: async (data) => {
    try {
      set({ isSigninUp: true });
      const response = await axiosInstance.post("/users/register", data);
      console.log("sign up response", response.data);

      set({ authUser: response.data });
      toast.success("Registration successful! Please log in.");
    } catch (error) {
      console.error("Sign up failed:", error);
      toast.error(error.response?.data?.message || "Error signing up");
    } finally {
      set({ isSigninUp: false });
    }
  },

  // Logout the current user
  logout: async () => {
    try {
      await axiosInstance.get("/users/logout");
      set({ authUser: null });
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error(error.response?.data?.message || "Error logging out");
    }
  },
}));