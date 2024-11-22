const express = require("express");
const router = express.Router();
const userController = require("../Controllers/UserController");
const upload = require("../middleware/multer");
const AuthTokenAndUser = require("../middleware/Auth.js");

// Check uniqueness
router.post("/check-unique", userController.checkUnique);

// Get all users
router.get("/", AuthTokenAndUser, userController.getAllUsers);

// Get all employees
router.get("/employees", AuthTokenAndUser, userController.getEmployees);

// Count user
router.get("/count", AuthTokenAndUser, userController.countUsers);

// Get a single user by ID
router.get("/:id", userController.getUserById);

// Add user
router.post("/", userController.addUser);

// Registration route
router.post("/registration", userController.register);

// Update a user by ID
router.put("/:id", userController.updateUserById);

// Update profile
router.put("/update-profile/:id", userController.updateProfile);

// Send email
router.post("/send-email", upload.array("files"), userController.sendEmail);

// Activate user
router.put("/activate/:id", userController.activateUser);

// Deactivate user
router.put("/deactivate/:id", userController.deactivateUser);

// Delete a user by id
router.delete("/:id", userController.deleteUserById);

module.exports = router;
