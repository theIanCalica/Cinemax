import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Swal from "sweetalert2";
import { notifySuccess, notifyError } from "../../Utils/notification";
import CategoryModal from "../../components/admin/Modal/FoodCategory";
import axios from "axios";
import { delay } from "../../Utils/helpers";
import { formatDate } from "../../Utils/FormatDate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress

const FoodCategory = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false); // New loading state

  const fetchCategories = async () => {
    setLoading(true); // Start loading
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
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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

  const handleDelete = (ids) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover these items!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteRequests = ids.map((id) =>
          axios.delete(`${process.env.REACT_APP_API_LINK}/categories/${id}`)
        );

        Promise.all(deleteRequests)
          .then((responses) => {
            if (responses.every((response) => response.status === 200)) {
              notifySuccess("Successfully Deleted");
              setCategories((prevCategories) =>
                prevCategories.filter((category) => !ids.includes(category._id))
              );
            } else {
              notifyError("Deletion Unsuccessful");
            }
          })
          .catch((error) => {
            notifyError("Error occurred");
            console.error(error.message);
          });
      }
    });
  };

  const columns = [
    { name: "_id", label: "ID", options: { display: false } },
    { name: "name", label: "Name" },
    {
      name: "createdAt",
      label: "Created",
      options: {
        customBodyRender: (value) => formatDate(value),
      },
    },
    {
      name: "updatedAt",
      label: "Updated",
      options: {
        customBodyRender: (value) => formatDate(value),
      },
    },
    {
      name: "actions",
      label: "Actions",
      options: {
        customBodyRenderLite: (dataIndex) => (
          <>
            <button onClick={() => openModal(categories[dataIndex])}>
              <EditOutlinedIcon />
            </button>
            <button
              onClick={() => handleDelete([categories[dataIndex]._id])}
              className="text-red-500"
            >
              <DeleteOutlineOutlinedIcon />
            </button>
          </>
        ),
      },
    },
  ];

  return (
    <div className="px-3 mt-8 relative">
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={closeModal}
        ></div>
      )}

      <div className="flex justify-between">
        <h1 className="font-bold font-serif text-2xl">Food Categories</h1>
      </div>

      <button
        onClick={() => openModal()}
        className="my-5 px-4 py-2 rounded-md font-semibold border-2 text-green-500 border-green-500 hover:bg-green-500 hover:text-white"
      >
        Add Category
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <CategoryModal
            categoryToEdit={currentCategory}
            isEditing={isEditing}
            onClose={closeModal}
            notifySuccess={notifySuccess}
            notifyError={notifyError}
            refresh={fetchCategories}
          />
        </div>
      )}

      {/* Spinner loading state */}
      {loading ? (
        <div className="flex justify-center mt-10">
          <CircularProgress size={50} color="success" />
        </div>
      ) : (
        <MUIDataTable data={categories} columns={columns} />
      )}
    </div>
  );
};

export default FoodCategory;
