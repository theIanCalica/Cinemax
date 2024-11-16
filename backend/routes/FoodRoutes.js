const express = require("express");
const router = express.Router();
const FoodController = require("../Controllers/FoodController");

// Pagination for foods
router.get("/paginated", FoodController.getPaginatedFoods);

// Get all foods
router.get("/", FoodController.getAllFoods);

// Get a single food by ID
router.get("/:id", FoodController.getFoodById);

// Add new food
router.post("/", FoodController.createFood);

// Update a food by ID
router.put("/:id", FoodController.updateFoodById);

// Delet food by ID
router.delete("/:id", FoodController.deleteFoodById);

module.exports = router;
