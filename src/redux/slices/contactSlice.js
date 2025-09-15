import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

// Async thunk for submitting contact form
export const submitContactForm = createAsyncThunk(
  "contact/submitForm",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/contact-us", formData);
      if (response?.data?.success) {
        toast.success(response?.data?.message);
      } else {
        toast.error(response?.data?.message);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    loading: false,
    success: false,
    error: null,
    message: "",
  },
  reducers: {
    resetContactState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = "";
      })
      .addCase(submitContactForm.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message =
          action.payload?.message || "Form submitted successfully";
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to submit form";
      });
  },
});

export const { resetContactState } = contactSlice.actions;
export default contactSlice.reducer;
