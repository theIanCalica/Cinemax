import React from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const FoodCategory = () => {
  // Sample data
  const categories = [
    { id: 1, name: "Pizza", createdAt: "2024-01-01", updatedAt: "2024-01-05" },
    { id: 2, name: "Burger", createdAt: "2024-02-01", updatedAt: "2024-02-05" },
    // Add more sample data as needed
  ];

  return (
    <div className="px-3 mt-8">
      <div className="flex justify-between">
        <h1 className="font-bold font-serif text-2xl">Food Categories</h1>
        <p style={{ fontSize: "13.5px" }}>
          <span className="text-blue-500 hover:underline">Foods</span> /
          <span className="text-gray-500">Food Categories</span>
        </p>
      </div>
      <div className="mt-6 bg-white p-4 shadow-md rounded-lg">
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
              <tr key={category.id}>
                <td className="py-2 px-4 border-b">{category.id}</td>
                <td className="py-2 px-4 border-b">{category.name}</td>
                <td className="py-2 px-4 border-b">{category.createdAt}</td>
                <td className="py-2 px-4 border-b">{category.updatedAt}</td>
                <td className="py-2 px-4 border-b">
                  <button className="text-blue-500 hover:underline mr-2">
                    <EditOutlinedIcon />
                  </button>
                  <button className="text-red-500 hover:underline">
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
