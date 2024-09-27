import React, { useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { notifySuccess, notifyError } from "../../Utils/notification";
import TaskModal from "../../components/admin/Modal/Task";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";

// Dummy data
const dummyTasks = [
  {
    _id: "1",
    title: "Task 1",
    description: "Description for Task 1",
    deadline: "2024-10-01",
    priority: "High",
    status: "Pending",
    profilePicture: "https://via.placeholder.com/40",
  },
  {
    _id: "2",
    title: "Task 2",
    description: "Description for Task 2",
    deadline: "2024-09-30",
    priority: "Medium",
    status: "In Progress",
    profilePicture: "https://via.placeholder.com/40",
  },
  {
    _id: "3",
    title: "Task 3",
    description: "Description for Task 3",
    deadline: "2024-09-28",
    priority: "Low",
    status: "Completed",
    profilePicture: "https://via.placeholder.com/40",
  },
  {
    _id: "4",
    title: "Task 4",
    description: "Description for Task 4",
    deadline: "2024-10-05",
    priority: "High",
    status: "Pending",
    profilePicture: "https://via.placeholder.com/40",
  },
];

const Task = () => {
  const [tasks, setTasks] = useState(dummyTasks);
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
        notifyError("Error Fetching genres");
        console.error("Error fetching genres:", error);
      });
  };

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
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskID));
      notifySuccess("Successfully Deleted!");
    }
  };

  const handleDragEnd = (result) => {
    // Check if dropped outside a droppable
    if (!result.destination) return;

    const { source, destination } = result;

    // If the source and destination are the same, return early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Get the dragged task
    const draggedTask = tasks[source.index];

    // Update task status based on destination droppable area
    const updatedTask = {
      ...draggedTask,
      status: destination.droppableId,
    };

    // Create a new list of tasks without the dragged task
    const updatedTasks = Array.from(tasks);
    updatedTasks.splice(source.index, 1); // Remove the task from the source index

    // Insert the task back into the new status list at the destination index
    updatedTasks.splice(destination.index, 0, updatedTask);

    // Set the updated task list in state
    setTasks(updatedTasks);
  };

  const categorizedTasks = {
    pending: tasks.filter((task) => task.status === "Pending"),
    inProgress: tasks.filter((task) => task.status === "In Progress"),
    completed: tasks.filter((task) => task.status === "Completed"),
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
                  className="border p-4 rounded-md w-full"
                >
                  <h2 className="font-bold text-lg capitalize">{key}</h2>
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
                          className="bg-white p-2 rounded-md shadow mt-2 flex items-center"
                        >
                          <img
                            src={task.profilePicture}
                            alt="Profile"
                            className="w-10 h-10 rounded-full mr-2"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold">{task.title}</h3>
                            <p>{task.description}</p>
                            <p className="text-sm">
                              Deadline: {task.deadline} | Priority:{" "}
                              {task.priority}
                            </p>
                          </div>
                          <div className="flex flex-col justify-between">
                            <button onClick={() => openModal(task)}>
                              <EditOutlinedIcon />
                            </button>
                            <button onClick={() => handleDelete(task._id)}>
                              <DeleteOutlineOutlinedIcon />
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
