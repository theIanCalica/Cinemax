import React, { useEffect, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { notifySuccess, notifyError } from "../../Utils/notification";
import CategoryModal from "../../components/admin/Modal/FoodCategory";
import axios from "axios";
import { formatDate } from "../../Utils/FormatDate.js";
import ReactLoading from "react-loading";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { delay } from "../../Utils/helpers";
import "./FoodCategory.scss";

const FoodCategory = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCategories = async () => {
    setIsLoading(true);

    try {
      const [response] = await Promise.all([
        axios.get(`${process.env.REACT_APP_API_LINK}/categories`),
        delay(1000),
      ]);
      setCategories(response.data);
    } catch (err) {
      notifyError("Error Fetching Categories");
      console.error("Error fetching categories:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (category = null) => {
    setCurrentCategory(category);
    setIsEditing(!!category);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentCategory(null);
    setIsEditing(false);
  };

  const refresh = () => {
    fetchCategories();
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
            console.error(error.message);
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
        onClick={() => openModal()}
        className="mt-5 px-4 py-2 rounded-md font-semibold border-2 text-green-500 border-green-500 hover:bg-green-500 hover:text-white"
      >
        Add Category
      </button>

      {isModalOpen && (
        <CategoryModal
          categoryToEdit={currentCategory}
          isEditing={isEditing}
          onClose={closeModal}
          notifySuccess={notifySuccess}
          notifyError={notifyError}
          refresh={refresh}
        />
      )}

      {isLoading ? (
        <>
          <div className="loading-wrapper">
            <ReactLoading
              type="spin"
              color="#33C92D"
              height={50}
              width={50}
              className="z-50"
            />
          </div>
          <SkeletonTheme
            baseColor="#e5e7eb"
            highlightColor="#f3f4f6"
            borderRadius="0.5rem"
            duration={5}
          >
            <table className="min-w-full bg-white border-collapse mt-5">
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
                {/* Generate skeleton rows */}
                {Array(5)
                  .fill()
                  .map((_, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b">
                        <Skeleton />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <Skeleton />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <Skeleton />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <Skeleton />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <Skeleton />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </SkeletonTheme>
        </>
      ) : (
        <>
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
                        onClick={() => openModal(category)}
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

          <ToastContainer />
        </>
      )}
    </div>
  );
};

export default FoodCategory;
