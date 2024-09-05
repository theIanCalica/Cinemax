import React, { useEffect, useState } from "react";

const CreateCategory = ({
  onClose,
  onGenreCreated,
  notifySuccess,
  notifyError,
  genreToEdit,
  isEditing,
  refresh,
}) => {
  const [genre, setGenre] = useState("");

  useEffect(() => {
    if (isEditing && genreToEdit) {
      setGenre(genreToEdit.name);
    } else {
      setGenre("");
    }
  }, [isEditing, genreToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        body: JSON.stringify({ name: genre }),
      });

      if (response.ok) {
        const genre = await response.json();
        onGenreCreated(genre); // Add the new or updated genre to the list
        notifySuccess(
          isEditing
            ? "Category updated successfully"
            : "Category created successfully"
        ); // Notify success
        setGenre(""); // Clear the input
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
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="genre" className="block text-gray-700 mb-2">
              Genre
            </label>
            <input
              id="genre"
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
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

export default CreateCategory;
