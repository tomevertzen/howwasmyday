import React from "react";

//Import Card component
import HabitCard from "./HabitCard";

//Import store
import useHabitCardStore from "../../app/HabitCardStore";

const HabitCards = () => {
  // const store = useHabitCardStore();
  // store.fetch();
  return (
    <div className="grid sm:grid-cols-3 gap-4">
      <HabitCard />
      <HabitCard />
      <HabitCard />
      <HabitCard />
      <HabitCard />
      <HabitCard />
    </div>
  );
};

export default HabitCards;
