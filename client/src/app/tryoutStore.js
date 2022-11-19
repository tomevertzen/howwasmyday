import create from "zustand";
import { persist } from "zustand/middleware";

const useTryoutStore = create(
  persist(
    (set) => ({
      tryout: [],

      //Add to tryout array
      addToTryout: (payload) =>
        set((state) => ({
          tryout: [...state.tryout, payload],
        })),

      //Remove from tryout array
      removeFromTryout: (payload) =>
        set((state) => ({
          tryout: state.tryout.filter((item) => item !== payload),
        })),

      //Clear tryout array
      clearTryout: () => set({ tryout: [] }),
    }),
    {
      name: "tryout-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useTryoutStore;
