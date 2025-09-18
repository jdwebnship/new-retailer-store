import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  verificationLoading: false,
  sent: false,
  verified: false,
  verificationError: null,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ data, navigate }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/customer/register", data);

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        navigate("/signin");
      } else {
        toast.error(
          response?.data?.errors ||
            response?.data?.message ||
            "Something went wrong"
        );
      }

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.errors ||
        error.response?.data?.message ||
        "Registration failed";
      toast.error(errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);

export const registerGuestUser = createAsyncThunk(
  "auth/register-guest",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/customer/update-user-details",
        data
      );
      if (response?.data?.success || response?.status) {
        toast.success(response?.data?.message);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ credentials, navigate }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/customer/login", credentials);
      if (response?.data?.success) {
        toast.success(response?.data?.message || "Login successful.");
        navigate("/");
      } else {
        toast.error(
          response?.data?.message ||
            "Please verify your email before logging in."
        );
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async ({ navigate }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post("/customer/logout", {
        user_token: import.meta.env.VITE_API_KEY,
      });
      if (response?.data?.success || response?.status) {
        toast.success(response?.data?.message || "Logout successful");
        dispatch(logout());
        dispatch({ type: "RESET_APP" });
        navigate("/signin");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/customer/forgot-password", {
        email,
      });
      if (response?.data?.success || response?.status) {
        toast.success(response?.data?.message);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

export const resetPasswordWithToken = createAsyncThunk(
  "auth/resetpassword",
  async ({ data, navigate }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/customer/token-password",
        data
      );
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        navigate("/signin");
      } else {
        toast.error(response?.data?.message);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

export const sendOTP = createAsyncThunk(
  "otp/send",
  async (mobile, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/otp/send", {
        user_token: import.meta.env.VITE_API_KEY,
        mobile,
      });

      if (response?.data?.success) {
        toast.success(response?.data?.message || "OTP sent successfully");
        return response.data; // ✅ return success data
      }

      // Handle specific "not registered" case
      if (response?.data?.message?.includes("not registered")) {
        // toast.error(response?.data?.message);
        return rejectWithValue({
          userNotRegistered: true,
          message: response.data.message,
          mobile,
        });
      }

      // Generic failure case
      return rejectWithValue({
        userNotRegistered: false,
        message: response?.data?.message || "Failed to send OTP",
        mobile,
      });
    } catch (error) {
      console.error("sendOTP error:", error);
      return rejectWithValue({
        userNotRegistered: false,
        message: error.response?.data?.message || error.message,
        mobile,
      });
    }
  }
);

export const verifyOTP = createAsyncThunk(
  "otp/verify",
  async ({ mobile, otp }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/otp/verify/checkout", {
        mobile,
        otp,
      });
      if (response?.data?.success) {
        toast.success(response?.data?.message || "OTP verified successfully");
      } else {
        toast.error(response?.data?.message || "Invalid OTP");
      }
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
      return rejectWithValue(error.response?.data || "OTP verification failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.isAuthenticated = false;
    },
    updateCustomer: (state, action) => {
      if (state.user && state.user.customer) {
        state.user.customer = {
          ...state.user.customer,
          ...action.payload,
        };
      }
    },
    updateAccountDetailsSuccess: (state, action) => {
      if (state.user && state.user.customer) {
        state.user.customer.firstname = action.payload.firstname;
        state.user.customer.lastname = action.payload.lastname;
      }
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.isAuthenticated = action.payload.data.email_verification_token
          ? false
          : true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Register failed";
        state.isAuthenticated = false;
      })

      .addCase(registerGuestUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerGuestUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.isAuthenticated = action.payload.data.email_verification_token
          ? false
          : true;
      })
      .addCase(registerGuestUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Register failed";
        state.isAuthenticated = false;
      })

      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.isAuthenticated = action.payload.success ? true : false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
        state.isAuthenticated = false;
      })

      .addCase(sendOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOTP.fulfilled, (state) => {
        state.loading = false;
        state.sent = true;
        state.verified = false;
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to send OTP";
        state.sent = false;
      })

      .addCase(verifyOTP.pending, (state) => {
        state.verificationLoading = true;
        state.verificationError = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.verificationLoading = false;
        state.verified = true;
        state.user = action.payload.data;
        state.isAuthenticated = action.payload.success ? true : false;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.verificationLoading = false;
        state.verificationError = action.payload || "OTP verification failed";
        state.verified = false;
      })

      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Logout failed";
      });
  },
});

export const { logout, updateCustomer, updateAccountDetailsSuccess } =
  authSlice.actions;
export default authSlice.reducer;
