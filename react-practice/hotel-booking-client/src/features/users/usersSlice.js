import { createSlice } from "@reduxjs/toolkit";

// Function to safely retrieve user from localStorage
const getStoredUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error reading localStorage:", error);
    return null;
  }
};

// Define initial state with stored user
const initialState = {
  user: getStoredUser(),
  isLoggedOut: !getStoredUser(), // If no user, set logged out to true
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {    
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedOut = false;
      localStorage.setItem("user", JSON.stringify(action.payload)); // Store user in localStorage
    },

    logout: (state) => {
      state.user = null;
      state.isLoggedOut = true;
      localStorage.removeItem("user"); 
    },
  },
});

export const { setUser, logout } = usersSlice.actions;
export default usersSlice.reducer;
