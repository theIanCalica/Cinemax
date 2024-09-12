import React, { useEffect, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { formatDate } from "../../Utils/FormatDate";
import { notifyError, notifySuccess } from "../../Utils/notification";
import UserModal from "../../components/admin/Modal/User";
import axios from "axios";
const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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

  const handleUserChange = async () => {
    try {
      fetchUsers();
    } catch (err) {
      console.error("Error updating contact:", err);
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

      {/* Displays users in a table */}
      <div className="mt-4 bg-white p-4 shadow-md rounded-lg">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">ID</th>
              <th className="py-2 px-4 border-b text-left">First Name</th>
              <th className="py-2 px-4 border-b text-left">Last Name</th>
              <th className="py-2 px-4 border-b text-left">Date of Birth</th>
              <th className="py-2 px-4 border-b text-left">Email</th>
              <th className="py-2 px-4 border-b text-left">Phone</th>
              <th className="py-2 px-4 border-b text-left">Role</th>
              <th className="py-2 px-4 border-b text-left">Profile</th>
              <th className="py-2 px-4 border-b text-left">Edit</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-slate-50">
                <td className="py-2 px-4 border-b">{user._id}</td>
                <td className="py-2 px-4 border-b">{user.fname}</td>
                <td className="py-2 px-4 border-b">{user.lname}</td>
                <td className="py-2 px-4 border-b">{formatDate(user.dob)}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.phoneNumber}</td>
                <td className="py-2 px-4 border-b">{user.role}</td>
                {user.profile ? (
                  <img
                    src={user.profile.url}
                    alt="User Profile"
                    className="w-16 h-16 object-cover"
                  />
                ) : (
                  <img
                    src="/images/default"
                    alt="Default Profile"
                    className="w-16 h-16 object-cover"
                  />
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
