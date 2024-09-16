import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import axios from "axios";
import { getBorderColor } from "../../../Utils/borderColor";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Food = ({
  onClose,
  notifySuccess,
  notifyError,
  foodToEdit,
  isEditing,
}) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, touchedFields },
  } = useForm();

  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState([]);

  const fetchFoodCategories = () => {
    axios
      .get(`${process.env.REACT_APP_API_LINK}/foods`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        notifyError("Error Fetching Categories");
        console.error("Error fetching Categories: ", error);
      });
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
        ), // Set initial category option object
        availability: options.find(
          (option) => option.value === foodToEdit.availability
        ), // Set initial availability option object
        image: foodToEdit.image || [], // Set initial image if any
      });
    } else {
      reset({
        name: "",
        price: "",
        category: null,
        availability: null,
        image: [],
      });
    }
  }, [isEditing, foodToEdit, categories]);

  const onSubmit = (data) => {
    console.log(data);
    // Add your submit logic here
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
                "name",
                errors,
                touchedFields
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
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  id="category"
                  options={categories}
                  placeholder="Select Category"
                  isClearable
                  isSearchable
                  {...field}
                  onChange={(selectedOption) => field.onChange(selectedOption)}
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderColor: errors.category ? "red" : base.borderColor,
                      "&:hover": {
                        borderColor: errors.category ? "red" : base.borderColor,
                      },
                    }),
                  }}
                />
              )}
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
                "price",
                errors,
                touchedFields
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
            <label htmlFor="availability" className="block text-gray-700 mb-2">
              Availability
            </label>
            <Controller
              name="availability"
              control={control}
              render={({ field }) => (
                <Select
                  id="availability"
                  options={options}
                  placeholder="Select availability"
                  isClearable
                  isSearchable
                  {...field}
                  onChange={(selectedOption) => field.onChange(selectedOption)}
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderColor: errors.availability
                        ? "red"
                        : base.borderColor,
                      "&:hover": {
                        borderColor: errors.availability
                          ? "red"
                          : base.borderColor,
                      },
                    }),
                  }}
                />
              )}
            />
            {errors.availability && (
              <p className="text-red-500 text-sm mt-1">
                {errors.availability.message}
              </p>
            )}
          </div>

          {/* FilePond Integration */}
          <div className="mb-4 col-span-2">
            <label className="block text-gray-700 mb-2">Image</label>
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <FilePond
                  {...field}
                  files={field.value}
                  onupdatefiles={(fileItems) => {
                    // Update the field value
                    field.onChange(fileItems.map((fileItem) => fileItem.file));
                  }}
                  server={`${process.env.REACT_APP_API_LINK}/foods/upload-pic`}
                  allowMultiple={false}
                  acceptedFileTypes={["image/png", "image/jpeg", "image/jpg"]}
                  labelIdle='Drag & Drop your image or <span class="filepond--label-action">Browse</span>'
                />
              )}
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">Image is required</p>
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
            className="px-4 py-2 rounded-md bg-blue-500 text-white"
          >
            {isEditing ? "Update" : "Add Food"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Food;
