import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import cover from "../assets/banner.jpg";
import nopfp from "../assets/restaurant-placeholder.jpg";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfilePage = () => {
    const location = useLocation();
    const restaurantData = location.state?.restaurantData;
    const [restaurant, setRestaurant] = useState(restaurantData || null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("Home");
    const [newReview, setNewReview] = useState("");
    const [rating, setRating] = useState(0);
    const [reviews, setReviews] = useState([]);

    // For Booking
    const [bookingDetails, setBookingDetails] = useState({
        date: "",
        time: "",
        people: 1,
    });

    useEffect(() => {
        const getRestaurantDetails = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get('http://localhost:5000/api/restaurant/owner', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.success) {
                    setRestaurant(response.data.restaurant);
                    setReviews(response.data.restaurant.reviews || []);
                } else {
                    setError(response.data.message || 'Failed to fetch restaurant details');
                }
            } catch (err) {
                console.error("API Call Error:", err);
                setError('Failed to fetch restaurant details');
            } finally {
                setLoading(false);
            }
        };

        if (!restaurantData) {
            getRestaurantDetails();
        } else {
            setLoading(false);
        }
    }, [restaurantData]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleReviewChange = (e) => {
        setNewReview(e.target.value);
    };

    const handleReviewSubmit = async () => {
        if (!newReview || rating === 0 || !restaurant?._id) return;

        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.post('http://localhost:5000/api/reviews', {
                restaurantId: restaurant?._id,
                content: newReview,
                rating: rating,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                setReviews([...reviews, response.data.review]);
                setNewReview("");
                setRating(0);
            } else {
                setError(response.data.message || 'Failed to submit review');
            }
        } catch (err) {
            console.error("Review Submission Error:", err);
            setError('Failed to submit review');
        }
    };

    const handleRatingChange = (index) => {
        setRating(index + 1);
    };

    const handleBookingChange = (e) => {
        setBookingDetails({
            ...bookingDetails,
            [e.target.name]: e.target.value,
        });
    };

    const generateBookingId = () => {
        return 'booking-' + Date.now(); // Simple unique ID generation based on the timestamp
    };

    const handleBooking = async () => {
        const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
        const userName = localStorage.getItem('userName'); // Assuming userName is stored in localStorage
        const bookingId = generateBookingId(); // Generate a unique booking ID

        if (!bookingDetails.date || !bookingDetails.time || !bookingDetails.people || !restaurant?._id) {
            return alert('All fields are required.');
        }

        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.post('http://localhost:5000/api/bookings', {
                restaurantId: restaurant?._id,
                userId,  // Include userId
                userName, // Include userName
                bookingId, // Include bookingId
                date: bookingDetails.date,
                time: bookingDetails.time,
                people: bookingDetails.people,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            if (response.data.success) {
                const bookingId = response.data.booking._id; // Get the booking ID from the response

                // Create a notification for the restaurant owner
                await axios.post('http://localhost:5000/api/notifications', {
                    bookingId, // Reference the booking ID
                    userId, // Include userId
                    message: `New reservation for ${bookingDetails.people} people on ${bookingDetails.date} at ${bookingDetails.time}.`, // Custom message
                    bookingTime: bookingDetails.time, // Include booking time
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Use react-toastify notification here instead of react-push-notification
                toast.info(`New Reservation for ${bookingDetails.people} people on ${bookingDetails.date} at ${bookingDetails.time}.`, {
                    autoClose: 5000,
                    pauseOnHover: true,
                    closeOnClick: true,
                });

                alert('Booking Request Sent, Waiting for Response!');
                setBookingDetails({ date: "", time: "", people: 1 });
            } else {
                console.log('Failed to book the table: ' + response.data.message);
            }
        } catch (err) {
            console.error("Error during booking:", err);
            setError('Failed to book the table');
        }
    };

    if (loading) return <p className="text-center mt-10 text-gray-600">Loading...</p>;
    if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

    return (
        <div className="font-sans text-gray-800">
            <div className="relative w-full mb-20 h-60">
                <img
                    src={restaurant?.images?.[0] || cover}
                    alt="Cover"
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>
            <div className="max-w-6xl w-full mx-auto p-6 bg-white shadow-md rounded-lg">
                <div className="flex items-center gap-6 -mt-14">
                    <img
                        src={restaurant?.restaurant?.profilePicture || nopfp}
                        alt="Profile"
                        className="w-24 h-24 rounded-full border-4 border-white shadow-xl"
                    />
                    <div className="max-w-6xl w-full">
                        <h1 className="text-2xl text-black font-bold">{restaurant?.restaurant?.restaurantName || "N/A"}</h1>
                        <p className="text-gray-600">{restaurant?.restaurant?.address || "No description available"}</p>
                        <h3 className="text-black font-semibold relative float-right top-16 right-2">Owned By: {restaurant?.restaurant?.ownerName}</h3>
                    </div>
                </div>
                <div className="mt-6 flex space-x-4 border-b pb-3">
                    {["Home", "Menu", "Reviews", "About", "Book Table"].map((tab, index) => (
                        <button
                            key={index}
                            onClick={() => handleTabClick(tab)}
                            className={`px-4 py-2 ${activeTab === tab ? 'text-blue-800 border-b-2 border-blue-800' : 'text-gray-700 hover:text-blue-800'} font-semibold`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="mt-4">
                    {activeTab === "Book Table" && (
                        <div className="mt-4 p-4 border rounded-md">
                            <h2 className="text-xl font-semibold mb-4">Book a Table</h2>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={bookingDetails.date}
                                    onChange={handleBookingChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold">Time</label>
                                <input
                                    type="time"
                                    name="time"
                                    value={bookingDetails.time} // Use bookingDetails.time directly
                                    onChange={handleBookingChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold">Number of People</label>
                                <input
                                    type="number"
                                    name="people"
                                    min="1"
                                    value={bookingDetails.people}
                                    onChange={handleBookingChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <button
                                onClick={handleBooking}
                                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md"
                            >
                                Book Now
                            </button>
                        </div>
                    )}
                    {activeTab === "Reviews" && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Reviews</h2>
                            <div className="mb-4">
                                <textarea
                                    value={newReview}
                                    onChange={handleReviewChange}
                                    placeholder="Write a review..."
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                ></textarea>
                            </div>
                            <div className="flex mb-4">
                                {[...Array(5)].map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleRatingChange(index)}
                                        className={`text-lg ${index < rating ? 'text-yellow-400' : 'text-gray-400'}`}
                                    >
                                        &#9733;
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={handleReviewSubmit}
                                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md"
                            >
                                Submit Review
                            </button>
                            <div className="mt-6">
                                <h3 className="font-semibold text-lg">Existing Reviews</h3>
                                {reviews.length > 0 ? (
                                    <ul>
                                        {reviews.map((review, index) => (
                                            <li key={index} className="mt-4">
                                                <p className="font-semibold">{review.author}</p>
                                                <p>{review.content}</p>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No reviews yet.</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* ToastContainer should be placed once in your app, 
                but adding here for completeness if you don't have it globally */}
            <ToastContainer />
        </div>
    );
};

export default ProfilePage;
