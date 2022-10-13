const express = require("express");
const router = express.Router();

//import controller functions
const {
  createHabitCard,
  getSample,
} = require("../controllers/habitcardController");

//Get all habitcards route
// router.get("/", getAllHabitCards);

// //Get habitcard by id route
// router.get("/:id", getHabitCardById);

//Create habitcard route
router.post("/create", createHabitCard);

router.get("/", getSample);

// //Update habitcard route
// router.patch("/update/:id", updateHabitCard);

// //Delete habitcard route
// router.delete("/delete/:id", deleteHabitCard);

module.exports = router;
