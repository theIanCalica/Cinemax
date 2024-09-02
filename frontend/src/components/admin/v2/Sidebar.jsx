import React from "react";
import { Home, Person, Analytics } from "@mui/icons-material";

const Sidebar = () => {
  return (
    <div
      className="w-64 h-screen  text-white"
      style={{ backgroundColor: "#181824" }}
    >
      <div className="p-4 text-xl font-bold">Dashboard</div>
      <ul>
        <li className="p-4 hover:bg-gray-700 cursor-pointer flex items-center">
          <Home className="mr-2" /> Home
        </li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer flex items-center">
          <Person className="mr-2" /> Users
        </li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer flex items-center">
          <Analytics className="mr-2" /> Analytics
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
