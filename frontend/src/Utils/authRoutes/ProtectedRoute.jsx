import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "../../Utils/helpers";

const ProtectedRoute = ({ element, adminOnly = false }) => {
  const user = getUser();

  if (!user) {
    return <Navigate to="/login" replace />; // Redirect to login if not authenticated
  }

  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />; // Redirect non-admin users to the homepage
  }

  return element;
};

export default ProtectedRoute;
