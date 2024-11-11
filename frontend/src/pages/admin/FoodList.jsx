import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { notifySuccess, notifyError } from "../../Utils/notification";
import FoodModal from "../../components/admin/Modal/Food";
import axios from "axios";
import { delay } from "../../Utils/helpers";

const FoodList = () => {
  const [foods, setFoods] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFood, setCurrentFood] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFoods, setSelectedFoods] = useState([]);

  const fetchFoods = async () => {
    try {
      const [response] = await Promise.all([
        axios.get(`${process.env.REACT_APP_API_LINK}/foods`),
        delay(1000),
      ]);
      console.log(response.data);
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
          axios.delete(`${process.env.REACT_APP_API_LINK}/foods/${id}`)
        );

        Promise.all(deleteRequests)
          .then((responses) => {
            if (responses.every((response) => response.status === 201)) {
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
    { name: "category.name", label: "Category" },
    { name: "price", label: "Price" },
    {
      name: "available",
      label: "Available",
      options: {
        customBodyRender: (value) => (value ? "Yes" : "No"),
      },
    },
    {
      name: "image.url",
      label: "Image",
      options: {
        customBodyRender: (url, { rowData }) => (
          <img src={url} alt={rowData[1]} height={50} width={50} />
        ),
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
  };

  return (
    <div className="px-3 mt-8">
      <div className="flex justify-between">
        <h1 className="font-bold font-serif text-2xl">List of food</h1>
      </div>

      <button
        onClick={() => openModal()}
        className="mt-5 px-4 py-2 rounded-md font-semibold border-2 text-green-500 border-green-500 hover:bg-green-500 hover:text-white"
      >
        Add Food
      </button>

      {isModalOpen && (
        <FoodModal
          foodToEdit={currentFood}
          isEditing={isEditing}
          onClose={closeModal}
          notifySuccess={notifySuccess}
          notifyError={notifyError}
          refresh={fetchFoods}
        />
      )}

      <MUIDataTable
        title={"Food List"}
        data={foods}
        columns={columns}
        options={options}
      />

      <ToastContainer />
    </div>
  );
};

export default FoodList;
