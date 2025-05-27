import axios from 'axios';

export const createConnectAccount = async (token) => {
  return  await axios.post(`${import.meta.env.VITE_API_URL}/create-connect-account`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}