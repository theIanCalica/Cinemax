import React, { useState } from "react";
import { Menu } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const Navbar = ({ toggleSidebar }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const handleSearch = () => {
    console.log("Search for:", searchTerm);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="text-white flex items-center py-2 px-4 bg-white">
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
                src={
                  selectedLanguage === "English"
                    ? "https://flagcdn.com/h20/um.png"
                    : "https://flagcdn.com/h20/ph.png"
                }
                srcSet={
                  selectedLanguage === "English"
                    ? "https://flagcdn.com/h40/um.png 2x, https://flagcdn.com/h60/um.png 3x"
                    : "https://flagcdn.com/h40/ph.png 2x, https://flagcdn.com/h60/ph.png 3x"
                }
                height="20"
                alt={selectedLanguage}
                className="mr-3"
              />
              <span className="text-sm">{selectedLanguage}</span>
              <span className="ml-1">&#9662;</span> {/* Down arrow */}
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-300 rounded shadow-lg">
                <button
                  onClick={() => handleLanguageChange("English")}
                  className="flex gap-4 px-4 py-3 text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <img
                    src="https://flagcdn.com/h20/um.png"
                    srcSet="https://flagcdn.com/h40/um.png 2x, https://flagcdn.com/h60/um.png 3x"
                    height="20"
                    alt="English"
                  />
                  English
                </button>

                <button
                  onClick={() => handleLanguageChange("Tagalog")}
                  className="flex gap-4 px-4 py-3 text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <img
                    src="https://flagcdn.com/h20/ph.png"
                    srcSet="https://flagcdn.com/h40/ph.png 2x, https://flagcdn.com/h60/ph.png 3x"
                    height="20"
                    alt="Tagalog"
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
          <div className="relative">
            <button
              onClick={toggleProfileDropdown}
              className="text-black flex items-center gap-3"
            >
              <img
                src="https://scontent.fmnl30-3.fna.fbcdn.net/v/t39.30808-1/449489364_3442005009435229_5169651470885319346_n.jpg?stp=c0.110.720.720a_dst-jpg_s160x160&_nc_cat=104&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeHYMCLIHQNyASo7bAaWwgCQg-zyKTd5D_SD7PIpN3kP9NpIaisNhLJZwuRBVqMfwsTTC5IxFzvJgQsKsJadgHiA&_nc_ohc=_6Bx7Fluu_4Q7kNvgFpr5gY&_nc_ht=scontent.fmnl30-3.fna&oh=00_AYDjdgvpmcx_Oulg6UOTBjZngp3L25vt1NMOISd0hBZarg&oe=66DCDAB4"
                alt="User Profile Pic"
                className="rounded-full w-8 h-8"
              />
              <span>Ian Gabriel G. Calica</span>
              <KeyboardArrowDownOutlinedIcon
                className=""
                style={{ fontSize: "15px" }}
              />
            </button>
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg">
                <button className="flex gap-4 px-4 py-3 text-gray-700 justify-between hover:bg-gray-100 w-full text-left">
                  <span className="text-gray-700">Profile</span>
                  <PersonOutlineOutlinedIcon style={{ fontSize: "18px" }} />
                </button>
                <button className="flex gap-4 px-4 py-3 text-gray-700 justify-between hover:bg-gray-100 w-full text-left">
                  <span className="text-gray-700">Logout</span>
                  <LogoutOutlinedIcon style={{ fontSize: "18px" }} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
