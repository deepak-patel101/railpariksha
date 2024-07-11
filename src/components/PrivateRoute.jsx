import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../Context/UserContext";
// Mock user data. In a real application, you would get this data from your authentication system.

const PrivateRoute = ({ element, ...rest }) => {
  const { user } = useUserContext();
  return user?.login_type === "admin" ? element : <Navigate to="/" replace />;
};

export default PrivateRoute;
