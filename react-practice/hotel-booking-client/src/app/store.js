import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../features/users/usersSlice'

export default configureStore({
  reducer: {
    users: usersReducer,
    // Add other slices here if needed
  },
})