import axios from "axios";

const API_URL = 'http://localhost:8080/api/foods';

export const fetchFoodList = async (token) => {
    try {
        const response = await axios.get(API_URL, {
            headers: token ? { "Authorization": `Bearer ${token}` } : {}
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching the food list!", error);
        throw error;
    }
}

export const fetchFoodDetails = async (id, token) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`, {
            headers: token ? { "Authorization": `Bearer ${token}` } : {}
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching food details", error);
        throw error;
    }
}
