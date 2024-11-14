import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { notifySuccess, notifyError } from "../../../Utils/helpers";
import client from "../../../Utils/client";

const Genre = ({ onClose, refresh, genreToEdit, isEditing }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields },
  } = useForm();

  useEffect(() => {
    if (isEditing && genreToEdit) {
      reset({ name: genreToEdit.name });
    } else {
      reset({ name: "" });
    }
  }, [isEditing, genreToEdit, reset]);

  const onSubmit = (data) => {
    console.log(data);
    const url = isEditing
      ? `${process.env.REACT_APP_API_LINK}/genres/${genreToEdit._id}`
      : `${process.env.REACT_APP_API_LINK}/genres`;
    const method = isEditing ? "PUT" : "POST";

    client({
      method,
      url,
      headers: {
        "Content-Type": "application/json",
      },
      data: { name: data.name },
    })
      .then((response) => {
        refresh();
        notifySuccess(
          isEditing
            ? "Genre updated successfully"
            : "Genre created successfully"
        );
        onClose();
      })
      .catch((error) => {
        notifyError(
          isEditing ? "Error updating genre" : "Error creating genre"
        );
        console.error(
          isEditing ? "Error updating genre:" : "Error creating genre:",
          error.response ? error.response.data : error.message
        );
      });
  };

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEditing ? "Edit Genre" : "Add Genre"}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            id="name"
            label="Genre"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("name", { required: "Genre is required" })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
            className="border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="border-2 border-green-500 text-green-500 font-semibold hover:bg-green-500 hover:text-white"
          >
            {isEditing ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Genre;
