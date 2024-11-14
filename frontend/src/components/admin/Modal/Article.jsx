import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  getBorderColor,
  notifySuccess,
  notifyError,
} from "../../../Utils/helpers";
import Select from "react-select";
import axios from "axios";

const Article = ({
  ArticleToEdit,
  isEditing,
  onClose,
  onArticleCreated,
  refersh,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const url = isEditing
      ? `http://localhost:4000/api/articles/${ArticleToEdit._id}`
      : "http://localhost:4000/api/articles";
    const method = isEditing ? "PUT" : "POST";
    try {
      if (isEditing) {
        axios.put(``);
      }
    } catch (err) {}
  };

  return (
    <div>
      <div></div>
    </div>
  );
};

export default Article;
