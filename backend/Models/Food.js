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
      required: "Food is required!",
      trim: true,
    },
    price: {
      type: Number,
      required: "Price is required",
    },
    available: {
      type: Boolean,
      required: "Availability is required",
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

FoodSchema.index({ name: 3 });
const Food = mongoose.model("Food", FoodSchema);

module.exports = Food;
