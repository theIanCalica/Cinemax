const express = require("express");
const router = express.Router();
const authenticateTokenAndUser = require("../middleware/Auth");
const BookingController = require("../Controllers/BookingController");

// Get all bookings for admin
router.get("/", authenticateTokenAndUser, BookingController.getBookings);

// Get all bookings based on user Id
router.get(
  "/:userId/userBookings",
  authenticateTokenAndUser,
  BookingController.getBookingsBasedOnUserId
);

// Get single booking based on id
router.get(
  "/:bookingId",
  authenticateTokenAndUser,
  BookingController.getSingleBooking
);

// Count all bookings for admin
router.get("/count", authenticateTokenAndUser, BookingController.countBookings);

// Create a booking which is for user

router.post("/", authenticateTokenAndUser, BookingController.createBooking);
// router.put("/:bookingId", authenticateTokenAndUser, BookingController.createBooking)

module.exports = router;
