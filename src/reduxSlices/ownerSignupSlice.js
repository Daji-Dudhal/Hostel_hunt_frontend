import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "https://hostelhunt-backend-6.onrender.com";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const signupOwner = createAsyncThunk(
  "auth/signupOwner",
  async ({ name, username, password, contactInfo }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/hostelOwner/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          password,
          contactInfo,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        return rejectWithValue(errorText);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const OwnerSignupSlice = createSlice({
  name: "ownerSignup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupOwner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupOwner.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signupOwner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default OwnerSignupSlice.reducer;