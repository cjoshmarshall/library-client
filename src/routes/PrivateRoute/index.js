import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function PrivateRoute() {
  const { auth } = useAuth();
  const location = useLocation();

  return (
    // !auth ? (
    //   <Outlet />
    // ) :
    auth?.accessToken ? (
      <Outlet />
    ) : (
      <Navigate to="/signin" state={{ from: location }} replace />
    )
  );
}
export default PrivateRoute;
