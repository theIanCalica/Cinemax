import React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const FoodImages = ({ food, onClose, refresh, onDelete }) => {
  const images = food?.images || [];

  return (
    <Box
      className="fixed inset-0 z-50 flex items-center justify-center"
      sx={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <Box
        className="relative"
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          p: 3,
          maxWidth: "md",
          width: "100%",
        }}
      >
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          {food.name + " " + "images"}
        </Typography>
        <Box
          className="grid grid-cols-2 gap-2"
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 1,
          }}
        >
          {images.length > 0 ? (
            images.map((image, index) => (
              <Box
                key={index}
                sx={{
                  position: "relative",
                  borderRadius: 1,
                  overflow: "hidden",
                }}
              >
                <img
                  src={image.url}
                  alt={`Food ${index + 1}`}
                  style={{ width: "100%", height: "auto", borderRadius: "4px" }}
                />
                <IconButton
                  onClick={() => onDelete(index)}
                  sx={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                    },
                  }}
                  size="small"
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            ))
          ) : (
            <Typography className="col-span-2 text-center">
              No images available
            </Typography>
          )}
        </Box>
        <Button
          onClick={onClose}
          variant="contained"
          color="error"
          sx={{ mt: 3 }}
        >
          Close
        </Button>
      </Box>
    </Box>
  );
};

export default FoodImages;
