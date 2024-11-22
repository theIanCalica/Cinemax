import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActionArea,
} from "@mui/material";
import client from "../../Utils/client";
import { notifyError } from "../../Utils/helpers";

const Genre = () => {
  const [genres, setGenres] = useState([]);

  // Fetch genres from API
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await client.get("/genres");
        setGenres(response.data);
      } catch (error) {
        notifyError(error.response?.data?.message || "Failed to load genres");
      }
    };

    fetchGenres();
  }, []);

  return (
    <Grid container spacing={3} padding={3}>
      {genres.map((genre) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={genre.id}>
          <Card
            sx={{
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 4,
              },
            }}
          >
            <CardActionArea>
              <CardContent>
                <Typography variant="h6" textAlign="center">
                  {genre.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Genre;
