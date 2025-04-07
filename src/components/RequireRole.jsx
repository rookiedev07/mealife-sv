import React from "react";
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

function RequireRole({ children }) {
  const { user } = useUser();
  const role = user?.publicMetadata?.role;

  if (!role) {
    return <Navigate to="/role-selection" replace />;
  }

  return children;
}

export default RequireRole;
