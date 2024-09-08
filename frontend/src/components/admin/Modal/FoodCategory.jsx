import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getBorderColor } from "../../../Utils/borderColor";

const CreateCategory = ({
  onClose,
  onCategoryCreated,
  notifySuccess,
  notifyError,
  categoryToEdit,
  isEditing,
}) => {
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

  const onSubmit = async (data) => {
    const url = isEditing
      ? `http://localhost:4000/api/categories/${categoryToEdit._id}`
      : "http://localhost:4000/api/categories";
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
        const category = await response.json();
        onCategoryCreated(category); // Add the new or updated category to the list
        notifySuccess(
          isEditing
            ? "Category updated successfully"
            : "Category created successfully"
        ); // Notify success
        onClose(); // Close the modal
      } else {
        notifyError(
          isEditing ? "Failed to update category" : "Failed to create category"
        );
        console.error(
          isEditing
            ? "Failed to update category:"
            : "Failed to create category:",
          response.statusText
        );
      }
    } catch (error) {
      notifyError(
        isEditing ? "Error updating category" : "Error creating category"
      );
      console.error(
        isEditing ? "Error updating category:" : "Error creating category:",
        error
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? "Edit Category" : "Add Category"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Category Name
            </label>
            <input
              id="name"
              type="text"
              className={`w-full px-3 py-2 border rounded-md ${getBorderColor(
                "name",
                errors
              )}`}
              {...register("name", { required: "Category name is required" })}
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

export default CreateCategory;
