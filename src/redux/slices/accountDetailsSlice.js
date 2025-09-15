import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const initialState = {
  accountDetails: null,
  loading: false,
  error: null,
};

export const updateAccountDetails = createAsyncThunk(
  "accountDetails/updateAccountDetails",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/customer/account-details", {
        firstname: data.firstname,
        lastname: data.lastname,
      });
      if (response?.data?.success) {
        toast.success(response?.data?.message);
      } else {
        toast.error(response?.data?.message);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update account details"
      );
    }
  }
);

const accountDetailsSlice = createSlice({
  name: "accountDetails",
  initialState,
  reducers: {
    clearAccountDetails: (state) => {
      state.accountDetails = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateAccountDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAccountDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.accountDetails = action.payload;
      })
      .addCase(updateAccountDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update account details";
      });
  },
});

export const { clearAccountDetails } = accountDetailsSlice.actions;
export default accountDetailsSlice.reducer;
