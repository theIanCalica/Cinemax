const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema or attributes of a model
const MoviesSchema = new Schema(
  {
    genre: {
      type: Schema.Types.ObjectId,
      ref: "Genre", // Reference to the Genre model
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    release_date: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    image_url: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: "movies",
  }
);

MoviesSchema.index({ genre: 2 });
const Movie = mongoose.model("Movie", MoviesSchema);

module.exports = Movie;
