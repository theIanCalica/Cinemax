const Booking = require("../Models/Booking");
const ShowTime = require("../Models/Showtime");
const User = require("../Models/User");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const admin = require("../config/Firebase");
const { sendEmailBooking } = require("../utils/Mailtrap");
const PDFDocument = require("pdfkit");

// Count bookings
exports.countBookings = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();

    res.status(200).json({
      message: "Bookings count retrieved successfully.",
      totalBookings,
    });
  } catch (error) {
    console.error(err.message);
    res.status(500).json({ message: "Server error." });
  }
};

// Get all bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("customer", "showtime");

    res
      .status(200)
      .json({ message: "Bookings retrieved successfully.", bookings });
  } catch (error) {
    console.error(err.message);
    res.status(500).json({ message: "Server error." });
  }
};

// Get all bookings based on user Id
exports.getBookingsBasedOnUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const bookings = Booking.find({ customer: userId }).populate(
      "customer",
      "showtime"
    );

    if (bookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for this user." });
    }

    res.status(200).json({
      message: "Bookings retrieved successfully.",
      bookings,
    });
  } catch (error) {
    console.error(err.message);
    res.status(500).json({ message: "Server error." });
  }
};

// Get single booking
exports.getSingleBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId).populate(
      "customer",
      "showtime"
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    res
      .status(200)
      .json({ message: "Booking retrieved successfully.", booking });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error." });
  }
};

// Create a booking

exports.createBooking = async (req, res) => {
  try {
    const {
      selectedShowtime, // ShowTime _id
      userId, // User _id
      selectedDate, // Selected date (string, e.g., "October 31, 2024")
      selectedTime, // Selected time (string, e.g., "10:00")
      selectedCinema, // Selected cinema (string, "Cinema 1" or "Cinema 2")
      selectedSeats, // Array of selected seat numbers
      ticketCount, // Number of tickets to book
    } = req.body;

    // Validate required fields
    if (
      !selectedShowtime ||
      !userId ||
      !selectedDate ||
      !selectedTime ||
      !selectedCinema ||
      !selectedSeats ||
      !ticketCount
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Fetch showtime data
    const showTimeData = await ShowTime.findById(selectedShowtime).populate(
      "movie"
    );
    if (!showTimeData) {
      return res.status(404).json({ message: "Showtime not found." });
    }

    // Convert selectedDate to ISO format (YYYY-MM-DD)
    const localDate = new Date(selectedDate);
    localDate.setMinutes(
      localDate.getMinutes() - localDate.getTimezoneOffset()
    ); // Adjust to local timezone

    // Convert to ISO format and extract the date part (YYYY-MM-DD)
    const selectedDateISO = localDate.toISOString().split("T")[0];

    // Find the date entry that matches the selected date
    const dateData = showTimeData.showtimes.find((date) => {
      const dateISO = new Date(date.date).toISOString().split("T")[0]; // Extract YYYY-MM-DD from date.date
      return dateISO === selectedDateISO; // Compare only the date part
    });

    if (!dateData) {
      return res
        .status(400)
        .json({ message: "Selected date not available for this showtime." });
    }

    // Find the time entry for the selected time
    const timeData = dateData.times.find((time) => time.time === selectedTime);
    if (!timeData) {
      return res
        .status(400)
        .json({ message: "Selected time not available for this showtime." });
    }

    // Check if selected seats are available
    const unavailableSeats = selectedSeats.some(
      (seat) => !timeData.availableSeats.includes(seat)
    );
    if (unavailableSeats) {
      return res
        .status(400)
        .json({ message: "Some selected seats are not available." });
    }

    // Deduct seats from availability
    timeData.availableSeats = timeData.availableSeats.filter(
      (seat) => !selectedSeats.includes(seat)
    );
    await showTimeData.save();

    // Create a new booking
    const newBooking = new Booking({
      showtime: selectedShowtime, // Reference to the ShowTime model
      customer: userId, // Reference to the User model
      selectedDate, // Selected date (e.g., "October 31, 2024")
      selectedTime, // Selected time (e.g., "10:00")
      cinema: selectedCinema, // Selected cinema (e.g., "Cinema 1")
      selectedSeats, // Array of selected seat numbers
      ticketCount, // Number of tickets booked
    });

    const emailContent = `
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cinemax Movie Ticket</title>
    </head>
    <body style="font-family: 'Poppins', Arial, sans-serif; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background: linear-gradient(135deg, #1a1a2e, #16213e); color: #fff;">

        <div style="width: 380px; border: 1px solid #444; border-radius: 12px; background: #222; box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6); overflow: hidden;">

            <!-- Ticket Header -->
            <div style="background: linear-gradient(135deg, #0f3460, #53354a); color: #fff; text-align: center; padding: 15px;">
                <h1 style="margin: 0; font-size: 1.8rem; letter-spacing: 2px;">CINEMAX</h1>
                <p style="margin: 5px 0 0; font-size: 0.9rem; opacity: 0.8;">Experience Movies Like Never Before</p>
            </div>

            <!-- Ticket Details -->
            <div style="padding: 20px;">
                <p style="margin: 15px 0; font-size: 1rem; border-bottom: 1px dashed #444; padding-bottom: 8px;">
                    <strong>Booking Date:</strong> <span style="float: right; opacity: 0.9;">${new Date().toLocaleDateString()}</span>
                </p>
                <p style="margin: 15px 0; font-size: 1rem; border-bottom: 1px dashed #444; padding-bottom: 8px;">
                    <strong>Movie:</strong> <span style="float: right; opacity: 0.9;">${
                      showTimeData.movie.title
                    }</span>
                </p>
                <p style="margin: 15px 0; font-size: 1rem; border-bottom: 1px dashed #444; padding-bottom: 8px;">
                    <strong>Tickets:</strong> <span style="float: right; opacity: 0.9;">${ticketCount}</span>
                </p>
                <p style="margin: 15px 0; font-size: 1rem; border-bottom: 1px dashed #444; padding-bottom: 8px;">
                    <strong>Show Time:</strong> <span style="float: right; opacity: 0.9;">${selectedTime}</span>
                </p>
                <p style="margin: 15px 0; font-size: 1rem; border-bottom: 1px dashed #444; padding-bottom: 8px;">
                    <strong>Show Date:</strong> <span style="float: right; opacity: 0.9;">${selectedDate}</span>
                </p>
                <p style="margin: 15px 0; font-size: 1rem; border-bottom: 1px dashed #444; padding-bottom: 8px;">
                    <strong>Cinema:</strong> <span style="float: right; opacity: 0.9;">${selectedCinema}</span>
                </p>
                <p style="margin: 15px 0; font-size: 1rem; border-bottom: 1px dashed #444; padding-bottom: 8px;">
                    <strong>Seats:</strong> <span style="float: right; opacity: 0.9;">${selectedSeats.join(
                      ", "
                    )}</span>
                </p>
                 <p style="margin: 15px 0; font-size: 1rem; border-bottom: 1px dashed #444; padding-bottom: 8px;">
                    <strong>Payment Status:</strong> <span style="float: right; opacity: 0.9;">Pending</span>
                </p>
            </div>

            <!-- Ticket Footer -->
            <div style="background: #0f3460; color: #fff; text-align: center; padding: 10px; position: relative;">
                <p style="margin: 5px 0; font-size: 0.9rem; opacity: 0.8;">Enjoy Your Movie!</p>
                <p style="margin: 0; font-size: 0.9rem; opacity: 0.8;">www.cinemax.com</p>
                <!-- Decorative Dotted Dividers -->
                <div style="position: absolute; top: -10px; left: 50%; transform: translateX(-50%); background: #222; border: 4px solid #0f3460; border-radius: 50%; width: 20px; height: 20px;"></div>
                <div style="position: absolute; bottom: -10px; left: 50%; transform: translateX(-50%); background: #222; border: 4px solid #0f3460; border-radius: 50%; width: 20px; height: 20px;"></div>
            </div>

        </div>

    </body>
    </html> `;

    const user = await User.findById(userId);

    const [savedBooking] = await Promise.all([
      newBooking.save(), // Save the booking in parallel
      sendEmailBooking(user.email, "Booking Details", emailContent),
    ]);

    res.status(201).json({
      message: "Booking created successfully.",
      booking: savedBooking,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error." });
  }
};

// Checkout session for stripe
exports.createCheckoutSession = async (req, res) => {
  try {
  } catch (error) {
    console.error("Error creating Stripe checkout session:", error.message);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};
