import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Divider,
  Container,
} from "@mui/material";
import { styled } from "@mui/system";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import "react-toastify/dist/ReactToastify.css";
import {
  Navigation,
  Scrollbar,
  A11y,
  Autoplay,
  Pagination,
} from "swiper/modules";

import Navbar from "../../../components/customer/Navbar/Navbar";
import Widget from "../../../components/customer/Widgets/Widgets";
import Footer from "../../../components/customer/Footer/Footer";
import NowPlaying from "../../../components/customer/carousels/NowPlaying/NowPlaying";

const SlideContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  height: "100vh",
  width: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  textAlign: "center",
}));

const Overlay = styled(Box)({
  position: "absolute",
  inset: 0,
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  zIndex: 1,
});

const SlideContent = styled(Box)({
  position: "relative",
  zIndex: 2,
  color: "white",
});

const ActionButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  padding: theme.spacing(1.5, 4),
  fontSize: "1rem",
  borderRadius: theme.shape.borderRadius,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const Index = () => {
  return (
    <Box>
      <Navbar />
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        modules={[Navigation, Scrollbar, A11y, Autoplay, Pagination]}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop
        className="swiper-container"
      >
        {[
          {
            image: "/images/dp.webp",
            category: "Action Movie",
            title: "Deadpool & Wolverine",
            description:
              "Written and Directed by Ian Calica / Philippines 2024",
          },
          {
            image: "/images/IO.jpg",
            category: "Children's Film",
            title: "Inside Out Part 2",
            description:
              "Written and Directed by Ian Calica / Philippines 2024",
          },
          {
            image: "/images/min.jpg",
            category: "Children's Film",
            title: "Despicable Me Part 4",
            description:
              "Written and Directed by Ian Calica / Philippines 2024",
          },
        ].map((slide, index) => (
          <SwiperSlide key={index}>
            <SlideContainer>
              <img
                src={slide.image}
                alt={slide.title}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <Overlay />
              <SlideContent>
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: "'Pacifico', serif",
                    fontWeight: "600",
                    color: "darkorange",
                  }}
                  gutterBottom
                >
                  {slide.category}
                </Typography>
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    fontFamily: "'Pacifico', sans-serif",
                    fontWeight: "bold",
                    color: "darkorange",
                  }}
                  gutterBottom
                >
                  {slide.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "'Roboto', sans-serif",
                    fontWeight: "400",
                    color: "white",
                  }}
                >
                  {slide.description}
                </Typography>
                <Box mt={3}>
                  <ActionButton
                    variant="contained"
                    sx={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: "600",
                      color: "white",
                      backgroundColor: "darkorange",
                      "&:hover": {
                        backgroundColor: "#cc5500", // Darker orange for hover
                      },
                    }}
                  >
                    More Info
                  </ActionButton>
                  <ActionButton
                    variant="outlined"
                    sx={{
                      fontFamily: "'Lato', sans-serif",
                      fontWeight: "500",
                      color: "darkorange",
                      borderColor: "darkorange",
                      "&:hover": {
                        backgroundColor: "rgba(255, 140, 0, 0.1)", // Light orange tint
                      },
                    }}
                  >
                    Buy Ticket
                  </ActionButton>
                </Box>
              </SlideContent>
            </SlideContainer>
          </SwiperSlide>
        ))}
      </Swiper>

      <Divider variant="middle" sx={{ my: 4 }} />

      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Widget type="Festival" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Widget type="filmAward" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Widget type="unmissable" />
          </Grid>
        </Grid>

        <Box mt={6}>
          <NowPlaying />
        </Box>
      </Container>
    </Box>
  );
};

export default Index;
