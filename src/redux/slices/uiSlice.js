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
    openSignUpModal: (state) => {
      state.showSignUpModal = true;
    },
    closeSignUpModal: (state) => {
      state.showSignUpModal = false;
    },
  },
});

export const { openCheckoutModal, closeCheckoutModal, openSignUpModal, closeSignUpModal } = uiSlice.actions;

export default uiSlice.reducer;
