import React, { useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { getUser } from "../../Utils/helpers";
import { formatDate } from "../../Utils/FormatDate";
import ProfileModal from "../../components/admin/Modal/Profile";
import { notifySuccess, notifyError } from "../../Utils/notification";

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = getUser();

  const handleEditProfile = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="container mx-auto mt-8">
      {/* Page Header */}
      <div className="flex justify-between mb-8">
        <h1 className="text-2xl font-bold font-serif">Admin Profile</h1>
        <p className="text-sm text-gray-500">
          <span className="text-blue-500 hover:underline">Home</span> /
          <span> Profile</span>
        </p>
      </div>

      {/* Profile Information Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Profile Image */}
            <img
              src={user.profile.url}
              alt="Profile"
              className="rounded-full w-24 h-24 object-cover"
            />
            {/* User Details */}
            <div>
              <h2 className="text-xl font-semibold">
                {user.fname + " " + user.lname}
              </h2>
              <p className="text-gray-600">
                {user?.email || "admin@example.com"}
              </p>
              <p className="text-gray-600 font-semibold capitalize">
                Role: {user?.role || "admin"}
              </p>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleEditProfile}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-1"
            >
              <EditOutlinedIcon /> <span>Edit Profile</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Profile Details</h3>
          <div className="text-gray-600 space-y-2">
            <p>
              <strong>Name:</strong> {user.fname + " " + user.lname || "N/A"}
            </p>
            <p>
              <strong>Date of Birth:</strong>{" "}
              {user?.dob ? formatDate(user.dob) : "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {user?.email || "N/A"}
            </p>
            <p>
              <strong>Phone:</strong> {user?.phoneNumber || "N/A"}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <ul className="text-gray-600 space-y-2">
            <li>- Logged in from IP: 192.168.1.1</li>
            <li>- Updated profile information</li>
            <li>- Changed password</li>
            <li>- Viewed reports dashboard</li>
          </ul>
        </div>
      </div>

      <ToastContainer />
      {isModalOpen && (
        <ProfileModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          user={user}
        />
      )}
    </div>
  );
};

export default Profile;
