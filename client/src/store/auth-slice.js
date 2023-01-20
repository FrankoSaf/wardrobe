import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logOff(state) {
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
