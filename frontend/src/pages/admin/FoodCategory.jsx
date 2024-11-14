import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Swal from "sweetalert2";
import {
  notifySuccess,
  notifyError,
  formatDate,
  delay,
} from "../../Utils/helpers";
import CategoryModal from "../../components/admin/Modal/FoodCategory";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const FoodCategory = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
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
      setLoading(false);
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
            <Button
              onClick={() => openModal(categories[dataIndex])}
              color="primary"
              sx={{ marginRight: 1 }}
            >
              <EditOutlinedIcon />
            </Button>
            <Button
              onClick={() => handleDelete([categories[dataIndex]._id])}
              color="error"
            >
              <DeleteOutlineOutlinedIcon />
            </Button>
          </>
        ),
      },
    },
  ];

  return (
    <Container maxWidth="xl">
      <Box sx={{ mt: 4 }} className="relative">
        {isModalOpen && (
          <Box
            position="fixed"
            top="0"
            left="0"
            right="0"
            bottom="0"
            bgcolor="rgba(0, 0, 0, 0.5)"
            zIndex="40"
            onClick={closeModal}
          />
        )}

        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 3 }}
        >
          <Grid item>
            <h1 className="font-bold font-serif text-2xl">Food Categories</h1>
          </Grid>
          <Grid item>
            <Button
              onClick={() => openModal()}
              variant="outlined"
              color="success"
              sx={{ fontSize: { xs: "0.75rem", sm: "1rem" } }}
            >
              Add Category
            </Button>
          </Grid>
        </Grid>

        {isModalOpen && (
          <Box
            position="fixed"
            top="0"
            left="0"
            right="0"
            bottom="0"
            zIndex="50"
          >
            <CategoryModal
              categoryToEdit={currentCategory}
              isEditing={isEditing}
              onClose={closeModal}
              notifySuccess={notifySuccess}
              notifyError={notifyError}
              refresh={fetchCategories}
            />
          </Box>
        )}

        {/* Loading Spinner */}
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="60vh"
          >
            <CircularProgress size={50} color="success" />
          </Box>
        ) : (
          <MUIDataTable
            data={categories}
            columns={columns}
            options={{
              filter: false,
              search: true,
              responsive: "standard",
              selectableRows: "multiple",
            }}
          />
        )}
      </Box>
    </Container>
  );
};

export default FoodCategory;
