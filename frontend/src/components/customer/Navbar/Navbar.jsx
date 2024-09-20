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
  });

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const toggleDropdown = (dropdown) => {
    setDropdowns((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
      ...(dropdown === "movies" ? { announcements: false } : { movies: false }),
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
        <div className="md:hidden">
          <button onClick={toggleSidebar}>
            {isOpen ? (
              <CloseIcon className="text-white" />
            ) : (
              <MenuIcon className="text-themeYellow" />
            )}
          </button>
        </div>
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
        </div>
        <div className="hidden md:flex space-x-4 items-center">
          <button
            onClick={() => {
              closeSidebar(); /* Navigate to search page */
            }}
          >
            <SearchIcon className="text-white hover:text-themeYellow" />
          </button>
          <button
            onClick={() => {
              closeSidebar(); /* Navigate to profile page */
            }}
          >
            <PersonIcon className="text-white hover:text-themeYellow" />
          </button>
        </div>
      </div>

      {/* Sidebar for smaller screens */}
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

          {/* Dropdowns for Movies and Announcements */}
          {["movies", "announcements"].map((dropdown) => (
            <div key={dropdown} className="w-full m-0 p-0">
              <button
                className="flex w-full justify-between items-center pb-2 font-bold border-b text-left border-themeBorderBottom hover:text-slate-400 text-white"
                onClick={() => toggleDropdown(dropdown)}
              >
                <div>
                  {dropdown.charAt(0).toUpperCase() + dropdown.slice(1)}
                </div>
                {dropdowns[dropdown] ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </button>

              {dropdowns[dropdown] && (
                <div className="dropdown-content mt-2">
                  <ul className="text-white p-2 rounded">
                    <li>
                      <NavLink
                        to={`/movies/action`}
                        className="block p-2 hover:text-slate-400"
                        onClick={closeSidebar}
                      >
                        Now Showing
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={`/movies/comedy`}
                        className="block p-2 hover:text-slate-400"
                        onClick={closeSidebar}
                      >
                        Coming Soon
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={`/movies/drama`}
                        className="block p-2 hover:text-slate-400"
                        onClick={closeSidebar}
                      >
                        All Movies
                      </NavLink>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ))}

          <div className="flex space-x-4 mt-4">
            <SearchIcon className="hover:text-themeYellow" />
            <PersonIcon className="hover:text-themeYellow" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
