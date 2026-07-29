import { configureStore } from "@reduxjs/toolkit";
import hostelReducer from "../reduxSlices/hostelSlice";
import authReducer from "../reduxSlices/authSlice";
import signupReducer from "../reduxSlices/signupSlice";

export const store = configureStore({
  reducer: {
    Hostel: hostelReducer,
    auth: authReducer,
    signup: signupReducer,
  },
});

export default store;