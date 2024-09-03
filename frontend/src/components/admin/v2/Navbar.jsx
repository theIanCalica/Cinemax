import React, { useState } from "react";
import { Menu, AccountCircle } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

const Navbar = ({ toggleSidebar }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearch = () => {
    console.log("Search for:", searchTerm);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="text-white flex items-center py-2 px-4 bg-red-500">
      <div className="flex items-center justify-center">
        {/* Menu Icon */}
        <button onClick={toggleSidebar} className="text-black mr-4">
          <Menu
            style={{ fontSize: "15px" }}
            className="text-gray-400 mb-1 ml-2"
          />
        </button>
      </div>
      <div className="ml-auto flex items-center w-full">
        {/* Search */}
        <div
          className="flex items-center h-12 w-80 overflow-hidden"
          style={{ backgroundColor: "#EEF0FA" }}
        >
          <button
            onClick={handleSearch}
            className="text-gray-700 p-2 flex items-center justify-center"
            style={{
              width: "36px",
              height: "36px",
              backgroundColor: "#EEF0FA",
            }}
          >
            <SearchIcon
              style={{ fontSize: "15px" }}
              className="text-gray-400"
            />
          </button>
          <input
            type="text"
            name="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none border-none w-52 pr-3 py-2 flex-grow text-sm text-black"
            placeholder="Search..."
            style={{ backgroundColor: "#EEF0FA" }}
          />
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center ml-auto space-x-4">
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-black flex gap-1 items-center"
            >
              <img
                src="https://flagcdn.com/h20/um.png"
                srcset="https://flagcdn.com/h40/um.png 2x,
    https://flagcdn.com/h60/um.png 3x"
                height="20"
                alt="United States Minor Outlying Islands"
                className="mr-3"
              />
              <span className="text-sm">English</span>
              <span className="ml-1">&#9662;</span> {/* Down arrow */}
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-300 rounded shadow-lg">
                <button className="flex gap-4 px-4 py-3 text-gray-700 hover:bg-gray-100 w-full text-left">
                  <img
                    src="https://flagcdn.com/h20/um.png"
                    srcset="https://flagcdn.com/h40/um.png 2x,
    https://flagcdn.com/h60/um.png 3x"
                    height="20"
                    alt="United States Minor Outlying Islands"
                  />
                  English
                </button>

                <button className="flex gap-4 px-4 py-3 text-gray-700 hover:bg-gray-100 w-full text-left">
                  <img
                    src="https://flagcdn.com/h20/ph.png"
                    srcset="https://flagcdn.com/h40/ph.png 2x,
    https://flagcdn.com/h60/ph.png 3x"
                    height="20"
                    alt="Philippines"
                  />
                  Tagalog
                </button>
              </div>
            )}
          </div>
          {/* Email Icon */}
          <button className="text-black">
            <EmailOutlinedIcon style={{ fontSize: "20px" }} />
          </button>
          {/* Notifications Icon */}
          <button className="text-black">
            <NotificationsNoneOutlinedIcon style={{ fontSize: "20px" }} />
          </button>
          {/* Profile Icon */}
          <button className="text-black">
            <AccountCircle style={{ fontSize: "20px" }} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
