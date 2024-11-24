import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  MenuItem,
  Select,
} from "@mui/material";
import client from "../../../Utils/client";
import { notifySuccess, notifyError, getUser } from "../../../Utils/helpers";

const Task = ({ onClose, taskToEdit = {}, isEditing, refresh }) => {
  const user = getUser();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      title: taskToEdit?.title || "",
      description: taskToEdit?.description || "",
      priority: taskToEdit?.priority || "",
      dueDate: taskToEdit?.dueDate || null,
    },
  });

  const onSubmit = (data) => {
    const task = {
      title: data.title,
      description: data.description,
      priority: data.priority,
      dueDate: data.dueDate.toISOString(),
      user: data.isAssigned ? user._id : data.assignedEmployee,
    };

    const url = isEditing
      ? `${process.env.REACT_APP_API_LINK}/tasks/${taskToEdit._id}`
      : `${process.env.REACT_APP_API_LINK}/tasks`;
    const method = isEditing ? "PUT" : "POST";

    client({
      method,
      url,
      headers: {
        "Content-Type": "application/json",
      },
      data: task,
    })
      .then(() => {
        notifySuccess(
          isEditing ? "Task updated successfully" : "Task created successfully"
        );
        refresh();
        reset();
        onClose();
      })
      .catch((error) => {
        notifyError(isEditing ? "Error updating task" : "Error creating task");
        console.error(
          isEditing ? "Error updating task:" : "Error creating task:",
          error
        );
      });
  };

  useEffect(() => {
    if (isEditing) {
      reset({
        title: taskToEdit.title || "",
        description: taskToEdit.description || "",
        priority: taskToEdit.priority || "",
        dueDate: taskToEdit.dueDate ? new Date(taskToEdit.dueDate) : null,
      });
    }
  }, [taskToEdit, isEditing, reset]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        inset: 0,
        bgcolor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1200,
      }}
    >
      <Box
        sx={{
          bgcolor: "white",
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          width: "100%",
          maxWidth: 600,
        }}
      >
        <Typography variant="h5" mb={2}>
          {isEditing ? "Edit Task" : "Add Task"}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                fullWidth
                {...register("title", { required: "Title is required" })}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                {...register("description", {
                  required: "Description is required",
                })}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="priority"
                control={control}
                rules={{ required: "Priority is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    displayEmpty
                    fullWidth
                    error={!!errors.priority}
                    renderValue={(selected) => selected || "Select Priority"}
                  >
                    <MenuItem value="" disabled>
                      Select Priority
                    </MenuItem>
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                  </Select>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="dueDate"
                control={control}
                rules={{ required: "Due Date is required" }}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      {...field}
                      onChange={field.onChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          error={!!errors.dueDate}
                          helperText={errors.dueDate?.message}
                        />
                      )}
                    />
                  </LocalizationProvider>
                )}
              />
            </Grid>
          </Grid>
          <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
            <Button onClick={onClose} variant="outlined">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {isEditing ? "Update" : "Create"}
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Task;
