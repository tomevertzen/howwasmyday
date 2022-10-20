const User = require("../models/User");

const register = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  res.send("Login route");
};

const logout = async (req, res) => {
  res.send("Logout route");
};

const forgotPassword = async (req, res) => {
  res.send("Forgot password route");
};

const resetPassword = async (req, res) => {
  res.send("Reset password route");
};

const refresh = async (req, res) => {
  res.send("Refresh route");
};

module.exports = {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  refresh,
};
