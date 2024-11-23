import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { onMessage } from "firebase/messaging";
import { messaging } from "./firebase/firebase";

import SigninPage from "./pages/SigninPage";
import HomePage from "./pages/customer/index/index";
import AboutPage from "./pages/customer/About/AboutPage";
import ContactPage from "./pages/customer/ContactPage";
import Email from "./pages/Emails/ContactUs";
import FoodCategory from "./pages/customer/FoodCategory";
import CustomerFoodList from "./pages/customer/FoodList";
import ProtectedRoute from "./Utils/authRoutes/ProtectedRoute";
import BaseLayout from "./components/customer/Layout";
import CartPage from "./pages/customer/Cart";
import CancelPaymentPage from "./pages/customer/PaymentCanceled";
import CustomerOrderPage from "./pages/customer/Order";
import MoviePage from "./pages/customer/Movie";
import BookPage from "./pages/customer/Book";
import ProfilePage from "./pages/customer/Profile";
import FoodPage from "./pages/customer/FoodPage";

// Admin Pages
import Layout from "./components/admin/v2/Layout";
import HomeAdmin from "./pages/admin/Home";
import Category from "./pages/admin/FoodCategory";
import FoodList from "./pages/admin/FoodList";
import Genre from "./pages/admin/Genre";
import User from "./pages/admin/UsersPage";
import Contacts from "./pages/admin/Contact";
// import Article from "./pages/admin/Article";
import Task from "./pages/admin/Task";
// import Message from "./pages/admin/Message";
import Profile from "./pages/admin/Profile";
import Movie from "./pages/admin/Movie";
import Calendar from "./pages/admin/Calendar";
import EmailAdmin from "./pages/admin/Email";
import OrderPage from "./pages/admin/Orders";
import "./main.css";
import ShowTimePage from "./pages/admin/Showtime";

// Crew protected route
import EmployeeProtectedRoute from "./Utils/authRoutes/EmployeeProtectedRoute";

// Crew layout
import CrewLayout from "./components/service-crew/Layout";

// Crew pages
import HomeCrew from "./pages/crew/Home";
import EmailCrew from "./pages/crew/Email";

// Auth Provider
import { AuthProvider } from "./contexts/authContext";
import { ToastContainer } from "react-toastify";
import { notifyFirebase } from "./Utils/helpers";

function App() {
  useEffect(() => {
    onMessage(messaging, (payload) => {
      notifyFirebase(payload.notification.title, payload.notification.body);
    });
  }, []);
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<SigninPage />}></Route>
          <Route path="/cancel-payment" element={<CancelPaymentPage />}></Route>
          <Route path="/" element={<BaseLayout />}>
            <Route index element={<HomePage />} />
            {/* <Route path="/articles" element={<Article />}></Route> */}
            <Route path="/about" element={<AboutPage />}></Route>
            <Route path="/contact" element={<ContactPage />}></Route>
            <Route path="/profile" element={<ProfilePage />}></Route>
            <Route path="/food/:foodName" element={<FoodPage />} />
            <Route path="/email" element={<Email />} />
            <Route path="/foods" element={<CustomerFoodList />}></Route>
            <Route path="/food/category" element={<FoodCategory />}></Route>
            <Route path="/movies" element={<MoviePage />}></Route>
            <Route path="/book" element={<BookPage />}></Route>
            <Route path="/my-cart" element={<CartPage />}></Route>
            <Route path="/my-orders" element={<CustomerOrderPage />}></Route>
          </Route>

          {/* Routes for crew */}
          <Route
            path="/crew"
            element={
              <EmployeeProtectedRoute
                element={<CrewLayout />}
                crewOnly={true}
              />
            }
          >
            <Route index element={<HomeCrew />}></Route>
            <Route path="profile" element={<Profile />}></Route>
            <Route path="email" element={<EmailCrew />}></Route>
            <Route path="food-list" element={<FoodList />}></Route>
          </Route>

          {/* Routes for admin */}
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
            <Route path="orders" element={<OrderPage />}></Route>
            <Route path="showtime" element={<ShowTimePage />}></Route>
            <Route path="emails"></Route>
            {/* <Route path="messages" element={<Message />}></Route> */}
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
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
