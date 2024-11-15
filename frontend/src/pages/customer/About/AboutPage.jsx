import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  Movie,
  MovieCreation,
  Twitter,
  Facebook,
  Instagram,
} from "@mui/icons-material";
import Navbar from "../../../components/customer/Navbar/Navbar";
import Hero from "../../../components/customer/Hero/Hero";

// Styled components for customization
const StyledIconTitle = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "16px",
});

const PartnerLogo = styled(Box)({
  textAlign: "center",
  "& img": { width: "80px", height: "auto", marginBottom: "8px" },
});

const TeamCard = styled(Box)({
  textAlign: "center",
  "& img": { width: "100%", borderRadius: "8px", marginBottom: "16px" },
  "& h3": { marginTop: "8px" },
});

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
            <img
              src="/images/about-us.jpg"
              alt="About Us"
              style={{ width: "100%", borderRadius: "8px" }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: "16px",
                left: "16px",
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
          <StyledIconTitle>
            <Movie fontSize="large" sx={{ color: "#F97316" }} />
            <Typography variant="h6">Get To Know</Typography>
          </StyledIconTitle>
          <Typography variant="h4" gutterBottom>
            Proving the Best Film Services
          </Typography>
          <Typography paragraph>
            Lorem ipsum dolor sit amet consectetur adipiscing elit sed eiusmod
            tempor incididunt labore dolore magna aliquaenim ad minim. Sed risus
            commodo ornare felis non, eleifend molestie metus pharetra eleifend.
          </Typography>
          <StyledIconTitle>
            <MovieCreation fontSize="large" sx={{ color: "#F97316" }} />
            <Typography>
              <strong>6 Years of Innovation</strong>
            </Typography>
          </StyledIconTitle>
          <Typography paragraph>
            We’re here to look even you from start to finish.
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
              <PartnerLogo>
                <img
                  src={`/images/logo-${num}.png`}
                  alt={`Company Logo ${num}`}
                />
              </PartnerLogo>
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
              <TeamCard
                sx={{
                  textAlign: "center",
                  "&:hover": {
                    backgroundColor: "#F97316",
                    transition:
                      "background-color 0.3s ease, transform 0.3s ease",
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
                  },
                  padding: 2,
                  borderRadius: 2,
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
                    marginBottom: 2,
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                />
                <Typography
                  variant="h6"
                  className="text-[#F97316] transition-colors duration-300 hover:text-red"
                >
                  {member.name}
                </Typography>

                <Typography
                  variant="body2"
                  className="text-gray-200 transition-colors duration-300"
                >
                  {member.role}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                    mt: 1,
                    transition: "opacity 0.3s ease",
                    opacity: 0,
                    "&:hover": {
                      opacity: 1,
                    },
                  }}
                >
                  <Twitter sx={{ color: "#1DA1F2" }} />
                  <Facebook sx={{ color: "#1877F2" }} />
                  <Instagram sx={{ color: "#E4405F" }} />
                </Box>
              </TeamCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default AboutPage;
