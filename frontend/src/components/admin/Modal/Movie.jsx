import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { getBorderColor } from "../../../Utils/borderColor";
import Select from "react-select";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box } from "@mui/material";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
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
    axios
      .get(`${process.env.REACT_APP_API_LINK}/genres`)
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
      reset({ title: movieToEdit.title });
    } else {
      reset({ title: "" });
    }
  }, [isEditing, movieToEdit]);

  const onSubmit = (data) => {
    const url = isEditing
      ? `http://localhost:4000/api/movies/${movieToEdit._id}`
      : "http://localhost:4000/api/movies";
    const method = isEditing ? "PUT" : "POST";

    axios({
      method,
      url,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        title: data.title,
      },
    })
      .then((response) => {
        const movie = response.data;
        refresh();
        notifySuccess(
          isEditing
            ? "Movie updated successfully"
            : "Movie created successfully"
        );
        refresh();
        onClose();
      })
      .catch((error) => {
        notifyError(
          isEditing ? "Error updating movie" : "Error creating movie"
        );
        console.error(
          isEditing ? "Error updating movie:" : "Error creating movie:",
          error.response ? error.response.data : error.message
        );
      });
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? "Edit Movie" : "Add Movie"}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
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

          {/* Genre */}
          <div className="mb-4">
            <label htmlFor="genre" className="block text-gray-700 mb-2">
              Genre
            </label>
            <Controller
              name="genre"
              control={control}
              rules={{ required: "Genre is required" }}
              render={({ field }) => (
                <Select
                  id="category"
                  options={genres}
                  placeholder="Select Category"
                  isClearable
                  isSearchable
                  {...field}
                  onChange={(selectedOption) => field.onChange(selectedOption)}
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderColor: errors.genre ? "red" : base.borderColor,
                      "&:hover": {
                        borderColor: errors.genre ? "red" : base.borderColor,
                      },
                    }),
                  }}
                />
              )}
            />
            {errors.genre && (
              <p className="text-red-500 text-sm mt-1">
                {errors.genre.message}
              </p>
            )}
          </div>
          {/* Release Date */}
          <div className="mb-4">
            <label htmlFor="dob" className="block text-gray-700 mb-2">
              Release Date
            </label>
            <Controller
              name="dob"
              rules={{ required: "Date of Birth is required" }}
              control={control}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className="w-full">
                    <Box
                      sx={{
                        width: "100%", // Ensure Box takes full width of its container
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px", // Custom border radius
                          width: "100%",
                          "& fieldset": {
                            borderColor: errors.dob ? "#f87171" : "#e5e7eb", // Conditional border color
                          },
                          "&:hover fieldset": {
                            borderColor: errors.dob ? "#f87171" : "#0056b3", // Conditional border color on hover
                          },
                        },
                      }}
                    >
                      <DatePicker
                        {...field}
                        className="MuiDayCalendar-header MuiDayCalendar-weekContainer"
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth // Make the TextField take up all available space
                            onBlur={() => field.onBlur()}
                          />
                        )}
                      />
                    </Box>
                  </div>
                </LocalizationProvider>
              )}
            />

            {errors.dob && (
              <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>
            )}
          </div>
          {/* Movie Duration */}
          <div className="mb-4">
            <label htmlFor="duration" className="block text-gray-700 mb-2">
              Duration
            </label>
            <input
              id="duration"
              type="text"
              className={`w-full px-3 py-2 border rounded-md ${getBorderColor(
                "duration",
                errors,
                touchedFields
              )}`}
              {...register("duration", { required: "Duration is required" })}
            />
            {errors.duration && (
              <p className="text-red-500 text-sm mt-1">
                {errors.duration.message}
              </p>
            )}
          </div>
          {/* Description */}
          <div className="mb-4 col-span-2">
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={2}
              className={`w-full px-3 py-2 border rounded-md ${getBorderColor(
                "description",
                errors,
                touchedFields
              )}`}
              {...register("description", {
                required: "Description is required",
              })}
            ></textarea>

            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
          {/* Image filepond */}
          <div className="mb-4 col-span-2">
            <label className="block text-gray-700 mb-2">Image</label>
            <Controller
              name="image"
              rules={{ required: "Image is required" }}
              control={control}
              render={({ field }) => (
                <FilePond
                  {...field}
                  files={field.value}
                  onupdatefiles={(fileItems) => {
                    field.onChange(fileItems.map((fileItem) => fileItem.file));
                  }}
                  allowMultiple={false}
                  instantUpload={false}
                  acceptedFileTypes={["image/png", "image/jpeg", "image/jpg"]}
                  labelIdle='Drag & Drop your image or <span class="filepond--label-action">Browse</span>'
                />
              )}
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">Image is required</p>
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

export default MovieModal;
