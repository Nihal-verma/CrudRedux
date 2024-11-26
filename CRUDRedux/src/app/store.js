// Import configureStore from Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';

// Import the userDetails slice, which manages the state and logic for user-related actions
import userDetails from '../features/userDetailsSlice';

// Create the Redux store
export const store = configureStore({
  // Define the reducer(s) to be used in the store
  reducer: {
    app: userDetails, // The `userDetails` slice is assigned to the `app` key in the store
  },
});

// Export the store to be used in your application
 