import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProfileForm() {
  const [businessDetails, setBusinessDetails] = useState({
    ownerName: "",  // Correctly named
    restaurantName: "",  // Correctly named
    description: "",
    address: "",
    phone: "",
  });

  const [venueDetails, setVenueDetails] = useState({
    cuisine: "",
    diningStyle: "",
    dressCode: "",
    parkingDetails: "",
  });

  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Unauthorized! Please log in.");
      navigate("/signin");
    }
  }, [navigate]);

  const handleInputChange = (e, setState) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    try {
      const response = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImages((prev) => [...prev, ...response.data.filePaths]);
    } catch (err) {
      alert("Failed to upload images. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Unauthorized! Please log in.");
      return;
    }

    // Validate required fields
    const requiredFields = ["ownerName", "restaurantName", "address", "phone", "dressCode", "parkingDetails"];
    const fieldErrors = {};
    requiredFields.forEach((field) => {
      if (!businessDetails[field] && field !== "dressCode" && field !== "parkingDetails") {
        fieldErrors[field] = "This field is required.";
      }
      if (!venueDetails[field] && (field === "dressCode" || field === "parkingDetails")) {
        fieldErrors[field] = "This field is required.";
      }
    });

    if (Object.keys(fieldErrors).length) {
      setErrors(fieldErrors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/restaurants",
        {
          ownerName: businessDetails.ownerName,  // Ensure correct field names
          restaurantName: businessDetails.restaurantName,
          description: businessDetails.description,
          address: businessDetails.address,
          phone: businessDetails.phone,
          cuisine: venueDetails.cuisine,
          diningStyle: venueDetails.diningStyle,
          dressCode: venueDetails.dressCode,
          parkingDetails: venueDetails.parkingDetails,
          images: images,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        alert("Restaurant profile saved successfully!");
        navigate("/diner");
      } else {
        alert(`Failed to save profile: ${response.data.message}`);
      }
    } catch (err) {
      console.error("Error saving profile:", err);
      alert("An error occurred while saving the profile. Check console for details.");
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold text-center mb-8">Restaurant Profile</h2>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="ownerName" className="block text-sm font-semibold text-gray-700">Owner's Name</label>
              <input
                type="text"
                name="ownerName"  // Updated to match the state
                value={businessDetails.ownerName}
                onChange={(e) => handleInputChange(e, setBusinessDetails)}
                required
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              {errors.ownerName && <p className="text-red-500 text-sm">{errors.ownerName}</p>}
            </div>
            <div>
              <label htmlFor="restaurantName" className="block text-sm font-semibold text-gray-700">Restaurant Name</label>
              <input
                type="text"
                name="restaurantName"  // Updated to match the state
                value={businessDetails.restaurantName}
                onChange={(e) => handleInputChange(e, setBusinessDetails)}
                required
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              {errors.restaurantName && <p className="text-red-500 text-sm">{errors.restaurantName}</p>}
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700">Description</label>
              <textarea
                name="description"
                value={businessDetails.description}
                onChange={(e) => handleInputChange(e, setBusinessDetails)}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-semibold text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={businessDetails.address}
                onChange={(e) => handleInputChange(e, setBusinessDetails)}
                required
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">Phone</label>
              <input
                type="text"
                name="phone"
                value={businessDetails.phone}
                onChange={(e) => handleInputChange(e, setBusinessDetails)}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>

            {/* Venue Details */}
            <div>
              <label htmlFor="cuisine" className="block text-sm font-semibold text-gray-700">Cuisine</label>
              <input
                type="text"
                name="cuisine"
                value={venueDetails.cuisine}
                onChange={(e) => handleInputChange(e, setVenueDetails)}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="diningStyle" className="block text-sm font-semibold text-gray-700">Dining Style</label>
              <input
                type="text"
                name="diningStyle"
                value={venueDetails.diningStyle}
                onChange={(e) => handleInputChange(e, setVenueDetails)}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="dressCode" className="block text-sm font-semibold text-gray-700">Dress Code</label>
              <input
                type="text"
                name="dressCode"
                value={venueDetails.dressCode}
                onChange={(e) => handleInputChange(e, setVenueDetails)}
                required
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              {errors.dressCode && <p className="text-red-500 text-sm">{errors.dressCode}</p>}
            </div>

            <div>
              <label htmlFor="parkingDetails" className="block text-sm font-semibold text-gray-700">Parking Details</label>
              <input
                type="text"
                name="parkingDetails"
                value={venueDetails.parkingDetails}
                onChange={(e) => handleInputChange(e, setVenueDetails)}
                required
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              {errors.parkingDetails && <p className="text-red-500 text-sm">{errors.parkingDetails}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              {images.length > 0 && (
                <div className="space-x-4 mt-4">
                  {images.map((image, index) => (
                    <div key={index} className="inline-block">
                      <img src={image} alt={`image-${index}`} className="h-24 w-24 object-cover rounded-md" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="text-red-500 ml-2"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={handleCancel}
                className="py-3 px-4 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500"
              >
                Save Profile
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileForm;