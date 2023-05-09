import React from "react";
import { useGlobalContext } from "../context";
import { Navigate } from "react-router-dom";

const GoToDashboard = () => {
  const { isLoggedIn } = useGlobalContext();

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }
};

export default GoToDashboard;
