const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

// @route api/users

router
  .route("/signup")
  .get(authController.getAllUsers)
  .post(authController.createNewUser)
  .patch(authController.updateUser)
  .delete(authController.deleteUser);

// @route api/users/login
router.post("/signin", authController.loginUser);

router.get("/refresh", authController.refresh);

module.exports = router;
