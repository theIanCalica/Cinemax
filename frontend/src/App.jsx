import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline } from "@mui/material";
import error_404 from "./pages/error_404";
import error_500 from "./pages/error_500";
import SigninPage from "./pages/SigninPage";
import HomePage from "./pages/customer/index/index";
import AboutPage from "./pages/customer/About/AboutPage";
import ContactPage from "./pages/customer/ContactPage";
import Email from "./pages/Emails/ContactUs";
import ProtectedRoute from "./Utils/authRoutes/ProtectedRoute";

// Admin Pages
import Layout from "./components/admin/v2/Layout";
import HomeAdmin from "./pages/admin/Home";
import Category from "./pages/admin/FoodCategory";
import FoodList from "./pages/admin/FoodList";
import Genre from "./pages/admin/Genre";
import User from "./pages/admin/UsersPage";
import Contacts from "./pages/admin/Contact";
import Article from "./pages/admin/Article";
import Task from "./pages/admin/Task";
import Message from "./pages/admin/Message";
import Profile from "./pages/admin/Profile";
import Movie from "./pages/admin/Movie";
import Calendar from "./pages/admin/Calendar";
import Try from "./pages/Filepond";
import EmailAdmin from "./pages/admin/email";
import "./main.css";

// Crew protected route
import EmployeeProtectedRoute from "./Utils/authRoutes/EmployeeProtectedRoute";

// Crew layout
import CrewLayout from "./components/service-crew/Layout";

// Crew pages
import HomeCrew from "./pages/crew/Home";

function App() {
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.REACT_APP_FACEBOOK_APP_ID, // Replace with your Facebook App ID
        cookie: true,
        xfbml: true,
        version: "v10.0", // Use the latest version
      });
    };

    (function (d, s, id) {
      var js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      d.getElementsByTagName("head")[0].appendChild(js);
    })(document, "script", "facebook-jssdk");
  }, []);
  return (
    <Router>
      <Routes>
        <Route
          path="/crew"
          element={
            <EmployeeProtectedRoute element={<CrewLayout />} crewOnly={true} />
          }
        >
          <Route index element={<HomeCrew />}></Route>
          <Route path="profile" element={<Profile />}></Route>
        </Route>
        <Route path="/error-404" element={<error_404 />}></Route>
        <Route path="/try" element={<Try />}></Route>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles" element={<Article />}></Route>
        <Route path="/about" element={<AboutPage />}></Route>
        <Route path="/contact" element={<ContactPage />}></Route>
        <Route path="/email" element={<Email />} />
        <Route path="/login" element={<SigninPage />}></Route>
        <Route
          path="/admin"
          element={<ProtectedRoute element={<Layout />} adminOnly={true} />}
        >
          <Route index element={<HomeAdmin />} />
          <Route path="task" element={<Task />}></Route>
          <Route path="users" element={<User />}></Route>
          <Route path="calendar" element={<Calendar />}></Route>
          <Route path="email" element={<EmailAdmin />}></Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="emails"></Route>
          <Route path="messages" element={<Message />}></Route>
          <Route path="contacts" element={<Contacts />}></Route>
          <Route path="food" element={null}>
            <Route path="category" element={<Category />} />
            <Route path="food-list" element={<FoodList />} />
          </Route>
          <Route path="movie" element={null}>
            <Route path="genre" element={<Genre />}></Route>
            <Route path="movie-list" element={<Movie />}></Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
