const express = require("express");
const router = express.Router();
const authController = require("../Controllers/AuthController");

// login
router.post("/login", authController.login);

module.exports = router;
