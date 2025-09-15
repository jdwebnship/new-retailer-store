import { createSlice } from "@reduxjs/toolkit";

export const orderPopupSlice = createSlice({
  name: "orderPopup",
  initialState: {
    open: false,
    order: null, // This will hold the full order object
  },
  reducers: {
    openOrderPopup: (state, action) => {
      state.open = true;
      state.order = action.payload; // Payload is the full order object (e.g., { order_id, status, ... })
    },
    closeOrderPopup: (state) => {
      state.open = false;
      state.order = null;
    },
  },
});

export const { openOrderPopup, closeOrderPopup } = orderPopupSlice.actions;
export default orderPopupSlice.reducer;
