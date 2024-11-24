import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import FoodModal from "../../components/admin/Modal/Food";
import FoodImagesModal from "../../components/admin/Modal/FoodImages";
import { delay, notifySuccess, notifyError } from "../../Utils/helpers";
import { Box } from "@mui/material";
import client from "../../Utils/client";

const FoodList = () => {
  const [foods, setFoods] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFood, setCurrentFood] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isImagesModalOpen, setIsImagesModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  const fetchFoods = async () => {
    try {
      const [response] = await Promise.all([client.get(`/foods`), delay(1000)]);
      setFoods(response.data);
    } catch (err) {
      notifyError("Error Fetching foods");
      console.error("Error fetching foods:", err);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const openModal = (food = null) => {
    setCurrentFood(food);
    setIsEditing(!!food);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentFood(null);
    setIsEditing(false);
  };

  const openImagesModal = (food) => {
    setSelectedFood(food);
    setIsImagesModalOpen(true);
  };

  const closeImagesModal = () => {
    setIsImagesModalOpen(false);
    setSelectedFood(null);
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
        const deleteRequests = ids.map((id) => client.delete(`/foods/${id}`));

        Promise.all(deleteRequests)
          .then((responses) => {
            if (responses.every((response) => response.status === 200)) {
              notifySuccess("Successfully Deleted");
              setFoods((prevFoods) =>
                prevFoods.filter((food) => !ids.includes(food._id))
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
      name: "category",
      label: "Category",
      options: {
        customBodyRender: (value) => (value ? value.name : "N/A"),
      },
    },
    { name: "price", label: "Price" },
    {
      name: "available",
      label: "Available",
      options: {
        customBodyRender: (value) => (value ? "Yes" : "No"),
      },
    },
    {
      name: "images",
      label: "Image",
      options: {
        customBodyRender: (images, { rowData }) => {
          const imageUrl = images && images.length > 0 ? images[0].url : null;
          return imageUrl ? (
            <img
              src={imageUrl}
              alt={rowData[1]}
              height={100}
              width={100}
              className="cursor-pointer"
              onClick={() =>
                openImagesModal(foods.find((food) => food._id === rowData[0]))
              }
            />
          ) : (
            "No image"
          );
        },
      },
    },
    {
      name: "actions",
      label: "Actions",
      options: {
        customBodyRenderLite: (dataIndex) => (
          <>
            <button onClick={() => openModal(foods[dataIndex])}>
              <EditOutlinedIcon />
            </button>
            <button
              onClick={() => handleDelete([foods[dataIndex]._id])}
              className="text-red-500"
            >
              <DeleteOutlineOutlinedIcon />
            </button>
          </>
        ),
      },
    },
  ];

  const options = {
    filter: true,
    selectableRows: "multiple",
    onRowsDelete: (rowsDeleted) => {
      const idsToDelete = rowsDeleted.data.map((d) => foods[d.dataIndex]._id);
      handleDelete(idsToDelete);
    },
    expandableRows: true,
    renderExpandableRow: (rowData, rowMeta) => {
      const food = foods[rowMeta.dataIndex];
      return (
        <tr>
          <td colSpan={rowData.length + 1}>
            <strong>Description:</strong>{" "}
            {food.description || "No description available"}
          </td>
        </tr>
      );
    },
  };

  return (
    <div className="px-3 mt-8 relative">
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={closeModal}
        ></div>
      )}

      <div className="flex justify-between">
        <h1 className="font-bold font-serif text-2xl">List of Food</h1>
      </div>

      <button
        onClick={() => openModal()}
        className="my-5 px-4 py-2 rounded-md font-semibold border-2 text-green-500 border-green-500 hover:bg-green-500 hover:text-white"
      >
        Add Food
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <FoodModal
            foodToEdit={currentFood}
            isEditing={isEditing}
            onClose={closeModal}
            refresh={fetchFoods}
          />
        </div>
      )}

      {isImagesModalOpen && selectedFood && (
        <FoodImagesModal food={selectedFood} onClose={closeImagesModal} />
      )}
      <Box sx={{ overflow: "auto", maxHeight: "80vh" }}>
        <MUIDataTable data={foods} columns={columns} options={options} />
      </Box>
    </div>
  );
};

export default FoodList;
