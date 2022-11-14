import create from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create((set) => ({
  token: null,
  setToken: () => set({ token }),
  logOut: () => set({ token: null }),
}));
