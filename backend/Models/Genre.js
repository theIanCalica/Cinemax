const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema or attributes of a model
const genreSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Removes extra spaces from the beginning and end of the string
      maxlength: 100, // Optional: Limits the length of the name
    },
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt` fields automatically
    collection: "genres",
  }
);

// Add an index to the `name` field if needed
genreSchema.index({ name: 1 }); // Index for searching by name

// Create the model
const Genre = mongoose.model("Genre", genreSchema);

module.exports = Genre;
