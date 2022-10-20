const errorHandlerMiddleware = (err, req, res, next) => {
  // Log the error
  console.error(err);

  // Respond with the error
  res.status(500).json({ message: "There was an error" });
};

module.exports = errorHandlerMiddleware;
