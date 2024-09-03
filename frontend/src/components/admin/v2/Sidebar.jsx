import React, { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Sidebar = () => {
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState("dashboard");

  const handleItemClick = (item) => {
    setSelected(item);
  };

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
          className="mt-3 py-2 px-8 text-gray-400 cursor-pointer flex items-center w-full transition-colors duration-300 ease-in-out relative"
          onMouseOver={() => setHovered("dashboard")}
          onMouseOut={() => setHovered(null)}
          onClick={() => handleItemClick("dashboard")}
          style={{
            backgroundColor:
              hovered === "dashboard" || selected === "dashboard"
                ? "#161621"
                : "transparent",
          }}
        >
          {selected === "dashboard" && (
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-green-500" />
          )}
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
              color:
                hovered === "dashboard" || selected === "dashboard"
                  ? "white"
                  : "#9ca3af",
            }}
          >
            Dashboard
          </span>
        </li>
        <li
          className="mt-3 py-2 px-8 text-gray-400 cursor-pointer flex items-center w-full transition-colors duration-300 ease-in-out relative"
          onMouseOver={() => setHovered("users")}
          onMouseOut={() => setHovered(null)}
          onClick={() => handleItemClick("users")}
          style={{
            backgroundColor:
              hovered === "users" || selected === "users"
                ? "#161621"
                : "transparent",
          }}
        >
          {selected === "users" && (
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-green-500" />
          )}
          <div
            className="mr-5 rounded-md transition-colors duration-300 ease-in-out"
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
            className="transition-all ease-in-out duration-500"
            style={{
              fontSize: "16px",
              color:
                hovered === "users" || selected === "users"
                  ? "white"
                  : "#9ca3af",
            }}
          >
            Users
          </span>
        </li>
        <h1 className="text-gray-400 font-sans px-8 pt-1">Services</h1>
        <li
          className="mt-3 py-2 px-8 text-gray-400 cursor-pointer flex items-center w-full transition-colors duration-300 ease-in-out relative"
          onMouseOver={() => setHovered("services")}
          onMouseOut={() => setHovered(null)}
          onClick={() => handleItemClick("services")}
          style={{
            backgroundColor:
              hovered === "services" || selected === "users"
                ? "#161621"
                : "transparent",
          }}
        >
          {selected === "services" && (
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-green-500" />
          )}
          <div
            className="mr-5 rounded-md transition-colors duration-300 ease-in-out"
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
            className="transition-all ease-in-out duration-500"
            style={{
              fontSize: "16px",
              color:
                hovered === "services" || selected === "users"
                  ? "white"
                  : "#9ca3af",
            }}
          >
            Foods
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
