// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};


// Register
export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ data, navigate }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/customer/register", data);
      if (response?.data?.success || response?.status) {
        toast.success(response?.data?.message)
        navigate("/signin")
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Login with email
export const login = createAsyncThunk(
  "auth/login",
  async ({ credentials, navigate }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/customer/login", credentials);
      if (response?.data?.success) {
        toast.success(response?.data?.message || "Login successful.")
        navigate("/")
      } else {
        toast.error(response?.data?.message || "Please verify your email before logging in.")
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// logout
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async ({ navigate }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post("/customer/logout", {
        user_token: import.meta.env.VITE_API_KEY,
      });
      if (response?.data?.success || response?.status) {
        dispatch(logout());
        dispatch({ type: "RESET_APP" });
        navigate("/signin");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Logout failed"
      );
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

      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log("action.payload",action.payload);
        state.loading = false;
        state.user = action.payload.data;
        state.isAuthenticated = action.payload.data.email_verification_token ? false : true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Register failed";
        state.isAuthenticated = false;
      })

      // login
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

      // logout
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

export const { logout, setCredentials, updateCustomer } = authSlice.actions;
export default authSlice.reducer;
