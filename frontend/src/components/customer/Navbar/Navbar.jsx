import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdowns, setDropdowns] = useState({
    movies: false,
    announcements: false,
    food: false, // Added food dropdown
  });

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const toggleDropdown = (dropdown) => {
    setDropdowns((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
      movies: dropdown === "movies" ? !prev[dropdown] : false,
      announcements: dropdown === "announcements" ? !prev[dropdown] : false,
      food: dropdown === "food" ? !prev[dropdown] : false,
    }));
  };

  const handleResize = () => {
    if (window.innerWidth >= 768) {
      closeSidebar();
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav
      className="bg-transparent absolute top-0 left-0 w-full z-10 border-b p-3 font-mono"
      style={{ borderColor: "#FFFFFF26", borderBottomWidth: "1px" }}
    >
      <div className="flex container items-center justify-between mx-auto p-4">
        <h1 className="text-white">Cinemadine</h1>
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleSidebar}>
            {isOpen ? (
              <CloseIcon className="text-white" />
            ) : (
              <MenuIcon className="text-themeYellow" />
            )}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4 items-center">
          {["/", "/about", "/news", "/contact"].map((path) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `${
                  isActive ? "text-themeYellow" : "text-white"
                } hover:text-themeYellow px-4 py-2 font-bold`
              }
            >
              {path === "/"
                ? "Home"
                : path.substring(1).charAt(0).toUpperCase() + path.slice(2)}
            </NavLink>
          ))}
          {/* Foods Dropdown for Desktop */}
          <div className="relative">
            <button
              className="text-white font-bold hover:text-themeYellow flex items-center"
              onMouseEnter={() => setDropdowns({ ...dropdowns, foods: true })}
            >
              Foods
              <KeyboardArrowDownIcon />
            </button>
            {dropdowns["foods"] && (
              <div
                className="absolute bg-themeGrayExteral text-white rounded mt-2 shadow-lg z-10"
                onMouseEnter={() => setDropdowns({ ...dropdowns, foods: true })}
                onMouseLeave={() =>
                  setDropdowns({ ...dropdowns, foods: false })
                }
              >
                <ul className="p-2 space-y-2">
                  <li>
                    <NavLink
                      to={`/food/category`}
                      className="block hover:text-themeYellow px-4 py-2"
                    >
                      Categories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={`/foods/`}
                      className="block hover:text-themeYellow px-4 py-2"
                    >
                      Foods
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Search and Profile Icons */}
        <div className="hidden md:flex space-x-4 items-center">
          <button>
            <SearchIcon className="text-white hover:text-themeYellow" />
          </button>
          <NavLink to={`/login`}>
            <button>
              <PersonIcon className="text-white hover:text-themeYellow" />
            </button>
          </NavLink>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-themeGrayExteral text-white z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-end items-end">
          <button onClick={toggleSidebar}>
            <CloseIcon className="mt-1" style={{ fontSize: "2rem" }} />
          </button>
        </div>
        <div className="flex flex-col space-y-4 px-5 py-2">
          {["/", "/about", "/news", "/contact"].map((path) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `${
                  isActive ? "text-themeYellow" : "text-white"
                } hover:text-slate-400 pb-2 font-bold border-b text-left border-themeBorderBottom`
              }
              onClick={closeSidebar}
            >
              {path === "/"
                ? "Home"
                : path.substring(1).charAt(0).toUpperCase() + path.slice(2)}
            </NavLink>
          ))}

          {/* Foods Dropdown for Mobile */}
          <div className="w-full m-0 p-0">
            <button
              className="flex w-full justify-between items-center pb-2 font-bold border-b text-left border-themeBorderBottom hover:text-slate-400 text-white"
              onClick={() => toggleDropdown("foods")}
            >
              Foods
              {dropdowns["foods"] ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </button>
            {dropdowns["foods"] && (
              <div className="dropdown-content mt-2">
                <ul className="text-white p-2 rounded">
                  <li>
                    <NavLink
                      to={`/food/category`}
                      className="block p-2 hover:text-slate-400"
                      onClick={closeSidebar}
                    >
                      Categories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={`/food/all`}
                      className="block p-2 hover:text-slate-400"
                      onClick={closeSidebar}
                    >
                      Foods
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Search and Profile Icons */}
          <div className="flex space-x-4 mt-4">
            <SearchIcon className="hover:text-themeYellow" />
            <NavLink to={`/login`}>
              <PersonIcon className="hover:text-themeYellow" />
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
