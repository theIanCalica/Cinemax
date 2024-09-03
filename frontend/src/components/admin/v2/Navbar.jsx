import React, { useState } from "react";
import { Menu, AccountCircle } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = () => {
    console.log("Search for:", searchTerm);
  };

  return (
    <nav className=" text-white flex items-center p-4">
      <div className="flex items-center">
        {/* Menu Icon */}
        <button onClick={toggleMenu} className="text-black mr-4 md:hidden">
          <Menu />
        </button>
      </div>
      <div className="ml-auto flex items-center w-full">
        {/* Account Icon */}
        <button className="text-black mr-3">
          <Menu style={{ fontSize: "15px" }} />
        </button>
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden h-9">
          <button
            onClick={handleSearch}
            className=" text-gray-700 p-2 flex items-center justify-center"
            style={{
              width: "36px",
              height: "36px",
              backgroundColor: "#EEF0FA",
            }}
          >
            <SearchIcon style={{ fontSize: "20px" }} />
          </button>
          <input
            type="text"
            name="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none border-none px-4 py-2 flex-grow text-sm text-black"
            placeholder="Search..."
            style={{ backgroundColor: "#EEF0FA" }}
          />
        </div>
        <button onClick={() => alert("Account menu")} className="text-black">
          <AccountCircle />
        </button>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-14 left-0 w-full bg-gray-700 p-4 md:hidden">
          <ul>
            <li className="py-2">
              <a href="#" className="text-white">
                Home
              </a>
            </li>
            <li className="py-2">
              <a href="#" className="text-white">
                Users
              </a>
            </li>
            <li className="py-2">
              <a href="#" className="text-white">
                Analytics
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
