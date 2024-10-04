const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FoodSchema = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
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
    status: {
      type: String,
      required: [true, "Status is required"],
      trim: true,
      enum: ["available", "unavailable"],
      default: "available",
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
