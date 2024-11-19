const express = require("express");
const router = express.Router();
const authController = require("../Controllers/AuthController");

// login
router.post("/login", authController.login);

// Fcm token update
router.put("/fcm-token-update", authController.UpdateFcmToken);

// Google login
router.post("/google-login", authController.googleLogin);

// Change password
router.put("/changePassword", authController.changePassword);

// Link google for an existing user
router.put("/link-google", authController.linkGoogle);

module.exports = router;
