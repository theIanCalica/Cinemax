const express = require("express");
const router = express.Router();
const CartController = require("../Controllers/CartController");
const authenticateTokenAndUser = require("../middleware/Auth");

// Get all carts (requires authentication)
router.get("/", authenticateTokenAndUser, CartController.getAllCart);

// Get a single cart by ID (requires authentication)
router.get("/:id", authenticateTokenAndUser, CartController.getCartById);

// Create cart item (requires authentication)
router.post("/", authenticateTokenAndUser, CartController.createCartItem);

// Update cart item (requires authentication)
router.put("/", authenticateTokenAndUser, CartController.updateCartItem);

// Delete cart item (requires authentication)
router.delete("/", authenticateTokenAndUser, CartController.deleteCartItem);

module.exports = router;
