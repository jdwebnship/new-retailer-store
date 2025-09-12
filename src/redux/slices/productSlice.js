import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

const initialState = {
  product: null,
  loading: false,
  error: null,
};

export const fetchStoreInfo = createAsyncThunk(
  "storeInfo/fetchStoreInfo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/store-info");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch store information"
      );
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStoreInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStoreInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.storeInfo = action.payload;
      })
      .addCase(fetchStoreInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch store information";
      });
  },
});

export const { clearStoreInfo } = productSlice.actions;
export default productSlice.reducer;
