import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import {
  Movie,
  MovieCreation,
  Twitter,
  Facebook,
  Instagram,
} from "@mui/icons-material";
import Navbar from "../../../components/customer/Navbar/Navbar";
import Hero from "../../../components/customer/Hero/Hero";

const AboutPage = () => {
  return (
    <Container>
      <Navbar />
      <Hero type="About" />

      <Divider sx={{ my: 4 }} />

      {/* About Section */}
      <Grid container spacing={4} alignItems="center" sx={{ mb: 6 }}>
        <Grid item xs={12} md={6}>
          <Box sx={{ position: "relative" }}>
            <Box
              component="img"
              src="/images/about-us.jpg"
              alt="About Us"
              sx={{ width: "100%", borderRadius: 2 }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 16,
                left: 16,
                bgcolor: "white",
                p: 2,
                borderRadius: "50%",
                textAlign: "center",
              }}
            >
              <Typography variant="h4" fontWeight="bold">
                20
              </Typography>
              <Typography variant="body2">Years of Producing</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Movie fontSize="large" sx={{ color: "#F97316" }} />
            <Typography variant="h6">Get To Know</Typography>
          </Box>
          <Typography variant="h4" gutterBottom>
            Proving the Best Film Services
          </Typography>
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eiusmod
            tempor incididunt labore dolore magna aliqua. Enim ad minim veniam,
            quis nostrud exercitation.
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
            <MovieCreation fontSize="large" sx={{ color: "#F97316" }} />
            <Typography>
              <strong>6 Years of Innovation</strong>
            </Typography>
          </Box>
          <Typography paragraph>
            We’re here to look after you from start to finish.
          </Typography>
          <Button variant="contained" size="large" color="primary">
            Discover More
          </Button>
        </Grid>
      </Grid>

      {/* Partners Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Our Partners
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[1, 2, 3, 4, 5].map((num) => (
            <Grid item xs={6} sm={4} md={2} key={num}>
              <Box sx={{ textAlign: "center" }}>
                <Box
                  component="img"
                  src={`/images/logo-${num}.png`}
                  alt={`Company Logo ${num}`}
                  sx={{ width: 80, height: "auto", mb: 1 }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Team Section */}
      <Box>
        <Typography variant="h4" align="center" gutterBottom>
          Professional Film Crew
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[
            {
              name: "Kevin Martin",
              role: "Film Director",
              img: "/images/kevin.jpeg",
            },
            {
              name: "Jessica Brown",
              role: "Film Director",
              img: "/images/jessica.jpg",
            },
            {
              name: "Mike Hardson",
              role: "Film Director",
              img: "/images/mike.webp",
            },
          ].map((member, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Box
                sx={{
                  textAlign: "center",
                  p: 2,
                  borderRadius: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "#F97316",
                    transform: "translateY(-5px)",
                    boxShadow: 3,
                  },
                }}
              >
                <Box
                  component="img"
                  src={member.img}
                  alt={member.name}
                  sx={{
                    width: 350,
                    height: 350,
                    borderRadius: "50%",
                    objectFit: "cover",
                    mb: 2,
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    color: "#F97316",
                    transition: "color 0.3s ease",
                    "&:hover": { color: "red" },
                  }}
                >
                  {member.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {member.role}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                    mt: 1,
                  }}
                >
                  <Twitter sx={{ color: "#1DA1F2" }} />
                  <Facebook sx={{ color: "#1877F2" }} />
                  <Instagram sx={{ color: "#E4405F" }} />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default AboutPage;
