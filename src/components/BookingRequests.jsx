import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RequestCard from './RequestCard';
import DinerHeader from './DinerHeader';

const BookingRequests = ({ restaurantId }) => {
    const [requests, setRequests] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loadingIds, setLoadingIds] = useState(new Set());
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch the bookings from the backend
    const fetchBookings = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.get(
                `http://localhost:5000/api/bookings/restaurants?restaurants=${restaurantId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success) {
                const pendingBookings = response.data.bookings.filter(
                    (booking) => booking.status === 'pending'  // Only show pending bookings
                );
                setBookings(pendingBookings);
            } else {
                setError(response.data.message || 'Failed to fetch bookings');
            }
            setRequests()
        } catch (err) {
            console.error('Error fetching bookings:', err);
            setError('Failed to fetch bookings');
        } finally {
            setLoading(false);
        }
    };

    // Accept or reject a booking
    const updateBookingStatus = async (bookingId, action) => {
        if (!bookingId) {
            console.error('Error: Missing booking ID');
            setErrorMessage('Error: Missing booking ID');
            return;
        }

        console.log(`Attempting to ${action} booking ID:`, bookingId); // Debugging line

        if (loadingIds.has(bookingId)) return; // Prevent multiple clicks

        setLoadingIds((prev) => new Set(prev).add(bookingId));

        try {
            const token = localStorage.getItem('authToken');

            if (!['accept', 'reject'].includes(action)) {
                throw new Error('Invalid action specified');
            }

            const response = await axios.post(
                `http://localhost:5000/api/bookings/${action}/${bookingId}`,
                {}, // Ensure request body is not null
                { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log('Response from server:', response.data); // Debugging line

            if (response.data.success) {
                alert(`Booking ${action}ed successfully!`);
                setBookings((prevBookings) =>
                    prevBookings.filter((booking) => booking._id !== bookingId)
                );
            } else {
                setErrorMessage(response.data.message || `Failed to ${action} booking`);
                alert(`Failed to ${action} booking: ${response.data.message}`);
            }
        } catch (err) {
            console.error(`Error ${action}ing booking:`, err);
            setErrorMessage(err.response?.data?.message || `Failed to ${action} booking. Please try again.`);
            alert(`Failed to ${action} booking: ${err.response?.data?.message || 'An error occurred'}`);
        } finally {
            setLoadingIds((prev) => {
                const newSet = new Set(prev);
                newSet.delete(bookingId);
                return newSet;
            });
        }
    };

    useEffect(() => {
        fetchBookings();
    }, [restaurantId]);

    if (loading) return <p className="text-center mt-10 text-gray-600">Loading...</p>;
    if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

    return (
        <div className="p-5">
            <div className="text-center">
                {errorMessage && <p className="text-red-600">{errorMessage}</p>}
            </div>
            <div>
                {bookings.length > 0 ? (
                    <div>
                        {bookings.map((booking) => (
                            <RequestCard
                                key={booking._id}
                                name={booking.userName}
                                numberOfPeople={booking.people}
                                timing={`${booking.date} at ${booking.time}`}
                                onAccept={() => updateBookingStatus(booking._id, 'accept')}
                                onReject={() => updateBookingStatus(booking._id, 'reject')}
                                loading={loadingIds.has(booking._id)}
                            />
                        ))}
                    </div>
                ) : (
                    <div>
                        <DinerHeader />
                        <div className="flex flex-col items-center justify-center h-[84vh]">
                            <p className="text-center mt-10 text-gray-600">No bookings available.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingRequests;
