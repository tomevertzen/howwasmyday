const mongoose = require("mongoose");
const Habitcard = require("../models/Habitcard");

//Create habitcard
const getSample = async (req, res) => {
  res.json({ message: "Hello World" });
};

const createHabitCard = async (req, res) => {
  const habitcard = new Habitcard({
    _id: new mongoose.Types.ObjectId(),
    habits: req.body.habits,
    rating: req.body.rating,
  });

  habitcard
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Habitcard created successfully",
        createdHabitcard: {
          _id: result._id,
          habits: result.habits,
          rating: result.rating,
          date: result.date,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

module.exports = {
  createHabitCard,
  getSample,
};
