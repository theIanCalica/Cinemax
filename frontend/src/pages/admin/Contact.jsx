import React, { useEffect, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { notifySuccess, notifyError } from "../../Utils/notification";
import ContactModal from "../../components/admin/Modal/Contact";
import { formatDate } from "../../Utils/FormatDate";

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchContacts = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/contacts");
      if (response.ok) {
        const json = await response.json();
        setContacts(json);
      } else {
        console.error("Failed to fetch contacts:", response.statusText);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  return (
    <div className="px-3 mt-8">
      <div className="flex justify-between"></div>
    </div>
  );
};

export default Contact;
