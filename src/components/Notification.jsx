import React from 'react';

const NotificationButton = ({ selectedTab, handleTabClick, pendingRequests }) => {
    return (
        <button
            className={`py-2 px-4 rounded-lg flex items-center gap-3 relative ${selectedTab === 'requests' ? 'bg-gray-200 font-bold' : ''}`}
            onClick={() => handleTabClick('requests')}
        >
            <i className="fas fa-concierge-bell"></i> Requests
            {pendingRequests > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                    {pendingRequests}
                </span>
            )}
        </button>
    );
};

export default NotificationButton;