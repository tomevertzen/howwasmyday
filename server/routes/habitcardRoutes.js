const express = require("express");
const router = express.Router();

//import controller functions
const {
  createHabitCard,
  getAllHabitCards,
  getHabitCardById,
  addHabitToHabitCardById,
  deleteHabitCardById,
} = require("../controllers/habitcardController");

//Get all habitcards
router.get("/", getAllHabitCards);

//Create habitcard route
router.post("/create", createHabitCard);

//Update habitcard route
router.patch("/addhabittocard/:id", addHabitToHabitCardById);

module.exports = router;
