// routes/categoryRoutes.js
const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

// Get all categories
router.get("/", categoryController.getAllCategories);

// Get a single category by ID
router.get("/:id", categoryController.getCategoryById);

// Create a new category
router.post("/", categoryController.createCategory);

// Update a category by ID
router.put("/:id", categoryController.updateCategoryById);

// Delete a category by ID
router.delete("/:id", categoryController.deleteCategoryById);

module.exports = router;
