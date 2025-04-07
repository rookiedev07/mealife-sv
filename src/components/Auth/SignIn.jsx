import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
        const { data } = await axios.post("http://localhost:5000/api/auth/signin", formData);

        if (data.success) {
            const { token, role, userId, userName } = data; // Destructure userId and userName from the response

            // Store token, userId, and userName in local storage
            localStorage.setItem("authToken", token);
            localStorage.setItem("userId", userId); // Store userId
            localStorage.setItem("userName", userName); // Store userName
            localStorage.setItem("isSignedUp", true);

            // Navigate based on role
            if (role === "user") navigate("/home");
            else if (role === "restaurant") navigate("/diner");
            else setErrorMessage("Invalid role. Please contact support.");
        }
    } catch (err) {
        console.error("Error during login:", err);
        setErrorMessage("Login failed: Invalid email or password");
    }
};
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-md w-full bg-white p-12 rounded-xl shadow-2xl text-center">
        <h2 className="text-2xl text-left mb-5 text-gray-800">Welcome back, User!</h2>
        {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-left">
            <label htmlFor="email" className="block text-gray-600 mb-2">Email or phone number</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email or phone number"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md text-gray-700 text-lg"
            />
          </div>
          <div className="mb-4 text-left">
            <label htmlFor="password" className="block text-gray-600 mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md text-gray-700 text-lg"
            />
          </div>
          <div className="mb-6">
            <a href="#" className="text-blue-600 hover:underline text-sm">Forgot password?</a>
          </div>
          <button type="submit" className="w-full p-3 bg-orange-600 text-black font-semibold rounded-lg text-lg transition duration-300 hover:bg-orange-500">
            Sign in
          </button>
        </form>
        <div className="mt-6">
          <p className="text-gray-600">New to MeaLife?</p>
          <button onClick={() => navigate("/signup")} className="w-full p-3 bg-gray-300 text-gray-700 font-semibold rounded-lg text-lg transition duration-300 hover:bg-gray-200">
            Create an account
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
