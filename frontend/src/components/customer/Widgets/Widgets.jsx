import React from "react";
import StadiumIcon from "@mui/icons-material/Stadium";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import TheatersIcon from "@mui/icons-material/Theaters";
import { Box, Typography } from "@mui/material";
import filmstripImage from "../../../assets/images/filmstrip.png";

const Widgets = ({ type }) => {
  let data;
  switch (type) {
    case "Festival":
      data = {
        title: "Upcoming Film Festivals",
        subtitle: "Join Now",
        icon: (
          <StadiumIcon
            sx={{
              color: "white",
              fontSize: "55px",
            }}
          />
        ),
      };
      break;
    case "filmAward":
      data = {
        title: "Award Winning Films",
        subtitle: "Watch Now",
        icon: (
          <EmojiEventsIcon
            sx={{
              color: "white",
              fontSize: "55px",
            }}
          />
        ),
      };
      break;
    case "unmissable":
      data = {
        title: "Unmissable Movies",
        subtitle: "Get Ticket",
        icon: (
          <TheatersIcon
            sx={{
              color: "white",
              fontSize: "55px",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: "black",
        height: "192px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginX: 2,
      }}
    >
      <img
        src={filmstripImage}
        alt="Filmstrip"
        style={{
          position: "absolute",
          inset: 0,
          margin: "auto",
          objectFit: "cover",
          width: "50%",
          height: "50%",
          zIndex: 0,
          opacity: 0.15,
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 4,
          padding: 2,
          zIndex: 1,
          color: "white",
        }}
      >
        <Box>
          <Typography variant="body2" color="gray" sx={{ fontFamily: "serif" }}>
            {data.subtitle}
          </Typography>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", fontFamily: "monospace" }}
          >
            {data.title}
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: "#ff8c00",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 1,
            borderRadius: "50%",
          }}
        >
          {data.icon}
        </Box>
      </Box>
    </Box>
  );
};

export default Widgets;
