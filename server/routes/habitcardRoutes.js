const express = require("express");
const router = express.Router();

//import controller functions
const {
  createHabitCard,
  getAllHabitCards,
  addHabitToHabitCardById,
  deleteHabitCardById,
  removeHabitFromHabitCardById,
} = require("../controllers/habitcardController");

//Get all habitcards
router.get("/", getAllHabitCards);

//Create habitcard route
router.post("/create", createHabitCard);

//Add habit to habitcard
router.patch("/addhabittocard/:id", addHabitToHabitCardById);

//Remove habit from habitcard
router.patch("/removehabitfromcard/:id", removeHabitFromHabitCardById);

//Remove habitcard by id
router.delete("/delete/:id", deleteHabitCardById);

module.exports = router;
