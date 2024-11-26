import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Create Action - Add a new user
export const createUser = createAsyncThunk(
  "createUser", 
  async (data, { rejectWithValue }) => {
    try {
      // Send POST request to the API to create a user
      const response = await fetch("https://674416a8b4e2e04abea0b7c0.mockapi.io/Crud", {
        method: "POST", // POST method to create a new resource
        headers: {
          "Content-Type": "application/json", // JSON content type for request
        },
        body: JSON.stringify(data), // Convert the user data to JSON format
      });
      const result = await response.json(); // Parse the response as JSON
      return result; // Return the created user to be added to the state
    } catch (error) {
      console.error("Internal server Error", error);
      return rejectWithValue(error); // Return the error if the request fails
    }
  }
);

// Read Action - Fetch all users
export const showUser = createAsyncThunk(
  "showUser", 
  async (_, { rejectWithValue }) => {
    try {
      // Send GET request to the API to fetch all users
      const response = await fetch("https://674416a8b4e2e04abea0b7c0.mockapi.io/Crud");
      const result = await response.json(); // Parse the response as JSON
      return result; // Return the list of users to update the state
    } catch (error) {
      console.error("Internal server Error", error);
      return rejectWithValue(error); // Return the error if the request fails
    }
  }
);

// Delete Action - Delete a user by ID
export const deleteUser = createAsyncThunk(
  "deleteUser", 
  async (id, { rejectWithValue }) => {
    try {
      // Send DELETE request to the API with the user ID to delete the user
      const response = await fetch(`https://674416a8b4e2e04abea0b7c0.mockapi.io/Crud/${id}`, {
        method: "DELETE", // DELETE method to remove the resource
        headers: {
          "Content-Type": "application/json", // JSON content type for request
        },
      });
      const result = await response.json(); // Parse the response as JSON
      return result; // Return the deleted user data
    } catch (error) {
      console.error("Internal server Error", error);
      return rejectWithValue(error); // Return the error if the request fails
    }
  }
);

// Update Action - Update a user's information
export const updateUser = createAsyncThunk(
  "updateUser", 
  async (data, { rejectWithValue }) => {
    try {
      console.log("updated data", data); // Log the updated user data for debugging
      // Send PUT request to the API with updated user data
      const response = await fetch(`https://674416a8b4e2e04abea0b7c0.mockapi.io/Crud/${data.id}`, {
        method: "PUT", // PUT method to update an existing resource
        headers: {
          "Content-Type": "application/json", // JSON content type for request
        },
        body: JSON.stringify(data), // Convert updated data to JSON format
      });
      const result = await response.json(); // Parse the response as JSON
      return result; // Return the updated user data
    } catch (error) {
      console.error("Internal server Error", error);
      return rejectWithValue(error); // Return the error if the request fails
    }
  }
);

// Create the Redux Slice
export const userDetails = createSlice({
  name: "userDetail", // Name of the slice in the store
  initialState: {
    users: [], // List of all users (initial state is empty)
    loading: false, // Flag indicating loading state
    error: null, // Stores error message if an error occurs
    searchData: [], // Stores search result (initial state is empty)
  },
  reducers: {
    // Reducer for handling search functionality
    searchUser: (state, action) => {
      console.log(action.payload); // Log the search payload for debugging
      state.searchData = action.payload; // Store search results in the state
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle createUser action
      .addCase(createUser.pending, (state) => {
        state.loading = true; // Set loading to true while the request is pending
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false when the request is successful
        state.users.push(action.payload); // Add the new user to the users list
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false; // Set loading to false if the request fails
        state.error = action.payload; // Store the error in the state
      })

      // Handle showUser action
      .addCase(showUser.pending, (state) => {
        state.loading = true; // Set loading to true while the request is pending
      })
      .addCase(showUser.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false when the request is successful
        state.users = action.payload; // Update the users list with fetched data
      })
      .addCase(showUser.rejected, (state, action) => {
        state.loading = false; // Set loading to false if the request fails
        state.error = action.payload; // Store the error in the state
      })

      // Handle deleteUser action
      .addCase(deleteUser.pending, (state) => {
        state.loading = true; // Set loading to true while the request is pending
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false when the request is successful
        const { id } = action.payload;
        if (id) {
          state.users = state.users.filter((item) => item.id !== id); // Remove the deleted user from the list
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false; // Set loading to false if the request fails
        state.error = action.payload; // Store the error in the state
      })

      // Handle updateUser action
      .addCase(updateUser.pending, (state) => {
        state.loading = true; // Set loading to true while the request is pending
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false when the request is successful
        state.users = state.users.map((item) =>
          item.id === action.payload.id ? action.payload : item // Update the user in the list
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false; // Set loading to false if the request fails
        state.error = action.payload; // Store the error in the state
      });
  },
});

// Export the reducer and actions
export default userDetails.reducer;
export const { searchUser } = userDetails.actions;
