import create from "zustand";
import { persist, devtools } from "zustand/middleware";

const useAuthStore = create(
  devtools(
    persist(
      (set) => ({
        token: null,
        setToken: (token) => set({ token }),
        logOut: () => set({ token: null }),
      }),
      {
        name: "auth-storage",
        getStorage: () => localStorage,
      }
    )
  )
);

export default useAuthStore;
