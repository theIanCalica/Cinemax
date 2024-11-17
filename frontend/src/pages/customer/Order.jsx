import React, { useEffect, useState } from "react";
import client from "../../Utils/client";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  CircularProgress,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { getUser, notifyError, formatDate } from "../../Utils/helpers";
import Hero from "../../components/customer/Hero/Hero";

const Order = () => {
  const user = getUser();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    const userId = user._id;
    client
      .get(`/orders/${userId}`)
      .then((response) => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        notifyError("Something went wrong on fetching your orders");
        setLoading(false);
        console.error(error);
      });
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleViewItems = (orderId) => {
    const order = orders.find((order) => order._id === orderId);
    setSelectedOrder(order);
    setOpenModal(true); // Open modal when viewing items
    handleMenuClose();
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Close modal
    setSelectedOrder(null); // Reset selected order
  };

  const calculateSubtotal = (items) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateGrandTotal = (subtotal) => {
    return subtotal;
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <Hero type="Order" />
      <Box
        sx={{
          padding: 3,
          marginTop: "25px",
          minHeight: "100vh",
          overflowY: "auto",
        }}
      >
        {/* Centered Spinner while loading */}
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "calc(100vh - 100px)", // Center spinner within available space
            }}
          >
            <CircularProgress />
          </Box>
        ) : orders.length === 0 ? (
          <Typography
            variant="h6"
            color="textSecondary"
            sx={{ textAlign: "center" }}
          >
            No orders found.
          </Typography>
        ) : (
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              overflow: "hidden",
              marginBottom: "20px",
            }}
          >
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  {[
                    "Order ID",
                    "Items",
                    "Order Date",
                    "Total Amount",
                    "Status",
                    "Actions",
                  ].map((header) => (
                    <TableCell
                      key={header}
                      sx={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#333",
                        padding: "12px 20px",
                        textAlign: "left",
                      }}
                    >
                      <Typography variant="h6">{header}</Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow
                    key={order._id}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#f4f4f4", // Lighter hover color
                        cursor: "pointer",
                      },
                    }}
                  >
                    <TableCell
                      sx={{
                        padding: "12px 20px",
                        backgroundColor: "#f9f9f9",
                        fontWeight: 500,
                      }}
                    >
                      {order._id}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "12px 20px",
                        backgroundColor: "#fff",
                        fontWeight: 500,
                      }}
                    >
                      {order.items.length}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "12px 20px",
                        backgroundColor: "#fff",
                        fontWeight: 500,
                      }}
                    >
                      {formatDate(order.createdAt)}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "12px 20px",
                        backgroundColor: "#f9f9f9",
                        fontWeight: 500,
                      }}
                    >
                      ₱{order.totalAmount}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "12px 20px",
                        backgroundColor: "#fff",
                        fontWeight: 500,
                        color:
                          order.status === "Pending"
                            ? "orange"
                            : order.status === "Completed"
                            ? "green"
                            : "red",
                      }}
                    >
                      {order.status}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "12px 20px",
                        backgroundColor: "#f9f9f9",
                        textAlign: "center",
                      }}
                    >
                      <IconButton onClick={handleMenuOpen} size="small">
                        <MoreHorizIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                      >
                        <MenuItem onClick={() => handleViewItems(order._id)}>
                          View Items
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* Modal to show order items */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Order Items</DialogTitle>
        <DialogContent>
          {selectedOrder ? (
            <>
              <Typography variant="h6" gutterBottom>
                Items:
              </Typography>
              <Table>
                <TableBody>
                  {selectedOrder.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.foodId.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>₱{item.price}</TableCell>
                      <TableCell>₱{item.price * item.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Typography variant="h6" gutterBottom>
                Grand Total: ₱
                {calculateGrandTotal(
                  calculateSubtotal(selectedOrder.items),
                  selectedOrder.shippingFee || 0,
                  selectedOrder.tax || 0
                )}
              </Typography>
            </>
          ) : (
            <Typography>No order selected</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Order;
