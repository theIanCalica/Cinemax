import React from "react";
import { Box, Button, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";

const PaymentCanceled = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        textAlign="center"
      >
        <CancelIcon color="error" sx={{ fontSize: 80 }} />
        <Typography variant="h4" sx={{ marginTop: 2 }}>
          Payment Canceled
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 1, marginBottom: 3 }}>
          Your payment was not completed. You can try again or return to the
          home page.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleGoHome}>
          Go to Home
        </Button>
      </Box>
    </>
  );
};

export default PaymentCanceled;
