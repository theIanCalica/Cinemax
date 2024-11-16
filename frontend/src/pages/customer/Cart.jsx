import React, { useState, useEffect } from "react";
import client from "../../Utils/client";
import { getUser, notifyError, notifySuccess } from "../../Utils/helpers";
import {
  CircularProgress,
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  CardMedia,
  Grid,
  IconButton,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Hero from "../../components/customer/Hero/Hero";

const Cart = () => {
  const user = getUser(); // Fetch the user details
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCartItems = async () => {
    try {
      const data = {
        userId: user._id,
      };
      const response = await client.get(`/carts`, data);
      setCartItems(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      notifyError("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = (foodId, quantity) => {
    const userId = user._id;
    const newQuantity = quantity + 1;
    const data = {
      newQuantity,
      userId,
      foodId,
    };
    client.put("/carts", data).then((response) => {
      fetchCartItems();
      notifySuccess("Successfully updated the quantity");
    });
  };

  const handleSubtract = (foodId, quantity) => {
    const userId = user._id;
    const newQuantity = quantity - 1;
    const data = {
      newQuantity,
      userId,
      foodId,
    };
    client.put("/carts", data).then((response) => {
      fetchCartItems();
      notifySuccess("Successfully updated the quantity");
    });
  };

  const handleDelete = (foodId) => {
    const userId = user._id;
    const data = {
      userId,
      foodId,
    };

    client.delete("/carts", { data }).then((response) => {
      if (response.status === 200) {
        fetchCartItems();
        notifySuccess("Successfully removed");
      } else {
        notifySuccess("Something went wrong");
      }
    });
  };
  useEffect(() => {
    fetchCartItems();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Hero type="Cart" />
      <Container sx={{ marginTop: "50px" }}>
        {cartItems.length > 0 ? (
          <Grid container spacing={3}>
            {cartItems.map((cart) =>
              cart.items.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.food._id}>
                  <Card>
                    <CardMedia
                      component="img"
                      sx={{
                        height: 200, // Adjusted height for a grid
                        objectFit: "cover",
                      }}
                      image={item.food.images[0]?.url}
                      alt={item.food.name}
                    />
                    <CardContent>
                      <Typography variant="h6">{item.food.name}</Typography>
                      <Typography color="text.secondary">
                        Price: ₱{item.food.price}
                      </Typography>
                      <Typography>Quantity: {item.quantity}</Typography>
                      <Typography>Total: ₱{cart.totalPrice}</Typography>
                    </CardContent>
                    <CardActions
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1, // Space between elements
                        }}
                      >
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() =>
                            handleSubtract(item.food._id, item.quantity)
                          }
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography
                          variant="body1"
                          sx={{ minWidth: 30, textAlign: "center" }}
                        >
                          {item.quantity}
                        </Typography>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() =>
                            handleAdd(item.food._id, item.quantity)
                          }
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                      <Button
                        onClick={() => {
                          handleDelete(item.food._id);
                        }}
                        size="small"
                        color="secondary"
                      >
                        Remove
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        ) : (
          <Typography>No items in your cart.</Typography>
        )}
      </Container>
    </>
  );
};

export default Cart;
