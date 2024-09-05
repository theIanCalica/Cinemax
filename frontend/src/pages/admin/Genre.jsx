import React, { useEffect, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const Genre = () => {
  const [genres, setGenres] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentGenre, setCurrentGenre] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchGenres = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/genres");
      if (response.ok) {
        const json = await response.json();
        setGenres(json);
      }
    } catch (error) {
      console.log("Error fetching genres:", error);
    }
  };

  // Format the date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Open and close modal
  const openModal = (genre = null) => {
    setCurrentGenre(genre);
    setIsEditing(!!genre); // If a genre is passed, set editing to true
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentGenre(null);
    setIsEditing(false);
  };

  // Notify success message using Toastify
  const notifySuccess = (message) => {
    toast.success(message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  // Notify error message using Toastify
  const notifyError = (message) => {
    toast.error(message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  // Add or update category in the state
  const handleGenreChange = (updatedGenre) => {
    if (isEditing) {
      setGenres((prevGenres) =>
        prevGenres.map((genre) =>
          genre._id === updatedGenre._id ? updatedGenre : genre
        )
      );
    } else {
      setGenres((prevGenres) => [...prevGenres, updatedGenre]);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const handleDelete = async (genreID) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this category!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `http://localhost:4000/api/categories/${genreID}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          notifySuccess("Successfully Deleted!");
          // Remove the deleted category from the state
          setGenres((prevGenres) =>
            prevGenres.filter((genre) => genre._id !== genreID)
          );
        } else {
          Swal.fire(
            "Error!",
            "There was an issue deleting the category.",
            "error"
          );
        }
      } catch (error) {
        Swal.fire(
          "Error!",
          "An error occurred while deleting the category.",
          "error"
        );
      }
    }
  };
  return (
    <div>
      <div></div>
    </div>
  );
};

export default Genre;
