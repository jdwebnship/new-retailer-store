import { clearCart, fetchCart } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
import axiosInstance from "./axiosInstance";

  export const syncGuestCartItems = async (token,cartItems,dispatch) => {
    if (!token || !cartItems?.length) {
      return { success: false, message: 'No token or cart items found' };
    }

    const cart_items = cartItems.map((item) => ({
      product_id: item?.id || item?.product_id,
      quantity: item.quantity || 1,
      retailer_id: item.retailer_id || null,
      wholesaler_id: item.wholesaler_id || null,
      selected_variant: item.selected_variant || null,
      id: (item.selected_variant && item.selected_variant.id) || null
    }));

    try {
      const response = await axiosInstance.post(
        '/customer/add-to-cart-guest',
        { cart_items },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response?.data?.success || response?.status === 200) {
        // Refresh the cart from server
        await dispatch(fetchCart());
        return { 
          success: true, 
          message: response?.data?.message || 'Cart synced successfully' 
        };
      } else {
        const errorMessage = response?.data?.message || 'Failed to sync cart';
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Error syncing cart:', error);
      const errorMessage = error.response?.data?.message || 'Something went wrong while syncing cart';
      dispatch(clearCart());
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    }
  };