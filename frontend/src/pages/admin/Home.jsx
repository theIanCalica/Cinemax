import React from "react";
import Sidebar from "../../components/admin/v2/Sidebar";
import Navbar from "../../components/admin/v2/Navbar";
const Home = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col">
        <Navbar />
      </div>
    </div>
  );
};

export default Home;
