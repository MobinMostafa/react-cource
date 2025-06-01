import axios from 'axios';

export const register = async (userData) => {
  return  await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, userData);
}

export const login = async (userData) => {
  return await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, userData);
}


export const fetchUser = async (token) => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};