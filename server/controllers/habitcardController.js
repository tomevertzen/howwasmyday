const mongoose = require("mongoose");
const Habitcard = require("../models/Habitcard");

//Get all habitcards
const getAllHabitCards = async (req, res) => {
  try {
    const habitcards = await Habitcard.find();
    res.status(200).json(habitcards);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Update habit to habitcard by id
const addHabitToHabitCardById = async (req, res) => {
  try {
    const habitcard = await Habitcard.updateOne(
      { _id: req.params.id },
      {
        $addToSet: {
          habits: { title: req.body.title, isPositive: req.body.isPositive },
        },
      },
      { new: false, runValidators: true }
    );
    res.status(200).json(habitcard);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Remove habit from habitcard by id
const removeHabitFromHabitCardById = async (req, res) => {
  try {
    const habitcard = await Habitcard.updateOne(
      { _id: req.params.id },
      { $pull: { habits: { title: req.body.title } } },
      { new: false, runValidators: true }
    );

    const newCard = await Habitcard.findById(req.params.id);
    res.status(200).json(newCard);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Create habitcard

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

//Delete habitcard by id
const deleteHabitCardById = async (req, res) => {
  try {
    const habitcard = await Habitcard.findByIdAndDelete(req.params.id);
    res.status(200).json(habitcard);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getAllHabitCards,
  createHabitCard,
  addHabitToHabitCardById,
  deleteHabitCardById,
  removeHabitFromHabitCardById,
};
