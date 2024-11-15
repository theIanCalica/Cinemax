import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header>
        <Navbar />
      </header>

      {/* Main Content Area */}
      <main className="flex-grow ">
        <Outlet /> {/* Renders the matched child route */}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
