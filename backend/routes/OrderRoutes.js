const express = require("express");
const router = express.Router();
const OrderController = require("../Controllers/OrderController");

// Get all orders
router.get("/", OrderController.getAllOrders);

// Get a single order by ID
router.get("/:id", OrderController.getSingleOrder);

// Update a single order by ID
router.put("/:id", OrderController.updateOrderById);
