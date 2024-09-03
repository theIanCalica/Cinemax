import React, { useState } from "react";
import { Menu, AccountCircle } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = ({ toggleSidebar }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    console.log("Search for:", searchTerm);
  };

  return (
    <nav className="text-white flex items-center p-4 bg-gray-800">
      <div className="flex items-center">
        {/* Menu Icon */}
        <button onClick={toggleSidebar} className="text-white mr-4 ">
          <Menu />
        </button>
      </div>
      <div className="ml-auto flex items-center w-full">
        {/* Account Icon */}
        <button className="text-white mr-3">
          <AccountCircle />
        </button>
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden h-9">
          <button
            onClick={handleSearch}
            className="text-gray-700 p-2 flex items-center justify-center"
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
      </div>
    </nav>
  );
};

export default Navbar;
