const express = require("express");
const router = express.Router();
const authController = require("../Controllers/AuthController");

// login
router.post("/login", authController.login);

// Google login
router.post("/google-login", authController.googleLogin);

module.exports = router;
