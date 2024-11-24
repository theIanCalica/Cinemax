import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, Container } from "@mui/material";

const Hero = ({ type }) => {
  // Define data for each type
  const types = {
    Contact: {
      title: "Get in Touch",
      subtitle: "Contact Us",
      image: "/images/about.jpg",
    },
    About: {
      title: "Learn About Us",
      subtitle: "About",
      image: "/images/about.jpg",
    },
    FoodCategories: {
      title: "Food Categories",
      subtitle: "Food Categories",
      image: "/images/food.png",
    },
    Foods: {
      title: "Foods",
      subtitle: "Foods",
      image: "/images/food.png",
    },
    Cart: {
      title: "My Cart",
      subtitle: "Cart",
      image: "/images/food.png",
    },
    Order: {
      title: "My Order",
      subtitle: "Order",
      image: "/images/food.png",
    },
    Movie: {
      title: "Movies now playing",
      subtitle: "Movies",
      image:
        "https://img.freepik.com/free-vector/film-strp-3d-background-with-roll-projector_1017-36680.jpg",
    },
    Book: {
      title: "Book a ticket",
      subtitle: "Booking",
      image:
        "https://img.freepik.com/free-vector/film-strp-3d-background-with-roll-projector_1017-36680.jpg",
    },
    Profile: {
      title: "My Profile",
      subtitle: "Profile",
      image: "/images/about.jpg",
    },
  };

  // Fallback for invalid or missing type
  const defaultData = {
    title: "Welcome",
    subtitle: "Home",
    image: "/images/default.jpg",
  };

  // Resolve data for the given type
  const data = types[type] || defaultData;

  return (
    <Box sx={{ position: "relative" }}>
      {/* Background Image */}
      <Box
        sx={{
          width: "100%",
          height: 600,
          backgroundImage: `url(${data.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "black",
            opacity: 0.5,
          }}
        />
      </Box>

      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        }}
      />

      {/* Text Content */}
      <Container
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "white",
        }}
      >
        <Typography variant="body1" sx={{ fontFamily: "sans-serif" }}>
          Home &gt; <span style={{ fontWeight: "bold" }}>{data.subtitle}</span>
        </Typography>
        <Typography
          variant="h1"
          sx={{ fontFamily: "serif", fontWeight: "bold", fontSize: "3rem" }}
        >
          {data.title}
        </Typography>
      </Container>
    </Box>
  );
};

// Prop validation
Hero.propTypes = {
  type: PropTypes.string,
};

export default Hero;
