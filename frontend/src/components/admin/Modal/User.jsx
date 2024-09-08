import React, { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; // You can use 'AdapterDateFns' or other adapters based on preference
import dayjs from "dayjs"; // Needed to work with Day.js dates
import Select from "react-select";
const User = ({
  onClose,
  onUserCreated,
  notifySuccess,
  notifyError,
  userToEdit,
  isEditing,
  refresh,
}) => {
  const [state, setState] = useState({
    fname: "",
    lname: "",
    dob: dayjs(), // Use dayjs for the date
    email: "",
    phoneNumber: "",
    role: "",
  });

  // Handle changes for input fields
  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  // Handle date change
  const handleDateChange = (newDate) => {
    setState({ ...state, dob: newDate });
  };

  useEffect(() => {
    if (isEditing && userToEdit) {
      // Pre-fill the form when editing
      setState({
        fname: userToEdit.fname,
        lname: userToEdit.lname,
        dob: dayjs(userToEdit.dob), // Convert the user's dob to dayjs
        email: userToEdit.email,
        phoneNumber: userToEdit.phoneNumber,
        role: userToEdit.role,
      });
    }
  }, [isEditing, userToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isEditing
      ? `http://localhost:4000/api/users/${userToEdit._id}`
      : "http://localhost:4000/api/users";

    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...state, dob: state.dob.toISOString() }), // Convert date to ISO format
      });

      if (response.ok) {
        const user = await response.json();
        onUserCreated(user);
        notifySuccess(
          isEditing ? "User updated successfully" : "User created successfully"
        );
        onClose();
      } else {
        notifyError(
          isEditing ? "Failed to update user" : "Failed to create user"
        );
        console.error(
          isEditing ? "Failed to update user" : "Failed to create user",
          response.statusText
        );
      }
    } catch (err) {
      notifyError(isEditing ? "Error updating user" : "Error creating user");
      console.error(
        isEditing ? "Error updating user:" : "Error creating user:",
        err
      );
    }
  };

  const options = [
    { value: "Customer", label: "Customer" },
    { value: "ServiceCrew", label: "Service Crew" },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? "Edit User" : "Add User"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fname" className="block text-gray-700 mb-2">
              First Name
            </label>
            <input
              id="fname"
              type="text"
              onChange={handleChange("fname")}
              value={state.fname}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lname" className="block text-gray-700 mb-2">
              Last Name
            </label>
            <input
              id="lname"
              type="text"
              onChange={handleChange("lname")}
              value={state.lname}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="dob" className="block text-gray-700 mb-2">
              Date of Birth
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={state.dob}
                onChange={handleDateChange}
                renderInput={(params) => (
                  <input
                    {...params}
                    className="w-full px-3 py-2 border border-gray-300 w-full rounded-md"
                    required
                  />
                )}
              />
            </LocalizationProvider>
          </div>
          <div className="mb-4">
            <label htmlFor="fname" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              id="fname"
              type="text"
              onChange={handleChange("fname")}
              value={state.fname}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fname" className="block text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              id="fname"
              type="text"
              onChange={handleChange("fname")}
              value={state.fname}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
              maxLength={11}
            />
          </div>
          <div className="flex justify-end">
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
