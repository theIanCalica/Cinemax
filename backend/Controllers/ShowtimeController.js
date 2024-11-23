const Showtime = require("../Models/Showtime");

// Get all showtimes
exports.GetShowtimes = async (req, res) => {
  try {
    const showtimes = await Showtime.find().populate("movie"); // Populate movie details
    res.status(200).json({ success: true, data: showtimes });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: err.message });
  }
};

// Get showtime based on movie Id
exports.GetShowtimeBasedOnMovieId = async (req, res) => {
  try {
    // Get movie ID from the request params
    const movieId = req.params.id;
    const { theater } = req.query;

    // Query the database to find the showtimes for the given movie ID, only selecting required fields
    const showtime = await Showtime.find({
      movie: movieId,
      theater: theater,
    }).populate({
      path: "movie", // Populate the `movie` field
    });

    // Check if showtime data exists for the given movie ID
    if (!showtime || showtime.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No showtimes found for this movie.",
      });
    }

    // Return the showtimes details as a response
    res.status(200).json({ success: true, showtime });
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: err.message });
  }
};

// Create a new showtime
exports.CreateShowtime = async (req, res) => {
  try {
    const { movie_id, theater_name, dateRange } = req.body;

    // Validation: Ensure required fields are present
    if (
      !movie_id ||
      !theater_name ||
      !Array.isArray(dateRange) ||
      dateRange.length === 0
    ) {
      return res.status(400).json({
        message: "Movie ID, theater name, and date range are required.",
      });
    }

    // Parse and validate the date range
    const parsedDates = dateRange.map((date) => {
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime()) ? parsedDate : null;
    });

    if (parsedDates.includes(null)) {
      return res
        .status(400)
        .json({ message: "Invalid date format in dateRange." });
    }

    // Predefined showtimes
    const predefinedShowtimes = ["10:00", "12:00", "14:00", "16:00", "18:00"];

    // Build the `showtimes` array
    const showtimes = parsedDates.map((date) => ({
      date,
      times: predefinedShowtimes.map((time) => ({
        time,
      })),
    }));

    // Check if a ShowTime document already exists for this movie and theater
    const existingShowtime = await Showtime.findOne({
      movie: movie_id.value,
      theater: theater_name.value,
    });

    if (existingShowtime) {
      // Update the existing document by appending new `showtimes`
      const updatedShowtime = await Showtime.findByIdAndUpdate(
        existingShowtime._id,
        { $push: { showtimes: { $each: showtimes } } },
        { new: true } // Return the updated document
      );

      return res.status(200).json({
        message: "Showtimes updated successfully!",
        data: updatedShowtime,
      });
    }

    // Create a new ShowTime document if none exists
    const newShowtime = new Showtime({
      movie: movie_id.value,
      theater: theater_name.value,
      showtimes,
    });

    const savedShowtime = await newShowtime.save();

    res.status(201).json({
      message: "Showtime created successfully!",
      data: savedShowtime,
    });
  } catch (error) {
    console.error("Error creating showtimes:", error);

    res.status(500).json({
      message: "An error occurred while creating the showtimes.",
      error: error.message || "Unknown error",
    });
  }
};

// Update an existing showtime
exports.UpdateShowtime = async (req, res) => {
  try {
    const { id } = req.params;
    const { movie_id, theater_name, dateRange } = req.body;

    // Validation: Ensure required fields are present
    if (
      !movie_id?.value ||
      !theater_name?.value ||
      !Array.isArray(dateRange) ||
      dateRange.length === 0
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required, including dateRange." });
    }

    // Validate and parse each date in the dateRange
    const parsedDates = dateRange.map((date) => new Date(date));
    if (parsedDates.some((date) => isNaN(date))) {
      return res
        .status(400)
        .json({ message: "Invalid date format in dateRange." });
    }

    // Define predefined showtimes
    const predefinedShowtimes = ["10:00", "12:00", "14:00", "16:00", "18:00"];
    const defaultSeats = Array.from({ length: 100 }, (_, i) => i + 1); // Default seats: 1-100

    // Prepare updated showtimes for each date
    const updatedShowtimeData = parsedDates.map((date) => ({
      date,
      times: predefinedShowtimes.map((time) => ({
        time,
        availableSeats: defaultSeats,
      })),
    }));

    // Find and update the showtime in the database
    const updatedShowtime = await Showtime.findByIdAndUpdate(
      id,
      {
        movie: movie_id.value,
        theater: theater_name.value,
        showtimes: updatedShowtimeData,
      },
      { new: true } // Return the updated document
    );

    if (!updatedShowtime) {
      return res.status(404).json({
        success: false,
        message: "Showtime not found.",
      });
    }

    // Return success response
    res.status(200).json({
      success: true,
      data: updatedShowtime,
      message: "Showtime updated successfully.",
    });
  } catch (err) {
    console.error("Error updating showtime:", err.message);
    res.status(500).json({
      success: false,
      message: "Server Error.",
      error: err.message,
    });
  }
};

// Delete a showtime
exports.deleteShowtime = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the showtime
    const deletedShowtime = await Showtime.findByIdAndDelete(id);

    if (!deletedShowtime) {
      return res
        .status(404)
        .json({ success: false, message: "Showtime not found" });
    }

    res.status(200).json({
      success: true,
      message: "Showtime deleted successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: err.message });
  }
};
