const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    order_date: {
      type: Date,
      required: [true, "Order Date is required"],
    },
    orderStatus: {
      type: String,
      required: [true, "Status is required"],
      trim: true,
      enum: ["pending", "completed", "ready-to-pick-up", "cancelled"], // Consistent enum format
      default: "pending",
    },
    orderItems: [
      {
        name: {
          type: String,
          required: [true, "Food is required!"], // Fixed validation syntax
          trim: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
          default: 0.0, // Optional: Default price to avoid errors
        },
        food: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Food",
        },
      },
    ],
    paymentInfo: {
      id: {
        type: String,
      },
      status: {
        type: String,
      },
    },
    paidAt: {
      type: Date,
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
  },
  {
    timestamps: true,
    collection: "orders",
  }
);

// Indexing for optimized queries
OrderSchema.index({ user: 1 });
OrderSchema.index({ order_date: 1 });
OrderSchema.index({ orderStatus: 1 }); // Corrected index field

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
