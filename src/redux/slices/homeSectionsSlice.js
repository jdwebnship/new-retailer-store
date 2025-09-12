import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

const initialState = {
  homeSections: null,
  loading: false,
  error: null,
};

export const fetchHomeSections = createAsyncThunk(
  "homeSections/fetchHomeSections",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/home-page-sections");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch home sections"
      );
    }
  }
);

const homeSectionsSlice = createSlice({
  name: "homeSections",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeSections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomeSections.fulfilled, (state, action) => {
        state.loading = false;
        state.homeSections = action.payload;
      })
      .addCase(fetchHomeSections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch home sections";
      });
  },
});

export const { clearHomeSections } = homeSectionsSlice.actions;
export default homeSectionsSlice.reducer;
