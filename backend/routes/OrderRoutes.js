const express = require("express");
const router = express.Router();
const OrderController = require("../Controllers/OrderController");
const authenticateTokenAndUser = require("../middleware/Auth");
const Order = require("../Models/Order");

// Get all orders
router.get("/", authenticateTokenAndUser, OrderController.getAllOrders);

// Get orders based on user Id
router.get(
  "/:userId",
  authenticateTokenAndUser,
  OrderController.getOrdersBasedOnUser
);

// Count order
router.get("/count", authenticateTokenAndUser, OrderController.countOrder);

// Get a single order by ID
router.get("/:id", authenticateTokenAndUser, OrderController.getSingleOrder);

// Create stripe session
router.post(
  "/create-checkout-session",
  authenticateTokenAndUser,
  OrderController.createCheckoutSession
);

router.post("/webhook", OrderController.CheckoutCreditCard);

router.post("/", authenticateTokenAndUser, OrderController.createOrder);

// Update a single order by ID
router.put("/", authenticateTokenAndUser, OrderController.updateOrderById);

module.exports = router;
