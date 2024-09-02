import { Button, Stack, TextField, Typography, colors } from "@mui/material";
import React from "react";
import { ScreenMode } from "../pages/SigninPage";

const SigninForm = ({ onSwitchMode }) => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "100vh",
        color: colors.grey[800],
        p: 2,
      }}
    >
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
            <TextField size="small" fullWidth variant="outlined" />
          </Stack>
          <Stack spacing={1}>
            <Typography color={colors.grey[800]}>Password</Typography>
            <TextField
              type="password"
              size="small"
              fullWidth
              variant="outlined"
            />
          </Stack>
          <Button
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

        <Stack direction="row" spacing={1} justifyContent="center">
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
    </Stack>
  );
};

export default SigninForm;
