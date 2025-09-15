import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const initialState = {
  resetPassword: null,
  loading: false,
  error: null,
};

export const resetPassword = createAsyncThunk(
  "resetPassword/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/customer/reset-password", {
        old_password: data.old_password,
        new_password: data.new_password,
        confirm_password: data.new_password,
      });
      if (response?.data?.success) {
        toast.success(response?.data?.message);
      } else {
        toast.error(response?.data?.message);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to reset password"
      );
    }
  }
);

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {
    clearResetPassword: (state) => {
      state.resetPassword = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.resetPassword = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to reset password";
      });
  },
});

export const { clearResetPassword } = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;
