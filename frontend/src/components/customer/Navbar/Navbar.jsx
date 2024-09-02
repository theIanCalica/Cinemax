import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className="bg-transparent absolute top-0 left-0 w-full z-10 border-b  p-3"
      style={{ borderColor: "#FFFFFF26", borderBottomWidth: "1px" }}
    >
      <div className="flex container items-center justify-between mx-auto p-4">
        <div>
          <h1 className="text-white">Cinemadine</h1>
        </div>
        <div className="md:hidden">
          <button onClick={toggleSidebar}>
            {isOpen ? (
              <CloseIcon className="text-white text-sm transition-transform duration-300" />
            ) : (
              <MenuIcon className="text-white text-sm transition-transform duration-300" />
            )}
          </button>
        </div>
        <div className="hidden md:flex space-x-4 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${
                isActive ? "text-themeYellow" : "text-white"
              } hover:text-themeYellow px-4 py-2 font-bold`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${
                isActive ? "text-themeYellow" : "text-white"
              } hover:text-themeYellow px-4 py-2 font-bold`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/news"
            className={({ isActive }) =>
              `${
                isActive ? "text-themeYellow" : "text-white"
              } hover:text-themeYellow px-4 py-2 font-bold`
            }
          >
            News
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${
                isActive ? "text-themeYellow" : "text-white"
              } hover:text-themeYellow px-4 py-2 font-bold`
            }
          >
            Contact
          </NavLink>
        </div>
        <div className="hidden md:flex space-x-4 items-center">
          <div>
            <SearchIcon className="text-white hover:text-themeYellow" />
          </div>
          <div>
            <PersonIcon className="text-white hover:text-themeYellow" />
          </div>
        </div>
      </div>

      {/* Sidebar for smaller screens */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-blue-700 text-white z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col space-y-4 p-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${
                isActive ? "text-themeYellow" : "text-white"
              } hover:text-themeYellow px-4 py-2 font-bold`
            }
            onClick={toggleSidebar}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${
                isActive ? "text-themeYellow" : "text-white"
              } hover:text-themeYellow px-4 py-2 font-bold`
            }
            onClick={toggleSidebar}
          >
            About
          </NavLink>
          <NavLink
            to="/news"
            className={({ isActive }) =>
              `${
                isActive ? "text-themeYellow" : "text-white"
              } hover:text-themeYellow px-4 py-2 font-bold`
            }
            onClick={toggleSidebar}
          >
            News
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${
                isActive ? "text-themeYellow" : "text-white"
              } hover:text-themeYellow px-4 py-2 font-bold`
            }
            onClick={toggleSidebar}
          >
            Contact
          </NavLink>
          <div className="flex space-x-4 mt-4">
            <SearchIcon className="hover:text-themeYellow" />
            {/* <NavLink to="/login">

            </NavLink> */}
            <PersonIcon className="hover:text-themeYellow" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
