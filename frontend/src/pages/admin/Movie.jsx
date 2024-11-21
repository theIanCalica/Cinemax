import React, { useEffect, useState } from "react";
import { Box, Button, Typography, IconButton } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Swal from "sweetalert2";
import MUIDataTable from "mui-datatables";
import MovieModal from "../../components/admin/Modal/Movie";
import { notifyError, notifySuccess, formatDate } from "../../Utils/helpers";
import client from "../../Utils/client";

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchMovies = () => {
    client.get(`/movies`).then((response) => {
      setMovies(response.data);
      console.log(response.data);
    });
  };

  const openModal = (movie = null) => {
    setCurrentMovie(movie);
    setIsEditing(!!movie);
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
        client
          .delete(`/movies/${movieID}`)
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
  }, []);

  const columns = [
    { name: "title", label: "Title" },
    { name: "directorName", label: "Director Name" },
    { name: "producerName", label: "Producer Name" },
    { name: "writerName", label: "Writer Name" },
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
        customBodyRender: (value, tableMeta) => {
          const movie = movies[tableMeta.rowIndex];
          return (
            <Box>
              <IconButton
                color="primary"
                onClick={() => openModal(movie)}
                aria-label="edit"
              >
                <EditOutlinedIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => handleDelete(movie._id)}
                aria-label="delete"
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Box>
          );
        },
        filter: false,
        sort: false,
      },
    },
  ];

  const options = {
    responsive: "standard",
    selectableRows: "none", // Disable checkboxes
    elevation: 3,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 20, 50],
    download: false,
    print: false,
    search: true,
    viewColumns: true,
    filter: true,
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" component="h1" fontWeight="bold">
          Movies
        </Typography>
        <Button variant="outlined" color="success" onClick={() => openModal()}>
          Add Movie
        </Button>
      </Box>

      {isModalOpen && (
        <MovieModal
          movieToEdit={currentMovie}
          isEditing={isEditing}
          onClose={closeModal}
          notifySuccess={notifySuccess}
          notifyError={notifyError}
          refresh={fetchMovies}
        />
      )}

      <MUIDataTable data={movies} columns={columns} options={options} />
    </Box>
  );
};

export default Movie;
