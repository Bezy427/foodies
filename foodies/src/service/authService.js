import axios from "axios";


const API_URL = "http://localhost:8080/api";

export const registerUser = async (data) => {
    // eslint-disable-next-line no-useless-catch
    try {
        return await axios.post(
            API_URL + '/register',
            data
        )
    } catch (error) {
        throw error;
    }
}

export const loginUser = async (data) => {
    // eslint-disable-next-line no-useless-catch
    try {
        return await axios.post(
            API_URL + '/login',
            data
        )
    } catch (error) {
        throw error;
    }
}