import React, { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useForm, Controller } from "react-hook-form";
import {
  getBorderColor,
  notifyError,
  notifySuccess,
  setUser,
} from "../../../Utils/helpers";
import { doUpdateEmail } from "../../../firebase/auth";
import { Grid, Box, Typography, TextField, Button, Paper } from "@mui/material";
import client from "../../../Utils/client";
import dayjs from "dayjs";

const Profile = ({ onClose, user, isEditing }) => {
  const checkUnique = async (value, field) => {
    const userId = user._id;
    try {
      const response = await client.post(`/users/check-unique`, {
        [field]: value,
        id: userId, // Include user ID in the payload
      });
      return response.data.isUnique;
    } catch (error) {
      console.error("Error checking uniqueness:", error);
      return false;
    }
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors, touchedFields },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fname: "",
      lname: "",
      email: "",
      phoneNumber: "",
      dob: null,
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        dob: user.dob ? dayjs(user.dob) : null,
      });
    }
  }, [user, reset]);

  const [isEmailUnique, setIsEmailUnique] = useState(true);

  const onSubmit = async (data) => {
    if (!isEmailUnique) {
      notifyError("Email must be unique");
      return;
    }

    const updatedUser = {
      fname: data.fname,
      lname: data.lname,
      email: data.email,
      phoneNumber: data.phoneNumber,
      dob: data.dob.toISOString(),
    };

    if (data.email !== user.email) {
      await doUpdateEmail(data.email); // Call the function to update email in Firebase
    }

    const url = `/users/update-profile/${user._id}`;
    const method = "PUT";

    client({
      method,
      url,
      headers: {
        "Content-Type": "application/json",
      },
      data: updatedUser,
    })
      .then((response) => {
        console.log(response.data.user);
        setUser(response.data);
        notifySuccess("Profile updated successfully");
        onClose();
      })
      .catch((error) => {
        notifyError(isEditing ? "Error updating user" : "Error creating user");
        console.error(
          isEditing ? "Error updating user:" : "Error creating user:",
          error.response ? error.response.data : error.message
        );
      });
  };

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 600 }}>
        <Typography variant="h5" mb={2}>
          Update Profile
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                fullWidth
                variant="outlined"
                error={!!errors.fname}
                helperText={errors.fname?.message}
                {...register("fname", { required: "First Name is required" })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                fullWidth
                variant="outlined"
                error={!!errors.lname}
                helperText={errors.lname?.message}
                {...register("lname", { required: "Last Name is required" })}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="dob"
                rules={{ required: "Date of Birth is required" }}
                control={control}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      {...field}
                      label="Date of Birth"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          error={!!errors.dob}
                          helperText={errors.dob?.message}
                        />
                      )}
                    />
                  </LocalizationProvider>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                fullWidth
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register("email", {
                  required: "Email is required",
                  validate: async (value) => {
                    const isUnique = await checkUnique(value, "email");
                    if (!isUnique) {
                      setError("email", {
                        type: "manual",
                        message: "Email is already in use",
                      });
                      return false;
                    }
                    return true;
                  },
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone Number"
                fullWidth
                variant="outlined"
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
                {...register("phoneNumber", {
                  required: "Phone Number is required",
                  pattern: {
                    value: /^((09)|(\+639))\d{9}$/,
                    message: "Invalid phone number format",
                  },
                })}
              />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="flex-end">
              <Button
                onClick={onClose}
                variant="outlined"
                sx={{ mr: 2 }}
                color="secondary"
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Update
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default Profile;
