import React, { useEffect, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifySuccess, notifyError } from "../../Utils/notification";
import ContactModal from "../../components/admin/Modal/Contact";
import { formatDate } from "../../Utils/FormatDate";
import axios from "axios";
import ReactLoading from "react-loading";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { delay } from "../../Utils/helpers";

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchContacts = async () => {
    setIsLoading(true);
    try {
      const [response] = await Promise.all([
        axios.get(`${process.env.REACT_APP_API_LINK}/contacts`),
        delay(1000),
      ]);
      setContacts(response.data);
    } catch (err) {
      notifyError("Error Fetching contacts");
      console.error("Error fetching contacts:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (contact = null) => {
    setCurrentContact(contact);
    setIsEditing(!!contact);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentContact(null);
    setIsEditing(false);
  };

  const handleContactChange = async () => {
    try {
      await fetchContacts();
    } catch (err) {
      console.error("Error updating contact:", err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="px-3 mt-8">
      <div className="flex justify-between">
        <h1 className="font-bold font-serif text-2xl">List of Contact</h1>
        <p style={{ fontSize: "13.5px" }}>
          <span className="text-blue-500 hover:underline">Home</span> /
          <span className="text-gray-500">Contacts</span>
        </p>
      </div>

      {isModalOpen && (
        <ContactModal
          contactToEdit={currentContact}
          isEditing={isEditing}
          onClose={closeModal}
          onContactCreated={handleContactChange}
          notifySuccess={notifySuccess}
          notifyError={notifyError}
          refresh={fetchContacts}
        />
      )}

      {isLoading ? (
        <div>
          <div className="loading-wrapper">
            <ReactLoading
              type="spin"
              color="#33C92D"
              height={50}
              width={50}
              className="z-50"
            />
          </div>
          <SkeletonTheme
            baseColor="#e5e7eb"
            highlightColor="#f3f4f6"
            borderRadius="0.5rem"
            duration={5}
          >
            <table className="min-w-full bg-white border-collapse">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">ID</th>
                  <th className="py-2 px-4 border-b text-left">Name</th>
                  <th className="py-2 px-4 border-b text-left">Email</th>
                  <th className="py-2 px-4 border-b text-left">Phone</th>
                  <th className="py-2 px-4 border-b text-left">Subject</th>
                  <th className="py-2 px-4 border-b text-left">Sent</th>
                  <th className="py-2 px-4 border-b text-left">Status</th>
                  <th className="py-2 px-4 border-b text-left">Edit</th>
                </tr>
              </thead>
              <tbody>
                {/* Generate skeleton rows */}
                {Array(5)
                  .fill()
                  .map((_, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b">
                        <Skeleton />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <Skeleton />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <Skeleton />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <Skeleton />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <Skeleton />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <Skeleton />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <Skeleton />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <Skeleton />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </SkeletonTheme>
        </div>
      ) : (
        <>
          <div className="mt-4 bg-white p-4 shadow-md rounded-lg">
            <table className="min-w-full bg-white border-collapse">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">ID</th>
                  <th className="py-2 px-4 border-b text-left">Name</th>
                  <th className="py-2 px-4 border-b text-left">Email</th>
                  <th className="py-2 px-4 border-b text-left">Phone</th>
                  <th className="py-2 px-4 border-b text-left">Subject</th>
                  <th className="py-2 px-4 border-b text-left">Sent</th>
                  <th className="py-2 px-4 border-b text-left">Status</th>
                  <th className="py-2 px-4 border-b text-left">Edit</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact._id} className="hover:bg-slate-50">
                    <td className="py-2 px-4 border-b">{contact._id}</td>
                    <td className="py-2 px-4 border-b">{contact.name}</td>
                    <td className="py-2 px-4 border-b">{contact.email}</td>
                    <td className="py-2 px-4 border-b">{contact.phone}</td>
                    <td className="py-2 px-4 border-b">{contact.subject}</td>
                    <td className="py-2 px-4 border-b">
                      {formatDate(contact.createdAt)}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {contact.status
                        .split("-") // Split the status by hyphen if it has one (e.g., in-progress)
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() +
                            word.slice(1).toLowerCase()
                        ) // Capitalize the first letter of each part
                        .join("-")}{" "}
                      {/* Join the words back together */}
                    </td>

                    <td className="py-2 px-4 border-b">
                      <button
                        className={`p-1 mr-2 rounded-full bg-transparent ${
                          contact.status.toLowerCase() === "resolved"
                            ? "text-gray-500 cursor-not-allowed"
                            : "text-blue-500 hover:bg-blue-500 hover:text-white transition duration-200 ease-in-out"
                        }`}
                        onClick={() => openModal(contact)} // Pass the contact to be edited
                        disabled={contact.status.toLowerCase() === "resolved"} // Disable if status is Resolved
                      >
                        <EditOutlinedIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ToastContainer />
        </>
      )}
    </div>
  );
};

export default Contact;
