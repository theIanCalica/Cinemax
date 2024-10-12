const express = require("express");
const router = express.Router();
const OrderController = require("../Controllers/OrderController");

// Get all orders
router.get("/", OrderController.getAllOrders);

// Count order
router.get("/count", OrderController.countOrder);

// Get a single order by ID
router.get("/:id", OrderController.getSingleOrder);

// Update a single order by ID
router.put("/:id", OrderController.updateOrderById);

module.exports = router;
