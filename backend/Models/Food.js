const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FoodSchema = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category", // Reference to the Category model
      required: true,
    },
    name: {
      type: String,
      required: [true, "Food is required!"],
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    available: {
      type: Boolean,
      required: [true, "Availability is required"],
      default: true,
    },
    image: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
    collection: "foods",
  }
);

// Create an index on the food name
FoodSchema.index({ name: 3 });

const Food = mongoose.model("Food", FoodSchema);

module.exports = Food;
