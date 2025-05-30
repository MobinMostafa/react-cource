import axios from "axios";

export const createHotel = async (token) => await axios.post(`${import.meta.env.VITE_API_URL}/create-hotel`, {}, {
    headers: { Authorization: `Bearer ${token}` },
});