import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Typography, Box, Grid, Paper, Button, Link } from "@mui/material";
import {
  AccountCircle,
  ShoppingCart,
  Event,
  Download,
} from "@mui/icons-material";
import BarChart from "../../components/admin/Chart/BarChart";
import LineChart from "../../components/admin/Chart/LineChart";
import PieChart from "../../components/admin/Chart/PieChart";
import Map from "../../components/admin/Map";
import ContactWidget from "../../components/admin/ContactWidget";
import TopMovies from "../../components/admin/TopMovies";
import { notifySuccess } from "../../Utils/helpers";
import client from "../../Utils/client";

const Home = () => {
  const user = useSelector((state) => state.user.user);
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);

  const getNumberofUsers = async () => {
    try {
      const response = await client.get(`/users/count`, {
        withCredentials: true,
      });
      setUserCount(response.data.count);
    } catch (err) {
      console.error("Error fetching user count:", err);
    }
  };

  const getNumberOfOrder = async () => {
    try {
      const response = await client.get(`/orders/count-order`, {
        withCredentials: true,
      });
      setOrderCount(response.data.count);
    } catch (err) {
      console.error("Error fetching order count:", err);
    }
  };

  const getNumberOfBooking = async () => {
    try {
      const response = await client.get(`/bookings/count`, {
        withCredentials: true,
      });
      setBookingCount(response.data.count);
    } catch (err) {
      console.error("Error fetching booking count:", err);
    }
  };

  useEffect(() => {
    getNumberofUsers();
    getNumberOfOrder();
    // getNumberOfBooking();

    if (loggedIn && user && user.role === "admin") {
      notifySuccess("Successfully logged in");
    }
  }, [loggedIn, user]);

  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Welcome to the admin dashboard. Here you can manage all aspects of your
        application.
      </Typography>

      <Grid container spacing={3} mt={2}>
        {/* Widget Cards */}
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
            <AccountCircle color="primary" fontSize="large" />
            <Typography variant="h6">Users</Typography>
            <Typography variant="h4">{userCount}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
            <ShoppingCart color="secondary" fontSize="large" />
            <Typography variant="h6">Orders</Typography>
            <Typography variant="h4">{orderCount}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
            <Event color="success" fontSize="large" />
            <Typography variant="h6">Bookings</Typography>
            <Typography variant="h4">{bookingCount}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Charts and Reports */}
      <Box mt={4}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <BarChart />
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
          >
            <Box display="flex" gap={2}>
              <Link href="#" underline="hover" color="primary">
                View Orders
              </Link>
              <Link href="#" underline="hover" color="primary">
                View Bookings
              </Link>
            </Box>
            <Button
              variant="outlined"
              color="success"
              startIcon={<Download />}
              sx={{
                "&:hover": { backgroundColor: "green", color: "white" },
              }}
            >
              Download Report
            </Button>
          </Box>
        </Paper>
      </Box>

      {/* Additional Widgets */}
      <Grid container spacing={3} mt={4}>
        <Grid item xs={12} sm={4}>
          <PieChart />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TopMovies />
        </Grid>
        <Grid item xs={12} sm={4}>
          <ContactWidget />
        </Grid>
      </Grid>

      {/* Map */}
      <Box mt={4}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Map />
        </Paper>
      </Box>
      <Box mt={4}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <LineChart />
        </Paper>
      </Box>
    </Box>
  );
};

export default Home;
