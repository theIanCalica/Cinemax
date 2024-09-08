import React, { useEffect, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { formatDate } from "../../Utils/FormatDate";
import UserModal from "../../components/admin/Modal/User";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/users");
      if (response.ok) {
        const json = await response.json();
        setUsers(json);
      }
    } catch (err) {
      console.log("Error fetching users", err);
    }
  };

  // Open and close modal
  const openModal = (user = null) => {
    setCurrentUser(user);
    setIsEditing(!!user); // If a user is passed, set editing to true
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
    setIsEditing(false);
  };

  // Notify success message using Toastify
  const notifySuccess = (message) => {
    toast.success(message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  // Notify error message using Toastify
  const notifyError = (message) => {
    toast.error(message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  const handleUserChange = (updatedUser) => {
    if (isEditing) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        )
      );
    } else {
      setUsers((prevUsers) => [...prevUsers, updatedUser]);
    }
  };

  useEffect(() => {});

  const handleDelete = async (userID) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this genre!",
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
          `http://localhost:4000/api/users/${userID}`,
          { method: "DELETE" }
        );

        if (response.ok) {
          notifySuccess("Successfully Deleted!");
          setUsers((prevUsers) => {
            prevUsers.filter((user) => user._id !== userID);
          });
        } else {
          notifyError("Deletion Unsuccessful!");
        }
      } catch (err) {
        notifyError("Deletion Unsuccessful!");
        console.log(err.message);
      }
    }
  };

  return (
    <div className="px-3 mt-8">
      <div className="flex justify-between">
        <h1 className="font-bold font-serif text-2xl">Users</h1>
        <p style={{ fontSize: "13.5px" }}>
          <span className="text-blue-500 hover:underline">Users</span>
        </p>
      </div>
      <button
        onClick={() => openModal()} // Open modal for adding new user
        className="mt-5 px-4 py-2 rounded-md font-semibold border-2 text-green-500 border-green-500 hover:bg-green-500 hover:text-white"
      >
        Add User
      </button>

      {/* Render the modal for creating or editing a user */}
      {isModalOpen && (
        <UserModal
          userToEdit={currentUser} // Pass the current user to the modal
          isEditing={isEditing} // Pass editing state to the modal
          onClose={closeModal}
          onUserCreated={handleUserChange} // Pass function to add or update user
          notifySuccess={notifySuccess} // Pass success notification
          notifyError={notifyError} // Pass error notification
          refresh={fetchUsers} //Pass refresh function for the table
        />
      )}
    </div>
  );
};

export default UsersPage;
