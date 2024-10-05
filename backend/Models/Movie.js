const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CastSchema = require("./Cast");

const MoviesSchema = new Schema(
  {
    genre: [
      {
        type: Schema.Types.ObjectId,
        ref: "Genre",
        required: true,
      },
    ],
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    storyLine: {
      type: String,
      required: true,
      trim: true,
    },
    directorName: {
      type: String,
      required: true,
      trim: true,
    },
    writerName: {
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
    cast: [CastSchema],
    trailer: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: String,
      required: true,
      enum: ["G", "PG", "PG-13", "R", "NC-17", "SPG"],
      trim: true,
    },
    starRating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
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
