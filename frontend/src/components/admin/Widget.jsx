import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import {
  KeyboardArrowUp as KeyboardArrowUpIcon,
  PersonOutlineOutlined as PersonOutlineOutlinedIcon,
  ShoppingCartOutlined as ShoppingCartOutlinedIcon,
  MonetizationOnOutlined as MonetizationOnOutlinedIcon,
  ConfirmationNumberOutlined as ConfirmationNumberOutlinedIcon,
} from "@mui/icons-material";

const Widget = ({ type, count }) => {
  let data;
  const diff = 20;

  const iconStyles = (color, backgroundColor) => ({
    fontSize: "2rem",
    color: color,
    backgroundColor: backgroundColor,
    borderRadius: "50%",
    padding: "0.5rem",
    width: "4rem",
    height: "4rem",
  });

  switch (type) {
    case "User":
      data = {
        title: "USERS",
        isMoney: false,
        count: count,
        link: "See all users",
        icon: (
          <PersonOutlineOutlinedIcon
            sx={iconStyles("crimson", "rgba(255,0,0,0.2)")}
          />
        ),
      };
      break;
    case "Order":
      data = {
        title: "ORDERS",
        isMoney: false,
        count: count,
        link: "View all orders",
        icon: (
          <ShoppingCartOutlinedIcon
            sx={iconStyles("goldenrod", "rgba(218,165,32,0.2)")}
          />
        ),
      };
      break;
    case "Booking":
      data = {
        title: "BOOKINGS",
        isMoney: false,
        count: count,
        link: "View all bookings",
        icon: (
          <ConfirmationNumberOutlinedIcon
            sx={iconStyles("purple", "rgba(128,0,128,0.2)")}
          />
        ),
      };
      break;
    case "Earnings":
      data = {
        title: "EARNINGS",
        isMoney: true,
        count: count,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            sx={iconStyles("green", "rgba(0,128,0,0.2)")}
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
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
        boxShadow: 2,
        borderRadius: 2,
        backgroundColor: "white",
        width: "24rem",
        height: "10rem",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="h6" color="textSecondary" fontWeight="bold">
          {data.title}
        </Typography>
        <Typography variant="h4" fontWeight="medium">
          {data.isMoney && "₱"} {count}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          {data.link}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: diff > 0 ? "green" : "red",
          }}
        >
          <KeyboardArrowUpIcon fontSize="large" />
          <Typography variant="body1">{diff} %</Typography>
        </Box>
        <IconButton disableRipple>{data.icon}</IconButton>
      </Box>
    </Box>
  );
};

export default Widget;
