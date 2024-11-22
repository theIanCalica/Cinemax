import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  FormHelperText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Hero from "../../components/customer/Hero/Hero";
import client from "../../Utils/client";

const Book = () => {
  const location = useLocation();
  const { movie } = location.state || {}; // Retrieve the passed movie object

  const totalRows = 10; // Total rows of seats
  const seatsPerRow = 10; // Seats per row
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ticketCount, setTicketCount] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [error, setError] = useState("");
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);

  const handleSeatClick = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      if (selectedSeats.length < ticketCount) {
        setSelectedSeats([...selectedSeats, seatNumber]);
        setError(""); // Clear error when seat is selected correctly
      } else {
        setError("You can only select as many seats as the number of tickets.");
      }
    }
  };

  const handleTicketChange = (event) => {
    const count = parseInt(event.target.value, 10) || 0;
    setTicketCount(count);
    setSelectedSeats([]); // Reset seat selection when ticket count changes
    setError("");
  };

  const handleDateChange = (event) => setSelectedDate(event.target.value);
  const handleTimeChange = (event) => setSelectedTime(event.target.value);

  const handleSubmit = () => {
    if (!selectedDate) {
      setError("Please select a date.");
      return;
    }

    if (!selectedTime) {
      setError("Please select a time.");
      return;
    }

    if (selectedSeats.length !== ticketCount) {
      setError("Please select the correct number of seats.");
      return;
    }

    setError("");
    alert(
      `Booking confirmed for ${ticketCount} tickets on ${selectedDate} at ${selectedTime}!`
    );
    // Perform further actions, e.g., API call
  };

  useEffect(() => {
    const fetchShowtimeDetails = async () => {
      if (movie && movie._id) {
        try {
          const id = movie._id;
          const response = await client.get(`/showtimes/${id}`);
          const { dateRange, showtimes } = response.data;

          // Extract dates and times from the API response
          const dates = [];
          let times = [];

          if (dateRange) {
            const { start, end } = dateRange;
            // Generate dates within the range (assuming start and end are in a format like YYYY-MM-DD)
            const startDate = new Date(start);
            const endDate = new Date(end);
            let currentDate = startDate;

            while (currentDate <= endDate) {
              dates.push(currentDate.toISOString().split("T")[0]);
              currentDate.setDate(currentDate.getDate() + 1);
            }
          }

          if (showtimes) {
            times = showtimes.map((showtime) => ({
              time: showtime.time,
              availableSeats: showtime.availableSeats,
            }));
          }

          setAvailableDates(dates || []);
          setAvailableTimes(times || []);
        } catch (error) {
          console.error("Error fetching showtime details:", error);
        }
      }
    };

    fetchShowtimeDetails();
  }, [movie]);

  return (
    <>
      <Hero type="Book" />
      <Box sx={{ padding: 4 }}>
        {movie ? (
          <>
            {/* Movie Information */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" gutterBottom>
                {movie.title}
              </Typography>
              <Typography variant="body1">Genre: {movie.genre}</Typography>
              <Typography variant="body1">
                Duration: {movie.duration} minutes
              </Typography>
              <Box sx={{ my: 2 }}>
                <img
                  src={movie.images[0]?.url}
                  alt={movie.title}
                  style={{ width: "300px", borderRadius: "8px" }}
                />
              </Box>
            </Box>

            {/* Date and Time Selection */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6">Select Date and Time:</Typography>
              <FormControl sx={{ mr: 2, minWidth: 200 }} size="small">
                <InputLabel>Date</InputLabel>
                <Select
                  value={selectedDate}
                  onChange={handleDateChange}
                  label="Date"
                >
                  {availableDates.map((date) => (
                    <MenuItem key={date} value={date}>
                      {date}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ minWidth: 200 }} size="small">
                <InputLabel>Time</InputLabel>
                <Select
                  value={selectedTime}
                  onChange={handleTimeChange}
                  label="Time"
                >
                  {availableTimes.map((time) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Ticket Count and Seat Selection */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6">Select Number of Tickets:</Typography>
              <TextField
                type="number"
                value={ticketCount}
                onChange={handleTicketChange}
                inputProps={{ min: 1, max: 10 }}
                sx={{ width: "100px", mr: 2 }}
              />
              <FormHelperText>
                You can book up to 10 tickets at a time.
              </FormHelperText>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6">Select Your Seats:</Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {Array.from({ length: totalRows }).map((_, rowIndex) => (
                  <Grid
                    container
                    spacing={1}
                    key={rowIndex}
                    justifyContent="center"
                  >
                    {Array.from({ length: seatsPerRow }).map((_, colIndex) => {
                      const seatNumber = rowIndex * seatsPerRow + colIndex + 1;
                      const isAisle = colIndex === 4 || colIndex === 5; // Create an aisle between columns 4 and 5
                      const isSelected = selectedSeats.includes(seatNumber);

                      return isAisle ? (
                        <Grid item xs={0.5} key={`aisle-${seatNumber}`} />
                      ) : (
                        <Grid item xs={1} key={seatNumber}>
                          <Button
                            variant="contained"
                            size="small"
                            sx={{
                              backgroundColor: isSelected ? "green" : "gray",
                              color: "white",
                              minWidth: "40px",
                              minHeight: "40px",
                              padding: "5px",
                              borderRadius: "4px",
                            }}
                            onClick={() => handleSeatClick(seatNumber)}
                          >
                            {seatNumber}
                          </Button>
                        </Grid>
                      );
                    })}
                  </Grid>
                ))}
              </Box>
            </Box>

            {error && (
              <Typography color="error" sx={{ my: 2 }}>
                {error}
              </Typography>
            )}

            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ mt: 2 }}
            >
              Confirm Booking
            </Button>
          </>
        ) : (
          <Typography>
            No movie selected. Please go back and select a movie.
          </Typography>
        )}
      </Box>
    </>
  );
};

export default Book;
