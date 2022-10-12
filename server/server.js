require("dotenv").config({ path: "./config.env" });
const express = require("express");
const { connectToDb } = require("./configs/db.config");
const cors = require("cors");
const path = require("path");
const habitcardRouter = require("./routes/habitcardRoutes");
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/", express.static(path.join(__dirname, "/public")));

//First routes
app.use("/api/habitcards", habitcardRouter);

let db;

connectToDb()
  .then((res) => {
    db = res;

    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = { db };
