import React, { useState } from "react";
import Sidebar from "../../components/admin/v2/Sidebar";
import Navbar from "../../components/admin/v2/Navbar";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      {/* Conditionally render Sidebar based on the state */}
      {isSidebarOpen && <Sidebar />}
      <div className="flex flex-col w-full">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="p-4">{/* Your main content goes here */}</main>
      </div>
    </div>
  );
};

export default Layout;
