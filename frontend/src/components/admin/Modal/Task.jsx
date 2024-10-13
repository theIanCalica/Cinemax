import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField, Checkbox, FormControlLabel } from "@mui/material";
import axios from "axios";
import { getBorderColor } from "../../../Utils/borderColor";
import { Box } from "@mui/material";
import { getUser } from "../../../Utils/helpers";

const Task = ({
  onClose,
  notifySuccess,
  notifyError,
  taskToEdit = {},
  isEditing,
  refresh,
}) => {
  const [users, setUsers] = useState([]);
  const [showEmployeeSelect, setShowEmployeeSelect] = useState(false);
  const user = getUser();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      title: taskToEdit?.title || "",
      description: taskToEdit?.description || "",
      priority: taskToEdit?.priority || null,
      dueDate: taskToEdit?.dueDate || null,
      isAssigned: true,
    },
  });

  const fetchUsers = () => {
    axios
      .get(`${process.env.REACT_APP_API_LINK}/users/employees`)
      .then((response) => {
        // Log the response to check its structure
        console.log("API Response:", response.data);

        // Check if response.data is an array
        const usersData = Array.isArray(response.data)
          ? response.data
          : response.data.data;

        // Ensure usersData is an array before mapping
        if (Array.isArray(usersData)) {
          const userOptions = usersData.map((user) => ({
            value: user._id,
            label: user.fname + " " + user.lname,
          }));
          setUsers(userOptions);
        } else {
          throw new Error(
            "Expected an array but received a different structure."
          );
        }
      })
      .catch((error) => {
        notifyError("Error Fetching users");
        console.error("Error fetching users:", error);
      });
  };

  const options = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

  const onSubmit = (data) => {
    let task = {};
    if (data.isAssigned === true) {
      task = {
        title: data.title,
        description: data.description,
        priority: data.priority.value,
        dueDate: data.dueDate.toISOString(),
        user: user._id,
      };
      console.log(task);
    }

    const url = isEditing
      ? `${process.env.REACT_APP_API_LINK}/tasks/${taskToEdit._id}`
      : `${process.env.REACT_APP_API_LINK}/tasks`;
    const method = isEditing ? "PUT" : "POST";

    axios({
      method,
      url,
      headers: {
        "Content-Type": "application/json",
      },
      data: task,
    })
      .then((response) => {
        notifySuccess(
          isEditing ? "Task updated successfully" : "Task created successfully"
        );
        refresh();
        onClose();
      })
      .catch((error) => {
        notifyError(isEditing ? "Error updating task" : "Error creating task");
        console.error(
          isEditing ? "Error updating task:" : "Error creating task:",
          error.response ? error.response.data : error.message
        );
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? "Edit Task" : "Add Task"}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Task Title */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 mb-2">
              Title
            </label>
            <input
              id="title"
              type="text"
              className={`w-full px-3 py-2 border rounded-md ${getBorderColor(
                "title",
                errors,
                touchedFields
              )}`}
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Task Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 mb-2">
              Description
            </label>
            <input
              id="description"
              type="text"
              className={`w-full px-3 py-2 border rounded-md ${getBorderColor(
                "description",
                errors,
                touchedFields
              )}`}
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Task Priority */}
          <div className="mb-4">
            <label htmlFor="priority" className="block text-gray-700 mb-2">
              Priority
            </label>
            <Controller
              name="priority"
              control={control}
              rules={{ required: "Priority is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={options}
                  classNamePrefix="react-select"
                  isClearable
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      height: "3.5rem",
                      minHeight: "3.5rem",
                      boxShadow: state.isFocused
                        ? "0 0 0 1px #4ade80"
                        : provided.boxShadow,
                      borderColor: errors.priority
                        ? "#f87171"
                        : provided.borderColor,
                      borderWidth: "1px",
                    }),
                    valueContainer: (provided) => ({
                      ...provided,
                      height: "100%",
                      padding: "0 0.75rem",
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      height: "100%",
                      lineHeight: "3.5rem",
                    }),
                    indicator: (provided) => ({
                      ...provided,
                      height: "100%",
                      padding: "0",
                    }),
                    indicatorsContainer: (provided) => ({
                      ...provided,
                      height: "100%",
                    }),
                    menu: (provided) => ({
                      ...provided,
                      zIndex: 9999,
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: state.isSelected
                        ? "#4ade80"
                        : provided.backgroundColor,
                      color: state.isSelected ? "#fff" : provided.color,
                      "&:hover": {
                        backgroundColor: "#d1d5db",
                      },
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: "#9ca3af",
                    }),
                  }}
                />
              )}
            />
            {errors.priority && (
              <p className="text-red-500 text-sm mt-1">
                {errors.priority.message}
              </p>
            )}
          </div>

          {/* Due Date */}
          <div className="mb-4">
            <label htmlFor="dueDate" className="block text-gray-700 mb-2">
              Due Date
            </label>
            <Controller
              name="dueDate"
              rules={{ required: "Due Date is required" }}
              control={control}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Box
                    sx={{
                      width: 300,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        "& fieldset": {
                          borderColor: errors.dueDate ? "#f87171" : "#e5e7eb",
                        },
                        "&:hover fieldset": {
                          borderColor: errors.dueDate ? "#f87171" : "#0056b3",
                        },
                      },
                    }}
                  >
                    <DateTimePicker
                      {...field}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          id="dueDate"
                          sx={{
                            "& .MuiInputBase-root": {
                              border: `1px solid ${
                                errors.dueDate ? "#f87171" : "#e5e7eb"
                              }`,
                            },
                            "& .MuiFormLabel-root": {
                              color: errors.dueDate ? "#f87171" : "#6b7280",
                            },
                          }}
                        />
                      )}
                    />
                  </Box>
                </LocalizationProvider>
              )}
            />
            {errors.dueDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.dueDate.message}
              </p>
            )}
          </div>

          {showEmployeeSelect && (
            <div className="mb-4 col-span-1 md:col-span-2">
              <label htmlFor="isAssigned" className="block text-gray-700 mb-2">
                Assign to Employee
              </label>
              <Controller
                name="isAssigned"
                control={control}
                rules={{ required: "Please select an employee" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={users}
                    isClearable
                    placeholder="Select an employee"
                    classNamePrefix="react-select"
                  />
                )}
              />
              {errors.assignedEmployee && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.assignedEmployee.message}
                </p>
              )}
            </div>
          )}

          {/* Completed Checkbox */}
          <div className="mb-4 col-span-1 md:col-span-2">
            <Controller
              name="isAssigned"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      checked={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        setShowEmployeeSelect(!e.target.checked);
                      }}
                    />
                  }
                  label="Assign to me"
                />
              )}
            />
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

export default Task;
