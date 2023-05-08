import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useGlobalContext } from "../context";

const PrivateRoutes = () => {
  const { isLoggedIn } = useGlobalContext();

  // check if user is logged in and has permission to view page

  return !isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
