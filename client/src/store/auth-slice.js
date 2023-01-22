import { createSlice } from "@reduxjs/toolkit";
import { regOrLogUser } from "./authAction";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(regOrLogUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(regOrLogUser.fulfilled, (state, action) => {
        state.isLoading = false;

        state.user = action.payload;
      })
      .addCase(regOrLogUser.rejected, (state, action) => {
   
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
