import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "axios";
import { notifyError, notifySuccess } from "../../Utils/notification";

const Calendar = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchTask = () => {
    axios
      .get(`${process.env.REACT_APP_API_LINK}/tasks`)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        notifyError("Error fetching Task");
        console.error("Error fetching contacts:", error);
      });
  };

  // Open and close modal
  const openModal = (contact = null) => {
    setCurrentTask(contact);
    setIsEditing(!!contact); // If a contact is passed, set editing to true
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTask(null);
    setIsEditing(false);
  };

  const refresh = async () => {
    try {
      // Re-fetch task after a successful update
      await fetchTask(); // This will refresh the table data
    } catch (err) {
      console.error("Error updating task:", err);
      notifyError("Refresh Failed");
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  return (
    <div>
      <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
    </div>
  );
};

export default Calendar;
