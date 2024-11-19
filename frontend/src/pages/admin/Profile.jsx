import React, { useState } from "react";
import { EditOutlined } from "@mui/icons-material";
import {
  Button,
  Typography,
  Grid,
  Paper,
  Avatar,
  Box,
  IconButton,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import {
  getUser,
  formatDate,
  notifySuccess,
  notifyError,
  setUser,
} from "../../Utils/helpers";
import ProfileModal from "../../components/admin/Modal/Profile";
import ChangePasswordModal from "../../components/admin/Modal/ChangePasswordModal";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import client from "../../Utils/client";

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const user = getUser();

  const handleEditProfile = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenPasswordModal = () => {
    setIsPasswordModalOpen(true);
  };

  const handleClosePasswordModal = () => {
    setIsPasswordModalOpen(false);
  };

  const handleLinkGoogleAccount = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse?.credential);
    const clean_data = {
      provider_id: decoded.sub,
      user_id: user._id,
    };
    console.log(clean_data);
    client.put("/auth/link-google", clean_data).then((response) => {
      if (response.status === 200) {
        notifySuccess("Successfully linked");
        setUser(response.data);
      } else {
        notifyError("Something went wrong");
      }
    });
  };

  return (
    <Box className="container" sx={{ maxWidth: "lg", marginTop: 8 }}>
      {/* Page Header */}
      <Box display="flex" justifyContent="space-between" mb={4}>
        <Typography variant="h4" fontWeight="bold">
          Admin Profile
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span className="text-blue-500 hover:underline">Home</span> /{" "}
          <span> Profile</span>
        </Typography>
      </Box>

      {/* Profile Information Section */}
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap={2}>
            {/* Profile Image */}
            <Avatar
              alt="Profile"
              src={user.profile.url}
              sx={{ width: 96, height: 96 }}
            />
            {/* User Details */}
            <Box>
              <Typography variant="h6" fontWeight="semibold">
                {user.fname + " " + user.lname}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user?.email || "admin@example.com"}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight="bold"
              >
                Administrator
              </Typography>
            </Box>
          </Box>
          {/* Edit Profile Button */}
          <IconButton onClick={handleEditProfile} color="primary">
            <EditOutlined />
          </IconButton>
        </Box>
      </Paper>

      <Grid container spacing={4} mt={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="semibold" gutterBottom>
              Profile Details
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              <strong>Name:</strong> {user.fname + " " + user.lname || "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              <strong>Date of Birth:</strong>{" "}
              {user?.dob ? formatDate(user.dob) : "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              <strong>Email:</strong> {user?.email || "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              <strong>Phone:</strong> {user?.phoneNumber || "N/A"}
            </Typography>

            {/* Change Password Button */}
            <Box display="flex" justifyContent="center" mt={4}>
              <Button
                variant="contained"
                color="error"
                onClick={handleOpenPasswordModal}
              >
                Change Password
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Linked Accounts Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="semibold" gutterBottom>
              Linked Accounts
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              <strong>Facebook:</strong>{" "}
              {user?.linkedAccounts?.facebook || "Not Linked"}
              {!user?.linkedAccounts?.facebook && (
                <Button variant="outlined" color="primary" sx={{ ml: 2 }}>
                  Link Facebook
                </Button>
              )}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              <strong>Google:</strong>{" "}
              {user?.socialAccounts?.find(
                (account) => account.provider === "google"
              ) ? (
                <Button variant="outlined" color="primary" sx={{ ml: 2 }}>
                  Already Linked
                </Button>
              ) : (
                <GoogleLogin
                  onSuccess={handleLinkGoogleAccount}
                  onError={() => {
                    console.error("Google login failed");
                    alert("Failed to authenticate with Google.");
                  }}
                  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                />
              )}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {isModalOpen && (
        <ProfileModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          user={user}
        />
      )}
      {isPasswordModalOpen && (
        <ChangePasswordModal
          isOpen={isPasswordModalOpen}
          onClose={handleClosePasswordModal}
        />
      )}
    </Box>
  );
};

export default Profile;
