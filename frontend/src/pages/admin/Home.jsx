import React, { useState } from "react";
import Sidebar from "../../components/admin/v2/Sidebar";
import Navbar from "../../components/admin/v2/Navbar";

const Home = () => {
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarMinimized(!isSidebarMinimized);
  };

  return (
    <div className="flex">
      {/* Pass the state and toggler to Sidebar */}
      <Sidebar isMinimized={isSidebarMinimized} />
      <div className="flex flex-col w-full">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="p-4">{/* Your main content goes here */}</main>
      </div>
    </div>
  );
};

export default Home;
