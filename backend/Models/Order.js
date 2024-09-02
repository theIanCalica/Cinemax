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
    status: {
      type: String,
      required: [true, "Status is required"],
      trim: true,
      enum: ["Pending", "Completed", "Cancelled"], // Restrict status to these values
      default: "Pending", // Default status is "Pending"
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
OrderSchema.index({ status: 1 });

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
