import React, { useState } from "react";
import {
  getUser,
  notifyError,
  notifySuccess,
  setUser,
} from "../../Utils/helpers";
import Hero from "../../components/customer/Hero/Hero";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { PhotoCamera, Google, Facebook } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import client from "../../Utils/client";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const Profile = () => {
  const user = getUser();
  const [isEmailUnique, setIsEmailUnique] = useState(true);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openChangePasswordDialog, setOpenChangePasswordDialog] =
    useState(false);

  const { control: editControl, handleSubmit: handleEditSubmit } = useForm({
    defaultValues: {
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      phone: user.phone,
      dob: user.dob ? dayjs(user.dob) : null,
    },
  });

  const {
    control: passwordControl,
    handleSubmit: handlePasswordSubmit,
    getValues,
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

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

  const handleSaveProfile = async (data) => {
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

    console.log(updatedUser);
    try {
      await client
        .put(`/users/update-profile/${user._id}`, data)
        .then((response) => {
          setUser(response.data);
          notifySuccess("Profile updated successfully.");
          setOpenEditDialog(false);
        }); // Adjust API call
    } catch (error) {
      console.error("Error updating profile:", error);
      notifyError("Failed to update profile.");
    }
  };

  const handleSavePassword = async (data) => {
    const { currentPassword, newPassword, confirmPassword } = data;

    if (newPassword !== confirmPassword) {
      notifyError("New password and confirm password do not match.");
      return;
    }

    try {
      await client.post(`/users/change-password/${user._id}`, {
        currentPassword,
        newPassword,
      });
      notifySuccess("Password updated successfully.");
      setOpenChangePasswordDialog(false);
    } catch (error) {
      console.error("Error changing password:", error);
      notifyError("Failed to update password.");
    }
  };

  return (
    <>
      <Hero type="Profile" />
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Profile Picture */}
          <Grid item xs={12} sm={4} display="flex" justifyContent="center">
            <Box sx={{ position: "relative", width: 150, height: 150 }}>
              <Avatar
                src={user.profile.url || ""}
                alt={`${user.fname} ${user.lname}`}
                sx={{ width: 150, height: 150 }}
              />
              <IconButton
                color="primary"
                component="label"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  bgcolor: "rgba(0, 0, 0, 0.6)",
                  color: "white",
                  "&:hover": { bgcolor: "primary.dark" },
                }}
              >
                <PhotoCamera />
                <input type="file" hidden accept="image/*" />
              </IconButton>
            </Box>
          </Grid>

          {/* User Information */}
          <Grid item xs={12} sm={8}>
            <Typography variant="h6">Name</Typography>
            <Typography variant="body1">{`${user.fname} ${user.lname}`}</Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Email
            </Typography>
            <Typography variant="body1">{user.email}</Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Phone Number
            </Typography>
            <Typography variant="body1">{user.phonenumber}</Typography>
          </Grid>
        </Grid>

        {/* Buttons for actions */}
        <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenEditDialog(true)}
          >
            Edit Profile
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpenChangePasswordDialog(true)}
          >
            Change Password
          </Button>
        </Box>
      </Box>

      {/* Edit Profile Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Profile</DialogTitle>
        <form onSubmit={handleEditSubmit(handleSaveProfile)}>
          <DialogContent>
            <Controller
              name="fname"
              control={editControl}
              render={({ field }) => (
                <TextField
                  margin="dense"
                  label="First Name"
                  fullWidth
                  {...field}
                />
              )}
            />
            <Controller
              name="lname"
              control={editControl}
              render={({ field }) => (
                <TextField
                  margin="dense"
                  label="Last Name"
                  fullWidth
                  {...field}
                />
              )}
            />
            <Controller
              name="email"
              control={editControl}
              render={({ field }) => (
                <TextField margin="dense" label="Email" fullWidth {...field} />
              )}
            />
            <Controller
              name="phone"
              control={editControl}
              render={({ field }) => (
                <TextField
                  margin="dense"
                  label="Phone Number"
                  fullWidth
                  {...field}
                />
              )}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="dob"
                control={editControl}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="Date of Birth"
                    inputFormat="MM/DD/YYYY"
                    renderInput={(params) => (
                      <TextField {...params} margin="dense" fullWidth />
                    )}
                  />
                )}
              />
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog
        open={openChangePasswordDialog}
        onClose={() => setOpenChangePasswordDialog(false)}
      >
        <DialogTitle>Change Password</DialogTitle>
        <form onSubmit={handlePasswordSubmit(handleSavePassword)}>
          <DialogContent>
            <Controller
              name="currentPassword"
              control={passwordControl}
              render={({ field }) => (
                <TextField
                  margin="dense"
                  label="Current Password"
                  type="password"
                  fullWidth
                  {...field}
                />
              )}
            />
            <Controller
              name="newPassword"
              control={passwordControl}
              render={({ field }) => (
                <TextField
                  margin="dense"
                  label="New Password"
                  type="password"
                  fullWidth
                  {...field}
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={passwordControl}
              render={({ field }) => (
                <TextField
                  margin="dense"
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  {...field}
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenChangePasswordDialog(false)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default Profile;
