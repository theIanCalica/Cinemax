import React, { useState } from "react";
import { Button, Stack, TextField, Typography, colors } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginImageEdit from "filepond-plugin-image-edit";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { Box } from "@mui/material";
import axios from "axios";
import { notifySuccess, notifyError } from "../Utils/helpers";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";
import { useNavigate } from "react-router-dom";

// Register FilePond plugins
registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageCrop,
  FilePondPluginImageResize,
  FilePondPluginImageTransform,
  FilePondPluginImageEdit
);

export const ScreenMode = {
  SIGN_IN: "SIGN_IN",
  SIGN_UP: "SIGN_UP",
};

const SignupForm = ({ onSwitchMode }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // State to store data from each step
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    dob: null,
    phoneNumber: "",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: formData,
  });

  const [file, setFile] = useState([]); // State for file upload

  // Function to handle step changes
  const handleNextStep = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const onSubmitStep1 = (data) => {
    handleNextStep(data);
  };

  const onSubmitStep2 = (data) => {
    handleNextStep(data);
  };

  // Final submit handler
  const onSubmitStep3 = async (data) => {
    const completeData = new FormData();
    completeData.append("file", file.length > 0 ? file[0].file : null); // Adding the file
    for (const key in data) {
      completeData.append(key, data[key]); // Append other form data
    }
    await doCreateUserWithEmailAndPassword(data.email, data.password);
    console.log(completeData);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_LINK}/users/registration`,
        completeData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/");
      console.log("Server response:", response.data);
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data); // Server's response with details
      } else {
        console.error("Error uploading data:", error.message);
      }
    }
  };

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "100%",
        color: colors.grey[800],
      }}
    >
      <Stack
        spacing={5}
        sx={{
          width: "100%",
          maxWidth: "500px",
        }}
      >
        {step === 1 ? (
          <form onSubmit={handleSubmit(onSubmitStep1)}>
            {/* Step 1 - Basic Information */}
            <Stack>
              <Typography
                variant="h4"
                fontWeight={600}
                color={colors.grey[800]}
              >
                Create an account
              </Typography>
              <Typography color={colors.grey[600]}>
                Doloribus dolorem impedit aliquam sit veniam
              </Typography>
            </Stack>

            <Stack spacing={4}>
              <Stack spacing={2}>
                <Stack spacing={1}>
                  <Typography color={colors.grey[800]}>First Name</Typography>
                  <Controller
                    name="fname"
                    control={control}
                    rules={{ required: "First name is required" }}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        value={field.value || ""}
                        {...field}
                        error={!!errors.fname}
                        helperText={errors.fname?.message}
                      />
                    )}
                  />
                </Stack>
                <Stack spacing={1}>
                  <Typography color={colors.grey[800]}>Last Name</Typography>
                  <Controller
                    name="lname"
                    control={control}
                    rules={{ required: "Last name is required" }}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        value={field.value || ""}
                        {...field}
                        error={!!errors.lname}
                        helperText={errors.lname?.message}
                      />
                    )}
                  />
                </Stack>
                <Stack spacing={1}>
                  <Typography color={colors.grey[800]}>Email</Typography>
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                        message: "Email is not valid",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        value={field.value || ""}
                        {...field}
                        error={!!errors.email}
                        helperText={errors.email?.message}
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
                        fullWidth
                        value={field.value || ""}
                        {...field}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                      />
                    )}
                  />
                </Stack>
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
                type="submit"
              >
                Next
              </Button>
            </Stack>
          </form>
        ) : step === 2 ? (
          <form onSubmit={handleSubmit(onSubmitStep2)}>
            {/* Step 2 - Additional Information */}
            <Stack spacing={4}>
              <Stack spacing={1}>
                <Typography color={colors.grey[800]}>Date of Birth</Typography>
                <Controller
                  name="dob"
                  control={control}
                  rules={{ required: "Date of Birth is required" }}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        {...field}
                        renderInput={(params) => (
                          <TextField
                            fullWidth
                            {...params}
                            error={!!errors.dob}
                            helperText={errors.dob?.message}
                          />
                        )}
                        onChange={(date) => field.onChange(date)}
                      />
                    </LocalizationProvider>
                  )}
                />
              </Stack>
              <Stack spacing={1}>
                <Typography color={colors.grey[800]}>Phone Number</Typography>
                <Controller
                  name="phoneNumber"
                  control={control}
                  rules={{ required: "Phone Number is required" }}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      {...field}
                      error={!!errors.phoneNumber}
                      helperText={errors.phoneNumber?.message}
                    />
                  )}
                />
              </Stack>

              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: colors.grey[800],
                    "&:hover": {
                      bgcolor: colors.grey[600],
                    },
                  }}
                  onClick={handlePreviousStep}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: colors.grey[800],
                    "&:hover": {
                      bgcolor: colors.grey[600],
                    },
                  }}
                  type="submit"
                >
                  Next
                </Button>
              </Stack>
            </Stack>
          </form>
        ) : (
          <form onSubmit={handleSubmit(onSubmitStep3)}>
            {/* Step 3 - File Upload */}
            <Stack spacing={4}>
              <Stack spacing={1}>
                <Typography color={colors.grey[800]}>
                  Profile Picture
                </Typography>
                <FilePond
                  acceptedFileTypes={["image/*"]}
                  files={file}
                  onupdatefiles={setFile}
                  allowMultiple={false}
                  maxFiles={1}
                  name="file"
                  labelIdle='Drag & Drop your image or <span class="filepond--label-action">Browse</span>'
                  imagePreviewHeight={200}
                  imageCropAspectRatio="1:1"
                  imageResizeTargetWidth={200}
                  imageResizeTargetHeight={200}
                  allowImageEdit={true}
                  stylePanelLayout="circle compact"
                  styleLoadIndicatorPosition="center bottom"
                  styleButtonRemoveItemPosition="center bottom"
                />
              </Stack>

              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: colors.grey[800],
                    "&:hover": {
                      bgcolor: colors.grey[600],
                    },
                  }}
                  onClick={handlePreviousStep}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: colors.grey[800],
                    "&:hover": {
                      bgcolor: colors.grey[600],
                    },
                  }}
                  type="submit"
                >
                  Submit
                </Button>
              </Stack>
            </Stack>
          </form>
        )}
      </Stack>
      <Stack direction="row" spacing={1} justifyContent="center" mt={2}>
        <Typography>Already have an account</Typography>
        <Typography
          onClick={() => onSwitchMode(ScreenMode.SIGN_IN)}
          fontWeight={600}
          sx={{
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          Sign in now
        </Typography>
      </Stack>
    </Stack>
  );
};

export default SignupForm;
