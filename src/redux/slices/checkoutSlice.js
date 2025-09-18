import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import { clearCart } from "./cartSlice";
import { updateCustomer } from "./authSlice";

const initialState = {
  loading: false,
  success: false,
  error: null,
  message: "",
  discount: null,
  discountLoading: false,
  discountError: null,
  checkoutLoading: false,
  checkoutError: null,
};

// Async thunk for performing checkout
export const performCheckout = createAsyncThunk(
  'checkout/performCheckout',
  async ({ payload, navigate }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/checkout1", payload);
      console.log("Checkout response:", response);
      if (response?.data?.success || response?.data?.status) {
        dispatch(discountSuccess(null));
        dispatch(updateCustomer(response?.data?.data));
        toast.success(response?.data?.message);
        dispatch(clearCart());
        // clearAllItems();
        // localStorage.setItem("successful-order", JSON.stringify(res?.data?.data));
        navigate("/my-account");
        return response.data;
      } else {
        if (Array.isArray(response?.data?.message) && response?.data?.message?.length) {
          response.data.message.forEach((err) => toast.error(err));
        } else {
          toast.error(response?.data?.message || "Checkout failed");
        }
        return rejectWithValue(response?.data || { message: "Checkout failed" });
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(error.response?.data?.message || "Something went wrong during checkout");
      return rejectWithValue(error.response?.data || { message: "Something went wrong during checkout" });
    }
  }
);

export const applyDiscount = createAsyncThunk(
  'checkout/applyDiscount',
  async (args, { rejectWithValue }) => {
    const { payload, setFieldError } = args;
    try {
      const response = await axiosInstance.post("/apply-coupon", payload);
      const { success, message, data } = response.data;
      if (success) {
        toast.success(message);
        return data?.coupon;
      } else {
        const errorMessage = message || "Invalid Code";
        setFieldError("coupon_code", errorMessage);
        return rejectWithValue({ message: errorMessage });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
      return rejectWithValue({ message: errorMessage });
    }
  }
);


const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    discountSuccess: (state, action) => {
      state.discount = action.payload;
      state.discountLoading = false;
      state.discountError = null;
    },
    clearDiscount: (state) => {
      state.discount = null;
      state.discountError = null;
    },
    clearCheckoutState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = "";
      state.checkoutLoading = false;
      state.checkoutError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle performCheckout states
      .addCase(performCheckout.pending, (state) => {
        state.checkoutLoading = true;
        state.checkoutError = null;
      })
      .addCase(performCheckout.fulfilled, (state, action) => {
        state.checkoutLoading = false;
        state.success = true;
        state.message = action.payload?.message || "Order placed successfully";
      })
      .addCase(performCheckout.rejected, (state, action) => {
        state.checkoutLoading = false;
        state.checkoutError = action.payload?.message || "Failed to place order";
      })
      // Handle applyDiscount states
      .addCase(applyDiscount.pending, (state) => {
        state.discountLoading = true;
        state.discountError = null;
      })
      .addCase(applyDiscount.fulfilled, (state, action) => {
        state.discountLoading = false;
        state.discount = action.payload || null;
      })
      .addCase(applyDiscount.rejected, (state, action) => {
        state.discountLoading = false;
        state.discountError = action.payload?.message || "Failed to apply discount";
      });
  },
});

export const {
  discountSuccess,
  clearDiscount,
  clearCheckoutState
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
