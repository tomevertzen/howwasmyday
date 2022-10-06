const express = require("express");
const cors = require("cors");

const app = express();
require("dotenv").config({ path: " ./config.env" });
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
app.use("/", express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.send("This is my new server");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
