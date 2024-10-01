const express = require("express");
const router = express.Router();
const userController = require("../Controllers/UserController");

// Check uniqueness
router.post("/check-unique", userController.checkUnique);

// Get all users
router.get("/", userController.getAllUsers);

// Get a single user by ID
router.get("/:id", userController.getUserById);

// Add user
router.post("/", userController.addUser);

// Update a user by ID
router.put("/:id", userController.updateUserById);

// Deactivate user
router.put("/deactivate/:id", userController.deactivateUser);

// Delete a user by id
router.delete("/:id", userController.deleteUserById);

module.exports = router;
