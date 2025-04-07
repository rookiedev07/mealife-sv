import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import RestaurantSearch from "./RestaurantSearch";
import nopfp from "../assets/nopfp.png"; // Default profile image
import axios from "axios";
import NotificationBell from "./NotificationBell";

const Header = () => {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [profileImage, setProfileImage] = useState(nopfp);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false); // Mobile menu state
  const [profile, setProfile] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    profileImage: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userSignedUp = localStorage.getItem("isSignedUp");
    const authToken = localStorage.getItem("authToken");

    if (userSignedUp && authToken) {
      setIsSignedUp(true);
      fetchUserProfile();
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("No token found. Please log in.");
        navigate("/signin");
        return;
      }

      const response = await axios.get("http://localhost:5000/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        const { name, address, email, phone, profileImage } = response.data.user;
        setProfile({ name, address, email, phone, profileImage });
        setProfileImage(profileImage || nopfp);
      } else {
        alert(response.data.message || "Failed to load profile");
      }
    } catch (err) {
      console.error("Error fetching profile data:", err);
      if (err.response && err.response.status === 401) {
        alert("Session expired. Please log in again.");
        navigate("/signin");
      } else {
        alert("Failed to load profile. Please try again later.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsSignedUp(false);
    setProfile({
      name: "",
      address: "",
      email: "",
      phone: "",
      profileImage: "",
    });
    setProfileImage(nopfp);
    navigate("/signin");
  };

  const handleSignupSuccess = () => {
    setIsSignedUp(true);
    localStorage.setItem("isSignedUp", "true");
    fetchUserProfile();
  };

  return (
    <header className="w-full bg-white shadow-lg px-4 sm:px-6 lg:px-8">
  <div className="flex items-center justify-between h-16">
    <div className="flex items-center">
      <img src="#" alt="Logo" className="h-10" />
      <button
        className="sm:hidden ml-4 text-gray-700 focus:outline-none"
        onClick={() => setIsNavOpen(!isNavOpen)}
      >
        <i className="fa-solid fa-bars text-xl"></i>
      </button>
    </div>

    {/* Navigation */}
    <nav
      className={`${
        isNavOpen ? "block" : "hidden"
      } sm:block absolute sm:relative top-16 left-0 sm:top-0 sm:flex w-full sm:w-auto bg-white sm:bg-transparent shadow-lg sm:shadow-none z-50`}
    >
      <ul className="sm:flex space-y-4 sm:space-y-0 sm:space-x-8 p-4 sm:p-0">
        <li>
          <Link to="/home" className="block text-black">
            Home
          </Link>
        </li>
        <li>
          <Link to="/reserve" className="block text-black">
            Reserve
          </Link>
        </li>
        <li>
          <Link to="/about-us" className="block text-black">
            About Us
          </Link>
        </li>
        <li>
          <Link to="/register-restaurant" className="block text-black">
            Join Us
          </Link>
        </li>
        <li>
          <Link to="/review" className="block text-black">
            Reviews
          </Link>
        </li>
      </ul>
    </nav>

    {/* Search bar (visible on larger screens) */}
    <div className="relative sm:flex items-center flex-grow max-w-md lg:max-w-lg">
      <RestaurantSearch />
    </div>

    {/* Right section: Notification Bell, Profile/Sign-In Button */}
    <div className="flex items-center space-x-4">
      {/* Notification Bell */}
      <div className="relative right-0 md:right-10 lg:right-7">
      <NotificationBell />
      </div>

      {/* User profile and sign-in button */}
      <div className="flex items-center">
        {isSignedUp ? (
          <div className="relative">
            <img
              src={profileImage}
              alt="User Profile"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => setIsDropdownVisible(!isDropdownVisible)}
            />
            {isDropdownVisible && (
              <div className="absolute z-10 top-12 right-0 bg-white border border-gray-300 rounded-md shadow-lg p-2">
                <button
                  className="w-[100px] text-left p-2 hover:bg-gray-100"
                  onClick={() => setIsModalOpen(true)}
                >
                  Edit Profile
                </button>
                <button
                  className="w-full text-left p-2 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            className="bg-gray-200 w-[6em] py-2 px-4 rounded-md font-semibold"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  </div>

  {/* Edit Profile Modal */}
  {isModalOpen && (
    <EditProfileModal
      profile={profile}
      setProfile={setProfile}
      profileImage={profileImage}
      setProfileImage={setProfileImage}
      closeModal={() => setIsModalOpen(false)}
    />
  )}
</header>
  );
};

const EditProfileModal = ({
  profile,
  setProfile,
  profileImage,
  setProfileImage,
  closeModal,
}) => {
  const [newProfile, setNewProfile] = useState(profile);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("You must be logged in to update the profile.");
        return;
      }

      if (!newProfile.name || !newProfile.email || !newProfile.address || !newProfile.phone) {
        alert("Please fill in all required fields.");
        return;
      }

      const formData = new FormData();
      formData.append("name", newProfile.name);
      formData.append("email", newProfile.email);
      formData.append("address", newProfile.address);
      formData.append("phone", newProfile.phone);

      if (profileImage && profileImage !== nopfp) {
        formData.append("profileImage", profileImage);
      }

      const response = await axios.put("http://localhost:5000/api/user/profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        setProfile(newProfile);
        closeModal();
      } else {
        alert(response.data.message || "Failed to update profile.");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      if (err.response && err.response.data) {
        alert(err.response.data.message || "Failed to update profile.");
      } else {
        alert("Failed to update profile. Please try again.");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-11/12 sm:w-96 p-6">
        <h2 className="text-lg font-bold mb-4">Edit Profile</h2>
        <div className="relative mb-4">
          <img
            src={profileImage}
            alt="Profile"
            className="w-24 h-24 mx-auto rounded-full cursor-pointer"
            onClick={() => document.getElementById("profileImage").click()}
          />
          <input
            id="profileImage"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleProfileImageChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Name</label>
          <input
            type="text"
            name="name"
            value={newProfile.name}
            onChange={handleInputChange}
            className="w-full h-10 px-4 rounded-md border-2 border-gray-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Email</label>
          <input
            type="email"
            name="email"
            value={newProfile.email}
            onChange={handleInputChange}
            className="w-full h-10 px-4 rounded-md border-2 border-gray-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Address</label>
          <input
            type="text"
            name="address"
            value={newProfile.address}
            onChange={handleInputChange}
            className="w-full h-10 px-4 rounded-md border-2 border-gray-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Phone</label>
          <input
            type="text"
            name="phone"
            value={newProfile.phone}
            onChange={handleInputChange}
            className="w-full h-10 px-4 rounded-md border-2 border-gray-300"
          />
        </div>
        <div className="flex justify-between">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg"
          >
            Save
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-300 text-black px-6 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
