const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Define the schema or attributes of a model
const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, // Removes extra spaces from the beginning and end of the string
      maxlength: 255, // Optional: Limits the length of the title
    },
    body: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
      index: true, // Indexes the date field for faster queries
    },
    hidden: {
      type: Boolean,
      default: false, // Optional: Default value for the hidden field
    },
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt` fields automatically
    collection: "articles",
  }
);

// Create the model
const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
