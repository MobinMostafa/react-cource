import axios from "axios";

export const createHotel = async (token,data) => await axios.post(`${import.meta.env.VITE_API_URL}/create-hotel`, data, {
    headers: { Authorization: `Bearer ${token}` },
});