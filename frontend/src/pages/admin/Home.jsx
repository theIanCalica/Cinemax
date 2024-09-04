import React, { useState } from "react";
import Layout from "../../components/admin/v2/Layout";

const Home = () => {
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarMinimized(!isSidebarMinimized);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p className="mt-4">
        Welcome to the admin dashboard. Here you can manage all aspects of your
        application.
      </p>

      {/* Example dashboard widgets or information */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold">Statistics</h2>
          <p>View important statistics here.</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
          <p>Check out recent activity.</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold">Quick Actions</h2>
          <p>Access common admin actions.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
