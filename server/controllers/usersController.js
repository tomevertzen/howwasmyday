const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();
  if (!users) {
    return res.status(400).json({ message: "No users found" });
  }

  res.status(200).json({ users });
});

const createNewUser = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  //Check if all of the data is present
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  //Check if user already exists
  const userExists = await User.findOne({ email }).lean().exec();

  if (userExists) {
    return res.status(409).json({ message: "User already exists" });
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const userObject = {
    email,
    password: hashedPassword,
    firstName,
    lastName,
  };

  const user = await User.create(userObject);

  if (user) {
    res.status(201).json({ message: "New user has been created" });
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { id, firstName, lastName, email, password } = req.body;

  //Check if all of the data is present
  if (!id || !firstName || !lastName || !email) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  //Check if user exists
  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  //Check if email already exists
  const userExists = await User.findOne({ email }).lean().exec();
  if (userExists) {
    return res.status(409).json({ message: "Email already exists" });
  }

  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;

  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  const updatedUser = await user.save();

  res.json({ message: "User has been updated" });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Please enter an id" });
  }
});

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
