import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const regOrLogUser = createAsyncThunk(
  "auth",
  async (userInfo, thunkAPI) => {
    const { action } = userInfo;
    try {
      let response;
      if (action === "register") {
        response = await axios.post("/api/auth/register", userInfo);
      } else if (action === "login") {
        response = await axios.post("/api/auth/login", userInfo);
      }
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
