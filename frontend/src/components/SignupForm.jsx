import React, { useState } from "react";
import { Button, Stack, TextField, Typography, colors } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Select from "react-select";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageEdit from "filepond-plugin-image-edit";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";

// Register FilePond plugins
registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageEdit,
  FilePondPluginImageCrop,
  FilePondPluginImageTransform
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
  });

  const [files, setFiles] = useState([]); // State for file upload

  const handleNextStep = () => {
    setStep(2);
  };

  const handlePreviousStep = () => {
    setStep(1);
  };

  const onSubmitStep1 = (data) => {
    console.log("Step 1 Data:", data);
    handleNextStep();
  };

  const onSubmitStep2 = (data) => {
    console.log("Step 2 Data:", data);
    console.log("Uploaded Files:", files); // Include uploaded files
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
        ) : (
          <form onSubmit={handleSubmit(onSubmitStep2)}>
            <Stack spacing={4}>
              <Stack spacing={1}>
                <Typography color={colors.grey[800]}>
                  Profile Picture
                </Typography>
                <FilePond
                  files={files}
                  onupdatefiles={setFiles}
                  allowMultiple={false}
                  maxFiles={1}
                  name="files"
                  labelIdle='Drag & Drop your image or <span class="filepond--label-action">Browse</span>'
                  imagePreviewHeight={170}
                  imageCropAspectRatio="1:1"
                  imageResizeTargetWidth={200}
                  imageResizeTargetHeight={200}
                />
              </Stack>
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
              <Stack spacing={1}>
                <Typography color={colors.grey[800]}>Role</Typography>
                <Controller
                  name="role"
                  control={control}
                  rules={{ required: "Role is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={options}
                      isClearable
                      onChange={(selectedOption) => {
                        field.onChange(
                          selectedOption ? selectedOption.value : null
                        );
                      }}
                      onBlur={() => field.onBlur()}
                      value={options.find(
                        (option) => option.value === field.value
                      )}
                    />
                  )}
                />
                {errors.role && (
                  <Typography color="error" variant="caption">
                    {errors.role.message}
                  </Typography>
                )}
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
