import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import client from "../../../Utils/client";
import { notifyError, notifySuccess } from "../../../Utils/helpers";

const MovieImagesModal = ({ movie, onClose, refresh }) => {
  const [images, setImages] = useState(movie?.images || []);

  const handleDelete = async (publicId, movieId) => {
    await client
      .delete(`/movies/delete-pic/${movieId}`, {
        data: {
          publicId: publicId,
        },
      })
      .then((response) => {
        notifySuccess("Successfully deleted");
        // Remove the image from the local images array
        const updatedImages = images.filter(
          (image) => image.public_id !== publicId
        );
        setImages(updatedImages);

        refresh();
      })
      .catch((error) => {
        notifyError("Something went wrong, please try again");
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
          {movie.title + " " + "images"}
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
                    onClick={() => handleDelete(image.public_id, movie._id)}
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

export default MovieImagesModal;
