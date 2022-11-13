const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader)
    return res.status(401).send({ auth: false, message: "No token provided." });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err)
      return res.status(403).json({ msg: "Token could not be verified" }); // Forbidden
    req.userId = decoded.userId;
    next();
  });
};

module.exports = verifyJWT;
