import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Button, Typography, Box, Paper } from "@mui/material";

const NowPlaying = () => {
  return (
    <Box
      textAlign="center"
      sx={{
        padding: 4,
        backgroundColor: "transparent", // Set the background to transparent
        color: "#fff", // Keep text color white for contrast
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          color: "#000000", // Dark orange color for subheading
          marginBottom: 2,
        }}
      >
        Watch New Movies
      </Typography>
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{
          marginBottom: 4,
          color: "#000000", // Dark orange color for heading
        }}
      >
        Movies Now Playing
      </Typography>

      <Swiper
        pagination={true}
        modules={[Pagination]}
        className="mySwiper"
        slidesPerView={4}
        spaceBetween={30}
      >
        <SwiperSlide>
          <Paper
            elevation={5}
            sx={{
              padding: 2,
              borderRadius: 3,
              backgroundColor: "transparent", // Transparent background for the card
              boxShadow: "none", // Remove the shadow for a cleaner look
            }}
          >
            <img
              src="/images/IO.jpg"
              alt="The Fifth Day"
              style={{
                width: "80%", // Decrease the width
                height: "auto",
                aspectRatio: "2/3", // Portrait-like aspect ratio
                objectFit: "cover", // Ensure image fits within the container without distortion
                borderRadius: 8,
                margin: "0 auto", // Center the image horizontally
              }}
            />
            <Box sx={{ marginTop: 2 }}>
              <Typography
                variant="body2"
                sx={{
                  color: "#000000", // Dark orange for genre
                  marginBottom: 1,
                }}
              >
                Comedy / 180 Mins
              </Typography>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  marginBottom: 1,
                  color: "#000000", // White color for movie title
                }}
              >
                The Fifth Day
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#ff6f00", // Dark orange button
                  color: "#fff", // White text on button
                  width: "100%",
                  ":hover": {
                    backgroundColor: "#e65c00", // Slightly darker orange on hover
                  },
                }}
              >
                Get Ticket
              </Button>
            </Box>
          </Paper>
        </SwiperSlide>

        <SwiperSlide>
          <Paper
            elevation={5}
            sx={{
              padding: 2,
              borderRadius: 3,
              backgroundColor: "transparent", // Transparent background for the card
              boxShadow: "none", // Remove the shadow for a cleaner look
            }}
          >
            <img
              src="/images/min.jpg"
              alt="Another Movie"
              style={{
                width: "80%", // Decrease the width
                height: "auto",
                aspectRatio: "2/3",
                objectFit: "cover",
                borderRadius: 8,
                margin: "0 auto",
              }}
            />
            <Box sx={{ marginTop: 2 }}>
              <Typography
                variant="body2"
                sx={{
                  color: "#000000",
                  marginBottom: 1,
                }}
              >
                Drama / 120 Mins
              </Typography>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  marginBottom: 1,
                  color: "#000000",
                }}
              >
                Another Movie
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#ff6f00",
                  color: "#fff",
                  width: "100%",
                  ":hover": {
                    backgroundColor: "#e65c00",
                  },
                }}
              >
                Get Ticket
              </Button>
            </Box>
          </Paper>
        </SwiperSlide>

        <SwiperSlide>
          <Paper
            elevation={5}
            sx={{
              padding: 2,
              borderRadius: 3,
              backgroundColor: "transparent", // Transparent background for the card
              boxShadow: "none", // Remove the shadow for a cleaner look
            }}
          >
            <img
              src="/images/q.jpg"
              alt="Movie Title 3"
              style={{
                width: "80%", // Decrease the width
                height: "auto",
                aspectRatio: "2/3",
                objectFit: "cover",
                borderRadius: 8,
                margin: "0 auto",
              }}
            />
            <Box sx={{ marginTop: 2 }}>
              <Typography
                variant="body2"
                sx={{
                  color: "#000000",
                  marginBottom: 1,
                }}
              >
                Action / 140 Mins
              </Typography>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  marginBottom: 1,
                  color: "#000000",
                }}
              >
                Movie Title 3
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#ff6f00",
                  color: "#fff",
                  width: "100%",
                  ":hover": {
                    backgroundColor: "#e65c00",
                  },
                }}
              >
                Get Ticket
              </Button>
            </Box>
          </Paper>
        </SwiperSlide>

        <SwiperSlide>
          <Paper
            elevation={5}
            sx={{
              padding: 2,
              borderRadius: 3,
              backgroundColor: "transparent", // Transparent background for the card
              boxShadow: "none", // Remove the shadow for a cleaner look
            }}
          >
            <img
              src="/images/IO.jpg"
              alt="Movie Title 4"
              style={{
                width: "80%", // Decrease the width
                height: "auto",
                aspectRatio: "2/3",
                objectFit: "cover",
                borderRadius: 8,
                margin: "0 auto",
              }}
            />
            <Box sx={{ marginTop: 2 }}>
              <Typography
                variant="body2"
                sx={{
                  color: "#000000",
                  marginBottom: 1,
                }}
              >
                Sci-Fi / 130 Mins
              </Typography>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  marginBottom: 1,
                  color: "#000000",
                }}
              >
                Movie Title 4
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#ff6f00",
                  color: "#fff",
                  width: "100%",
                  ":hover": {
                    backgroundColor: "#e65c00",
                  },
                }}
              >
                Get Ticket
              </Button>
            </Box>
          </Paper>
        </SwiperSlide>

        <SwiperSlide>
          <Paper
            elevation={5}
            sx={{
              padding: 2,
              borderRadius: 3,
              backgroundColor: "transparent", // Transparent background for the card
              boxShadow: "none", // Remove the shadow for a cleaner look
            }}
          >
            <img
              src="/images/min.jpg"
              alt="Movie Title 5"
              style={{
                width: "80%", // Decrease the width
                height: "auto",
                aspectRatio: "2/3",
                objectFit: "cover",
                borderRadius: 8,
                margin: "0 auto",
              }}
            />
            <Box sx={{ marginTop: 2 }}>
              <Typography
                variant="body2"
                sx={{
                  color: "#000000",
                  marginBottom: 1,
                }}
              >
                Horror / 110 Mins
              </Typography>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  marginBottom: 1,
                  color: "#000000",
                }}
              >
                Movie Title 5
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#ff6f00",
                  color: "#fff",
                  width: "100%",
                  ":hover": {
                    backgroundColor: "#e65c00",
                  },
                }}
              >
                Get Ticket
              </Button>
            </Box>
          </Paper>
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default NowPlaying;
