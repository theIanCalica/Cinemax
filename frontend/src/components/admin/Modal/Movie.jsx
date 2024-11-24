import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { getBorderColor } from "../../../Utils/helpers";
import Select from "react-select";
import {
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import client from "../../../Utils/client";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const MovieModal = ({
  onClose,
  notifySuccess,
  notifyError,
  movieToEdit,
  isEditing,
  refresh,
}) => {
  const [genres, setGenres] = useState([]);
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields },
  } = useForm();

  const fetchGenres = () => {
    client
      .get(`/genres`)
      .then((response) => {
        const formattedGenres = response.data.map((genre) => ({
          value: genre._id,
          label: genre.name,
        }));
        setGenres(formattedGenres);
      })
      .catch((error) => {
        notifyError("Error Fetching genres");
        console.error("Error fetching genres:", error);
      });
  };

  useEffect(() => {
    fetchGenres();
    if (isEditing && movieToEdit) {
      reset({
        title: movieToEdit.title,
        description: movieToEdit.description || "",
        price: movieToEdit.price || 0,
        director: movieToEdit.directorName || "",
        producer: movieToEdit.producerName || "",
        writer: movieToEdit.writerName || "",
        mainCast: movieToEdit.mainCast || "",
        release_date: movieToEdit.release_date || null,
        duration: movieToEdit.duration || "",
        rating: movieToEdit.rating || "",
        trailer: movieToEdit.trailer || "",
      });
    } else {
      reset({
        title: "",
        producer: "",
        writer: "",
        description: "",
        price: "",
        director: "",
        mainCast: "",
        release_date: null,
        duration: "",
        rating: "",
      });
    }
  }, [isEditing, movieToEdit]);

  const onSubmit = (data) => {
    const url = isEditing ? `/movies/${movieToEdit._id}` : "/movies";
    const method = isEditing ? "PUT" : "POST";

    // Create a FormData object
    const formData = new FormData();

    // Append regular fields
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("trailer", data.trailer);
    formData.append("producer", data.producer);
    formData.append("writer", data.writer);
    formData.append("director", data.director);
    formData.append("mainCast", data.mainCast);
    formData.append("release_date", data.release_date);
    formData.append("duration", data.duration);
    formData.append("rating", JSON.stringify(data.rating)); // Convert objects to JSON if needed

    // Append genres individually
    if (data.genre && data.genre.length > 0) {
      data.genre.forEach((id) => formData.append("genre[]", id)); // Append each genre ID
    }
    // Append files (if any)
    if (data.image && data.image.length > 0) {
      for (let i = 0; i < data.image.length; i++) {
        formData.append("images", data.image[i]);
      }
    }

    client({
      method,
      url,
      headers: {
        "Content-Type": "multipart/form-data", // Indicate multipart form data
      },
      data: formData, // Use the FormData object
    })
      .then((response) => {
        refresh();
        notifySuccess(
          isEditing
            ? "Movie updated successfully"
            : "Movie created successfully"
        );
        onClose();
      })
      .catch((error) => {
        notifyError(
          isEditing ? "Error updating movie" : "Error creating movie"
        );
        console.error(error.response ? error.response.data : error.message);
      });
  };

  return (
    <Dialog open onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>{isEditing ? "Edit Movie" : "Add Movie"}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                fullWidth
                variant="outlined"
                {...register("title", { required: "Title is required" })}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name="genre"
                control={control}
                rules={{ required: "Genre is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={genres}
                    placeholder="Select Genre"
                    isMulti
                    isClearable
                    onChange={(selectedOptions) => {
                      // Set value for React Hook Form
                      field.onChange(
                        selectedOptions
                          ? selectedOptions.map((option) => option.value)
                          : []
                      );
                    }}
                    onBlur={field.onBlur}
                    value={genres.filter((option) =>
                      field.value?.includes(option.value)
                    )}
                    styles={{
                      control: (base) => ({
                        ...base,
                        borderColor: errors.genre ? "red" : base.borderColor,
                        height: "56px", // Match MUI's default TextField height
                        minHeight: "56px",
                      }),
                      menu: (base) => ({
                        ...base,
                        zIndex: 9999, // Ensure the dropdown menu is above other elements
                      }),
                    }}
                  />
                )}
              />
              {errors.genre && (
                <Typography color="error" variant="caption">
                  {errors.genre.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Price"
                fullWidth
                variant="outlined"
                type="number"
                {...register("price", {
                  required: "Price is required",
                  min: { value: 0, message: "Price must be a positive value" },
                })}
                error={!!errors.price}
                helperText={errors.price?.message}
                inputProps={{ step: "0.01" }} // Allows decimals for currency
              />
            </Grid>

            {[
              { name: "producer", label: "Producer" },
              { name: "writer", label: "Writer" },
              { name: "director", label: "Director" },
              { name: "mainCast", label: "Main Cast" },
            ].map((field) => (
              <Grid item xs={12} sm={6} key={field.name}>
                <TextField
                  label={field.label}
                  fullWidth
                  variant="outlined"
                  {...register(field.name, {
                    required: `${field.label} is required`,
                  })}
                  error={!!errors[field.name]}
                  helperText={errors[field.name]?.message}
                />
              </Grid>
            ))}

            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name="release_date"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      onChange={(newDate) => field.onChange(newDate)}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Duration (minutes)"
                fullWidth
                variant="outlined"
                type="number"
                {...register("duration", { required: "Duration is required" })}
                error={!!errors.duration}
                helperText={errors.duration?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "G", label: "G" },
                      { value: "PG", label: "PG" },
                      { value: "PG-13", label: "PG-13" },
                      { value: "R", label: "R" },
                    ]}
                    styles={{
                      control: (base) => ({
                        ...base,
                        borderColor: errors.genre ? "red" : base.borderColor,
                      }),
                      menu: (base) => ({
                        ...base,
                        zIndex: 9999, // Ensure the dropdown menu is above other elements
                      }),
                    }}
                    placeholder="Select Rating"
                    isClearable
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="YouTube Link"
                fullWidth
                variant="outlined"
                {...register("trailer", {
                  required: "Trailer is required",
                  pattern: {
                    value: /^(https?:\/\/)?(www\.)?(youtube\.(com|be))\/.+$/,
                    message: "Please enter a valid YouTube URL",
                  },
                })}
                error={!!errors.trailer}
                helperText={errors.trailer?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                variant="outlined"
                multiline
                rows={4} // Set the number of rows for the textarea
                {...register("description", {
                  required: "Description is required",
                })}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="image"
                rules={{ required: "Image is required" }}
                control={control}
                render={({ field }) => (
                  <FilePond
                    {...field}
                    files={field.value}
                    onupdatefiles={(fileItems) =>
                      field.onChange(fileItems.map((fileItem) => fileItem.file))
                    }
                    allowMultiple={true}
                    instantUpload={false}
                    acceptedFileTypes={["image/png", "image/jpeg", "image/jpg"]}
                    labelIdle='Drag & Drop your image or <span class="filepond--label-action">Browse</span>'
                  />
                )}
              />
              {errors.image && (
                <Typography color="error" variant="caption">
                  Image is required
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} container justifyContent="flex-end" spacing={1}>
              <Grid item>
                <Button variant="outlined" color="secondary" onClick={onClose}>
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button type="submit" variant="contained" color="primary">
                  {isEditing ? "Update" : "Create"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MovieModal;
