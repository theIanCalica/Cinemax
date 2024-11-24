import React from "react";
import { Outlet } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

const Layout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* CssBaseline to normalize the styles */}
      <CssBaseline />

      {/* Header */}
      <header>
        <Navbar />
      </header>

      {/* Main Content Area */}
      <main style={{ flexGrow: 1 }}>
        <Outlet /> {/* Renders the matched child route */}
      </main>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Layout;
