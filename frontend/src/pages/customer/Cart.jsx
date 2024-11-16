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
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Select from "react-select";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const user = getUser(); // Fetch the user details
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const MySwal = withReactContent(Swal);

  const fetchCartItems = async () => {
    try {
      const data = { userId: user._id };
      const response = await client.get(`/carts`, data);
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      notifyError("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  const makePaymentStripe = async () => {
    const stripe = await loadStripe(
      `pk_test_51QLnky08haKxqIansxQffmZesDz36a2BrvHZ5h0UXo3aRaUZAJLPZYyULs4AZwXI6WXJ5rm5Ilmj9QWzxD4KHDyG00Zuo2WEs7`
    );

    const body = {
      order: cartItems,
    };

    const response = await client.post("/orders/create-checkout-session", body);
    const session = response.data;

    // Redirect to Stripe checkout
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  };

  const handleAdd = (foodId, quantity) => {
    const userId = user._id;
    const newQuantity = quantity + 1;
    const data = { newQuantity, userId, foodId };
    client.put("/carts", data).then((response) => {
      fetchCartItems();
      notifySuccess("Successfully updated the quantity");
    });
  };

  const handleSubtract = (foodId, quantity) => {
    const userId = user._id;
    const newQuantity = quantity - 1;
    const data = { newQuantity, userId, foodId };
    client.put("/carts", data).then((response) => {
      fetchCartItems();
      notifySuccess("Successfully updated the quantity");
    });
  };

  const handleDelete = (foodId) => {
    const userId = user._id;
    const data = { userId, foodId };

    client.delete("/carts", { data }).then((response) => {
      if (response.status === 200) {
        fetchCartItems();
        notifySuccess("Successfully removed");
      } else {
        notifySuccess("Something went wrong");
      }
    });
  };

  const handleConfirmOrder = () => {
    const userId = user._id;

    const orderData = {
      userId: userId,
      foodItems: cartItems[0].items,
      totalPrice: cartItems[0].totalPrice,
    };

    const paymentOptions = [
      { value: "Cash", label: "Cash" },
      { value: "Credit Card", label: "Credit Card" },
    ];

    // Variable to store selected payment method
    let selectedPayment = null;

    // SweetAlert with React Component
    MySwal.fire({
      title: "Select Payment Method",
      html: (
        <Select
          options={paymentOptions}
          placeholder="Choose payment method"
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            control: (base) => ({ ...base, minWidth: "400px" }), // Adjust width if needed
          }}
          onChange={(option) => {
            selectedPayment = option.value; // Capture the selected option
          }}
        />
      ),
      showCancelButton: true,
      confirmButtonText: "Confirm Payment",
      preConfirm: () => {
        if (!selectedPayment) {
          Swal.showValidationMessage("Please select a payment method.");
          return false;
        }
        return selectedPayment; // Pass the selected value
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const paymentMethod = result.value;

        // Add payment method to orderData
        orderData.paymentMethod = paymentMethod;

        if (paymentMethod === "Cash") {
          client
            .post("/orders", orderData)
            .then((response) => {
              if (response.status === 201) {
                notifySuccess("Order confirmed successfully!");
                fetchCartItems();
              }
            })
            .catch((error) => {
              console.error("Error confirming order:", error);
              notifyError("Error confirming order.");
            });
        } else {
          makePaymentStripe();
        }
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
          <>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              mt={2}
              p={2}
              borderRadius="8px"
            >
              <Typography variant="h4" fontWeight="bold">
                Grand Total:
              </Typography>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ color: "#F97316" }}
                ml={1}
              >
                ${cartItems[0].totalPrice.toFixed(2)}
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {cartItems.map((cart) =>
                cart.items.map((item) => (
                  <Grid item xs={12} sm={6} md={4} key={item.food._id}>
                    <Card>
                      <CardMedia
                        component="img"
                        sx={{
                          height: 200,
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
                        <Typography>
                          Total: ₱{item.quantity * item.price}
                        </Typography>
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
                            gap: 1,
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
                          onClick={() => handleDelete(item.food._id)}
                          size="small"
                          color="error"
                        >
                          Remove
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
            <Box
              sx={{ marginTop: 3, display: "flex", justifyContent: "center" }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleConfirmOrder}
                sx={{ padding: "10px 20px" }}
              >
                Confirm Order
              </Button>
            </Box>
          </>
        ) : (
          <Typography>No items in your cart.</Typography>
        )}
      </Container>
    </>
  );
};

export default Cart;
