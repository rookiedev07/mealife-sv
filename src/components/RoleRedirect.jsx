import React, { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function RedirectLogic() {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      const role = user?.publicMetadata?.role;
      if (!role) {
        navigate("/role-selection"); // Redirect only if role is not set
      } else {
        // Navigate to the appropriate dashboard based on the role
        navigate(role === "restaurant" ? "/restaurant-dashboard" : "/user-dashboard");
      }
    }
  }, [isSignedIn, user, navigate]);

  return null; // Optionally render a loader while the role is being checked
}

export default RedirectLogic;
