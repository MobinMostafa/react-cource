import axios from 'axios';

export const register = async (userData) => {
   await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, userData);
}

export const login = async (userData) => {
   await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, userData);
}