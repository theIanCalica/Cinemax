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
  Modal,
} from "@mui/material";
import Hero from "../../components/customer/Hero/Hero";
import client from "../../Utils/client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { formatDate, notifyError } from "../../Utils/helpers";

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
  const [timesByDate, setTimesByDate] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCinema, setSelectedCinema] = useState(""); // Cinema selection state

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

  const handleTimeChange = (event) => setSelectedTime(event.target.value);

  const handleSubmit = () => {
    if (!selectedDate) {
      notifyError("Please select a date.");
      return;
    }

    if (!selectedTime) {
      notifyError("Please select a time.");
      return;
    }

    if (selectedSeats.length !== ticketCount) {
      notifyError("Please select the correct number of seats.");
      return;
    }

    setError("");
    alert(
      `Booking confirmed for ${ticketCount} tickets on ${selectedDate} at ${selectedTime}!`
    );
  };

  // useEffect(() => {
  //   const fetchShowtimeDetails = async () => {
  //     if (movie && movie._id) {
  //       try {
  //         const id = movie._id;
  //         const response = await client.get(`/showtimes/${id}`);

  //         const showtimeData = response.data.showtime;
  //         if (showtimeData && showtimeData.length > 0) {
  //           // Extract available dates and times
  //           const dates = [];
  //           const timesByDate = {};

  //           showtimeData.forEach(({ showtimes }) => {
  //             showtimes.forEach(({ date, times }) => {
  //               const formattedDate = formatDate(
  //                 new Date(date).toISOString().split("T")[0]
  //               );

  //               if (!dates.includes(formattedDate)) {
  //                 dates.push(formattedDate);
  //               }

  //               timesByDate[formattedDate] = times.map(
  //                 (timeSlot) => timeSlot.time
  //               );
  //             });
  //           });

  //           setAvailableDates(dates);
  //           setAvailableTimes(
  //             selectedDate ? timesByDate[selectedDate] || [] : []
  //           );
  //         }
  //       } catch (error) {
  //         console.error("Error fetching showtime details:", error);
  //       }
  //     }
  //   };

  //   fetchShowtimeDetails();
  // }, [movie, selectedDate]); // Re-fetch available times when selectedDate changes

  const handleCinemaChange = async (event) => {
    const selectedCinema = event.target.value;
    console.log(selectedCinema);

    client
      .get(`/showtimes/${movie._id}`, {
        data: { theater: selectedCinema },
      })
      .then((response) => {
        console.log(response.data);
      });
    setSelectedCinema(selectedCinema);
    setSelectedSeats([]);
  };

  const handleDateChange = (event) => {
    const selected = event.target.value;
    setSelectedDate(selected);
    setAvailableTimes(timesByDate[selected] || []);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Hero type="Book" />
      <Box sx={{ padding: 4 }}>
        {movie ? (
          <>
            {/* Movie Information */}
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}
            >
              {/* Left Side: Movie Details */}
              <Box
                sx={{
                  flex: 1,
                  pr: 2,
                  boxShadow: 2,
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                }}
              >
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ fontWeight: 700, fontSize: "1.8rem", color: "#333" }}
                >
                  {movie.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "gray", fontSize: "1rem" }}
                >
                  Genre:{" "}
                  {Array.isArray(movie.genre) && movie.genre.length > 0
                    ? movie.genre.map((g) => g.name).join(", ")
                    : "N/A"}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "gray", fontSize: "1rem" }}
                >
                  Duration: {movie.duration} minutes
                </Typography>
                <Box
                  sx={{
                    my: 2,
                    width: "100%",
                    maxWidth: "450px",
                    borderRadius: "8px",
                  }}
                >
                  <Swiper
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    spaceBetween={10}
                    slidesPerView={1}
                    style={{
                      borderRadius: "8px",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {movie.images.map((image, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={image.url}
                          alt={`${movie.title} - Image ${index + 1}`}
                          style={{
                            width: "100%",
                            borderRadius: "8px",
                            objectFit: "cover",
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                          }}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Box>
              </Box>

              {/* Right Side: Movie Description */}
              <Box
                sx={{
                  flex: 1,
                  pl: 2,
                  borderLeft: "1px solid #ddd",
                  paddingLeft: 2,
                  backgroundColor: "#f9f9f9",
                  boxShadow: 2,
                  borderRadius: "8px",
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: 600, color: "#333" }}
                >
                  Details
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mt: 2, fontSize: "1rem", fontWeight: 500 }}
                >
                  Director:{" "}
                  {movie.directorName
                    ? movie.directorName.split(",").join(" · ")
                    : "No director information available."}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mt: 2, fontSize: "1rem", fontWeight: 500 }}
                >
                  Producer:{" "}
                  {movie.producerName
                    ? movie.producerName.split(",").join(" · ")
                    : "No producer information available."}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mt: 2, fontSize: "1rem", fontWeight: 500 }}
                >
                  Writer:{" "}
                  {movie.writerName
                    ? movie.writerName.split(",").join(" · ")
                    : "No writer information available."}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mt: 2, fontSize: "1rem", fontWeight: 500 }}
                >
                  Main Cast:{" "}
                  {movie.mainCast
                    ? movie.mainCast.split(",").join(" · ")
                    : "No main cast information available."}
                </Typography>

                {movie.trailer && (
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      mt: 3,
                      fontSize: "1rem",
                      fontWeight: 600,
                      textTransform: "none",
                      padding: "12px 24px",
                      "&:hover": {
                        backgroundColor: "#0073e6",
                      },
                    }}
                    onClick={handleOpenModal}
                  >
                    Watch Trailer
                  </Button>
                )}

                {/* Modal for Trailer */}
                <Modal
                  open={isModalOpen}
                  onClose={handleCloseModal}
                  aria-labelledby="trailer-modal-title"
                  aria-describedby="trailer-modal-description"
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      bgcolor: "background.paper",
                      boxShadow: 24,
                      p: 4,
                      width: "80%", // Increased width
                      height: "80%", // Increased height
                      maxWidth: "1200px", // Maximum width limit
                      maxHeight: "800px", // Maximum height limit
                      borderRadius: "8px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between", // Ensures the button stays at the bottom
                    }}
                  >
                    <Typography
                      id="trailer-modal-title"
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: 600 }}
                    >
                      Trailer
                    </Typography>
                    <Box sx={{ flex: 1, mb: 2 }}>
                      {" "}
                      {/* This will make sure the iframe takes up available space */}
                      <iframe
                        width="100%"
                        height="100%" // Makes the iframe fill available space
                        src={movie.trailer.replace("watch?v=", "embed/")}
                        title="YouTube Trailer"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{
                          borderRadius: "8px",
                          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                        }}
                      />
                    </Box>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleCloseModal}
                      sx={{
                        mt: 2,
                        fontSize: "1rem",
                        padding: "8px 16px",
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "#f44336",
                        },
                      }}
                    >
                      Close
                    </Button>
                  </Box>
                </Modal>
              </Box>
            </Box>

            {/* Date and Time Selection */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6">Select Date and Time:</Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <FormControl
                    sx={{ minWidth: 200, height: "56px" }}
                    size="small"
                  >
                    <InputLabel>Cinema</InputLabel>
                    <Select
                      value={selectedCinema} // Set the selected cinema value
                      onChange={handleCinemaChange}
                      label="Date"
                      sx={{ height: "100%" }}
                    >
                      <MenuItem value="Cinema 1">Cinema 1</MenuItem>
                      <MenuItem value="Cinema 2">Cinema 2</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl
                    sx={{ minWidth: 200, height: "56px" }}
                    size="small"
                  >
                    <InputLabel>Date</InputLabel>
                    <Select
                      value={selectedDate}
                      onChange={handleDateChange}
                      label="Date"
                      sx={{ height: "100%" }}
                    >
                      {availableDates.map((date) => (
                        <MenuItem key={date} value={date}>
                          {date}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl
                    sx={{ minWidth: 200, height: "56px" }}
                    size="small"
                  >
                    <InputLabel>Time</InputLabel>
                    <Select
                      value={selectedTime}
                      onChange={handleTimeChange}
                      label="Time"
                      sx={{ height: "100%" }}
                    >
                      {availableTimes.map((time) => (
                        <MenuItem key={time} value={time}>
                          {time}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  <Typography variant="h6">
                    Select Number of Tickets:
                  </Typography>
                  <TextField
                    type="number"
                    value={ticketCount}
                    onChange={handleTicketChange}
                    inputProps={{ min: 1, max: 10 }}
                    sx={{
                      width: "200px",
                      height: "56px",
                      "& input": {
                        height: "100%",
                        padding: "10px 14px",
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6">Select Your Seats:</Typography>

              {/* Screen Visual */}
              <Box
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  textAlign: "center",
                  py: 1,
                  borderRadius: "4px",
                  mb: 2,
                }}
              >
                Screen
              </Box>

              {/* Seat Selection Grid */}
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
