import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const initialState = {
  orders: {},
  loading: false,
  error: null,
};

export const fetchCustomerOrders = createAsyncThunk(
  "customerOrders/fetchCustomerOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/customer/orders");

      if (response?.data?.success) {
        return response.data.data || [];
      } else {
        return rejectWithValue(
          response?.data?.message || "Failed to fetch orders"
        );
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch orders";

      return rejectWithValue(errorMessage);
    }
  }
);

const customerOrdersSlice = createSlice({
  name: "customerOrders",
  initialState,
  reducers: {
    clearOrders: (state) => {
      state.orders = {};
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomerOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchCustomerOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch orders";
      });
  },
});

export const { clearOrders } = customerOrdersSlice.actions;
export default customerOrdersSlice.reducer;
