import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { CssBaseline } from "@mui/material";
import SigninPage from "./pages/SigninPage";
import HomePage from "./pages/customer/index/index";
import AboutPage from "./pages/customer/About/AboutPage";
import ContactPage from "./pages/customer/ContactPage";
import Email from "./pages/Emails/ContactUs";

// Admin Pages
import Layout from "./components/admin/v2/Layout"; //Admin Layout
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
import "./main.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/try" element={<Try />}></Route>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles" element={<Article />}></Route>
        <Route path="/about" element={<AboutPage />}></Route>
        <Route path="/contact" element={<ContactPage />}></Route>
        <Route path="/email" element={<Email />} />
        <Route path="/login" element={<SigninPage />}></Route>
        {/* Route for admin */}
        <Route path="/admin" element={<Layout />}>
          <Route index element={<HomeAdmin />} />
          <Route path="task" element={<Task />}></Route>
          <Route path="users" element={<User />}></Route>
          <Route path="calendar" element={<Calendar />}></Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="emails"></Route>
          <Route path="messages" element={<Message />}></Route>
          <Route path="contacts" element={<Contacts />}></Route>
          {/* Route for food related pages */}
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
