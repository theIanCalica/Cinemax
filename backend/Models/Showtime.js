const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Predefine showtimes
const predefinedShowtimes = [
  "10:00", // 10:00 AM
  "12:00", // 12:00 PM
  "14:00", // 2:00 PM
  "16:00", // 4:00 PM
  "18:00", // 6:00 PM
];

const ShowTimeSchema = new Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    }, // Reference to the Movie being shown
    theater: {
      type: String,
      enum: ["Cinema 1", "Cinema 2"],
      required: true,
    }, // Fixed values for theaters
    showtimes: [
      {
        date: {
          type: Date,
          required: true,
        }, // Specific date for the showtime
        times: [
          {
            time: {
              type: String,
              required: true,
              enum: predefinedShowtimes, // Limit to default times
            },
            availableSeats: {
              type: [Number],
              default: Array.from({ length: 100 }, (_, i) => i + 1), // Seats 1-100 available by default
            },
          },
        ], // Array of predefined times with seat availability
      },
    ], // Array of dates, each with its own set of times and seat availability
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ShowTime", ShowTimeSchema);
