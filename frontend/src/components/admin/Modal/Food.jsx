import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
const Food = ({
  onClose,
  onFoodCreated,
  notifySuccess,
  notifyError,
  foodToEdit,
  isEditing,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [categories, setCategories] = useState([]);

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
      // Assuming data is an array of category objects with id and name
      setCategories(
        data.map((category) => ({
          value: category._id,
          label: category.name,
        }))
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchFoodCategories();
  }, []);

  useEffect(() => {
    if (isEditing && foodToEdit) {
      reset({
        name: foodToEdit.name,
        price: foodToEdit.price,
        category: categories.find(
          (category) => category.value === foodToEdit.categoryId
        ), // Set initial category
      });
    } else {
      reset({ name: "", price: "", category: null });
    }
  }, [isEditing, foodToEdit, categories]);

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
        body: JSON.stringify({
          name: data.name,
          price: data.price,
          categoryId: data.category.value,
        }),
      });

      if (response.ok) {
        const food = await response.json();
        onFoodCreated(food); // Add the new or updated food to the list
        notifySuccess(
          isEditing ? "Food updated successfully" : "Food created successfully"
        ); // Notify success
        onClose(); // Close the modal
      } else {
        notifyError(
          isEditing ? "Failed to update food" : "Failed to create food"
        );
        console.error(
          isEditing ? "Failed to update food:" : "Failed to create food:",
          response.statusText
        );
      }
    } catch (err) {
      notifyError(isEditing ? "Error updating food" : "Error creating food");
      console.error(
        isEditing ? "Error updating food:" : "Error creating food:",
        err
      );
    }
  };

  const getBorderColor = (fieldName) => {
    if (errors[fieldName]) {
      return "border-red-500";
    }
    return "border-gray-200";
  };

  const options = [
    { value: true, label: "Available" },
    { value: false, label: "Unavailable" },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? "Edit Food" : "Add Food"}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          id="food-form"
        >
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
            <label htmlFor="category" className="block text-gray-700 mb-2">
              Category
            </label>
            <Select
              id="category"
              options={categories}
              placeholder="Select Category"
              isClearable
              isSearchable
              {...register("category", { required: "Category is required" })}
              onChange={(selectedOption) =>
                setValue("category", selectedOption)
              }
              styles={{
                control: (base, state) => ({
                  ...base,
                  borderColor: errors.category ? "red" : base.borderColor,
                  "&:hover": {
                    borderColor: errors.category ? "red" : base.borderColor,
                  },
                }),
              }}
            />

            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
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
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700 mb-2">
              Availability
            </label>
            <Select
              id="availability"
              options={options}
              placeholder="Select availability"
              isClearable
              isSearchable
              onChange={(selectedOption) =>
                setValue("availability", selectedOption)
              }
              {...register("availability", {
                required: "Availability is required",
              })}
              styles={{
                control: (base, state) => ({
                  ...base,
                  borderColor: errors.availability ? "red" : base.borderColor,
                  "&:hover": {
                    borderColor: errors.availability ? "red" : base.borderColor,
                  },
                }),
              }}
            />

            {errors.availability && (
              <p className="text-red-500 text-sm mt-1">
                {errors.availability.message}
              </p>
            )}
          </div>
        </form>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md text-gray-500 border border-gray-300 mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="food-form"
            className="px-4 py-2 rounded-md font-semibold border-2 text-green-500 border-green-500 hover:bg-green-500 hover:text-white"
          >
            {isEditing ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Food;
