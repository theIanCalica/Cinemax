import React, { useEffect, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import GenreModal from "../../components/admin/Modal/Genre";
import { formatDate } from "../../Utils/FormatDate";
import { notifyError, notifySuccess } from "../../Utils/notification";
import axios from "axios";
import ReactLoading from "react-loading";
import "./Genre.scss";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import range from "underscore/modules/range";

const Genre = () => {
  const [genres, setGenres] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentGenre, setCurrentGenre] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const fetchGenres = async () => {
    setIsLoading(true);

    try {
      const [response] = await Promise.all([
        axios.get(`${process.env.REACT_APP_API_LINK}/genres`),
        delay(1000),
      ]);

      setGenres(response.data);
    } catch (error) {
      notifyError("Error Fetching genres");
      console.error("Error fetching genres:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Open and close modal
  const openModal = (genre = null) => {
    setCurrentGenre(genre);
    setIsEditing(!!genre);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentGenre(null);
    setIsEditing(false);
  };

  const refresh = () => {
    fetchGenres();
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
        onClick={() => openModal()}
        className="mt-5 px-4 py-2 rounded-md font-semibold border-2 text-green-500 border-green-500 hover:bg-green-500 hover:text-white"
      >
        Add Genre
      </button>

      {isLoading ? (
        <div className="loading-wrapper">
          <ReactLoading type="spin" color="#33C92D" height={50} width={50} />
        </div>
      ) : (
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
                      onClick={() => openModal(genre)}
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
      )}

      <ToastContainer />
    </div>
  );
};

export default Genre;
