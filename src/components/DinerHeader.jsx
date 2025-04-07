import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import nopfp from '../assets/restaurant-placeholder.jpg'; // Default restaurant profile image
import axios from 'axios'; // For API requests

const DinerHeader = ({ onNewDishClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState('/');
  const [restaurantProfileImage, setRestaurantProfileImage] = useState(nopfp);
  const [showModal, setShowModal] = useState(false);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false); // Dropdown menu state
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar toggle

  useEffect(() => {
    fetchRestaurantProfile();
  }, []);

  // New state variables for business and venue details
  const [businessDetails, setBusinessDetails] = useState({
    name: '',
    ownerName: '',
    restaurantName: '',
    description: '',
    address: '',
    phone: '',
  });

  const [venueDetails, setVenueDetails] = useState({
    cuisine: '',
    diningStyle: '',
    dressCode: '',
    parkingDetails: '',
  });

  useEffect(() => {
    const currentPath = location.pathname.replace('/', '');
    setSelectedTab(currentPath || '/');
  }, [location.pathname]);

  const handleTabClick = (tab) => {
    navigate(`/${tab}`);
    setSidebarOpen(false); // Close sidebar on navigation
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleOptionsMenu = () => {
    setShowOptionsMenu(!showOptionsMenu);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRestaurantProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchRestaurantProfile = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No token found. Please log in.');
        return;
      }

      const { data } = await axios.get('http://localhost:5000/api/restaurant/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        console.log('Fetched data:', data.restaurant); // Check the data here
        setBusinessDetails({
          name: data.restaurant.name,
          ownerName: data.restaurant.ownerName,
          restaurantName: data.restaurant.restaurantName,
          description: data.restaurant.description,
          address: data.restaurant.address,
          phone: data.restaurant.phone,
        });
        setVenueDetails({
          cuisine: data.restaurant.cuisine,
          diningStyle: data.restaurant.diningStyle,
          dressCode: data.restaurant.dressCode,
          parkingDetails: data.restaurant.parkingDetails,
        });
        setRestaurantProfileImage(data.restaurant.images[0] || nopfp);
      } else {
        console.error('Failed to fetch restaurant profile:', data.message || 'Unknown error');
      }
    } catch (err) {
      console.error('Failed to fetch profile data:', err.response ? err.response.data : err.message);
    }
  };

  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.clear();
    navigate('/signin');
  };

  

  const handleProfileSave = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(
        'http://localhost:5000/api/restaurants',
        {
          ownerName: businessDetails.ownerName,
          restaurantName: businessDetails.restaurantName,
          description: businessDetails.description,
          address: businessDetails.address,
          phone: businessDetails.phone,
          cuisine: venueDetails.cuisine,
          diningStyle: venueDetails.diningStyle,
          dressCode: venueDetails.dressCode,
          parkingDetails: venueDetails.parkingDetails,
          images: [restaurantProfileImage],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert('Restaurant profile updated successfully!');
        toggleModal();
      } else {
        alert('Failed to update profile: ' + response.data.message);
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('An error occurred while updating the profile.');
    }
  };

  return (
    <header className="fixed top-0 left-0 z-10 h-full">
      <button
        className="sm:block text-gray-500 fixed z-50 right-0 focus:outline-none"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full shadow-md w-64 bg-white transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out sm:translate-x-0 sm:static z-40`}
      >
        <div className="p-6">
          <div className="flex items-center">
            <img
              src={restaurantProfileImage}
              alt="Restaurant Profile"
              className="h-16 w-16 rounded-full mb-6 cursor-pointer"
              onClick={toggleOptionsMenu} // Toggle dropdown menu
            />
            <h2 className="ml-3 mb-5 text-lg font-bold">{businessDetails.ownerName.split(' ')[0]}'s Diner</h2>
          </div>

          {/* Dropdown Menu */}
          {showOptionsMenu && (
            <div className="absolute bg-white shadow-lg rounded-md top-23 w-40 z-50">
              <button
                className="block text-left w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  toggleOptionsMenu();
                  toggleModal(); // Toggle profile edit modal
                }}
              >
                Edit Profile
              </button>
              <button
                className="block text-left w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={handleLogout} // Handle logout
              >
                Logout
              </button>
            </div>
          )}

          <div className="flex flex-col gap-7">
            <button
              className={`py-2 px-4 rounded-lg flex items-center gap-3 ${selectedTab === 'diner' ? 'bg-gray-200 font-bold' : ''}`}
              onClick={() => handleTabClick('diner')}
            >
              <i className="fas fa-tachometer-alt"></i> Dashboard
            </button>
            <button
              className={`py-2 px-4 rounded-lg flex items-center gap-3 ${selectedTab === 'bookings' ? 'bg-gray-200 font-bold' : ''}`}
              onClick={() => handleTabClick('bookings')}
            >
              <i className="fas fa-calendar-alt"></i> Bookings
            </button>
            <button
              className={`py-2 px-4 rounded-lg flex items-center gap-3 ${selectedTab === 'menu' ? 'bg-gray-200 font-bold' : ''}`}
              onClick={() => handleTabClick('menu')}
            >
              <i className="fas fa-utensils"></i> Menu
            </button>
            <button
              className={`py-2 px-4 rounded-lg flex items-center gap-3 ${selectedTab === 'customer-reviews' ? 'bg-gray-200 font-bold' : ''}`}
              onClick={() => handleTabClick('customer-reviews')}
            >
              <i className="fas fa-comments"></i> Reviews
            </button>
            <button
              className={`py-2 px-4 rounded-lg flex items-center gap-3 ${selectedTab === 'insights' ? 'bg-gray-200 font-bold' : ''}`}
              onClick={() => handleTabClick('insights')}
            >
              <i className="fas fa-chart-line"></i> Insights
            </button>
            <button
              className={`py-2 px-4 rounded-lg flex items-center gap-3 ${selectedTab === 'requests' ? 'bg-gray-200 font-bold' : ''}`}
              onClick={() => handleTabClick('requests')}
            >
              <i className="fas fa-concierge-bell"></i> Requests
            </button>
          </div>

          <button
            className="mt-24 bg-blue-600 text-white w-full h-[2.5em] items-center justify-center py-2 px-4 rounded-xl hover:bg-blue-500"
            onClick={onNewDishClick}
          >
            New Dish
          </button>

          <button
            className={`mt-6 py-2 px-4 rounded-lg w-full items-center justify-center flex items-center gap-3 ${selectedTab === 'settings' ? 'bg-gray-200 font-bold' : ''}`}
            onClick={() => handleTabClick('settings')}
          >
            <i className="fas fa-cog"></i> Settings
          </button>
        </div>
      </div>

      {/* Modal for profile update */}
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-[100vh] bg-gray-500 bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-white w-[60vw] h-[80vh] overflow-scroll p-6  rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <div className="mb-4">
              <label htmlFor="ownerName" className="block text-sm font-semibold">Owner Name</label>
              <input
                type="text"
                id="ownerName"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={businessDetails.ownerName}
                onChange={(e) => setBusinessDetails({ ...businessDetails, ownerName: e.target.value })}
                placeholder="Enter the owner's name"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="restaurantName" className="block text-sm font-semibold">Restaurant Name</label>
              <input
                type="text"
                id="restaurantName"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={businessDetails.restaurantName}
                onChange={(e) => setBusinessDetails({ ...businessDetails, restaurantName: e.target.value })}
                placeholder="Enter the restaurant name"
              />
            </div>



            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-semibold">Description</label>
              <textarea
                id="description"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={businessDetails.description}
                onChange={(e) => setBusinessDetails({ ...businessDetails, description: e.target.value })}
                placeholder="Provide a brief description of the restaurant"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-semibold">Address</label>
              <input
                type="text"
                id="address"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={businessDetails.address}
                onChange={(e) => setBusinessDetails({ ...businessDetails, address: e.target.value })}
                placeholder="Enter the restaurant's address"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-semibold">Phone</label>
              <input
                type="text"
                id="phone"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={businessDetails.phone}
                onChange={(e) => setBusinessDetails({ ...businessDetails, phone: e.target.value })}
                placeholder="Enter the business phone number"
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={toggleModal}
                className="bg-gray-200 w-[5em] rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleProfileSave}
                className="bg-blue-700 w-[5em] text-white p-1 rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default DinerHeader;
