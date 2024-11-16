import React, { useState, useEffect, useRef } from "react";
import client from "../../Utils/client";
import { notifyError, getUser, notifySuccess } from "../../Utils/helpers";
import Hero from "../../components/customer/Hero/Hero";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Slider,
  Rating,
  CircularProgress,
} from "@mui/material";

const FoodList = () => {
  const user = getUser();
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [page, setPage] = useState(1); // Current page for infinite scrolling
  const [hasMore, setHasMore] = useState(true); // Tracks if there are more foods
  const [loading, setLoading] = useState(false); // Loading state for fetching
  const observer = useRef(null); // Ref for the infinite scroll trigger

  useEffect(() => {
    fetchFoods(page);
    fetchCategories();
  }, [page]);

  useEffect(() => {
    applyFilters();
  }, [selectedCategory, priceRange, selectedRating, foods]);

  const fetchFoods = async (pageNumber) => {
    if (loading) return;

    try {
      setLoading(true);
      const response = await client.get(
        `/foods/paginated?page=${pageNumber}&limit=10`
      );

      const { foods } = response.data; // Extract the foods array from the response

      if (foods.length === 0) {
        setHasMore(false);
      } else {
        setFoods((prevFoods) => [...prevFoods, ...foods]);
        console.log(foods);
        setFilteredFoods((prevFoods) => [...prevFoods, ...foods]);
      }
    } catch (error) {
      notifyError(error.response?.data?.message || "Failed to fetch foods.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await client.get("/categories/");
      setCategories(response.data);
    } catch (error) {
      notifyError(
        error.response?.data?.message || "Failed to fetch categories."
      );
    }
  };

  const handleAddToCart = (foodId) => {
    const userId = user._id;
    const cartData = {
      userId, // Include the user ID
      foodId, // Specify the food ID
      quantity: 1,
    };
    client.post("/carts", cartData).then((response) => {
      if (response.status === 201) {
        notifySuccess("Successfully added to cart");
      } else {
        notifyError("Failed to add item to cart:", response.data.message);
      }
    });
  };

  const applyFilters = () => {
    let filtered = foods;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(
        (food) => food.category.name === selectedCategory
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (food) => food.price >= priceRange[0] && food.price <= priceRange[1]
    );

    // Filter by rating
    if (selectedRating > 0) {
      filtered = filtered.filter(
        (food) => food.averageRating >= selectedRating
      );
    }

    setFilteredFoods(filtered);
  };

  const lastFoodElementRef = (node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (node) observer.current.observe(node);
  };

  return (
    <>
      <Hero type="Foods" />
      <Container sx={{ mt: 4 }}>
        {/* Filters Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
            mb: 4,
          }}
        >
          {/* Category Filter */}
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <MenuItem value="">All Categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Price Range Filter */}
          <Box sx={{ minWidth: 300 }}>
            <Typography gutterBottom>Price Range</Typography>
            <Slider
              value={priceRange}
              onChange={(e, newValue) => setPriceRange(newValue)}
              valueLabelDisplay="auto"
              min={0}
              max={1000}
            />
          </Box>

          {/* Rating Filter */}
          <Box>
            <Typography gutterBottom>Minimum Rating</Typography>
            <Rating
              value={selectedRating}
              onChange={(e, newValue) => setSelectedRating(newValue)}
              precision={0.5}
            />
          </Box>
        </Box>

        {/* Food List */}
        <Grid container spacing={4}>
          {filteredFoods.map((food, index) => {
            if (filteredFoods.length === index + 1) {
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={food._id}
                  ref={lastFoodElementRef}
                >
                  <Card sx={{ maxWidth: 345, height: "100%" }}>
                    <CardMedia
                      component="img"
                      height="140"
                      width="140"
                      image={food.images?.[0]?.url || "/placeholder.jpg"}
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
                        Price: ₱{food.price?.toFixed(2) || "N/A"}
                      </Typography>
                      <Typography variant="body1">
                        Rating: {food.averageRating?.toFixed(1) || "N/A"} ⭐
                      </Typography>

                      {/* Add to Cart Button */}
                      {user && (
                        <Box sx={{ mt: 2 }}>
                          <button
                            style={{
                              backgroundColor: "#007BFF",
                              color: "#fff",
                              border: "none",
                              padding: "10px 20px",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontSize: "14px",
                            }}
                            onClick={() => handleAddToCart(food._id)}
                          >
                            Add to Cart
                          </button>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              );
            } else {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={food._id}>
                  <Card sx={{ maxWidth: 345, height: "100%" }}>
                    <CardMedia
                      component="img"
                      height="140"
                      width="140"
                      image={food.images?.[0]?.url || "/placeholder.jpg"}
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
                        Price: ₱{food.price?.toFixed(2) || "N/A"}
                      </Typography>
                      <Typography variant="body1">
                        Rating: {food.averageRating?.toFixed(1) || "N/A"} ⭐
                      </Typography>
                      {user && (
                        <Box sx={{ mt: 2 }}>
                          <button
                            style={{
                              backgroundColor: "#007BFF",
                              color: "#fff",
                              border: "none",
                              padding: "10px 20px",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontSize: "14px",
                            }}
                            onClick={() => handleAddToCart(food._id)}
                          >
                            Add to Cart
                          </button>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              );
            }
          })}

          {/* Loading Spinner for Infinite Scroll */}
          {loading && (
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 2,
                  position: "relative",
                  zIndex: 1, // Ensure it's above other elements
                }}
              >
                <CircularProgress size={50} />
              </Box>
            </Grid>
          )}
        </Grid>

        {/* No More Foods */}
        {!hasMore && !loading && (
          <Typography align="center" sx={{ mt: 4 }}>
            No more foods to show.
          </Typography>
        )}
      </Container>
    </>
  );
};

export default FoodList;
