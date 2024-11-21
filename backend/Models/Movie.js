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
    producerName: {
      type: String,
      required: true,
      trim: true,
    },
    mainCast: {
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
