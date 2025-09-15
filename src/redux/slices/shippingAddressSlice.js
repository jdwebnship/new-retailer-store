import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const initialState = {
  shippingAddress: null,
  loading: false,
  error: null,
};

export const postShippingAddress = createAsyncThunk(
  "shippingAddress/postShippingAddress",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/customer/shipping-address",
        data
      );
      if (response?.data?.success) {
        toast.success(response?.data?.message);
      } else {
        toast.error(response?.data?.message);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to save shipping address"
      );
    }
  }
);

export const getShippingAddress = createAsyncThunk(
  "shippingAddress/getShippingAddress",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "/customer/get-shipping-address"
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch shipping address"
      );
    }
  }
);

const shippingAddressSlice = createSlice({
  name: "shippingAddress",
  initialState,
  reducers: {
    clearShippingAddress: (state) => {
      state.shippingAddress = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // POST Shipping Address
      .addCase(postShippingAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postShippingAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.shippingAddress = action.payload;
      })
      .addCase(postShippingAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to save shipping address";
      })
      // GET Shipping Address
      .addCase(getShippingAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getShippingAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.shippingAddress = action.payload;
      })
      .addCase(getShippingAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch shipping address";
      });
  },
});

export const { clearShippingAddress } = shippingAddressSlice.actions;
export default shippingAddressSlice.reducer;
