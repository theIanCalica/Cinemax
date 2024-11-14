import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import { notifySuccess } from "../../Utils/helpers";
import { TextField, Button, Box, Typography, Grid } from "@mui/material";

registerPlugin(FilePondPluginImagePreview, FilePondPluginFileEncode);

const Email = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [files, setFiles] = useState([]);

  // This function will handle the form submission
  const onSubmit = async (data) => {
    console.log("Files being sent:", files);
    // Create a FormData object
    const formData = new FormData();

    // Append fields to the FormData
    formData.append("to", data.to);
    formData.append("subject", data.subject);
    formData.append("message", data.message);

    // Append files to the FormData
    files.forEach((fileItem) => {
      formData.append("files", fileItem.file); // Use the actual File object
    });

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_LINK}/users/send-email`,
        formData, // Send FormData
        {
          headers: {
            "Content-Type": "multipart/form-data", // Use multipart/form-data
          },
        }
      );

      if (response.status === 200) {
        notifySuccess("Email sent successfully!");
        reset(); // Reset the form
        setFiles([]); // Clear the FilePond input
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email.");
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom align="center">
        Send Email
      </Typography>
      <Box
        sx={{
          padding: { xs: 2, sm: 3 },
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {/* To Input */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="To"
                type="email"
                fullWidth
                {...register("to", { required: "Recipient email is required" })}
                error={Boolean(errors.to)}
                helperText={errors.to?.message}
              />
            </Grid>

            {/* Subject Input */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Subject"
                fullWidth
                {...register("subject", { required: "Subject is required" })}
                error={Boolean(errors.subject)}
                helperText={errors.subject?.message}
              />
            </Grid>
          </Grid>

          {/* Message Input */}
          <TextField
            label="Message"
            fullWidth
            multiline
            rows={4}
            {...register("message", { required: "Message is required" })}
            error={Boolean(errors.message)}
            helperText={errors.message?.message}
            sx={{ marginTop: 2 }}
          />

          {/* FilePond Component */}
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="body1" gutterBottom>
              Attachments:
            </Typography>
            <FilePond
              files={files}
              onupdatefiles={setFiles}
              allowMultiple={true}
              maxFiles={5}
              name="files"
              labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
              allowFileEncode={true}
              acceptedFileTypes={["image/*", "application/pdf"]}
            />
          </Box>

          {/* Submit Button */}
          <Box sx={{ marginTop: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                padding: { xs: "10px", sm: "12px" }, // Adjust button padding for small screens
              }}
            >
              Send Email
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default Email;
