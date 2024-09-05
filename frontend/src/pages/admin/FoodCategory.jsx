import React, { useEffect, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CreateCategory from "../../components/admin/Modal/CreateCategory";

const FoodCategory = () => {
  // Initialize categories as an empty array and modal state
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/categories/");
        if (response.ok) {
          const json = await response.json();
          setCategories(json);
        } else {
          console.error("Failed to fetch categories:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="px-3 mt-8">
      <div className="flex justify-between">
        <h1 className="font-bold font-serif text-2xl">Food Categories</h1>
        <p style={{ fontSize: "13.5px" }}>
          <span className="text-blue-500 hover:underline">Foods</span> /
          <span className="text-gray-500">Food Categories</span>
        </p>
      </div>
      <button
        onClick={openModal}
        className="mt-5 px-4 py-2 rounded-md font-semibold border-2 text-green-500 border-green-500 hover:bg-green-500 hover:text-white"
      >
        Add Category
      </button>

      {isModalOpen && <CreateCategory onClose={closeModal} />}

      <div className="mt-4 bg-white p-4 shadow-md rounded-lg">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">ID</th>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Created</th>
              <th className="py-2 px-4 border-b text-left">Updated</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id} className="hover:bg-slate-50">
                <td className="py-2 px-4 border-b">{category._id}</td>
                <td className="py-2 px-4 border-b">{category.name}</td>
                <td className="py-2 px-4 border-b">
                  {formatDate(category.createdAt)}
                </td>
                <td className="py-2 px-4 border-b">
                  {formatDate(category.updatedAt)}
                </td>
                <td className="py-2 px-4 border-b">
                  <button className="text-blue-500 mr-2">
                    <EditOutlinedIcon />
                  </button>
                  <button className="text-red-500">
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

export default FoodCategory;
