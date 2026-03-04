import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getCurrentUser, getDefaultRouteByRole, isAuthenticated } from "@/lib/auth";

export default function ProtectedRoute({ allowedRoles = [] }) {
  const location = useLocation();
  const user = getCurrentUser();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to={getDefaultRouteByRole(user?.role)} replace />;
  }

  return <Outlet />;
}
