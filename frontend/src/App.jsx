import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { CssBaseline } from "@mui/material";
import SigninPage from "./pages/SigninPage";
import HomePage from "./pages/customer/index/index";
import AdminIndexPage from "./pages/admin/index/AdminIndexPage";
import AboutPage from "./pages/customer/About/AboutPage";
import ContactPage from "./pages/customer/ContactPage";
import Email from "./pages/Emails/ContactUs";

// Admin Pages
import HomeAdmin from "./pages/admin/Home";
import "./main.css";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/about" element={<AboutPage />}></Route>
        <Route path="/contact" element={<ContactPage />}></Route>
        <Route path="/email" element={<Email />} />

        {/*Route for admins  */}
        <Route path="/admin" element={<HomeAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
