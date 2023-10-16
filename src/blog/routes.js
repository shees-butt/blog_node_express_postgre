const express = require("express");
const router = express.Router();
const userController = require("./controller");

// Define routes for user signup and login
router.post("/signup", userController.signup);
router.post("/login", userController.login);

module.exports = router;
