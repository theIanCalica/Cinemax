import React, { useEffect, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import MovieModal from "../../components/admin/Modal/Movie";
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
      {/* Render the modal for creating or editing a genre */}
      {isModalOpen && (
        <MovieModal
          movieToEdit={currentMovie} // Pass the current genre to the modal
          isEditing={isEditing} // Pass editing state to the modal
          onClose={closeModal}
          notifySuccess={notifySuccess} // Pass success notification
          notifyError={notifyError} // Pass error notification
          refresh={fetchMovies} //Pass refresh function for the table
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
            {movies.map((movie) => (
              <tr key={movie._id} className="hover:bg-slate-50">
                <td className="py-2 px-4 border-b">{movie._id}</td>
                <td className="py-2 px-4 border-b">{movie.name}</td>
                <td className="py-2 px-4 border-b">
                  {formatDate(movie.createdAt)}
                </td>
                <td className="py-2 px-4 border-b">
                  {formatDate(movie.updatedAt)}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="p-1 mr-2 rounded-full bg-transparent text-blue-500 hover:bg-blue-500 hover:text-white transition duration-200 ease-in-out"
                    onClick={() => openModal(movie)} // Pass the genre to be edited
                  >
                    <EditOutlinedIcon />
                  </button>

                  <button
                    className="p-1 rounded-full bg-transparent text-red-500 hover:bg-red-500 hover:text-white transition duration-200 ease-in-out"
                    onClick={() => {
                      handleDelete(movie._id);
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

export default Movie;
