import React, { useState, useEffect } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { notifySuccess, notifyError } from "../../Utils/notification";
import { formatDate } from "../../Utils/FormatDate";
import FoodModal from "../../components/admin/Modal/Food";
import axios from "axios";

const FoodList = () => {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFood, setCurrentFood] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchFoods = () => {
    axios
      .get(`${process.env.REACT_APP_API_LINK}/foods`)
      .then((response) => {
        setFoods(response.data);
      })
      .catch((error) => {
        notifyError("Error Fetching Foods");
        console.error(error.message);
      });
  };

  useEffect(() => {});

  // Open and close modal
  const openModal = (food = null) => {
    setCurrentFood(food);
    setIsEditing(!!food); // If a food is passed, set editing to true
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentFood(null);
    setIsEditing(false);
  };

  const handleFoodChange = (updatedFood) => {
    if (isEditing) {
      setFoods((prevFoods) =>
        prevFoods.map((food) =>
          food._id === updatedFood._id ? updatedFood : food
        )
      );
    } else {
      setFoods((prevFoods) => [...prevFoods, updatedFood]);
    }
  };

  const handleDelete = (foodID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this food!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${process.env.REACT_APP_API_LINK}/foods/${foodID}`)
          .then((response) => {
            if (response.status === 201) {
              notifySuccess("Successfully Deleted");
              setFoods((prevFoods) =>
                prevFoods.filter((food) => food._id !== foodID)
              );
            } else {
              notifyError("Deletion Unsuccessful");
              console.error(response.statusText);
            }
          })
          .catch((error) => {
            notifyError("Error occurred");
            console.error(error.message);
          });
      }
    });
  };

  return (
    <div className="px-3 mt-8">
      <div className="flex justify-between">
        <h1 className="font-bold font-serif text-2xl">List of food</h1>
        <p style={{ fontSize: "13.5px" }}>
          <span className="text-blue-500 hover:underline">Foods</span> /
          <span className="text-gray-500">List of food</span>
        </p>
      </div>

      <button
        onClick={() => openModal()} // Open modal for adding new category
        className="mt-5 px-4 py-2 rounded-md font-semibold border-2 text-green-500 border-green-500 hover:bg-green-500 hover:text-white"
      >
        Add Food
      </button>
      {isModalOpen && (
        <FoodModal
          foodToEdit={currentFood} // Pass the current food to the modal
          isEditing={isEditing} // Pass editing state to the modal
          onClose={closeModal}
          onFoodCreated={handleFoodChange} // Pass function to add or update genre
          notifySuccess={notifySuccess} // Pass success notification
          notifyError={notifyError} // Pass error notification
          refresh={fetchFoods} //Pass refresh function for the table
        />
      )}

      <div className="mt-4 bg-white p-4 shadow-md rounded-lg">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">ID</th>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Category</th>
              <th className="py-2 px-4 border-b text-left">Price</th>
              <th className="py-2 px-4 border-b text-left">Available</th>
              <th className="py-2 px-4 border-b text-left">Image</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food) => {
              <tr key={food._id} className="hover:bg-slate-50">
                <td className="py-2 px-4 border-b">{food._id}</td>
                <td className="py-2 px-4 border-b">{food.name}</td>
                <td className="py-2 px-4 border-b">{food.category.name}</td>
                <td className="py-2 px-4 border-b">{food.price}</td>
                <td className="py-2 px-4 border-b">
                  {food.available ? "Yes" : "No"}
                </td>
                <td className="py-2 px-4 border-b">
                  <img src={food.picture.url} alt={food.name} />
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="p-1 mr-2 rounded-full bg-transparent text-blue-500 hover:bg-blue-500 hover:text-white transition duration-200 ease-in-out"
                    onClick={() => openModal(food)} // Pass the category to be edited
                  >
                    <EditOutlinedIcon />
                  </button>

                  <button
                    className="p-1 rounded-full bg-transparent text-red-500 hover:bg-red-500 hover:text-white transition duration-200 ease-in-out"
                    onClick={() => {
                      handleDelete(food._id);
                    }}
                  >
                    <DeleteOutlineOutlinedIcon />
                  </button>
                </td>
              </tr>;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FoodList;
