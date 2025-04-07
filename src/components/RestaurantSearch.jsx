import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const RestaurantSearch = () => {
    const [restaurantName, setRestaurantName] = useState("");
    const navigate = useNavigate(); // Initialize navigate function

    const handleSearch = async () => {
        try {
            if (!restaurantName) {
                alert("Please enter a restaurant name.");
                return;
            }

            const token = localStorage.getItem("authToken");
            if (!token) {
                alert("You need to log in first.");
                return;
            }

            const response = await axios.get('http://localhost:5000/api/restaurant/search', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    query: restaurantName,
                },
            });

            if (response.data.restaurants.length > 0) {
                // Navigate to SearchResults with the restaurant data
                navigate("/results", { state: { restaurantData: response.data.restaurants } });
            } else {
                navigate("/no-results");
            }
        } catch (err) {
            console.error("Error fetching restaurant profile:", err);
            navigate("/no-results");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch(); // Trigger search when Enter key is pressed
        }
    };

    return (
        <div className="container mx-auto mt-6 p-4">
            <div className="flex mb-4">
                <div className="flex items-center w-full max-w-6xl mx-auto border rounded-lg border-gray-300">
                    <input
                        type="text"
                        value={restaurantName}
                        onChange={(e) => setRestaurantName(e.target.value)}
                        onKeyDown={handleKeyDown} // Add onKeyDown event for Enter key
                        placeholder="Enter restaurant name"
                        className="flex-1 p-3 border-none rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleSearch}
                        className="p-3 text-black hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
                    >
                        <i className="fas fa-search"></i>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default RestaurantSearch;