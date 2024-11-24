const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema(
  {
    showtime: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShowTime",
      required: true,
    }, // Reference to the specific showtime
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Reference to the user making the booking
    selectedDate: {
      type: String,
      required: true,
    }, // Chosen date for the booking (e.g., "October 31, 2024")
    selectedTime: {
      type: String,
      required: true,
    }, // Chosen time for the booking (e.g., "10:00")
    cinema: {
      type: String,
      required: true,
    }, // Chosen cinema (e.g., "Cinema 1")
    selectedSeats: {
      type: [Number],
      required: true,
      validate: {
        validator: function (seats) {
          return seats.length > 0; // Ensure at least one seat is selected
        },
        message: "At least one seat must be selected for booking.",
      },
    }, // Array of seat numbers booked
    ticketCount: {
      type: Number,
      required: true,
      min: [1, "At least one ticket must be booked."],
    }, // Number of tickets booked
    paymentStatus: {
      type: String,
      enum: ["Pending", "Confirmed", "Failed"],
      default: "Pending",
    }, // Status of payment for the booking
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", BookingSchema);
