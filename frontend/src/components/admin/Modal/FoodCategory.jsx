import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
import client from "../../../Utils/client";
import { notifyError, notifySuccess } from "../../../Utils/helpers";

const CreateCategory = ({ onClose, categoryToEdit, isEditing, refresh }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isEditing && categoryToEdit) {
      reset({ name: categoryToEdit.name });
    } else {
      reset({ name: "" });
    }
  }, [isEditing, categoryToEdit]);

  const onSubmit = (data) => {
    const url = isEditing ? `categories/${categoryToEdit._id}` : `/categories`;
    const method = isEditing ? "PUT" : "POST";

    client({
      method,
      url,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        name: data.name,
      },
    })
      .then((response) => {
        const category = response.data;
        refresh();
        notifySuccess(
          isEditing
            ? "Category updated successfully"
            : "Category created successfully"
        );
        onClose();
      })
      .catch((error) => {
        notifyError(
          isEditing ? "Error updating category" : "Error creating category"
        );
        console.error(
          isEditing ? "Error updating category:" : "Error creating category:",
          error.response ? error.response.data : error.message
        );
      });
  };

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEditing ? "Edit Category" : "Add Category"}</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Box mb={3}>
            <TextField
              id="name"
              label="Category Name"
              fullWidth
              variant="outlined"
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ""}
              {...register("name", { required: "Category name is required" })}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          color="primary"
          variant="contained"
        >
          {isEditing ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateCategory;
