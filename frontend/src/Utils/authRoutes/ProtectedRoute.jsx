import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";

const ProtectedRoute = ({ element, adminOnly = false }) => {
  const { user, loggedIn } = useSelector((state) => state.user);

  if (!loggedIn) {
    return <Navigate to="/login" replace />; // Redirect to login if not authenticated
  }

  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />; // Redirect non-admin users to the homepage
  }

  return element;
};

export default ProtectedRoute;
