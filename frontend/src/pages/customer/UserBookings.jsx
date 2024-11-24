import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Grid,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import client from "../../Utils/client";
import { getUser, notifyError } from "../../Utils/helpers";
import Hero from "../../components/customer/Hero/Hero";

const UserBookings = () => {
  const user = getUser();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchBookings = async () => {
    try {
      const response = await client.get(`/bookings/${user._id}/userBookings`);
      if (response.status === 200) {
        setBookings(response.data.bookings);
        console.log(response.data.bookings);
      }
    } catch (error) {
      notifyError("Error fetching bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "50vh" }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <>
      <Hero type="Order" />
      <Grid container justifyContent="center" sx={{ p: 2 }}>
        <Grid item xs={12} lg={10}>
          {/* Table View (Visible on Large Screens) */}
          {!isMobile && (
            <TableContainer
              component={Paper}
              sx={{ overflowX: "auto", borderRadius: 2 }}
            >
              <Typography
                variant="h6"
                sx={{ p: 2, textAlign: "center", fontWeight: "bold" }}
              >
                User Bookings
              </Typography>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Booking ID</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Movie</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Ticket Count</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Theater</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Date</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Time</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bookings.length > 0 ? (
                    bookings.map((booking) => (
                      <TableRow key={booking._id}>
                        <TableCell>{booking._id}</TableCell>
                        <TableCell>
                          {booking.showtime.movie.title}
                        </TableCell>{" "}
                        {/* Access movie title */}
                        <TableCell>{booking.ticketCount}</TableCell>
                        <TableCell>{booking.cinema}</TableCell>
                        <TableCell>{booking.selectedDate}</TableCell>
                        <TableCell>{booking.selectedTime}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        No bookings found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* Mobile Layout (Card View) */}
          {isMobile && bookings.length > 0 && (
            <Box sx={{ mt: 4 }}>
              {bookings.map((booking) => (
                <Box
                  key={booking._id}
                  sx={{
                    p: 2,
                    mb: 2,
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: theme.palette.background.paper,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Booking ID: {booking._id}
                  </Typography>
                  <Typography variant="body1">
                    Movie: {booking.showtime}
                  </Typography>
                  <Typography variant="body1">
                    Ticket Count: {booking.ticketCount}
                  </Typography>
                  <Typography variant="body1">
                    Theater: {booking.cinema}
                  </Typography>
                  <Typography variant="body1">
                    Date: {booking.selectedDate}
                  </Typography>
                  <Typography variant="body1">
                    Time: {booking.selectedTime}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default UserBookings;
