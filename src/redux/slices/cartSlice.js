import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const initialState = {
  cartItems: [], // Ensure this is always an empty array initially
  loading: false,
  error: null,
  isCartOpen: false, // Add cart popup state
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/customer/cart");
      return response.data.data.cart || [];
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch cart items";
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
      // If user is not logged in, add to guest cart
      if (!auth?.isAuthenticated) {
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
          id: item?.id || item?.product_id,
          selected_variant: item?.selectedVariant
            ? {
                id: item.selectedVariant.id,
                product_variation: item.selectedVariant.product_variation,
                final_price: item.selectedVariant.final_price,
                stock: item.selectedVariant.stock,
              }
            : null,
        };

        dispatch(addToCartGuest(guestCartItem));
        dispatch(openCartPopup());
        toast.success("Item added to cart");
      } else {
        // If user is logged in, call the API
        const data = {
          retailer_id: item?.retailer_id,
          wholesaler_id: item?.wholesaler_id,
          id: item?.selectedVariant?.id,
          quantity: quantity,
          product_id: item?.id || item?.product_id,
        };
        const response = await axiosInstance.post(
          "/customer/add-to-cart",
          data
        );
        const apiResult = response.data.data?.results;
        const productObj =
          Array.isArray(apiResult) && Array.isArray(apiResult[0])
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
          selected_variant: item?.selectedVariant
            ? {
                id: item.selectedVariant.id,
                product_variation: item.selectedVariant.product_variation,
                final_price: item.selectedVariant.final_price,
                stock: item.selectedVariant.stock,
              }
            : null,
        };
        dispatch(addToCartUser(cartItem));
        dispatch(openCartPopup());
        toast.success(response.data.message || "Item added to cart.");
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to add item to cart";
      if (Array.isArray(message)) {
        message.forEach((err) => toast.error(err));
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
        { quantity }
      );

      if (!response.data.status) {
        throw new Error(response.data.message || "Failed to update cart item");
      }

      return { itemId, quantity };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to update cart item";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const removeFromCartapi = createAsyncThunk(
  "cart/removeFromCartapi",
  async (item, { rejectWithValue, dispatch, getState }) => {
    const { auth } = getState();
    const keyPayload = {
      id: item?.id || item?.product_id || item?.retailer_product_id,
      selected_variant: item?.selected_variant || item?.selectedVariant || null,
    };

    try {
      if (auth?.isAuthenticated) {
        const data = {
          retailer_product_id: item?.retailer_id
            ? item?.retailer_product_id || item?.product_id
            : "",
          product_id: !item?.retailer_id ? item?.id || item?.product_id : "",
        };
        dispatch(removeFromCart(keyPayload));
        const response = await axiosInstance.post(
          "/customer/remove-to-cart",
          data
        );
        toast.success(response.data.message);
        return response.data;
      } else {
        dispatch(removeFromCart(keyPayload));
      }
    } catch (error) {
      if (auth?.isAuthenticated) {
        dispatch(addToCartUser(item));
      } else {
        dispatch(addToCartGuest(item));
      }

      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to remove item from cart";
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
    },
    addToCartGuest: (state, action) => {
      if (!state.cartItems) state.cartItems = [];
      const existingItem = state.cartItems.find((item) => {
        if (!item) return false;
        const itemId = item.id ?? item.product_id ?? item.retailer_product_id;
        return (
          (itemId === action.payload.product_id ||
            itemId === action.payload.id) &&
          ((!item.selected_variant && !action.payload.selected_variant) ||
            item.selected_variant?.product_variation ===
              action.payload.selected_variant?.product_variation)
        );
      });
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.cartItems = state.cartItems.filter(Boolean); // Remove any null values
        state.cartItems.push(action.payload);
      }
    },
    addToCartUser: (state, action) => {
      if (!state.cartItems) state.cartItems = [];
      const existingItem = state.cartItems.find((item) => {
        if (!item) return false;
        const itemId = item.id ?? item.product_id;
        return (
          (itemId === action.payload.product_id ||
            itemId === action.payload.id) &&
          ((!item.selected_variant && !action.payload.selected_variant) ||
            item.selected_variant?.product_variation ===
              action.payload.selected_variant?.product_variation)
        );
      });

      if (existingItem) {
        existingItem.quantity = action.payload.quantity;
      } else {
        state.cartItems = state.cartItems.filter(Boolean); // Remove any null values
        state.cartItems.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      const targetId =
        action.payload?.id ??
        action.payload?.product_id ??
        action.payload?.retailer_product_id;
      const targetVar =
        action.payload?.selected_variant ||
        action.payload?.selectedVariant ||
        null;

      state.cartItems = state.cartItems.filter((item) => {
        const itemId = item.id ?? item.product_id ?? item.retailer_product_id;
        const itemVar = item.selected_variant || item.selectedVariant || null;

        const sameId = itemId === targetId;
        const sameVariant =
          (!itemVar && !targetVar) ||
          itemVar?.product_variation === targetVar?.product_variation;

        return !(sameId && sameVariant);
      });
    },
    updateQuantityUser: (state, action) => {
      const {
        id,
        product_id,
        retailer_product_id,
        selected_variant,
        selectedVariant,
        quantity,
      } = action.payload;

      const payloadId = id ?? product_id ?? retailer_product_id;
      const payloadVar = selected_variant || selectedVariant || null;

      const itemIndex = state.cartItems.findIndex((item) => {
        const itemId = item.id ?? item.product_id ?? item.retailer_product_id;

        const itemVar = item.selected_variant || item.selectedVariant || null;

        const sameVariant =
          (!itemVar && !payloadVar) ||
          itemVar?.product_variation === payloadVar?.product_variation;

        return itemId === payloadId && sameVariant;
      });

      if (itemIndex > -1) {
        if (quantity <= 0) {
          // Remove if 0
          state.cartItems.splice(itemIndex, 1);
        } else {
          // Replace with new quantity
          state.cartItems[itemIndex].quantity = quantity;
        }
      } else if (quantity > 0) {
        // New item
        state.cartItems.push({ ...action.payload });
      }
    },

    updateQuantityGuest: (state, action) => {
      const {
        id,
        product_id,
        retailer_product_id,
        selected_variant,
        selectedVariant,
        quantity,
      } = action.payload;

      const payloadId = id ?? product_id ?? retailer_product_id;
      const payloadVar = selected_variant || selectedVariant || null;

      const existingItem = state.cartItems.find((item) => {
        const itemId = item.id ?? item.product_id ?? item.retailer_product_id;

        const itemVar = item.selected_variant || item.selectedVariant || null;

        const sameVariant =
          (!itemVar && !payloadVar) ||
          itemVar?.product_variation === payloadVar?.product_variation;

        return itemId === payloadId && sameVariant;
      });

      if (existingItem) {
        // Increment for guest cart
        existingItem.quantity += quantity;
      } else if (quantity > 0) {
        // New item
        state.cartItems.push({ ...action.payload });
      }
    },

    toggleCartPopup: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    openCartPopup: (state) => {
      state.isCartOpen = true;
    },
    closeCartPopup: (state) => {
      state.isCartOpen = false;
    },
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
    // builder.addCase(addToCart.fulfilled, (state, action) => {
    //   const existingItem = state.cartItems.find(
    //     (item) => item.id === action.payload.id &&
    //       JSON.stringify(item.selected_variant) === JSON.stringify(action.payload.selected_variant)
    //   );

    //   if (existingItem) {
    //     existingItem.quantity += action.payload.quantity;
    //   } else {
    //     state.cartItems.push(action.payload);
    //   }
    //   state.loading = false;
    // });
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
      const item = state.cartItems.find(
        (item) => item.id === action.payload.itemId
      );
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
    // builder.addCase(removeFromCart.fulfilled, (state, action) => {
    //   state.cartItems = state.cartItems.filter(
    //     (item) => item.id !== action.payload
    //   );
    //   state.loading = false;
    // });
    // builder.addCase(removeFromCart.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // });
    // builder.addCase(removeFromCart.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // });
  },
});

export const {
  clearCart,
  addToCartGuest,
  addToCartUser,
  removeFromCart,
  updateCartGuest,
  toggleCartPopup,
  openCartPopup,
  closeCartPopup,
  updateQuantityGuest,
  updateQuantityUser,
} = cartSlice.actions;

export default cartSlice.reducer;
