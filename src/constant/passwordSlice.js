import { createSlice } from "@reduxjs/toolkit";

const passwordSlice = createSlice({
  name: "password",
  initialState: {
    isVerified: false,
  },
  reducers: {
    verify: (state, action) => {
      const { email, password } = action.payload;
      if (email === "admin@gmail.com" && password === "Admin@123") {
        state.isVerified = true;
      } else {
        state.isVerified = false;
      }
    },
    logout: (state, action) => {
      state.isVerified = false;
    },
  },
});

export const { verify, logout } = passwordSlice.actions;
export default passwordSlice.reducer;
