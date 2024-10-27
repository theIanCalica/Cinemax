import React, { useState, useEffect } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { notifySuccess, notifyError } from "../../Utils/notification";
import TaskModal from "../../components/admin/Modal/Task";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [users, setUsers] = useState([]);
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

  const fetchUsers = () => {
    axios
      .get(`${process.env.REACT_APP_API_LINK}/users`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        console.error("Error fetching contacts:", err);
      });
  };

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  const userMap = {};
  users.forEach((user) => {
    userMap[user._id] = " " + user.fname + " " + user.lname; // Assuming user object has _id and name properties
  });

  // Open and close modal
  const openModal = (task = null) => {
    setCurrentTask(task);
    setIsEditing(!!task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTask(null);
    setIsEditing(false);
  };

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
      axios
        .delete(`${process.env.REACT_APP_API_LINK}/tasks/${taskID}`)
        .then((response) => {
          if (response.status === 201) {
            setTasks((prevTasks) =>
              prevTasks.filter((task) => task._id !== taskID)
            );
            notifySuccess("Successfully Deleted");
          } else {
            notifyError("Deletion Unsuccessful");
            console.error(response.statusText);
          }
        })
        .catch((err) => {
          notifyError("Deletion Unsuccessful");
          console.error(err.message);
        });
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return; // If there's no destination, exit

    const { source, destination } = result;

    // If the item was dropped in the same position, do nothing
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Create a new array based on the existing tasks
    const newTasks = Array.from(tasks);

    // Remove the dragged task from its original position
    const [removedTask] = newTasks.splice(source.index, 1);

    // Update the task's status based on its new droppableId
    const updatedTask = {
      ...removedTask,
      status: destination.droppableId, // Update the status to the new column
    };

    // Insert the updated task into the new position
    newTasks.splice(destination.index, 0, updatedTask);

    // Update the local state
    setTasks(newTasks); // Set the state with the updated task list

    // Now update the backend
    try {
      await axios
        .put(
          `${process.env.REACT_APP_API_LINK}/tasks/update-status/${removedTask._id}`,
          {
            status: updatedTask.status,
          }
        )
        .then((response) => {
          notifySuccess("Successfully Updated");
        });
    } catch (error) {
      console.error("Error updating task status:", error);
      setTasks(tasks); // Optionally revert state if there's an error
    }
  };

  const categorizedTasks = {
    pending: tasks.filter((task) => task.status === "pending"),
    inProgress: tasks.filter((task) => task.status === "inProgress"),
    completed: tasks.filter((task) => task.status === "completed"),
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
        onClick={() => openModal()}
        className="mt-5 px-4 py-2 rounded-md font-semibold border-2 text-green-500 border-green-500 hover:bg-green-500 hover:text-white"
      >
        Add Task
      </button>
      {isModalOpen && (
        <TaskModal
          taskToEdit={currentTask}
          isEditing={isEditing}
          onClose={closeModal}
          notifySuccess={notifySuccess}
          notifyError={notifyError}
          refresh={fetchTasks}
        />
      )}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex space-x-4 mt-8">
          {Object.entries(categorizedTasks).map(([key, tasks]) => (
            <Droppable key={key} droppableId={key}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="border p-4 rounded-md w-full bg-gray-100 shadow-md"
                >
                  <h2 className="font-bold text-lg capitalize text-center mb-4 text-gray-700">
                    {key}
                  </h2>
                  {tasks.map((task, index) => (
                    <Draggable
                      key={task._id}
                      draggableId={task._id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white p-4 rounded-lg shadow-lg mt-3 flex flex-col"
                        >
                          <h3 className="font-semibold text-blue-600 mb-1">
                            {task.title}
                          </h3>
                          <p className="text-gray-700 text-sm mb-2">
                            {task.description}
                          </p>
                          <p className="text-sm text-gray-500 mb-3">
                            Deadline:{" "}
                            <span className="font-semibold text-gray-800">
                              {new Date(task.dueDate).toLocaleString("en-US", {
                                month: "long",
                                day: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                                hour12: true,
                              })}
                            </span>
                          </p>
                          <p
                            className={`text-sm font-semibold ${
                              task.priority === "high"
                                ? "text-red-500"
                                : task.priority === "medium"
                                ? "text-yellow-500"
                                : "text-green-500"
                            }`}
                          >
                            Priority:{" "}
                            {task.priority[0].toUpperCase() +
                              task.priority.slice(1).toLowerCase()}
                          </p>
                          <p className="text-sm text-gray-700">
                            Assigned to:
                            <span className="font-semibold">
                              {userMap[task.user]}
                            </span>
                          </p>
                          <div className="flex justify-end mt-4 border-t pt-2">
                            <button
                              onClick={() => openModal(task)}
                              className="mr-2"
                            >
                              <EditOutlinedIcon className="text-blue-500 hover:text-blue-600" />
                            </button>
                            <button onClick={() => handleDelete(task._id)}>
                              <DeleteOutlineOutlinedIcon className="text-red-500 hover:text-red-600" />
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
      <ToastContainer />
    </div>
  );
};

export default Task;
