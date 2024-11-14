import React, { useEffect, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import GenreModal from "../../components/admin/Modal/Genre";
import { notifyError, notifySuccess, formatDate } from "../../Utils/helpers";
import axios from "axios";
import "react-loading-skeleton/dist/skeleton.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Genre.scss";
import { delay } from "../../Utils/helpers";

const Genre = () => {
  const [genres, setGenres] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentGenre, setCurrentGenre] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    <Box className="px-3 mt-8">
      <Box display="flex" justifyContent="space-between">
        <Typography
          variant="h4"
          component="h1"
          fontWeight="bold"
          fontFamily="serif"
        >
          Genres
        </Typography>
        <Typography variant="body2" sx={{ fontSize: "13.5px" }}>
          <span className="text-blue-500 hover:underline">Movie</span> /{" "}
          <span className="text-gray-500">Genre</span>
        </Typography>
      </Box>
      <Button
        onClick={() => openModal()}
        variant="outlined"
        color="success"
        sx={{
          mt: 2,
          px: 4,
          py: 2,
          borderColor: "success.main",
          "&:hover": {
            backgroundColor: "success.main",
            color: "white",
          },
        }}
      >
        Add Genre
      </Button>

      {isLoading ? (
        <Box
          className="loading-wrapper"
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt={6}
        >
          <CircularProgress color="success" />
        </Box>
      ) : (
        <Box
          mt={4}
          sx={{ bgcolor: "white", p: 4, boxShadow: 2, borderRadius: 2 }}
        >
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell>Updated</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {genres.map((genre) => (
                  <TableRow key={genre._id} hover>
                    <TableCell>{genre._id}</TableCell>
                    <TableCell>{genre.name}</TableCell>
                    <TableCell>{formatDate(genre.createdAt)}</TableCell>
                    <TableCell>{formatDate(genre.updatedAt)}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        sx={{ mr: 1 }}
                        onClick={() => openModal(genre)}
                      >
                        <EditOutlinedIcon />
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(genre._id)}
                      >
                        <DeleteOutlineOutlinedIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {/* Render GenreModal */}
      {isModalOpen && (
        <GenreModal
          isOpen={isModalOpen}
          onClose={closeModal}
          currentGenre={currentGenre}
          isEditing={isEditing}
          refresh={refresh}
        />
      )}
    </Box>
  );
};

export default Genre;
