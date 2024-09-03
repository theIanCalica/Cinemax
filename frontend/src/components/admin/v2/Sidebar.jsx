import React, { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";

const Sidebar = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <div
      className="w-64 h-screen text-white"
      style={{ backgroundColor: "#181824" }}
    >
      <div className="p-4 text-xl font-bold font-serif">Cinemax</div>
      <ul className="mt-5 text-xs">
        <h1 className="text-gray-400 font-sans px-8 pt-1">Main</h1>
        {/* Sidebar Items */}
        <li
          className="mt-3 py-2 px-8 text-gray-400 cursor-pointer flex items-center w-full transition-colors duration-300 ease-in-out "
          onMouseOver={() => setHovered("dashboard")}
          onMouseOut={() => setHovered(null)}
          style={{
            backgroundColor:
              hovered === "dashboard" ? "#161621" : "transparent",
          }}
        >
          <div
            className="mr-5 rounded-md transition-colors duration-300 ease-in-out"
            style={{ backgroundColor: "#2B3138" }}
          >
            <DashboardIcon
              style={{
                color: "#33C92D",
                fontSize: "1.7rem",
                lineHeight: "1",
              }}
              className="p-1"
            />
          </div>
          <span
            className="transition-all ease-in-out duration-500"
            style={{
              fontSize: "16px",
              color: hovered === "dashboard" ? "white" : "#9ca3af",
            }}
          >
            Dashboard
          </span>
        </li>
        <li
          className="py-2 px-8 text-gray-400 cursor-pointer flex items-center w-full"
          onMouseOver={() => setHovered("users")}
          onMouseOut={() => setHovered(null)}
          style={{
            backgroundColor: hovered === "users" ? "#161621" : "transparent",
          }}
        >
          <div
            className="mr-5 rounded-md"
            style={{ backgroundColor: "#2B3138" }}
          >
            <GroupIcon
              style={{
                color: "#33C92D",
                fontSize: "1.7rem",
                lineHeight: "1",
              }}
              className="p-1"
            />
          </div>
          <span
            style={{
              fontSize: "16px",
              color: hovered === "users" ? "white" : "#9ca3af",
            }}
          >
            Users
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
