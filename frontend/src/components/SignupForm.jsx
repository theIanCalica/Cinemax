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

const options = [
  { value: "admin", label: "Admin" },
  { value: "user", label: "User" },
];

export const ScreenMode = {
  SIGN_IN: "SIGN_IN",
  SIGN_UP: "SIGN_UP",
};

const SignupForm = ({ onSwitchMode }) => {
  const [step, setStep] = useState(1);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      dob: null,
      phoneNumber: "",
    },
  });

  const [file, setFile] = useState([]); // State for file upload

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const onSubmitStep1 = (data) => {
    console.log("Step 1 Data:", data);
    handleNextStep();
  };

  const onSubmitStep2 = (data) => {
    console.log("Step 2 Data:", data);
    handleNextStep();
  };

  const onSubmitStep3 = (data) => {
    console.log("Uploaded Files:", file); // Include uploaded files
    console.log("Form submitted");
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
                    name="firstName"
                    control={control}
                    rules={{ required: "First name is required" }}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        value={field.value || ""}
                        {...field}
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                      />
                    )}
                  />
                </Stack>
                <Stack spacing={1}>
                  <Typography color={colors.grey[800]}>Last Name</Typography>
                  <Controller
                    name="lastName"
                    control={control}
                    rules={{ required: "Last name is required" }}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        value={field.value || ""}
                        {...field}
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
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
                <Typography color={colors.grey[800]}>Upload Files</Typography>
                <FilePond
                  acceptedFileTypes={["image/*"]}
                  file={file}
                  onupdatefiles={setFile}
                  allowMultiple={false}
                  maxFiles={1}
                  name="files"
                  labelIdle='Drag & Drop your image or <span class="filepond--label-action">Browse</span>'
                  imagePreviewHeight={170}
                  imageCropAspectRatio="1:1"
                  imageResizeTargetWidth={200}
                  allowImageEdit={true} // Enable Image Edit
                  imageResizeTargetHeight={200}
                  stylePanelLayout="compact circle"
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
                  Sign up
                </Button>
              </Stack>
            </Stack>
          </form>
        )}

        <Stack direction="row" spacing={2}>
          <Typography>Already have an account?</Typography>
          <Typography
            onClick={() => onSwitchMode(ScreenMode.SIGN_IN)}
            fontWeight={600}
            sx={{
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            Sign in
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SignupForm;
