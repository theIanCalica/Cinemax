import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  TextField,
  Rating,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import client from "../../Utils/client";
import { getUser, notifyError, notifySuccess } from "../../Utils/helpers";
import Hero from "../../components/customer/Hero/Hero";
import filter from "../../Utils/Filter";

const FoodPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = getUser();
  const isAdmin = currentUser && currentUser.role === "admin";
  const { selectedFood } = location.state || {}; // Retrieve the selected food
  const [reviews, setReviews] = useState([]);
  const [hoveredReviewId, setHoveredReviewId] = useState(null); // Track hovered review ID
  const [editReviewId, setEditReviewId] = useState(null); // Track the review being edited
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0); // New state for rating

  const fetchReviews = async (foodId) => {
    try {
      const response = await client.get(`/orders/get-review/${foodId}`);

      const reviewsData = response.data.reviews;

      if (Array.isArray(reviewsData)) {
        setReviews(reviewsData); // Set the reviews to state
      } else {
        console.error("Expected an array, but received:", reviewsData);
      }
    } catch (error) {
      if (error.status === 404) {
        notifyError("No reviews yet");
      } else {
        console.error("Error fetching reviews:", error);
        notifyError("Error fetching reviews");
      }
    }
  };

  const handleEditReview = (reviewId) => {
    setEditReviewId(reviewId);
    const review = reviews.find((r) => r._id === reviewId);
    setNewComment(review.comment);
    setNewRating(review.rating);
  };

  const handleSaveEdit = async (orderId, foodId) => {
    try {
      const data = {
        orderId,
        foodId,
        newComment,
        newRating,
      };
      console.log(data);
      await client.put(`/orders/update-review/`, data).then((response) => {
        if (response.status === 200) {
          notifySuccess("Successfully updated");
        }
      });
      const updatedReviews = reviews.map((review) =>
        review._id === currentUser._id
          ? { ...review, comment: newComment, rating: newRating }
          : review
      );
      setReviews(updatedReviews);
      setEditReviewId(null);
      setNewComment("");
    } catch (error) {
      console.error("Error updating review:", error);
      notifyError("Error updating review");
    }
  };

  const handleDeleteReview = async (orderId, foodId) => {
    console.log(orderId);
    console.log(foodId);
    const data = {
      orderId,
      foodId,
    };

    client
      .delete("/orders/delete-review", { data })
      .then((response) => {
        if (response.status === 200) {
          notifySuccess("Successfully deleted");
          setReviews((prevReviews) =>
            prevReviews.filter((review) => review.orderid !== orderId)
          );
        }
      })
      .catch((error) => {
        notifyError("Error deleting review");
      });
  };
  useEffect(() => {
    if (selectedFood?._id) {
      fetchReviews(selectedFood._id); // Only fetch reviews if selectedFood._id is available
    }
  }, [selectedFood]);

  useEffect(() => {
    console.log("Reviews state updated:", reviews); // Check reviews state
  }, [reviews]);

  if (!selectedFood) {
    return <div>Food not found</div>;
  }

  const handleCardClick = (food) => {
    const formattedFoodName = food.name.replace(/\s+/g, "+"); // Replace spaces with '+'
    navigate(`/food/${formattedFoodName}`, { state: { selectedFood: food } });
  };

  const handleAddToCart = (foodId) => {
    const userId = currentUser._id;
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

  return (
    <>
      <Hero type="Foods" />
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          {selectedFood.name}
        </Typography>

        <Card sx={{ display: "flex", flexDirection: "column", boxShadow: 3 }}>
          <CardMedia
            component="img"
            image={selectedFood.images[0]?.url} // Assuming the first image is the main one
            alt={selectedFood.name}
            sx={{ height: 300, objectFit: "cover" }}
          />
          <CardContent>
            <Typography variant="h6">
              Category: {selectedFood.category.name}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              {selectedFood.description}
            </Typography>

            <Typography variant="h6">Price: ₱{selectedFood.price}</Typography>
            <Typography variant="body1">
              Quantity: {selectedFood.quantity}
            </Typography>
            <Typography variant="body1">
              Status: {selectedFood.status}
            </Typography>

            <Typography variant="h6" sx={{ marginTop: 2 }}>
              Average Rating: {selectedFood.averageRating} (
              {selectedFood.numberOfRatings} ratings)
            </Typography>
            <Box
              sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
            >
              <StarIcon sx={{ color: "#ff9800", marginRight: 1 }} />
              <Typography variant="body2">
                {selectedFood.averageRating} / 5
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h5" gutterBottom>
            Reviews:
          </Typography>
          {Array.isArray(reviews) && reviews.length > 0 ? (
            reviews.map((review) => (
              <Box
                key={review._id}
                sx={{
                  marginBottom: 2,
                  padding: 2,
                  backgroundColor: "#f5f5f5",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "flex-start",
                  position: "relative",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                }}
                onMouseEnter={() => setHoveredReviewId(review._id)}
                onMouseLeave={() => setHoveredReviewId(null)}
              >
                <CardMedia
                  component="img"
                  image={review.profilePicUrl}
                  alt={review.name}
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    marginRight: 2,
                  }}
                />
                <Box>
                  <Typography variant="h6">{review.name}</Typography>
                  {editReviewId === review._id ? (
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center", // Aligns items vertically in the center
                          gap: 2, // Adds space between the components
                        }}
                      >
                        <TextField
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          label="Your Comment"
                        />
                        <Box>
                          <Typography variant="body2" sx={{ marginBottom: 1 }}>
                            Rating:
                          </Typography>
                          <Rating
                            value={newRating}
                            onChange={(event, newValue) =>
                              setNewRating(newValue)
                            }
                            max={5}
                          />
                        </Box>
                      </Box>
                      <Button
                        onClick={() =>
                          handleSaveEdit(review.orderid, selectedFood._id)
                        }
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: 2 }}
                      >
                        Save
                      </Button>
                    </>
                  ) : (
                    <>
                      <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                        "{filter.clean(review.comment)}"
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <StarIcon sx={{ color: "#ff9800", marginRight: 1 }} />
                        <Typography variant="body2">
                          {review.rating} / 5
                        </Typography>
                      </Box>
                    </>
                  )}
                </Box>
                {hoveredReviewId === review._id && (
                  <Box>
                    {isAdmin && (
                      <Button
                        variant="contained"
                        color="secondary"
                        sx={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                        }}
                        onClick={() =>
                          handleDeleteReview(review.orderid, selectedFood._id)
                        }
                      >
                        Delete
                      </Button>
                    )}

                    {currentUser._id === review._id && (
                      <Button
                        variant="contained"
                        color="secondary"
                        sx={{
                          position: "absolute",
                          top: 10,
                          right: 60,
                        }}
                        onClick={() => handleEditReview(review._id)}
                      >
                        Edit
                      </Button>
                    )}
                  </Box>
                )}
              </Box>
            ))
          ) : (
            <Typography variant="body1">No reviews yet</Typography>
          )}
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={() => handleAddToCart(selectedFood._id)}
          sx={{ marginTop: 2 }}
        >
          Add to Cart
        </Button>
      </Box>
    </>
  );
};

export default FoodPage;
