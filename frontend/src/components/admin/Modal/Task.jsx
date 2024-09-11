import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getBorderColor } from "../../../Utils/borderColor";

const Task = ({
  onClose,
  onTaskCreated,
  notifySuccess,
  notifyError,
  taskToEdit,
  isEditing,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? "Edit Task" : "Add Task"}
        </h2>
      </div>
    </div>
  );
};

export default Task;
