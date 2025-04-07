import React from "react";
import { useNavigate } from "react-router-dom";

function Reservation() {
  const navigate = useNavigate();

  const handleFindTableClick = () => {
    navigate("/price");
  };

  return (
    <div className="flex justify-center mt-16 px-4">
      <div className="w-full max-w-[48rem]">
        <h1 className="text-start text-2xl font-bold">Restaurant Reservation</h1>
        <p className="text-gray-500 font-medium mt-2">
          Book a Table at the best Restaurants in Town
        </p>

        <label
          htmlFor="location"
          className="block text-lg font-semibold mt-6 mb-2"
        >
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          placeholder="e.g. San Francisco"
          className="w-full p-4 rounded-lg border border-gray-400"
        />

        <label
          htmlFor="date"
          className="block text-lg font-semibold mt-6 mb-2"
        >
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          placeholder="Add Date"
          className="w-full p-4 rounded-lg border border-gray-400"
        />

        <div className="flex flex-wrap items-center mt-6">
          <label
            htmlFor="time"
            className="block w-full text-lg font-semibold mb-2"
          >
            Time
          </label>
          <div className="flex flex-wrap gap-4 w-full">
            <div className="flex items-center">
              <h5 className="mr-2">From</h5>
              <input
                type="time"
                name="time"
                id="time-from"
                className="w-[10rem] md:w-[14rem] p-2 rounded-lg border border-gray-400"
              />
            </div>
            <div className="flex items-center">
              <h5 className="mr-2">To</h5>
              <input
                type="time"
                name="time"
                id="time-to"
                className="w-[10rem] md:w-[14rem] p-2 rounded-lg border border-gray-400"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleFindTableClick}
          className="bg-blue-600 text-white font-bold mt-8 py-2 px-6 rounded-lg hover:bg-blue-700 w-full sm:w-auto"
        >
          Find a Table
        </button>
      </div>
    </div>
  );
}

export default Reservation;
