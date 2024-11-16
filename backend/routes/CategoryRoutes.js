const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const AuthTokenAndUser = require("../middleware/Auth.js");

// Get all categories
router.get("/", categoryController.getAllCategories);

// Get a single category by ID
router.get("/:id", AuthTokenAndUser, categoryController.getCategoryById);

// Create a new category
router.post("/", AuthTokenAndUser, categoryController.createCategory);

// Update a category by ID
router.put("/:id", AuthTokenAndUser, categoryController.updateCategoryById);

// Delete a category by ID
router.delete("/:id", AuthTokenAndUser, categoryController.deleteCategoryById);

module.exports = router;
