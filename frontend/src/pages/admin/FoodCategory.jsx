import React, { useEffect, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { notifySuccess, notifyError } from "../../Utils/notification";
import CategoryModal from "../../components/admin/Modal/FoodCategory";
import axios from "axios";

const FoodCategory = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/categories/");
      if (response.ok) {
        const json = await response.json();
        setCategories(json);
      } else {
        console.error("Failed to fetch categories:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Format the date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Open and close modal
  const openModal = (category = null) => {
    setCurrentCategory(category);
    setIsEditing(!!category); // If a category is passed, set editing to true
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentCategory(null);
    setIsEditing(false);
  };

  // Add or update category in the state
  const handleCategoryChange = (updatedCategory) => {
    if (isEditing) {
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category._id === updatedCategory._id ? updatedCategory : category
        )
      );
    } else {
      setCategories((prevCategories) => [...prevCategories, updatedCategory]);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = (categoryId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this category!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${process.env.REACT_APP_API_LINK}/categories/${categoryId}`)
          .then((response) => {
            if (response.status === 201) {
              notifySuccess("Successfully Deleted!");
              // Remove the deleted category from the state
              setCategories((prevCategories) =>
                prevCategories.filter((category) => category._id !== categoryId)
              );
            } else {
              notifyError("Deletion Unsuccessful");
              console.error(response.statusText);
            }
          })
          .catch((error) => {
            notifyError("Error occurred");
          });
      }
    });
  };

  return (
    <div className="px-3 mt-8">
      <div className="flex justify-between">
        <h1 className="font-bold font-serif text-2xl">Food Categories</h1>
        <p style={{ fontSize: "13.5px" }}>
          <span className="text-blue-500 hover:underline">Foods</span> /
          <span className="text-gray-500">Food Categories</span>
        </p>
      </div>
      <button
        onClick={() => openModal()} // Open modal for adding new category
        className="mt-5 px-4 py-2 rounded-md font-semibold border-2 text-green-500 border-green-500 hover:bg-green-500 hover:text-white"
      >
        Add Category
      </button>

      {/* Render the modal for creating or editing a category */}
      {isModalOpen && (
        <CategoryModal
          categoryToEdit={currentCategory} // Pass the current category to the modal
          isEditing={isEditing} // Pass editing state to the modal
          onClose={closeModal}
          onCategoryCreated={handleCategoryChange} // Pass function to add or update category
          notifySuccess={notifySuccess} // Pass success notification
          notifyError={notifyError} // Pass error notification
          refresh={fetchCategories} //Pass refresh function for the table
        />
      )}

      {/* Display categories in a table */}
      <div className="mt-4 bg-white p-4 shadow-md rounded-lg">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">ID</th>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Created</th>
              <th className="py-2 px-4 border-b text-left">Updated</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id} className="hover:bg-slate-50">
                <td className="py-2 px-4 border-b">{category._id}</td>
                <td className="py-2 px-4 border-b">{category.name}</td>
                <td className="py-2 px-4 border-b">
                  {formatDate(category.createdAt)}
                </td>
                <td className="py-2 px-4 border-b">
                  {formatDate(category.updatedAt)}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="p-1 mr-2 rounded-full bg-transparent text-blue-500 hover:bg-blue-500 hover:text-white transition duration-200 ease-in-out"
                    onClick={() => openModal(category)} // Pass the category to be edited
                  >
                    <EditOutlinedIcon />
                  </button>

                  <button
                    className="p-1 rounded-full bg-transparent text-red-500 hover:bg-red-500 hover:text-white transition duration-200 ease-in-out"
                    onClick={() => {
                      handleDelete(category._id);
                    }}
                  >
                    <DeleteOutlineOutlinedIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Toastify container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default FoodCategory;
