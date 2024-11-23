import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { getUser, logout } from "../../../Utils/helpers";
import Swal from "sweetalert2";

const Navbar = () => {
  const user = getUser();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false); // Added state for profile dropdown
  const [dropdowns, setDropdowns] = useState({
    movies: false,
    announcements: false,
    food: false,
  });

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const toggleDropdown = (dropdown) => {
    setDropdowns((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
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

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
    }).then((result) => {
      if (result.isConfirmed) {
        logout(() => {
          navigate("/");
        });
        Swal.fire(
          "Logged Out!",
          "You have been logged out successfully.",
          "success"
        );
      }
    });
  };
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
          {["/", "/about", "/contact", "/movies"].map((path) => (
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
          <div
            className="relative"
            onMouseEnter={() => setDropdowns({ ...dropdowns, foods: true })}
          >
            <button className="text-white font-bold hover:text-themeYellow flex items-center">
              Foods
              <KeyboardArrowDownIcon />
            </button>
            {dropdowns["foods"] && (
              <div className="absolute bg-themeGrayExteral text-white rounded mt-2 shadow-lg z-10">
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
        <div className="hidden md:flex space-x-4 items-center relative">
          <button>
            <SearchIcon className="text-white hover:text-themeYellow" />
          </button>
          <button
            onClick={() => {
              if (user) {
                setProfileDropdown((prev) => !prev);
              } else {
                navigate("/login");
              }
            }}
            className="relative"
          >
            <PersonIcon className="text-white hover:text-themeYellow" />
          </button>
          {profileDropdown && user && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-themeGrayExteral text-white rounded shadow-lg z-10">
              <ul className="p-2 space-y-2">
                <li>
                  <NavLink
                    to="/profile"
                    className="block hover:text-themeYellow px-4 py-2"
                  >
                    Profile
                  </NavLink>
                  <NavLink
                    to="/my-cart"
                    className="block hover:text-themeYellow px-4 py-2"
                  >
                    Cart
                  </NavLink>
                  <NavLink
                    to="/my-orders"
                    className="block hover:text-themeYellow px-4 py-2"
                  >
                    Order
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left hover:text-themeYellow px-4 py-2"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
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
          {["/", "/about", "/contact", "/movies"].map((path) => (
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
                      to={`/foods`}
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
