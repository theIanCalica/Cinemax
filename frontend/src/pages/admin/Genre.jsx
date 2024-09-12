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

const Genre = () => {
  const [genres, setGenres] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentGenre, setCurrentGenre] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchGenres = async () => {
    axios
      .get(`${process.env.REACT_APP_API_LINK}/genres`)
      .then((response) => {
        setGenres(response.data);
      })
      .catch((error) => {
        notifyError("Error Fetching genres");
        console.error("Error fetching genres:", error);
      });
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

  const handleDelete = (genreID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this genre!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${process.env.REACT_APP_API_LINK}/genres/${genreID}`)
          .then((response) => {
            if (response.status === 201) {
              notifySuccess("Successfully Deleted!");
              // Remove the deleted category from the state
              setGenres((prevGenres) =>
                prevGenres.filter((genre) => genre._id !== genreID)
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
  return (
    <div className="px-3 mt-8">
      <div className="flex justify-between">
        <h1 className="font-bold font-serif text-2xl">Genres</h1>
        <p style={{ fontSize: "13.5px" }}>
          <span className="text-blue-500 hover:underline">Movie</span> /
          <span className="text-gray-500">Genre</span>
        </p>
      </div>
      <button
        onClick={() => openModal()} // Open modal for adding new genre
        className="mt-5 px-4 py-2 rounded-md font-semibold border-2 text-green-500 border-green-500 hover:bg-green-500 hover:text-white"
      >
        Add Genre
      </button>

      {/* Render the modal for creating or editing a genre */}
      {isModalOpen && (
        <GenreModal
          genreToEdit={currentGenre} // Pass the current genre to the modal
          isEditing={isEditing} // Pass editing state to the modal
          onClose={closeModal}
          onGenreCreated={handleGenreChange} // Pass function to add or update genre
          notifySuccess={notifySuccess} // Pass success notification
          notifyError={notifyError} // Pass error notification
          refresh={fetchGenres} //Pass refresh function for the table
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
            {genres.map((genre) => (
              <tr key={genre._id} className="hover:bg-slate-50">
                <td className="py-2 px-4 border-b">{genre._id}</td>
                <td className="py-2 px-4 border-b">{genre.name}</td>
                <td className="py-2 px-4 border-b">
                  {formatDate(genre.createdAt)}
                </td>
                <td className="py-2 px-4 border-b">
                  {formatDate(genre.updatedAt)}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="p-1 mr-2 rounded-full bg-transparent text-blue-500 hover:bg-blue-500 hover:text-white transition duration-200 ease-in-out"
                    onClick={() => openModal(genre)} // Pass the genre to be edited
                  >
                    <EditOutlinedIcon />
                  </button>

                  <button
                    className="p-1 rounded-full bg-transparent text-red-500 hover:bg-red-500 hover:text-white transition duration-200 ease-in-out"
                    onClick={() => {
                      handleDelete(genre._id);
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

export default Genre;
