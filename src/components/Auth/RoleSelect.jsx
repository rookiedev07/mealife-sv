// src/components/Auth/RoleSelect.jsx
import React, { useState } from "react";
import axios from "axios";

const RoleSelect = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRoleSelect = async (role) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/select-role",
        { role },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.success) {
        window.location.href = role === "user" ? "/home" : "/manage-restaurant";
      } else {
        setError("Failed to select role. Please try again.");
      }
    } catch (err) {
      console.error("Error during role selection:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Select Your Role</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={() => handleRoleSelect("user")} disabled={loading}>
        {loading ? "Loading..." : "User "}
      </button>
      <button onClick={() => handleRoleSelect("restaurant")} disabled={loading}>
        {loading ? "Loading..." : "Restaurant"}
      </button>
    </div>
  );
};

export default RoleSelect;