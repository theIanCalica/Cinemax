const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    items: [
      {
        food: {
          type: Schema.Types.ObjectId,
          ref: "Food", // Reference to the Food model
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1, // Minimum quantity is 1
        },
        price: {
          type: Number,
          required: true, // Store price at the time of adding to the cart
        },
        notes: {
          type: String, // Optional field for customization notes
          trim: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      default: 0, // To track the total price of the cart
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Cart", CartSchema);
