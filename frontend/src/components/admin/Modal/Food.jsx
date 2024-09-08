import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";

const Food = ({
  onClose,
  onFoodCreated,
  notifySuccess,
  notifyError,
  foodToEdit,
  isEditing,
}) => {
  const fetchFoodCategories = async () => {
    try {
      const url = "http://localhost:4000/api/categories";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
    } catch (err) {
      console.error(err.message);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchFoodCategories();
  });

  const onSubmit = async (data) => {
    const url = isEditing
      ? `http://localhost:4000/api/foods/${foodToEdit._id}`
      : "http://localhost:4000/api/foods";
    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: data.name }),
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const getBorderColor = (fieldName) => {
    if (errors[fieldName]) {
      return "border-red-500";
    }
    return "border-gray-200";
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? "Edit Genre" : "Add Genre"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              className={`w-full px-3 py-2 border rounded-md ${getBorderColor(
                "name"
              )}`}
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 mb-2">
              Price
            </label>
            <input
              id="price"
              type="text"
              className={`w-full px-3 py-2 border rounded-md ${getBorderColor(
                "price"
              )}`}
              {...register("price", { required: "Price is required" })}
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
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

export default Food;
