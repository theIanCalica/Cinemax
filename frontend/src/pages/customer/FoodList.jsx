import React, { useState, useEffect } from "react";
import client from "../../Utils/client";
import { notifyError } from "../../Utils/helpers";
import Hero from "../../components/customer/Hero/Hero";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
} from "@mui/material";

const FoodList = () => {
  const [foods, setFoods] = useState([]);

  // Fetch foods on component mount
  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    client
      .get("/foods/")
      .then((response) => {
        setFoods(response.data);
      })
      .catch((error) => {
        notifyError(error.response?.data?.message || "Failed to fetch foods.");
      });
  };

  return (
    <>
      <Hero type="Foods" />
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          {foods.map((food) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={food.id}>
              <Card sx={{ maxWidth: 345, height: "100%" }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={food.image || "/placeholder.jpg"}
                  alt={food.name}
                />
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    {food.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {food.description || "No description available."}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    Price: ${food.price?.toFixed(2) || "N/A"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default FoodList;
