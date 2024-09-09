import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getBorderColor } from "../../../Utils/borderColor";

const Contact = ({
  onClose,
  onCategoryCreated,
  notifySuccess,
  notifyError,
  categoryToEdit,
  isEditing,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <div></div>
    </div>
  );
};

export default Contact;
