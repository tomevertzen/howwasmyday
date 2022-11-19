const User = require("../models/User");

const handleLogout = async (req, res) => {
  //Delete the accessToken from the client
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(204);

  const refreshToken = cookies.jwt;

  //Check if the refreshToken is still in the database
  const user = await User.findOne({ refreshToken }).select("-password").exec();

  //If the refreshToken is no longer in the database just remove the token from the client
  if (!user) {
    res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "None" });
    return res.status(204);
  }

  //Remove the refreshToken from the database
  user.refreshToken = user.refreshToken.filter(
    (token) => token !== refreshToken
  );

  await user.save();

  res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "None" });
  res.status(204);
};

module.exports = { handleLogout };
