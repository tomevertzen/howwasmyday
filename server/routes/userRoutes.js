const express = require("express");
const router = express.Router();

const usersController = require("../controllers/userController");

// @route api/users

router
  .route("/")
  .get(usersController.getAllUsers)
  .post(usersController.createNewUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

// @route api/users/login
router.post("/login", usersController.loginUser);

module.exports = router;
