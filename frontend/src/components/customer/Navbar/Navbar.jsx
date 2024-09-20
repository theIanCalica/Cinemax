import React, { useState } from "react";
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

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = (dropdown) => {
    setDropdowns((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
      // Close other dropdown when opening one
      ...(dropdown === "movies" ? { announcements: false } : { movies: false }),
    }));
  };

  return (
    <nav
      className="bg-transparent absolute top-0 left-0 w-full z-10 border-b  p-3 font-mono"
      style={{ borderColor: "#FFFFFF26", borderBottomWidth: "1px" }}
    >
      <div className="flex container items-center justify-between mx-auto p-4">
        <div>
          <h1 className="text-white">Cinemadine</h1>
        </div>
        <div className="md:hidden">
          <button onClick={toggleSidebar} className="relative">
            <CloseIcon
              className={`${
                isOpen ? "opacity-100 scale-100" : "opacity-0 scale-50"
              } text-white text-sm absolute transition-all duration-300 ease-in-out transform`}
              style={{ transformOrigin: "center" }}
            />
            <MenuIcon
              className={`${
                isOpen ? "opacity-0 scale-50" : "opacity-100 scale-100"
              } text-themeYellow text-sm transition-all duration-300 ease-in-out transform`}
              style={{ transformOrigin: "center" }}
            />
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
        className={`fixed top-0 left-0 h-full w-64 bg-themeGrayExteral text-white z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-end items-end">
          <button onClick={toggleSidebar}>
            <CloseIcon className="mt-1 " style={{ fontSize: "2rem" }} />
          </button>
        </div>
        <div className="flex flex-col space-y-4 px-5 py-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${
                isActive ? "text-themeYellow" : "text-white"
              } hover:text-slate-400   pb-2 font-bold border-b mb-2  text-left border-themeBorderBottom `
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
              } hover:text-slate-400 pb-2 font-bold border-b mb-2 text-left border-themeBorderBottom`
            }
            onClick={toggleSidebar}
          >
            About
          </NavLink>

          <div className="w-full m-0 p-0">
            <button
              className="flex w-full justify-between items-center pb-2 font-bold border-b  text-left border-themeBorderBottom hover:text-slate-400 text-white"
              onClick={() => toggleDropdown("movies")}
            >
              <div>Movies</div>
              {dropdowns.movies ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </button>

            {dropdowns.movies && ( // Use the dropdown state to control visibility
              <div className="dropdown-content mt-2">
                <ul className=" text-white p-2 rounded">
                  <li>
                    <NavLink
                      to="/movies/action"
                      className="block p-2 hover:text-slate-400 pb-2 font-bold border-b mb-2 text-left border-themeBorderBottom"
                      onClick={toggleSidebar}
                    >
                      Now Showing
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/movies/comedy"
                      className="block p-2 hover:text-slate-400 pb-2 font-bold border-b mb-2 text-left border-themeBorderBottom"
                      onClick={toggleSidebar}
                    >
                      Coming Soon
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/movies/drama"
                      className="block p-2 hover:text-slate-400 pb-2 font-bold border-b mb-2 text-left border-themeBorderBottom"
                      onClick={toggleSidebar}
                    >
                      All Movies
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="w-full m-0 p-0">
            <button
              className="flex w-full justify-between items-center pb-2 font-bold border-b text-left border-themeBorderBottom hover:text-slate-400 text-white"
              onClick={() => toggleDropdown("announcements")}
            >
              <div>Announcements</div>
              {dropdowns.announcements ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </button>

            {dropdowns.announcements && (
              <div className="dropdown-content mt-2">
                <ul className=" text-white p-2 rounded">
                  <li>
                    <NavLink
                      to="/movies/action"
                      className="block p-2 hover:text-slate-400 pb-2 font-bold border-b mb-2 text-left border-themeBorderBottom"
                      onClick={toggleSidebar}
                    >
                      Events
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/movies/comedy"
                      className="block p-2 hover:text-slate-400 pb-2 font-bold border-b mb-2 text-left border-themeBorderBottom"
                      onClick={toggleSidebar}
                    >
                      Articles
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <NavLink
            to="/news"
            className={({ isActive }) =>
              `${
                isActive ? "text-themeYellow" : "text-white"
              } hover:text-slate-400  pb-2 font-bold border-b mb-2  text-left border-themeBorderBottom `
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
              } hover:text-slate-400  pb-2 font-bold border-b mb-2  text-left border-themeBorderBottom `
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
