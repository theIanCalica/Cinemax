import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getBorderColor } from "../../../Utils/borderColor";
import Select from "react-select";
import axios from "axios";

const CreateCategory = ({
  onClose,
  notifySuccess,
  notifyError,
  movieToEdit,
  isEditing,
  refresh,
}) => {
  const [genres, setGenres] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields },
  } = useForm();

  const fetchGenres = () => {
    axios
      .get(`${process.env.REACT_APP_API_LINK}/genres`)
      .then((response) => {})
      .catch((error) => {
        notifyError("Error Fetching genres");
        console.error("Error fetching genres:", error);
      });
  };

  useEffect(() => {
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
        ); // Notify success
        onClose(); // Close the modal
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
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? "Edit Category" : "Add Category"}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Title
            </label>
            <input
              id="name"
              type="text"
              className={`w-full px-3 py-2 border rounded-md ${getBorderColor(
                "name",
                errors,
                touchedFields
              )}`}
              {...register("name", { required: "Category name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={1}
              className={`w-full px-3 py-2 border rounded-md ${getBorderColor(
                "name",
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
          <div className="mb-4">
            <label htmlFor="genre" className="block text-gray-700 mb-2">
              Genre
            </label>
            <Select></Select>
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

export default CreateCategory;
