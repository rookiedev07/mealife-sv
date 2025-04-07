import React from "react";
import nopfp from "../assets/restaurant-placeholder.jpg";
import { useLocation, useNavigate } from "react-router-dom";

const SearchResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const results = location.state?.restaurantData || [];

    const handleNavigateToProfile = (restaurantData) => {
        navigate('/profile', { state: { restaurantData } });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6 px-4">
            <h1 className="text-xl sm:text-2xl font-semibold mb-6 text-center">Search Results</h1>

            {/* Responsive Grid Layout */}
            <div className="w-full max-w-6xl sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.length > 0 ? (
                    results.map((user) => (
                        <div
                            key={user._id}
                            className="flex items-center bg-white shadow-lg hover:shadow-2xl rounded-lg p-4 cursor-pointer hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
                            onClick={() => handleNavigateToProfile(user)}
                        >
                            <img
                                src={user.profileImage || nopfp}
                                alt={`${user.restaurant.restaurantName}'s profile`}
                                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border border-gray-300"
                            />
                            <div className="ml-4 flex-1">
                                <h2 className="text-lg sm:text-xl font-medium">{user.restaurant.restaurantName}</h2>
                                <p className="text-gray-500 text-sm sm:text-base">{user.restaurant.address}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center w-full">No results found.</p>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
