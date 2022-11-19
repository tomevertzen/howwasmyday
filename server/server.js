require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
const connectDB = require("../server/configs/db");
const errorHandlerMiddleware = require("../server/middleware/error-handler");
const mongoose = require("mongoose");
const cors = require("cors");
const corsOptions = require("./configs/corsOptions");
const path = require("path");
const PORT = process.env.PORT || 5000;
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");

//Connect Database
connectDB();
const db = mongoose.connection;

// Middleware
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandlerMiddleware);

//Serve public folder
app.use("/", express.static(path.join(__dirname, "/public")));

//Routes
app.use("/api/users", require("./routes/authRoutes"));
app.use("/api/logout", require("./routes/logoutRoutes"));

//Protected routes
app.use(verifyJWT);
app.use("/api/habitcards", require("./routes/habitcardRoutes"));

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
