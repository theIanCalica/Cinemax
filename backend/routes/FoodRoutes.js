const express = require("express");
const router = express.Router();
const FoodController = require("../Controllers/FoodController");

// Get all foods
router.get("/", FoodController.getAllFoods);

// Get a single food by ID
router.get("/:id", FoodController.getFoodById);

// Add new food
router.post("/", FoodController.createFood);

// Upload pic
router.post("/upload-pic", FoodController.uploadPic);

// Update a food by ID
router.put("/:id", FoodController.updateFoodById);

// Delet food by ID
router.delete("/:id", FoodController.deleteFoodById);

module.exports = router;
