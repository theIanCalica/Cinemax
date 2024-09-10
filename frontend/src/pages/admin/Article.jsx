import React, { useEffect, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { formatDate } from "../../Utils/FormatDate";
import { notifySuccess, notifyError } from "../../Utils/notification";
const Article = () => {
  const [articles, setArticles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchArticles = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/articles/");
      if (response.ok) {
        const json = await response.json();
        setArticles(json);
      } else {
        console.error("Failed to fetch articles:", response.statusText);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // Open and close modal
  const openModal = (article = null) => {
    setCurrentArticle(article);
    setIsEditing(!!article); // If a category is passed, set editing to true
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentArticle(null);
    setIsEditing(false);
  };

  // Add or update contact in the state
  const handleArticleChange = async () => {
    try {
      // Re-fetch articles after a successful create or update
      await fetchArticles(); // This will refresh the table data
    } catch (err) {
      console.error("Error updating contact:", err);
    }
  };

  const handleDelete = async (articleID) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this article!",
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
          `http://localhost:4000/api/articles/${articleID}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          notifySuccess("Successfully Deleted!");
          // Remove the deleted article from the state
          setArticles((prevArticles) =>
            prevArticles.filter((article) => article._id !== article)
          );
        } else {
          notifyError("Deletion Unsuccessful");
        }
      } catch (error) {
        notifyError("Error occured");
      }
    }
  };
  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="px-3 mt-8">
      <div className="flex justify-between">
        <h1 className="font-bold font-serif text-2xl">Articles</h1>
      </div>
    </div>
  );
};

export default Article;
