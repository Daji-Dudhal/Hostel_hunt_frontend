import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "https://hostelhunt-backend-6.onrender.com";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password, userType }, { rejectWithValue }) => {
    try {
      let url = "";

      if (userType === "student") {
        url = `${BASE_URL}/student/login?username=${username}&password=${password}`;
      } else if (userType === "admin") {
        url = `${BASE_URL}/admin/login?username=${username}&password=${password}`;
      } else if (userType === "hostelOwner") {
        url = `${BASE_URL}/hostelOwner/login?username=${username}&password=${password}`;
      } else {
        throw new Error("Invalid user type");
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;