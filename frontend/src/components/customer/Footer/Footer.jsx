import React from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  IconButton,
  Radio,
  FormControlLabel,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import PinterestIcon from "@mui/icons-material/Pinterest";
import XIcon from "@mui/icons-material/X";

const Footer = () => {
  return (
    <Box component="footer" sx={{ backgroundColor: "black", mt: 5 }}>
      {/* Top Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 2, md: 5, lg: 7 },
          py: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "white",
            mb: { xs: 2, md: 0 },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          Cinemax
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            variant="body1"
            sx={{ color: "white", textAlign: { xs: "center", md: "left" } }}
          >
            Help / Privacy Policy
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <IconButton sx={{ backgroundColor: "#2F2F2F" }}>
              <FacebookIcon sx={{ color: "white" }} />
            </IconButton>
            <IconButton sx={{ backgroundColor: "#2F2F2F" }}>
              <InstagramIcon sx={{ color: "white" }} />
            </IconButton>
            <IconButton sx={{ backgroundColor: "#2F2F2F" }}>
              <PinterestIcon sx={{ color: "white" }} />
            </IconButton>
            <IconButton sx={{ backgroundColor: "#2F2F2F" }}>
              <XIcon sx={{ color: "white" }} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Divider */}
      <Box
        sx={{ borderTop: "1px solid #2F2F2F", width: "75%", mx: "auto", mt: 2 }}
      />

      {/* Main Content Section */}
      <Grid container spacing={4} sx={{ p: 3, px: { md: 5, lg: 7 } }}>
        {/* Ticket Purchase Section */}
        <Grid item xs={12} md={6} lg={3}>
          <Typography
            variant="h6"
            sx={{ color: "white", textAlign: { xs: "center", md: "left" } }}
          >
            Buy movie tickets easily with the Cinemax system nationwide
          </Typography>
          <Button
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: "#FFA500",
              color: "white",
              "&:hover": { backgroundColor: "white", color: "#FFA500" },
            }}
          >
            Get Your Ticket
          </Button>
        </Grid>

        {/* Movies Section */}
        <Grid item xs={12} md={6} lg={3}>
          <Typography
            variant="h6"
            sx={{
              color: "#FFA500",
              position: "relative",
              mb: 2,
              display: "inline-block",
            }}
          >
            Movies
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: "60%",
                width: 16,
                height: 2,
                backgroundColor: "#FFA500",
                borderRight: "2px solid orange",
              }}
            />
          </Typography>
          <Box>
            {["Action", "Adventure", "Animation", "Comedy", "Crime"].map(
              (movie, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  sx={{
                    color: "gray",
                    mt: 1,
                    cursor: "pointer",
                    transition: "color 0.7s",
                    "&:hover": { color: "orange" },
                  }}
                >
                  {movie}
                </Typography>
              )
            )}
          </Box>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Typography
            variant="h6"
            sx={{
              color: "#FFA500",
              position: "relative",
              mb: 2,
              display: "inline-block",
            }}
          >
            Food Categories
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: "30%",
                width: 16,
                height: 2,
                backgroundColor: "#FFA500",
                borderRight: "2px solid orange",
              }}
            />
          </Typography>
          <Box>
            {[
              "Burgers",
              "Chips & Sweets",
              "Drinks",
              "Hotdogs",
              "Popcorn",
              "Snacks",
            ].map((category, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{
                  color: "gray",
                  mt: 1,
                  cursor: "pointer",
                  transition: "color 0.7s",
                  "&:hover": { color: "orange" },
                }}
              >
                {category}
              </Typography>
            ))}
          </Box>
        </Grid>
        {/* Links Section */}
        <Grid item xs={12} md={6} lg={3}>
          <Typography
            variant="h6"
            sx={{
              color: "#FFA500",
              position: "relative",
              mb: 2,
              display: "inline-block",
            }}
          >
            Links
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: "30%",
                width: 16,
                height: 2,
                backgroundColor: "#FFA500",
                borderRight: "2px solid orange",
              }}
            />
          </Typography>
          <Box>
            {["About", "My Account", "News", "Latest Events", "Contact"].map(
              (link, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  sx={{
                    color: "gray",
                    mt: 1,
                    cursor: "pointer",
                    transition: "color 0.7s",
                    "&:hover": { color: "orange" },
                  }}
                >
                  {link}
                </Typography>
              )
            )}
          </Box>
        </Grid>

        {/* Newsletter Section */}
        {/* <Grid item xs={12} md={6} lg={3}>
          <Typography variant="h6" sx={{ color: "#FFA500", mb: 2 }}>
            Newsletter
          </Typography>
          <Typography variant="body2" sx={{ color: "white", mb: 2 }}>
            Subscribe to Leitmotif newsletter this very day.
          </Typography>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                backgroundColor: "#2F2F2F",
                borderRadius: 1,
              }}
            >
              <TextField
                variant="filled"
                placeholder="Email Address"
                InputProps={{
                  disableUnderline: true,
                  sx: { color: "white" },
                }}
                fullWidth
                sx={{ borderRadius: "4px 0 0 4px" }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#FFA500",
                  color: "white",
                  borderRadius: "0 4px 4px 0",
                }}
              >
                Submit
              </Button>
            </Box>
            <FormControlLabel
              control={<Radio sx={{ color: "white" }} />}
              label={
                <Typography variant="body2" sx={{ color: "gray" }}>
                  I agree to all terms and policies of the company
                </Typography>
              }
            />
          </Box>
        </Grid> */}
      </Grid>

      {/* Footer Bottom */}
      <Box
        sx={{
          backgroundColor: "#131313",
          py: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="body2" sx={{ color: "gray" }}>
          &copy; {new Date().getFullYear()} Cinemax. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
