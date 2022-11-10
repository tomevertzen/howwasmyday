const express = require("express");
const router = express.Router();

const usersController = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// @route api/users

router
  .route("/")
  .get(usersController.getAllUsers)
  .post(usersController.createNewUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

router.route("/hello").get((req, res) => {
  res.send("Hello World");
});

// @route api/users/login
router.post("/login", usersController.loginUser);

module.exports = router;
