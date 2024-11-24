const express = require("express");
const router = express.Router();
const FoodController = require("../Controllers/FoodController");
const authenticateTokenAndUser = require("../middleware/Auth");

// Get top 5 foods
router.get("/top-5", authenticateTokenAndUser, FoodController.getTopFood);

// Pagination for foods
router.get("/paginated", FoodController.getPaginatedFoods);

// Get all foods
router.get("/", FoodController.getAllFoods);

// Get a single food by ID
router.get("/:id", FoodController.getFoodById);

// Add new food
router.post("/", authenticateTokenAndUser, FoodController.createFood);

// Update a food by ID
router.put("/:id", authenticateTokenAndUser, FoodController.updateFoodById);

// Delete food by ID
router.delete("/:id", authenticateTokenAndUser, FoodController.deleteFoodById);

// Delete single pic based on public_id and foodId
router.delete(
  "/deletePic/:foodId",
  authenticateTokenAndUser,
  FoodController.DeleteSinglePic
);

module.exports = router;
