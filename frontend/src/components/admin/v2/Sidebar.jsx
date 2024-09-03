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
      <ul className="pl-10 pt-5 text-xs">
        <h1 className="text-gray-400 font-sans">Main</h1>
        <li
          className="py-5 text-gray-400  cursor-pointer flex items-center"
          onMouseOver={() => setHovered("dashboard")}
          onMouseOut={() => setHovered(null)}
          style={{
            backgroundColor:
              hovered === "dashboard" ? "#161621" : "transparent",
          }}
        >
          <div className="mr-5 rounded-md">
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
            style={{
              fontSize: "16px",
              color: hovered === "dashboard" ? "white" : "#9ca3af",
            }}
          >
            Dashboard
          </span>
        </li>
        <li
          className="py-0 text-gray-400 cursor-pointer flex items-center"
          onMouseOver={() => setHovered("users")}
          onMouseOut={() => setHovered(null)}
          style={{
            backgroundColor: hovered === "users" ? "#161621" : "transparent",
          }}
        >
          <div className="mr-5 rounded-md">
            <GroupIcon
              style={{
                color: "#33C92D",
                fontSize: "1.7rem",
                lineHeight: "1",
              }}
              className="p-1"
            />
          </div>
          <span style={{ fontSize: "16px" }}>Users</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
