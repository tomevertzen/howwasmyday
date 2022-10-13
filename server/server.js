require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
const connectDB = require("../server/configs/db");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 5000;

//Import Routes
const habitcardRoutes = require("./routes/habitcardRoutes");

//Connect Database
connectDB();
const db = mongoose.connection;

// Middleware
app.use(cors());
app.use(express.json());

//Serve public folder
app.use("/", express.static(path.join(__dirname, "/public")));

//All routes
app.use("/api/habitcards", habitcardRoutes);

db.once("open", () => {
  console.log("Connected to database");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

// Log errors on occurence

db.on("error", (err) => {
  console.log("Error connecting to database", err);
});
