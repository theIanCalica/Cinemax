import React, { useEffect, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { notifySuccess, notifyError } from "../../Utils/notification";
import { formatDate } from "../../Utils/FormatDate";
import axios from "axios";
import TaskModal from "../../components/admin/Modal/Task";
const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const fetchTasks = () => {
    axios
      .get(`${process.env.REACT_APP_API_LINK}/tasks`)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        notifyError("Error Fetching tasks");
        console.error("Error fetching tasks:", error);
      });
  };

  // Open and close modal
  const openModal = (task = null) => {
    setCurrentTask(task);
    setIsEditing(!!task); // If a category is passed, set editing to true
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTask(null);
    setIsEditing(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (taskID) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this task!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `http://localhost:4000/api/tasks/${taskID}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          notifySuccess("Successfully Deleted!");
          // Remove the deleted category from the state
          setTasks((prevTasks) =>
            prevTasks.filter((task) => task._id !== taskID)
          );
        } else {
          notifyError("Deletion Unsuccessful");
        }
      } catch (error) {
        notifyError("Error occured");
      }
    }
  };

  return (
    <div className="px-3 mt-8">
      <div className="flex justify-between">
        <h1 className="font-bold font-serif text-2xl">Tasks</h1>
        <p style={{ fontSize: "13.5px" }}>
          <span className="text-blue-500 hover:underline">Home</span> /
          <span className="text-gray-500">Tasks</span>
        </p>
      </div>
      <button
        onClick={() => openModal()} // Open modal for adding new category
        className="mt-5 px-4 py-2 rounded-md font-semibold border-2 text-green-500 border-green-500 hover:bg-green-500 hover:text-white"
      >
        Add Task
      </button>
      {/* Render the modal for creating or editing a genre */}
      {isModalOpen && (
        <TaskModal
          taskToEdit={currentTask} // Pass the current genre to the modal
          isEditing={isEditing} // Pass editing state to the modal
          onClose={closeModal}
          notifySuccess={notifySuccess} // Pass success notification
          notifyError={notifyError} // Pass error notification
          refresh={fetchTasks} //Pass refresh function for the table
        />
      )}
    </div>
  );
};

export default Task;
