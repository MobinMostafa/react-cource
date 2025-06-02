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

// seller hotel

export const sellerHotels = async (token) => await axios.get(`${import.meta.env.VITE_API_URL}/seller-hotel`, {
    headers: { Authorization: `Bearer ${token}` },
});


// delete hotel 

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Deletes a hotel by its ID.
 * 
 * @param {string} token - The authorization token for the request.
 * @param {string} id - The ID of the hotel to be deleted.
 * 
 * @returns {Promise} - A promise that resolves to the response of the delete operation.
 */

/*******  aae78bd2-8666-4efb-a5f6-066307aceac6  *******/
export const deleteHotel = async (token,id) => await axios.delete(`${import.meta.env.VITE_API_URL}/delete-hotel/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
});