import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import client from "../../../Utils/client";
import { notifySuccess } from "../../../Utils/helpers.js";

const FoodImages = ({ food, onClose }) => {
  const [images, setImages] = useState(food?.images || []);
  const handleDelete = async (public_id, foodId) => {
    console.log(public_id);
    console.log(foodId);
    client
      .delete(`/foods/deletePic/${foodId}`, {
        data: {
          publicId: public_id,
        },
      })
      .then((response) => {
        if (response.status) {
          notifySuccess("Successfully deleted");

          // Remove the image from the local images array
          const updatedImages = images.filter(
            (image) => image.public_id !== public_id
          );
          setImages(updatedImages);

          // refresh();
        }
      });
  };

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

        {/* Use MUI Grid to make the images responsive */}
        <Grid container spacing={2}>
          {images.length > 0 ? (
            images.map((image, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <Box
                  sx={{
                    position: "relative",
                    borderRadius: 1,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={image.url}
                    alt={`Food ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "4px",
                    }}
                  />
                  <IconButton
                    onClick={() => handleDelete(image.public_id, food._id)}
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
              </Grid>
            ))
          ) : (
            <Typography className="col-span-2 text-center">
              No images available
            </Typography>
          )}
        </Grid>

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
