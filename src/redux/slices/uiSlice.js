import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCheckoutModalOpen: false,
  showSignUpModal: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openCheckoutModal: (state) => {
      state.isCheckoutModalOpen = true;
    },
    closeCheckoutModal: (state) => {
      state.isCheckoutModalOpen = false;
    },
  },
});

export const { openCheckoutModal, closeCheckoutModal } = uiSlice.actions;

export const selectIsCheckoutModalOpen = (state) =>
  state.ui.isCheckoutModalOpen;
export const selectShowSignUpModal = (state) => state.ui.showSignUpModal;

export default uiSlice.reducer;
