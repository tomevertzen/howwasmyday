import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "../components/Dashboard/Navigation";
import Profile from "../components/Dashboard/Profile";
import Index from "../components/Dashboard/Index";

const Dashboard = ({ children }) => {
  return (
    <div className="grid grid-rows-[100px_1fr] min-h-screen max-w-[1280px] mx-auto">
      <Navigation />
      <Routes>
        <Route index element={<Index />} />
        <Route exact path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
