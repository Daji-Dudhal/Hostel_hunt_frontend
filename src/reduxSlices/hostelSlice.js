import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "https://hostelhunt-backend-6.onrender.com";

const initialState = {
  hostelData: [],
  loading: false,
  error: null,
};

export const fetchHostels = createAsyncThunk(
  "hostels/fetchHostels",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/hostel`);

      if (!response.ok) {
        throw new Error("Failed to fetch hostels");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const hostelSlice = createSlice({
  name: "hostels",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHostels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHostels.fulfilled, (state, action) => {
        state.loading = false;
        state.hostelData = action.payload;
      })
      .addCase(fetchHostels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default hostelSlice.reducer;