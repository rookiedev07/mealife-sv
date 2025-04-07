import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell as faBellRegular } from '@fortawesome/free-regular-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const NotificationBell = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchNotifications = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.get('http://localhost:5000/api/notify', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setNotifications(response.data.notifications);
        } catch (error) {
            console.error('Error fetching notifications:', error);
            alert('Failed to fetch notifications. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications(); // Fetch on initial load
        const intervalId = setInterval(fetchNotifications, 5000); // Poll every 5 seconds

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);

    const handleBellClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleDismiss = async (notificationId) => {
        console.log("Dismissing notification with ID:", notificationId); // Log the ID
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.delete(`http://localhost:5000/api/notificationbell/${notificationId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                setNotifications((prevNotifications) =>
                    prevNotifications.filter((notification) => notification._id !== notificationId)
                );
            } else {
                alert('Failed to dismiss notification: ' + response.data.message);
            }
        } catch (error) {
            console.error('Error dismissing notification:', error);
            alert('Failed to dismiss notification');
        }
    };

    return (
        <div className="relative">
            <FontAwesomeIcon
                icon={faBellRegular}
                className="cursor-pointer text-2xl mt-1 relative"
                onClick={handleBellClick}
            />

            {notifications.length > 0 && (
                <span className="absolute left-3 bottom-3 bg-red-500 text-white rounded-full text-xs px-2 py-1">
                    {notifications.length}
                </span>
            )}

{isModalOpen && (
    <div
        className="fixed inset-0 overflow-scroll bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
        onClick={closeModal}
    >
        <div
            className="bg-white rounded-lg shadow-lg w-[90%] md:w-[50%] lg:w-[40%] max-h-[80vh] overflow-y-auto p-6 relative"
            onClick={(e) => e.stopPropagation()}
        >
            <h4 className="text-xl font-semibold mb-4">Notifications</h4>
            {loading ? (
                <p>Loading...</p>
            ) : notifications.length === 0 ? (
                <p>No new notifications</p>
            ) : (
                <div className="space-y-4">
                    {notifications.map((notification) => (
                        <div
                            key={notification._id}
                            className="notification-item border-b pb-2 last:border-0 relative"
                        >
                            <p>{notification.message}</p>
                            {notification.status === 'accepted' && (
                                <div className="bg-green-100 text-green-700 p-2 rounded mt-2">
                                    <p><strong>Booking Status:</strong> Accepted</p>
                                    <p><strong>Time:</strong> {notification.bookingTime}</p>
                                    <p><strong>Table No.:</strong> Upon arriving at the restaurant, kindly inquire with the Restaurant Admin.</p>
                                </div>
                            )}
                            {notification.status === 'rejected' && (
                                <div className="bg-red-100 text-red-700 p-2 rounded mt-2">
                                    <p><strong>Booking Status:</strong> Rejected</p>
                                    <p><strong>Reason:</strong> The chosen time slot may be unavailable. Please try booking a different time.</p>
                                </div>
                            )}
                            <button
                                className="absolute top-0 right-2 text-red-500 hover:text-red-700"
                                onClick={() => handleDismiss(notification._id)}
                            >
                                <FontAwesomeIcon icon={faTimes} size="lg" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
            <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={closeModal}
            >
                <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>
        </div>
    </div>
)}

        </div>
    );
};

export default NotificationBell;
