import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [role, setRole] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(false);
  const navigate = useNavigate();

  // Check if the user is already signed up
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const signedUpStatus = localStorage.getItem("isSignedUp");
    if (token || signedUpStatus === "true") {
      setIsSignedUp(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message

    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", formData);

      if (response.data.success) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("isSignedUp", "true");
        axios.defaults.headers["Authorization"] = `Bearer ${response.data.token}`;
        setIsSignedUp(true);
      } else {
        setErrorMessage(response.data.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      setErrorMessage(err.response ? err.response.data : "Signup failed. Please try again.");
    }
  };

  const handleRoleSelection = async () => {
    if (!role) {
      alert("Please select a role before continuing.");
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Unauthorized! Please log in.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/select-role",
        { email: formData.email, role },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        localStorage.setItem("role", role);
        navigate(role === "restaurant" ? "/register-restaurant" : "/");
      } else {
        alert("Role selection failed: " + response.data.message);
      }
    } catch (err) {
      alert("Role selection failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl">
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md">
            {errorMessage}
          </div>
        )}
        {!isSignedUp ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl text-left mb-5 text-gray-800">Welcome, New User!</h2>
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-center">
              <button type="submit" className="w-full py-3 px-4 bg-orange-500 text-black font-semibold rounded-md hover:bg-orange-400 transition duration-300">
                Sign Up
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <h2 className="text-center text-2xl font-bold text-black mb-6">Select Your Role</h2>
            <div>
              <select
                onChange={handleRoleChange}
                value={role}
                className="w-full p-3 border border-gray-300 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="restaurant">Restaurant</option>
              </select>
              <button
                onClick={handleRoleSelection}
                className="w-full py-3 px-4 bg-orange-500 text-black font-semibold rounded-md hover:bg-orange-400 transition duration-300"
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
