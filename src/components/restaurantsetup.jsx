import React, { useState } from 'react';

const RestaurantSetup = () => {
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantImg, setRestaurantImg] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (setter) => (e) => setter(e.target.value);

  const handleRestaurantSetup = async () => {
    if (!restaurantName || !restaurantImg) {
      setError('All fields are required.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/restaurantsetup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ restaurantName, restaurantImg }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Restaurant setup completed successfully.');
        setError('');
      } else {
        setError(data.error || 'Failed to complete setup.');
        setSuccess('');
      }
    } catch {
      setError('An error occurred. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6">Set Up Your Restaurant</h1>
        <div className="mb-4">
          <label className="block font-bold mb-2">Restaurant Name</label>
          <input
            type="text"
            placeholder="Enter restaurant name"
            value={restaurantName}
            onChange={handleInputChange(setRestaurantName)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Restaurant Image URL</label>
          <input
            type="text"
            placeholder="Enter restaurant image URL"
            value={restaurantImg}
            onChange={handleInputChange(setRestaurantImg)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        {success && <div className="text-green-500 text-sm mb-4">{success}</div>}
        <button
          className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
          onClick={handleRestaurantSetup}
        >
          Save Restaurant
        </button>
      </div>
    </div>
  );
};

export default RestaurantSetup;
