const express = require("express");
const router = express.Router();
const OrderController = require("../Controllers/OrderController");
const authenticateTokenAndUser = require("../middleware/Auth");

// Get all orders
router.get("/", authenticateTokenAndUser, OrderController.getAllOrders);

// Count order
router.get("/count-order", OrderController.countOrder);

// Get orders based on user Id
router.get(
  "/:userId",
  authenticateTokenAndUser,
  OrderController.getOrdersBasedOnUser
);

// Get a single order by ID
router.get("/:id", authenticateTokenAndUser, OrderController.getSingleOrder);

// Create stripe session
router.post(
  "/create-checkout-session",
  authenticateTokenAndUser,
  OrderController.createCheckoutSession
);

// Webhook for listening to success checkout in stripe
router.post("/webhook", OrderController.CheckoutCreditCard);

// Create order
router.post("/", authenticateTokenAndUser, OrderController.createOrder);

// Update a single order by ID
router.put("/", authenticateTokenAndUser, OrderController.updateOrderById);

// Create review
router.put(
  "/create-review",
  authenticateTokenAndUser,
  OrderController.createReview
);

// Get reviews based on food id
router.get(
  "/get-review/:id",
  authenticateTokenAndUser,
  OrderController.getReviewaBasedonFoodId
);

router.put(
  "/update-review",
  authenticateTokenAndUser,
  OrderController.updateReview
);

// Delete a review
router.delete("/delete-review", OrderController.deleteReview);

module.exports = router;
