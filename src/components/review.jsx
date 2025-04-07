import React from "react";

function Review() {
  return (
    <div className="container px-4 sm:px-6 lg:px-8">
      {/* Banner Section */}
      <div
        className="intro relative bg-cover bg-no-repeat rounded-2xl h-[400px] sm:h-[500px] lg:h-[600px] mb-12 mt-8"
        style={{ backgroundImage: "url('../src/assets/restaurant.jpg')" }}
      >
        <div className="absolute text-white bottom-10 sm:bottom-20 left-4 sm:left-8">
          <h1 className="text-start text-white text-lg sm:text-2xl lg:text-3xl font-bold">
            Restaurant Reviews for [Restaurant Name]
          </h1>
          <p className="mt-3 mb-6 text-sm sm:text-base lg:text-lg">
            We value your feedback! Share your experience with us. If you feel there's room for improvement, let us know how we did!
          </p>
          <div className="relative flex items-center w-full sm:w-2/3 lg:w-1/2 mt-4">
            <input
              className="intro-search text-black border rounded-xl p-7 pl-10 mr-4 h-11 w-full"
              type="search"
              placeholder="Search Reviews"
            />
            <button className="absolute right-6 top-1/2 transform -translate-y-1/2 w-[6em] h-[2.5em] bg-blue-600 text-white font-bold rounded-xl px-4">
              Search
            </button>
            <i className="fas fa-search absolute text-gray-500 left-3 top-1/2 transform -translate-y-1/2"></i>
          </div>
        </div>
      </div>

      {/* Ratings Section */}
      <div className="flex flex-wrap gap-4 mt-12">
        <div className="flex flex-col w-full sm:w-1/3">
          <h1 className="text-center text-3xl sm:text-4xl">
            4.8<br />★★★★☆
          </h1>
          <p className="text-center mt-2 text-gray-600">1,100 reviews</p>
        </div>
        <div className="flex flex-col w-full sm:w-2/3 lg:w-1/2 space-y-2">
          {["5 ★", "4 ★", "3 ★", "2 ★", "1 ★"].map((label, index) => (
            <div key={index} className="flex items-center">
              <span className="w-10 text-sm sm:text-base text-gray-700">{label}</span>
              <progress
                className="flex-1 h-2 rounded-lg bg-gray-200 overflow-hidden accent-blue-400"
                value={["70", "19", "6", "3", "2"][index]}
                max="100"
                style={{
                  WebkitAppearance: "none",
                  appearance: "none",
                }}
              ></progress>
            </div>
          ))}
        </div>
      </div>

      {/* Review Section */}
      <div className="mt-12 w-full flex flex-col justify-center max-w-8xl mx-auto space-y-6">
      <div>
          <h1 className="text-start font-bold text-lg sm:text-xl">Jane</h1>
          <p className="text-xs sm:text-sm text-gray-500">July 9, 2023</p>
          <h1 className="text-start text-base sm:text-lg mt-1">★★★☆☆</h1>
          <p className="mt-2 text-sm sm:text-base">
            The food was decent, but not as great as I was expecting. The atmosphere was nice, and the service was friendly, though. It took a little longer than anticipated to get our food, but overall, it wasn't a bad experience. Could use a bit of improvement on the flavor, though!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Review;
