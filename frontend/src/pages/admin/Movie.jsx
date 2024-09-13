import React, { useEffect, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import GenreModal from "../../components/admin/Modal/Genre";
import { formatDate } from "../../Utils/FormatDate";
import { notifyError, notifySuccess } from "../../Utils/notification";
import axios from "axios";

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchMovies = () => {
    axios
      .get(`${process.env.REACT_APP_API_LINK}/movies`)
      .then((response) => {});
  };

  // Open and close modal
  const openModal = (genre = null) => {
    setCurrentMovie(genre);
    setIsEditing(!!genre); // If a movie is passed, set editing to true
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentMovie(null);
    setIsEditing(false);
    setIsModalOpen(false);
  };

  const handleDelete = (movieID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this movie!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${process.env.REACT_APP_API_LINK}/movies/${movieID}`)
          .then((response) => {
            if (response.status === 201) {
              notifySuccess("Successfully Deleted");
              setMovies((prevMovies) =>
                prevMovies.filter((movie) => movie._id !== movieID)
              );
            } else {
              notifyError("Deletion Unsuccessful");
              console.error(response.statusText);
            }
          })
          .catch((error) => {
            notifyError("Deletion Unsuccessful");
            console.error(error.message);
          });
      }
    });
  };

  useEffect(() => {
    fetchMovies();
  });

  return (
    <div className="px-3 mt-8">
      <div className="flex justify-between">
        <h1 className="font-bold font-serif text-2xl">Movies</h1>
        <p style={{ fontSize: "13.5px" }}>
          <span className="text-blue-500 hover:underline">Movie</span> /
          <span className="text-gray-500">Movie List</span>
        </p>
      </div>
      <button
        onClick={() => openModal()} // Open modal for adding new genre
        className="mt-5 px-4 py-2 rounded-md font-semibold border-2 text-green-500 border-green-500 hover:bg-green-500 hover:text-white"
      >
        Add Movie
      </button>
    </div>
  );
};

export default Movie;
