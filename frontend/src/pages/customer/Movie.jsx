import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  CardMedia,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import client from "../../Utils/client";
import { getUser, notifyError } from "../../Utils/helpers";
import "./movie.scss"; // Custom styles for hover effects
import Hero from "../../components/customer/Hero/Hero";

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const user = getUser();
  const navigate = useNavigate(); // Initialize navigate

  const fetchMovies = async () => {
    try {
      const response = await client.get("/movies");
      setMovies(response.data);
      console.log(response.data);
    } catch (error) {
      notifyError(error?.response?.data?.message || "Failed to fetch movies");
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleBookTicket = (movie) => {
    if (user) {
      // If user is logged in, redirect to the book page with the movie object
      navigate("/book", { state: { movie } });
    } else {
      // If user is not logged in, redirect to login page
      navigate("/login");
    }
  };

  return (
    <>
      <Hero type="Movie" />
      <Box sx={{ padding: "20px" }}>
        <Grid container spacing={3} justifyContent="center">
          {movies.map((movie) => (
            <Grid item xs={12} sm={6} md={3} key={movie.id}>
              <Card
                sx={{
                  position: "relative",
                  "&:hover": {
                    boxShadow: 10,
                    transform: "scale(1.05)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={movie.images[0].url} // Get the first image URL
                  alt={movie.title}
                />
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6" component="h2">
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {movie.genre && movie.genre.length > 0
                      ? movie.genre.map((g) => g.name).join(", ") // Extract and join genre names
                      : "N/A"}{" "}
                    /{" "}
                    {movie.duration
                      ? `${movie.duration} Mins`
                      : "Duration not available"}
                  </Typography>

                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ marginTop: "10px" }}
                    onClick={() => handleBookTicket(movie)} // Properly pass movie
                  >
                    Get Ticket
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Movie;
