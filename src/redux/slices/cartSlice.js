import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const initialState = {
  cartItems: [],
  loading: false,
  error: null,
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/customer/cart");
      return response.data.data || [];
    } catch (error) {
      const message = error.response?.data?.message || "Failed to fetch cart items";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ item, quantity = 1 }, { getState, rejectWithValue, dispatch }) => {
    try {
      const { auth } = getState();
      const isLoggedIn = auth?.user?.token;

      console.log("item",item)

      // If user is not logged in, add to guest cart
      if (!isLoggedIn) {
        const guestCartItem = {
          quantity: quantity,
          product_name: item?.name || item?.product_name,
          product_images: item?.product_images,
          product_stock: item?.selectedVariant?.stock ?? item?.quantity ?? 0,
          wishlist_id: item?.wishlist_id ?? null,
          final_price: Number(
            item?.selectedVariant?.final_price ?? item?.final_price ?? 0
          ).toFixed(2),
          retailer_id: item?.retailer_id,
          wholesaler_id: item?.wholesaler_id,
          product_id: item?.id || item?.product_id,
          selected_variant: item?.selectedVariant ? {
            id: item.selectedVariant.id,
            product_variation: item.selectedVariant.product_variation,
            final_price: item.selectedVariant.final_price,
            stock: item.selectedVariant.stock,
          } : null,
        };

        console.log("guestCartItem",guestCartItem);
        dispatch(addToCartGuest(guestCartItem));
        toast.success("Item added to cart");
        return guestCartItem;
      }

      // If user is logged in, call the API
      const data = {
        retailer_id: item?.retailer_id,
        wholesaler_id: item?.wholesaler_id,
        id: item?.selectedVariant?.id,
        quantity: quantity,
        product_id: item?.id || item?.product_id,
      };

      const response = await axiosInstance.post("/customer/add-to-cart", data, {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      });

      if (!response.data.status) {
        throw new Error(response.data.message || "Failed to add to cart");
      }

      const apiResult = response.data.data?.results;
      const productObj = Array.isArray(apiResult) && Array.isArray(apiResult[0])
        ? apiResult[0][0]
        : apiResult[0];

      const cartItem = {
        id: productObj.product_id || item?.selectedVariant?.id,
        quantity: productObj.quantity,
        product_stock: productObj.product_stock,
        product_name: item?.name || item?.product_name,
        product_images: item?.product_images,
        status: productObj.status,
        message: productObj.message,
        wishlist_id: productObj.wishlist_id,
        final_price: Number(
          item?.selectedVariant?.final_price ?? item?.final_price ?? 0
        ).toFixed(2),
        retailer_id: item?.retailer_id,
        wholesaler_id: item?.wholesaler_id,
        product_id: item?.id || item?.product_id,
        selected_variant: item?.selectedVariant ? {
          id: item.selectedVariant.id,
          product_variation: item.selectedVariant.product_variation,
          final_price: item.selectedVariant.final_price,
          stock: item.selectedVariant.stock,
        } : null,
      };

      toast.success(response.data.message || 'Item added to cart.');
      return cartItem;

    } catch (error) {
      const message = error.response?.data?.message || error.message || "Failed to add item to cart";
      if (Array.isArray(message)) {
        message.forEach(err => toast.error(err));
      } else {
        toast.error(message);
      }
      return rejectWithValue(message);
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ itemId, quantity }, { rejectWithValue }) => {
    try {

      const response = await axiosInstance.put(
        `/customer/update-cart/${itemId}`,
        { quantity },
      );

      if (!response.data.status) {
        throw new Error(response.data.message || "Failed to update cart item");
      }

      return { itemId, quantity };
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Failed to update cart item";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (itemId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/customer/remove-from-cart/${itemId}`,
      );

      if (!response.data.status) {
        throw new Error(response.data.message || "Failed to remove item from cart");
      }

      return itemId;
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Failed to remove item from cart";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      state.cartTotal = 0;
      state.cartCount = 0;
    },
    addToCartGuest: (state, action) => {
      console.log("item in payload",action.payload)
      const existingItem = state.cartItems.find((item) => {
        const itemId = item.id ?? item.product_id ?? item.retailer_product_id;
        return (
          itemId === action.payload.id && (
            !item.selectedVariant && !action.payload.selected_variant || // Both have no selected_variant
            item.selectedVariant?.product_variation === action.payload.selected_variant?.product_variation // Same product_variation
          )
        )
      });
      if (existingItem) {
        existingItem.quantity = action.payload.quantity; // Accumulate quantity
      } else {
        state.cartItems.push(action.payload); // Add new item
      }
    },
    removeFromCartGuest: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    updateCartGuest: (state, action) => {
      const { itemId, quantity } = action.payload;
      const item = state.cartItems.find(item => item.id === itemId);
      if (item) {
        item.quantity = quantity;
      }
    }
  },
  extraReducers: (builder) => {
    // Fetch Cart
    builder.addCase(fetchCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cartItems = action.payload || [];
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Add to Cart
    builder.addCase(addToCart.fulfilled, (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id &&
          JSON.stringify(item.selected_variant) === JSON.stringify(action.payload.selected_variant)
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.cartItems.push(action.payload);
      }
      state.loading = false;
    });
    builder.addCase(addToCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Update Cart Item
    builder.addCase(updateCartItem.fulfilled, (state, action) => {
      const item = state.cartItems.find(item => item.id === action.payload.itemId);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      state.loading = false;
    });
    builder.addCase(updateCartItem.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateCartItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Remove from Cart
    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      state.loading = false;
    });
    builder.addCase(removeFromCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(removeFromCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {
  clearCart,
  addToCartGuest,
  removeFromCartGuest,
  updateCartGuest
} = cartSlice.actions;

export default cartSlice.reducer;
