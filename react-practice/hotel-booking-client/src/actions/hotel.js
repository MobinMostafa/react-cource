import axios from "axios";


// create hotel
export const createHotel = async (token,data) => await axios.post(`${import.meta.env.VITE_API_URL}/create-hotel`, data, {
    headers: { Authorization: `Bearer ${token}` },
});

// get hotel data

export const getHotels = async () => await axios.get(`${import.meta.env.VITE_API_URL}/hotels`);

// dif days

export const diffDays = (from, to) => {
    const day = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    const start = new Date(from)
    const end = new Date(to)
    const difference = Math.round(Math.abs((start - end) / day));

    return difference
}