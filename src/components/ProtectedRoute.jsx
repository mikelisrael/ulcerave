import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useGlobalContext } from "../context";

const ProtectedRoute = ({ redirectPath = "/login", children }) => {
  const { isLoggedIn } = useGlobalContext();

  if (isLoggedIn) {
    return children ? children : <Outlet />;
  } else {
    return <Navigate to={redirectPath} replace />;
  }
};

export default ProtectedRoute;
