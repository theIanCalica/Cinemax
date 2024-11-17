import React, { useState, useEffect } from "react";
import client from "../../Utils/client";
import { notifyError, notifySuccess, formatDate } from "../../Utils/helpers";
import { CircularProgress, Box, Button, Menu, MenuItem } from "@mui/material";
import MUIDataTable from "mui-datatables";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuState, setMenuState] = useState({
    anchorEl: null,
    selectedOrderId: null,
    currentStatus: "",
  });

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await client.get("/orders");
      const formattedOrders = response.data.map((order) => ({
        ...order,
        fullName: `${order.customer.fname} ${order.customer.lname}`,
        createdAt: formatDate(order.createdAt),
      }));

      setOrders(formattedOrders);
    } catch (error) {
      notifyError("Something went wrong on fetching orders");
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    const data = {
      orderId,
      status,
    };
    try {
      const response = await client.put(`/orders/`, data); // Adjust the endpoint if needed
      if (response.status === 200) {
        notifySuccess("Order status updated successfully!");
        fetchOrders(); // Reload orders after a successful update
      } else {
        notifyError("Unexpected response from server.");
      }
    } catch (error) {
      notifyError("Failed to update order status.");
    }
  };

  const handleMenuOpen = (event, orderId, currentStatus) => {
    setMenuState({
      anchorEl: event.currentTarget,
      selectedOrderId: orderId,
      currentStatus,
    });
  };

  const handleMenuClose = () => {
    setMenuState({
      anchorEl: null,
      selectedOrderId: null,
      currentStatus: "",
    });
  };

  const handleStatusChange = (newStatus) => {
    if (menuState.selectedOrderId) {
      updateOrderStatus(menuState.selectedOrderId, newStatus);
    }
    handleMenuClose();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const columns = [
    { name: "_id", label: "Order ID" },
    { name: "fullName", label: "Customer Name" },
    { name: "createdAt", label: "Date" },
    { name: "paymentMethod", label: "Payment Method" },
    { name: "status", label: "Status" },
    { name: "totalAmount", label: "Total Amount" },
    {
      name: "actions",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          const orderId = tableMeta.rowData[0]; // Order ID
          const currentStatus = tableMeta.rowData[4]; // Current Status

          return (
            <>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={(event) =>
                  handleMenuOpen(event, orderId, currentStatus)
                }
              >
                Edit Status
              </Button>
            </>
          );
        },
      },
    },
  ];

  const options = {
    selectableRows: "none",
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 25, 50],
    responsive: "standard",
  };

  return (
    <>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <MUIDataTable
            title="Orders"
            data={orders}
            columns={columns}
            options={options}
          />
          <Menu
            anchorEl={menuState.anchorEl}
            open={Boolean(menuState.anchorEl)}
            onClose={handleMenuClose}
          >
            {[
              "Pending",
              "Processing",
              "Ready to Pick up",
              "Completed",
              "Cancelled",
            ].map((status) => (
              <MenuItem
                key={status}
                selected={status === menuState.currentStatus}
                onClick={() => handleStatusChange(status)}
              >
                {status}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </>
  );
};

export default Orders;
