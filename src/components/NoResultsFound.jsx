import React from "react";

const NoResultsFound = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-white-100">
            <div className="text-center p-6 bg-white-100 rounded-lg max-w-md w-full">
                <div className="mb-4">
                    <i className="fas fa-search text-6xl text-gray-400"></i>
                </div>
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                    No Results Found
                </h2>
                <p className="text-gray-500 mb-4">
                    We couldn’t find any matching results. Try searching with different
                    keywords or check back later!
                </p>
                <button className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition duration-200">
                    Try Again
                </button>
            </div>
        </div>
    );
};

export default NoResultsFound;
