const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const habitMonthlySchema = new Schema({
  //This defines the name of the habit
  _id: Schema.ObjectId,
  year: {
    type: Number,
    required: [true, "Please enter a year"],
    },
    month: {
        type: Number,
        required: [true, "Please enter a month"],
        min:[1],
        max:[12]
    },
    amountOfDays: {
        type: Number,
        required: [true, "Please enter the amount of days in the month"],
        min:[28],
        max:[31]
    },

  //This is the whole month list with true or false
  habbittracker: [
    {
        _id: Schema.ObjectId,
        name: {
            type: String,
            required: [true, "Please a short description of the habit"],
        },
        completed: [{
            type: Boolean,
            default: false,
        }],
        order: Number,
        everyDay: Boolean,
    },
}, {
    collection: "monthlyhabitcards",
    timestamps: true,
});

const HabitMonthly = mongoose.model("HabitMonthly", habitMonthlySchema);

module.exports = HabitMonthly;
