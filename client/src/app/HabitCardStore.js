import create from "zustand";
import { persist } from "zustand/middleware";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const axiosPrivate = useAxiosPrivate();

const useHabitCardStore = create(
  persist(
    (set, get) => ({
      habitCards: [],
      addHabitCard: (habitCard) => {
        set((state) => ({
          habitCards: [...state.habitCards, habitCard],
        }));
      },
      //Fetching the habitcards from the server
      fetch: async () => {
        try {
          const response = await axiosPrivate.get("/habitCards", {
            withCredentials: true,
          });
          console.log("Started fetching habitcards");
          console.log(response.data);
          set((state) => ({
            habitCards: response.data,
          }));
        } catch (error) {
          console.log(error);
        }
      },
      // ...
    }),
    {
      name: "habit-card-store",
      getStorage: () => localStorage,
    }
  )
);

export default useHabitCardStore;
