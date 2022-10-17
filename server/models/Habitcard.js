const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const habitListSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please enter a habit"],
    unique: true,
  },
  isPositive: {
    type: Boolean,
    required: [true, "Please add a positive or negative habit"],
  },
});

const habitcardSchema = new Schema(
  {
    _id: Schema.ObjectId,
    habits: [habitListSchema],
    rating: {
      type: Number,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating must can not be more than 5"],
      required: [true, "Rating is required"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },

  {
    timestamps: true,
    collection: "habitcards",
  }
);

const Habitcard = mongoose.model("Habitcard", habitcardSchema);

module.exports = Habitcard;
