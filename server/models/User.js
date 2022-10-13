const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

exports.User = mongoose.model("User", userSchema);
