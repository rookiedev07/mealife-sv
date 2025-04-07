import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutPage = ({ setIsLoggedIn }) => {
  const navigate = useNavigate(); // To redirect user after logging out
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  // Function to handle logout
  const handleLogout = () => {
    // Clear JWT token from localStorage
    localStorage.removeItem('authToken');
    
    // Update logged-in state to false
    setIsLoggedOut(true);
    
    // Set isLoggedIn to false in parent component
    setIsLoggedIn(false); // This will notify Header to update state

    // Redirect to home or login page
    navigate('/');
  };

  useEffect(() => {
    if (isLoggedOut) {
      console.log('User logged out successfully.');
    }
  }, [isLoggedOut]);

  return (
    <div>
      <h2>You are logged in. Do you want to logout?</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LogoutPage;
