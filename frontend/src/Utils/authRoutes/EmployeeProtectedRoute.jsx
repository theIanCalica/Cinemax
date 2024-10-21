import { Navigate } from "react-router-dom";
import { getUser } from "../helpers";

import React from "react";

const EmployeeProtectedRoute = ({ element, crewOnly = false }) => {
  const user = getUser();

  if (!user) {
    return <Navigate to="/login" replace />; // Redirect to login if not authenticated
  }

  if (crewOnly && user.role !== "serviceCrew") {
    console.log(user.role);
    return <Navigate to="/" replace />; // Redirect non-employee users to the homepage
  }

  return element;
};

export default EmployeeProtectedRoute;
