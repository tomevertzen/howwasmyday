const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();
  if (!users) {
    return res.status(400).json({ message: "No users found" });
  }

  res.status(200).json({ users });
});

// @route POST api/users
// @desc Register new user
// @access Public

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

  //Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const userObject = {
    email,
    password: hashedPassword,
    firstName,
    lastName,
  };

  const user = await User.create(userObject);

  if (user) {
    res.status(201).json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
});

// @route POST api/users/login
// @desc Login user
// @access Public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).lean().exec();

  //Check if user exists
  if (!user) {
    return res.status(400).json({ message: "User does not exist" });
  }

  //Check if the password is correct
  if (user && (await bcrypt.compare(password, user.password))) {
    //Create JWT's
    const accessToken = jwt.sign(
      { userId: user._id, roles: user.roles },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "30s",
      }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    //Store refresh token in DB
    await User.findByIdAndUpdate(user._id, { refreshToken });

    //Send tokens to client
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      accessToken,
    });
  } else {
    res.status(400).json({ message: "Invalid credentials" });
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

const refresh = async (req, res) => {
  //Get the refresh token from the request
  const cookies = req.cookies;
  const refreshToken = cookies.jwt;

  //Check if the refresh token is present
  if (!refreshToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  //Verify the refresh token and get the user id
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) return res.status(403).json({ msg: "Forbidden" }); // Forbidden

      //Look for the userID in the DB
      const user = await User.findOne({ _id: decoded.userId })
        .select("-password")
        .exec();
      if (!user) return res.status(401).json({ msg: "Unauthorized" }); // Unauthorized
      console.log(user);
      //Create a new access token and return to the user
      const accessToken = jwt.sign(
        { userInfo: { userId: user.id, roles: user.roles } },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "30s",
        }
      );
      res.json({ accessToken });
    })
  );
};

//Generate JWT

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
  loginUser,
  refresh,
};