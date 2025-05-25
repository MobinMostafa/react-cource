import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    user: null,
    isLoggedOut: false,
  },
  reducers: {    
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedOut = false;
    },

    logout: (state) => {
      state.user = null;
      state.isLoggedOut = true;
    },
  },
});

export const { setUser,  logout } = usersSlice.actions;
export default usersSlice.reducer;


