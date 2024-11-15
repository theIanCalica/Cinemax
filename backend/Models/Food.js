const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FoodSchema = new Schema(
  {
    category: {
      id: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
      name: {
        type: String,
        required: [true, "Category name is required"],
        trim: true,
      },
    },
    name: {
      type: String,
      required: [true, "Food is required!"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
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
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    flavor: {
      type: String,
      trim: true,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    numberOfRatings: {
      type: Number,
      default: 0,
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
