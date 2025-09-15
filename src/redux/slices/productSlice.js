import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

const initialState = {
  product: null,
  productDetails: null,
  loading: false,
  searchLoading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (params, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      // Add all parameters to form data
      if (params.sub_category) {
        // If sub_category is an array (from multiple selections), join with commas
        // Otherwise, use as is (for single selection)
        const subCategoryValue = Array.isArray(params.sub_category)
          ? params.sub_category.join(",")
          : params.sub_category;
        formData.append("sub_category", subCategoryValue);
      }
      if (params.min_price) formData.append("min_price", params.min_price);
      if (params.max_price) formData.append("max_price", params.max_price);
      if (params.size) formData.append("size", params.size);
      if (params.in_stock) formData.append("in_stock", params.in_stock);
      if (params.out_of_stock)
        formData.append("out_of_stock", params.out_of_stock);
      if (params.sort_by) formData.append("sort_by", params.sort_by);
      if (params.product_id) formData.append("product_id", params.product_id);

      const response = await axiosInstance.post(
        `/get-products?page=${params.page || 1}`,
        formData
      );

      return {
        data: response.data,
        currentPage: params.page || 1,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products information"
      );
    }
  }
);

export const fetchProductsDetails = createAsyncThunk(
  "product/fetchProductsDetails",
  async ({ slug }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/singal-product-details/${slug}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products information"
      );
    }
  }
);

export const fetchSearchProducts = createAsyncThunk(
  "product/fetchSearchProducts",
  async ({ search }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/search-products", { search });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products information"
      );
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.data;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch products information";
      })

      .addCase(fetchProductsDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetails = action.payload.data;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchProductsDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch products information";
      })
      .addCase(fetchSearchProducts.pending, (state) => {
        state.searchLoading = true;
        state.error = null;
      })
      .addCase(fetchSearchProducts.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.product = action.payload;
        state.productDetails = null;
      })
      .addCase(fetchSearchProducts.rejected, (state, action) => {
        state.searchLoading = false;
        state.error = action.payload || "Failed to search products";
      });
  },
});

export const { clearProducts } = productSlice.actions;
export default productSlice.reducer;
