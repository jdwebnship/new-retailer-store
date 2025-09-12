import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const initialState = {
  wishlist: null,
  loading: false,
  error: null,
};

export const fetchWishList = createAsyncThunk(
  "wishlist/fetchWishList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/customer/wishlist");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch store information"
      );
    }
  }
);

export const addtowishList = createAsyncThunk(
  "wishlist/addtowishList",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post("/customer/add-to-wishlist", data);
      if (response?.data?.success) {
        dispatch(fetchWishList())
        toast.success(response?.data?.message)
      } else {
        toast.error(response?.data?.message)
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch store information"
      );
    }
  }
);

export const removeFromwishList = createAsyncThunk(
  "wishlist/removeFromwishList",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post("/customer/remove-to-wishlist", data);
      if (response?.data?.success) {
        dispatch(fetchWishList())
        toast.success(response?.data?.message)
      } else {
        toast.error(response?.data?.message)
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch store information"
      );
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    clearStoreInfo: (state) => {
      state.wishlist = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // get wishlist
      .addCase(fetchWishList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishList.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      })
      .addCase(fetchWishList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch store information";
      })
  },
});

export const { clearStoreInfo } = wishlistSlice.actions;
export default wishlistSlice.reducer;
