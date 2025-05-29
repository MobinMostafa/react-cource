import axios from "axios";

// Log API URL for debugging
// console.log("API URL:", import.meta.env.VITE_API_URL);

export const createConnectAccount = async (token) => {
  try {
    return await axios.post(`${import.meta.env.VITE_API_URL}/create-connect-account`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("Error creating Stripe account:", error);
    throw error;
  }
};
// get account status
export const getAccountStatus = async (token) => {
  try {
    return await axios.post(`${import.meta.env.VITE_API_URL}/get-account-status`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("Error fetching account status:", error);
    throw error;
  }
};

// get account balance
export const getAccountBalance = async (token) => {
  try {
    return await axios.post(`${import.meta.env.VITE_API_URL}/get-account-balance`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("Error fetching account balance:", error);
    throw error;
  }
};

// Update user in local storage safely


export const updateUserInLocalStorage = (user, next) => {
  if (window.localStorage.getItem("users")) {
    let auth = JSON.parse(window.localStorage.getItem("users"));
    auth = { ...auth, user }; // Preserve existing properties
    localStorage.setItem("users", JSON.stringify(auth));
    if (typeof next === "function") next();
  }
};


