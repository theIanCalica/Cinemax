import React from "react";
import { useForm } from "react-hook-form";
import { notifyError, notifySuccess } from "../../Utils/helpers";
import { TextField, Button, Grid, Typography, Box, Paper } from "@mui/material";
import { LocationOn, Info } from "@mui/icons-material";
import PhoneIcon from "@mui/icons-material/Phone";
import Navbar from "../../components/customer/Navbar/Navbar";
import Hero from "../../components/customer/Hero/Hero";
import client from "../../Utils/client";

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const response = await client.post(`/contacts`, data);
      if (response.status === 201) {
        reset();
        notifySuccess("Message sent successfully!");
      } else {
        notifyError("There was an error submitting the form.");
      }
    } catch (error) {
      notifyError("There was an error submitting the form.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-4">
      {/* Your Navbar Component */}
      <Navbar />
      {/* Your Hero Component */}
      <Hero type="Contact" />
      <hr className="broken-hr" />
      <div className="text-center mt-10">
        <Typography variant="body1" color="textSecondary" fontFamily="serif">
          Contact With Us
        </Typography>
        <Typography variant="h4" fontWeight="bold">
          Feel Free to Write Us Anytime
        </Typography>
      </div>

      <Grid container spacing={3} justifyContent="center" sx={{ my: 5 }}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-3xl"
          style={{ padding: "0 16px" }} // Adding padding for mobile responsiveness
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="name"
                label="Name"
                variant="outlined"
                placeholder="Name"
                {...register("name", { required: "Name is required" })}
                error={!!errors.name}
                helperText={errors.name && errors.name.message}
                sx={{ mb: 3 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="email"
                label="Email"
                variant="outlined"
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email && errors.email.message}
                sx={{ mb: 3 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="phone"
                label="Phone Number"
                variant="outlined"
                type="text"
                maxLength={11}
                placeholder="Phone Number"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^(09\d{9})$/,
                    message:
                      "Invalid phone number. Must start with 09 and contain 11 digits",
                  },
                })}
                error={!!errors.phone}
                helperText={errors.phone && errors.phone.message}
                sx={{ mb: 3 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="subject"
                label="Subject"
                variant="outlined"
                placeholder="Subject"
                {...register("subject", { required: "Subject is required" })}
                error={!!errors.subject}
                helperText={errors.subject && errors.subject.message}
                sx={{ mb: 3 }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="body"
                label="Comment"
                variant="outlined"
                multiline
                rows={4}
                placeholder="Comment"
                {...register("body", { required: "Comment is required" })}
                error={!!errors.body}
                helperText={errors.body && errors.body.message}
                sx={{ mb: 3 }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  height: 50,
                  fontSize: 16,
                  borderRadius: 2,
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#FFEB3B",
                    color: "#000",
                  },
                }}
              >
                Send a Message
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>

      <ContactBoxes />
      <ContactMap />
    </div>
  );
};

const InfoBox = ({ icon, title, description, isImageIcon }) => (
  <Paper
    sx={{
      p: 4,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 2,
      boxShadow: 1,
      height: "200px",
      width: "100%",
      transition: "all 0.3s ease", // Smooth transition for hover effect
      "&:hover": {
        backgroundColor: "#f5f5f5", // Change background color on hover
        boxShadow: 3, // Increase shadow depth on hover
        transform: "scale(1.05)", // Slightly enlarge the box
      },
    }}
  >
    <Box
      sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
    >
      <Typography variant="h6">{title}</Typography>
      <Box sx={{ fontSize: 40, color: "orange" }}>
        {isImageIcon ? (
          <img
            src={icon}
            alt="Icon"
            style={{ width: "50px", height: "50px" }}
          />
        ) : (
          icon
        )}
      </Box>
    </Box>
    <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
      {description.split("\n").map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </Typography>
  </Paper>
);

const ContactBoxes = () => (
  <Grid container spacing={4} justifyContent="center" sx={{ py: 5 }}>
    <Grid item xs={12} md={4}>
      <InfoBox
        icon={<Info />}
        title="About"
        description="Immerse yourself in cinematic magic—where every frame tells a story, and every seat is the best in the house."
      />
    </Grid>
    <Grid item xs={12} md={4}>
      <InfoBox
        icon={<LocationOn />}
        title="Address"
        description="Unit 405, 5th Avenue Building,Bonifacio Global City,Taguig, Metro Manila,Philippines"
      />
    </Grid>
    <Grid item xs={12} md={4}>
      <InfoBox
        icon={<PhoneIcon />}
        title="Contact"
        description="+63 (2) 8800-6780\nsupport@cinemax.com.ph"
      />
    </Grid>
  </Grid>
);

const ContactMap = () => (
  <Box sx={{ my: 5 }}>
    <Typography variant="h5" align="center" sx={{ mb: 4 }}>
      Our Location
    </Typography>
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30895.822356883524!2d121.02126696678947!3d14.54326254615141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c8f3fa2994af%3A0x89c988af4760e40a!2sFort%20Bonifacio%2C%20Taguig%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1731645885847!5m2!1sen!2sph"
        width="100%"
        height="600"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Fort Bonifacio Location Map"
        style={{ border: 0, borderRadius: "10px" }}
      />
    </Box>
  </Box>
);

export default ContactPage;
