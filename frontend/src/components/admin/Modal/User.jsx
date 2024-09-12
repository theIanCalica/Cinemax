import React, { useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; // You can use 'AdapterDateFns' or other adapters based on preference
import dayjs from "dayjs";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import TextField from "@mui/material/TextField";
import { getBorderColor } from "../../../Utils/borderColor";
const User = ({
  onClose,
  onUserCreated,
  notifySuccess,
  notifyError,
  userToEdit,
  isEditing,
  refresh,
}) => {
  useEffect(() => {
    if (isEditing && userToEdit) {
      reset({
        fname: userToEdit.fname,
        lname: userToEdit.lname,
        email: userToEdit.email,
        phoneNumber: userToEdit.phoneNumber,
        role: options.find((option) => option.value === userToEdit.role),
      });
    }
  }, [isEditing, userToEdit]);

  const options = [
    { value: "Customer", label: "Customer" },
    { value: "ServiceCrew", label: "Service Crew" },
  ];

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? "Edit User" : "Add User"}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="mb-4">
            <label htmlFor="fname" className="block text-gray-700 mb-2">
              First Name
            </label>
            <input
              id="fname"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md h-14"
              {...register("fname", { required: "First Name is required" })}
            />
            {errors.fname && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fname.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="lname" className="block text-gray-700 mb-2">
              Last Name
            </label>
            <input
              id="lname"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md h-14"
              {...register("lname", { required: "Last Name is required" })}
            />
            {errors.lname && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lname.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="dob" className="block text-gray-700 mb-2">
              Date of Birth
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                className="w-full "
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{
                      "& input": {
                        height: "1.5rem", // Adjust input height here
                      },
                      "& .MuiInputBase-root": {
                        height: "2rem", // Adjust container height here
                      },
                    }}
                  />
                )}
              />
            </LocalizationProvider>
            {errors.dob && (
              <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="text"
              {...register("email", { required: "Email is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md h-14"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md h-14"
              {...register("phoneNumber", {
                required: "Phone Number is required",
              })}
              maxLength={11}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-700 mb-2">
              Role
            </label>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={options}
                  className="w-full rounded-md"
                  classNamePrefix="react-select" // Prefix for easier targeting with styles
                  isClearable
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      height: "3.5rem", // Adjust height here
                      minHeight: "3.5rem", // Ensure minimum height
                      borderColor: state.isFocused ? "#4ade80" : "#d1d5db", // Tailwind border colors
                      boxShadow: state.isFocused
                        ? "0 0 0 1px #4ade80"
                        : provided.boxShadow,
                    }),
                    valueContainer: (provided) => ({
                      ...provided,
                      height: "100%", // Align container height
                      padding: "0 0.75rem", // Adjust padding
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      height: "100%", // Align single value height
                      lineHeight: "3.5rem", // Center text vertically
                    }),
                    indicator: (provided) => ({
                      ...provided,
                      height: "100%", // Align indicator height
                      padding: "0", // Remove extra padding
                    }),
                    indicatorsContainer: (provided) => ({
                      ...provided,
                      height: "100%", // Align indicators container height
                    }),
                    menu: (provided) => ({
                      ...provided,
                      zIndex: 9999, // Ensure the dropdown is on top of other elements
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      textAlign: "left", // Align text to the left
                      display: "flex",
                      alignItems: "center", // Center text vertically
                      backgroundColor: state.isSelected
                        ? "#4ade80"
                        : provided.backgroundColor, // Tailwind color
                      color: state.isSelected ? "#fff" : provided.color,
                      "&:hover": {
                        backgroundColor: "#d1d5db", // Tailwind color on hover
                      },
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: "#9ca3af", // Tailwind text-gray-400 color
                    }),
                  }}
                />
              )}
            />
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>
          <div className="flex justify-end col-span-1 md:col-span-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md text-gray-500 border border-gray-300 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md font-semibold border-2 text-green-500 border-green-500 hover:bg-green-500 hover:text-white"
            >
              {isEditing ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default User;
