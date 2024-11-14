import React, { useEffect, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { notifySuccess, notifyError, formatDate } from "../../Utils/helpers";
import ArticleModal from "../../components/admin/Modal/Article";

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
        <p style={{ fontSize: "13.5px" }}>
          <span className="text-blue-500 hover:underline">Home</span> /
          <span className="text-gray-500">Article</span>
        </p>
      </div>
      <button
        onClick={() => openModal()} // Open modal for adding new category
        className="mt-5 px-4 py-2 rounded-md font-semibold border-2 text-green-500 border-green-500 hover:bg-green-500 hover:text-white"
      >
        Add Article
      </button>

      {isModalOpen && (
        <ArticleModal
          ArticleToEdit={currentArticle}
          isEditing={isEditing}
          onClose={closeModal}
          onArticleCreated={handleArticleChange}
          notifySuccess={notifySuccess}
          notifyError={notifyError}
          refresh={fetchArticles}
        />
      )}
      {/* Display articles in a table */}
      <div className="mt-4 bg-white p-4 shadow-md rounded-lg">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">ID</th>
              <th className="py-2 px-4 border-b text-left">Title</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
              <th className="py-2 px-4 border-b text-left">Date Published</th>
              <th className="py-2 px-4 border-b text-left">Date Updated</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article._id} className="hover:bg-slate-50">
                <td className="py-2 px-4 border-b">{article._id}</td>
                <td className="py-2 px-4 border-b">{article.title}</td>
                <td className="py-2 px-4 border-b">
                  {article.hidden ? "Active" : "Inactive"}
                </td>
                <td className="py-2 px-4 border-b">
                  {formatDate(article.date)}
                </td>
                <td className="py-2 px-4 border-b">
                  {formatDate(article.updatedAt)}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="p-1 mr-2 rounded-full bg-transparent text-blue-500 hover:bg-blue-500 hover:text-white transition duration-200 ease-in-out"
                    onClick={() => openModal(article)} // Pass the category to be edited
                  >
                    <EditOutlinedIcon />
                  </button>

                  <button
                    className="p-1 rounded-full bg-transparent text-red-500 hover:bg-red-500 hover:text-white transition duration-200 ease-in-out"
                    onClick={() => {
                      handleDelete(article._id);
                    }}
                  >
                    <DeleteOutlineOutlinedIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Article;
