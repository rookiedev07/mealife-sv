// services/restaurantService.js
import axios from 'axios';

const API_URL = '/api/restaurant/owner';

// restaurantService.js
export const fetchRestaurantDetails = async (token) => {
    try {
        const response = await fetch('API_ENDPOINT', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching restaurant details:", error);
        return { success: false, message: "Failed to fetch data" };
    }
};
