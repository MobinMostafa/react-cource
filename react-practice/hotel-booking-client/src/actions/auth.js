import axios from 'axios';

export const register = async (userData) => {
  return  await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, userData);
}

export const login = async (userData) => {
  return await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, userData);
}