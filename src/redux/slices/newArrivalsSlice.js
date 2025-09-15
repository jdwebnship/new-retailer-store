import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

const initialState = {
  newArrivals: null,
  loading: false,
  error: null,
};

export const postNewArrivals = createAsyncThunk(
  "newArrivals/postNewArrivals",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/new-arrivals");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch store information"
      );
    }
  }
);

const newArrivalsSlice = createSlice({
  name: "newArrivals",
  initialState,
  reducers: {
    clearNewArrivals: (state) => {
      state.newArrivals = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postNewArrivals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postNewArrivals.fulfilled, (state, action) => {
        state.loading = false;
        state.newArrivals = action.payload;
      })
      .addCase(postNewArrivals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to post new arrivals";
      });
  },
});

export const { clearNewArrivals } = newArrivalsSlice.actions;
export default newArrivalsSlice.reducer;
