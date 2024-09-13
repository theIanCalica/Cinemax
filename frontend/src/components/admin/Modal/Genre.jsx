import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { getBorderColor } from "../../../Utils/borderColor";

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

  const onSubmit = (data) => {
    const url = isEditing
      ? `${process.env.REACT_APP_API_LINK}/genres/${genreToEdit._id}`
      : `${process.env.REACT_APP_API_LINK}/genres`;
    const method = isEditing ? "PUT" : "POST";

    axios({
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
        const genre = response.data;
        onGenreCreated(genre);
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
