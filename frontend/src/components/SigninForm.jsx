import {
  Button,
  Stack,
  TextField,
  Typography,
  colors,
  Box,
} from "@mui/material";
import React from "react";
import { ScreenMode } from "../pages/SigninPage";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { useForm, Controller } from "react-hook-form";

const SigninForm = ({ onSwitchMode }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur", // Trigger validation on blur
  });

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Form submitted", data);
  };

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "100vh",
        color: colors.grey[800],
        p: 2,
        overflow: "hidden",
      }}
    >
      {/* Make sure it's inside a form with onSubmit */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          spacing={3}
          sx={{
            width: "100%",
            maxWidth: "400px",
            p: 3,
            borderRadius: 2,
          }}
        >
          <Stack spacing={2} alignItems="left">
            <Typography variant="h5" fontWeight={600} color={colors.grey[800]}>
              Welcome back
            </Typography>
            <Typography color={colors.grey[600]}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit
            </Typography>
          </Stack>

          <Stack spacing={3}>
            <Stack spacing={1}>
              <Typography color={colors.grey[800]}>Email</Typography>
              <Controller
                name="email"
                control={control}
                rules={{ required: "Email is required" }}
                render={({ field }) => (
                  <TextField
                    size="large"
                    {...field}
                    error={!!errors.email}
                    helperText={errors.email?.message} // Display the error message
                    fullWidth
                    variant="outlined"
                  />
                )}
              />
            </Stack>
            <Stack spacing={1}>
              <Typography color={colors.grey[800]}>Password</Typography>
              <Controller
                name="password"
                control={control}
                rules={{ required: "Password is required" }}
                render={({ field }) => (
                  <TextField
                    type="password"
                    size="large"
                    {...field}
                    error={!!errors.password}
                    helperText={errors.password?.message} // Display the error message
                    fullWidth
                    variant="outlined"
                  />
                )}
              />
            </Stack>

            {/* Add an onSubmit to this button */}
            <Button
              type="submit" // Important for form submission
              variant="contained"
              size="large"
              sx={{
                bgcolor: colors.grey[800],
                "&:hover": {
                  bgcolor: colors.grey[600],
                },
              }}
            >
              Sign in
            </Button>
          </Stack>
        </Stack>
      </form>

      {/* Social Sign-In Buttons and Sign-Up Link (same as before) */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={3} // Adding some margin for better spacing
      >
        <Button
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            padding: 0,
            marginRight: "10px",
            backgroundColor: "transparent",
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: colors.blue[600],
              "& .MuiSvgIcon-root": {
                color: "white",
                transition: "color 0s ease",
              },
            },
          }}
        >
          <FacebookIcon sx={{ color: colors.blue[600] }} />
        </Button>

        <Button
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            padding: 0,
            backgroundColor: "transparent",
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: colors.red[600],
              "& .MuiSvgIcon-root": {
                color: "white",
                transition: "color 0s ease",
              },
            },
          }}
        >
          <GoogleIcon sx={{ color: colors.red[600] }} />
        </Button>
      </Box>

      <Stack direction="row" spacing={1} justifyContent="center" mt={2}>
        <Typography>Don't have an account?</Typography>
        <Typography
          onClick={() => onSwitchMode(ScreenMode.SIGN_UP)}
          fontWeight={600}
          sx={{
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          Sign up now
        </Typography>
      </Stack>
    </Stack>
  );
};

export default SigninForm;
