const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Predefine showtimes at 2-hour intervals from 10:00 AM to 6:00 PM
const predefinedShowtimes = [
  "10:00", // 10:00 AM
  "12:00", // 12:00 PM (Noon)
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
    seats: {
      type: [Number],
      default: Array.from({ length: 100 }, (_, i) => i + 1), // Predefine seats 1 to 100
    },
    availableSeats: {
      type: [Number],
      default: Array.from({ length: 100 }, (_, i) => i + 1), // All seats available initially
    },
    showDateRange: {
      start: {
        type: Date,
        required: true,
      },
      end: {
        type: Date,
        required: true,
        validate: {
          validator: function (v) {
            return v >= this.showDateRange.start;
          },
          message: "End date must be greater than or equal to the start date!",
        },
      },
    }, // Start and end date for the show range
    showTime: {
      type: [String], // Array to store multiple showtimes
      default: predefinedShowtimes, // Default showtimes at 2-hour intervals
      validate: {
        validator: function (v) {
          return v.every((time) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(time)); // Validates each time in HH:mm format
        },
        message: (props) =>
          `${props.value} is not a valid time format (HH:mm)!`,
      },
    }, // Array of showtimes
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ShowTime", ShowTimeSchema);
