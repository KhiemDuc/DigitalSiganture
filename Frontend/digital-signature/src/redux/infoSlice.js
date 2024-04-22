import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../services/user.service";
import { setMessage } from "./message";

// Define the initial state
const initialState = {
  userInfo: null,
  loading: false,
};

// Define the async thunk to fetch user information
export const getUserInfo = createAsyncThunk(
  "info/getUserInfo",
  async (userID, thunkAPI) => {
    try {
      const response = await UserService.getUserInfo(userID); // Replace with your API endpoint
      return { userInfo: response.data.data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

// Create the info slice
const infoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.userInfo;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.userInfo = null;
      });
  },
});

// Export the async thunk and the reducer
export const { reducer } = infoSlice;
export default reducer;
