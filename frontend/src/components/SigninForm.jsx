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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authenticate } from "../Utils/helpers";
import { useDispatch } from "react-redux";
import { setUser } from "../actions/userAction";

const SigninForm = ({ onSwitchMode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form submitted", data);
    axios
      .post(`${process.env.REACT_APP_API_LINK}/auth/login`, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log("Response:", response.data);
        const user = response.data.user;
        authenticate(response.data, () => navigate("/admin"));
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error response:", error.response.data);
          console.error("Error status:", error.response.status);
        } else {
          console.error("Error message:", error.message);
        }
      });
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
                    value={field.value || ""}
                    error={!!errors.email}
                    helperText={errors.email?.message}
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
                rules={{
                  required: "Password is required",
                  validate: (value) =>
                    value.trim() !== "" || "Password cannot be empty",
                }}
                render={({ field }) => (
                  <TextField
                    type="password"
                    size="large"
                    {...field}
                    value={field.value || ""}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    fullWidth
                    variant="outlined"
                  />
                )}
              />
            </Stack>
            <Button
              type="submit"
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
      <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
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
