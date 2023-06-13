/**
 * This is a React component for creating protected routes that redirect to a specified path if the
 * user is not logged in.
 * @returns The `ProtectedRoute` component is returning either the `children` prop or the `Outlet`
 * component if the user is logged in. If the user is not logged in, it returns a `Navigate` component
 * that redirects the user to the `redirectPath` prop.
 */
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
