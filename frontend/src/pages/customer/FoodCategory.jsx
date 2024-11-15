import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom"; // Import the Link component
import client from "../../Utils/client";
import { notifyError } from "../../Utils/helpers";

const FoodCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFoodCategories = async () => {
    client
      .get("/categories")
      .then((response) => {
        // Assuming the response already has the category data, but we'll add image URLs here
        const categoriesWithImages = response.data.map((category) => ({
          ...category,
          image: getCategoryImageUrl(category.name), // Add image URL based on category name
        }));
        setCategories(categoriesWithImages);
        setLoading(false);
      })
      .catch((error) => {
        notifyError("Failed to fetch categories");
        setLoading(false); // To stop the loading state in case of an error
      });
  };

  const getCategoryImageUrl = (categoryName) => {
    // You can add more cases based on your category names
    switch (categoryName) {
      case "Chips & Sweets":
        return "https://images.pexels.com/photos/24868975/pexels-photo-24868975/free-photo-of-dishes-and-cocktails-standing-on-the-table-in-a-bar.jpeg";
      case "Burgers":
        return "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2.jpg";
      case "Drinks":
        return "https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg";
      case "Hotdogs":
        return "https://images.pexels.com/photos/4518655/pexels-photo-4518655.jpeg";
      case "Popcorn":
        return "https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg";
      case "Snacks":
        return "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg";
      default:
        return "https://example.com/default-category-image.jpg"; // Default image for unknown categories
    }
  };

  useEffect(() => {
    fetchFoodCategories();
  }, []);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={category.id}>
              <Link to={category.link} style={{ textDecoration: "none" }}>
                <Card
                  sx={{
                    transition:
                      "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)", // Scale up the card on hover
                      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)", // Add shadow for depth
                    },
                  }}
                >
                  <img
                    src={category.image} // Use the hardcoded image URL for each category
                    alt={category.name}
                    style={{
                      width: "100%",
                      height: "200px", // Adjust the height as needed
                      objectFit: "cover", // Ensures the image covers the space without distortion
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {category.name}
                    </Typography>
                    <Button
                      component={Link} // Use Link component for routing
                      to={`/foods/${category.id}`} // Adjust the path based on your routing
                      variant="outlined"
                      fullWidth
                      sx={{ marginTop: "10px" }}
                    >
                      See Foods
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default FoodCategory;
