import React from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Landing() {
  return (
    <div className="parent">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="intro relative bg-cover bg-no-repeat rounded-2xl h-[600px] ml-4 mb-12 mt-8" style={{ backgroundImage: "url('../src/assets/banner.jpg')" }}>
          <div className="absolute text-white bottom-20 left-4">
            <h1 className="text-left text-white text-lg sm:text-2xl lg:text-3xl font-bold">The Full-Service Dining and Delivery Platform</h1>
            <p className="text-white mt-3 mb-6 text-sm sm:text-base lg:text-lg">
              The First All-In-One Platform for Full-Service Restaurants. Offer contactless ordering, loyalty programs, and more.
            </p>
            <div className="relative flex items-center w-full sm:w-2/3 lg:w-1/2 mt-4">
  <input
    className="intro-search text-black border rounded-xl p-7 pl-10 mr-4 h-11 w-full"
    type="search"
    placeholder="Search Venues"
  />
  <button className="absolute right-6 top-1/2 transform -translate-y-1/2 w-[6em] h-[2.5em] bg-blue-600 text-white font-bold rounded-xl px-4">
    Explore
  </button>
  <i className="fas fa-search absolute text-gray-500 left-3 top-1/2 transform -translate-y-1/2"></i>
</div>


          </div>
        </div>

        <div className="experience-type mt-10 text-center">
  <h1 className="text-lg sm:text-xl lg:text-2xl font-bold">Who are You Dining with Today?</h1>
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mt-6">
    <div className="family bg-cover bg-no-repeat rounded-2xl cursor-pointer h-64 flex items-end justify-center" style={{ backgroundImage: "url('../src/assets/family.jpg')" }}>
      <h1 className="text-lg text-white font-bold pb-4">Family</h1>
    </div>
    <div className="friends bg-cover bg-no-repeat rounded-2xl h-64 cursor-pointer flex items-end justify-center" style={{ backgroundImage: "url('../src/assets/friends.jpg')" }}>
      <h1 className="text-lg text-white font-bold pb-4">Friends</h1>
    </div>
    <div className="partner bg-cover bg-no-repeat rounded-2xl h-64 cursor-pointer flex items-end justify-center" style={{ backgroundImage: "url('../src/assets/partner.jpg')" }}>
      <h1 className="text-lg text-white font-bold pb-4">Partner</h1>
    </div>
  </div>
</div>


        <div className="venue-type mt-10 text-center">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold">Where would you like to be today?</h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mt-6">
            <div className="restaurant bg-cover bg-no-repeat cursor-pointer rounded-2xl h-64 flex items-end justify-center pb-4" style={{ backgroundImage: "url('../src/assets/restaurant.jpg')" }}>
              <h1 className="text-lg text-white text-center font-bold pt-24">Restaurant</h1>
            </div>
            <div className="hotel bg-cover bg-no-repeat cursor-pointer rounded-2xl h-64 flex items-end justify-center pb-4" style={{ backgroundImage: "url('../src/assets/hotel.jpg')" }}>
              <h1 className="text-lg text-white text-center font-bold pt-24">Hotel</h1>
            </div>
            <div className="cafe bg-cover bg-no-repeat cursor-pointer rounded-2xl h-64 flex items-end justify-center pb-4" style={{ backgroundImage: "url('../src/assets/cafe.jpg')" }}>
              <h1 className="text-lg text-white text-center font-bold pt-24">Café</h1>
            </div>
          </div>
        </div>

        <div className="services mt-10 text-center">
          <h1 className="service-heading text-lg sm:text-xl lg:text-2xl font-bold">Our Services</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-6">
            <div className="service border rounded-2xl p-4">
              <h1 className="text-sm sm:text-base lg:text-lg font-semibold">Service Integration</h1>
              <p className="text-xs sm:text-sm lg:text-base">
                Our platform combines hotels, restaurants,np and cafes for seamless dining, lodging, and delivery.
              </p>
            </div>
            <div className="service border rounded-2xl p-4">
              <h1 className="text-sm sm:text-base lg:text-lg font-semibold">Personalization</h1>
              <p className="text-xs sm:text-sm lg:text-base">
                Customize your experience with tailored options for family, friends, or partner outings.
              </p>
            </div>
            <div className="service border rounded-2xl p-4">
              <h1 className="text-sm sm:text-base lg:text-lg font-semibold">Geolocation</h1>
              <p className="text-xs sm:text-sm lg:text-base">
                The platform provides location tracking to display the distance to your selected venue.
              </p>
            </div>
            <div className="service border rounded-2xl p-4">
              <h1 className="text-sm sm:text-base lg:text-lg font-semibold">Real-Time Reservations</h1>
              <p className="text-xs sm:text-sm lg:text-base">
                Users can check availability, view pricing, and book in real-time, hassle-free.
              </p>
            </div>
            <div className="service border rounded-2xl p-4">
              <h1 className="text-sm sm:text-base lg:text-lg font-semibold">Price-Conscious Filters</h1>
              <p className="text-xs sm:text-sm lg:text-base">
                With advanced filters, find hotels and dining that fit your budget, from luxury to affordability.
              </p>
            </div>
            <div className="service border rounded-2xl p-4">
              <h1 className="text-sm sm:text-base lg:text-lg font-semibold">Personalized Ratings</h1>
              <p className="text-xs sm:text-sm lg:text-base">
                Make informed decisions with customized ratings tailored to your preferences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;