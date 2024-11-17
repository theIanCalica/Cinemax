const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        foodId: {
          type: Schema.Types.ObjectId,
          ref: "Food",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "Pending",
        "Processing",
        "Ready to Pick up",
        "Completed",
        "Cancelled",
      ],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["Credit Card", "Cash"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
    },
    // Ratings field for the order
    ratings: [
      {
        foodId: {
          type: Schema.Types.ObjectId,
          ref: "Food",
          required: true,
        },
        rating: {
          type: Number,
          min: 1,
          max: 5,
        },
        comment: {
          type: String,
          trim: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    collection: "orders",
  }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
