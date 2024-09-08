import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const Genre = ({
  onClose,
  onGenreCreated,
  notifySuccess,
  notifyError,
  genreToEdit,
  isEditing,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isEditing && genreToEdit) {
      reset({ name: genreToEdit.name });
    } else {
      reset({ name: "" });
    }
  }, [isEditing, genreToEdit, reset]);

  // Utility function to determine input border color
  const getBorderColor = (fieldName) => {
    if (errors[fieldName]) {
      return "border-red-500";
    }
    return "border-gray-200";
  };

  const onSubmit = async (data) => {
    const url = isEditing
      ? `http://localhost:4000/api/genres/${genreToEdit._id}`
      : "http://localhost:4000/api/genres";
    const method = isEditing ? "PUT" : "POST";
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: data.name }),
      });

      if (response.ok) {
        const genre = await response.json();
        onGenreCreated(genre); // Add the new or updated genre to the list
        notifySuccess(
          isEditing
            ? "Genre updated successfully"
            : "Genre created successfully"
        ); // Notify success
        onClose(); // Close the modal
      } else {
        notifyError(
          isEditing ? "Failed to update genre" : "Failed to create genre"
        );
        console.error(
          isEditing ? "Failed to update genre:" : "Failed to create genre:",
          response.statusText
        );
      }
    } catch (error) {
      notifyError(isEditing ? "Error updating genre" : "Error creating genre");
      console.error(
        isEditing ? "Error updating genre:" : "Error creating genre:",
        error
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? "Edit Genre" : "Add Genre"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="genre" className="block text-gray-700 mb-2">
              Genre
            </label>
            <input
              id="genre"
              type="text"
              className={`w-full px-3 py-2 border rounded-md ${getBorderColor(
                "name"
              )}`}
              {...register("name", { required: "Genre is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
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

export default Genre;
