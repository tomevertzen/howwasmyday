const mongoose = require("mongoose");
const isEmail = require("validator/lib/isEmail");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter a name"],
    minLength: [3, "Name must be at least 3 characters"],
    maxLength: [20, "Name can not be more than 20 characters"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Please enter a name"],
    minLength: [3, "Name must be at least 3 characters"],
    maxLength: [20, "Name can not be more than 20 characters"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: [true, "Email already exists"],
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minLength: [6, "Password must be at least 6 characters"],
  },
  roles: { type: String, default: "user" },
  active: {
    type: Boolean,
    default: true,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
