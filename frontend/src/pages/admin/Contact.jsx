import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifySuccess, notifyError } from "../../Utils/helpers";
import ContactModal from "../../components/admin/Modal/Contact";
import { formatDate } from "../../Utils/helpers";
import ReactLoading from "react-loading";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { delay } from "../../Utils/helpers";
import { Box } from "@mui/material";
import client from "../../Utils/client";

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
        client.get(`/contacts`),
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

  // Columns definition for the DataTable
  const columns = [
    {
      name: "ID",
      label: "ID",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "phone",
      label: "Phone",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "subject",
      label: "Subject",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "createdAt",
      label: "Sent",
      options: {
        customBodyRender: (value) => formatDate(value),
        filter: true,
        sort: true,
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return value
            .split("-")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join("-");
        },
      },
    },
    {
      name: "edit",
      label: "Edit",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const contact = contacts[tableMeta.rowIndex];
          return (
            <button
              className={`p-1 mr-2 rounded-full bg-transparent ${
                contact.status.toLowerCase() === "resolved"
                  ? "text-gray-500 cursor-not-allowed"
                  : "text-blue-500 hover:bg-blue-500 hover:text-white transition duration-200 ease-in-out"
              }`}
              onClick={() => openModal(contact)}
              disabled={contact.status.toLowerCase() === "resolved"}
            >
              <EditOutlinedIcon />
            </button>
          );
        },
      },
    },
  ];

  // Options for MUIDataTable
  const options = {
    filterType: "checkbox",
    responsive: "standard",
    selectableRows: "none", // No row selection
    elevation: 3,
    onRowClick: (rowData, rowMeta) => {
      // If you want to do something on row click (e.g., opening a modal for the selected contact)
      console.log(rowData);
    },
  };

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
        <Box position="fixed" top="0" left="0" right="0" bottom="0" zIndex="50">
          <ContactModal
            contactToEdit={currentContact}
            isEditing={isEditing}
            onClose={closeModal}
            onContactCreated={handleContactChange}
            notifySuccess={notifySuccess}
            notifyError={notifyError}
            refresh={fetchContacts}
          />
        </Box>
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
            <Skeleton count={5} height={40} />
          </SkeletonTheme>
        </div>
      ) : (
        <div className="mt-4 bg-white p-4 shadow-md rounded-lg">
          <MUIDataTable
            title={"Contacts List"}
            data={contacts}
            columns={columns}
            options={options}
          />
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Contact;
