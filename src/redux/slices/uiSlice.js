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
      console.log('Redux: Opening checkout modal');
      state.isCheckoutModalOpen = true;
    },
    closeCheckoutModal: (state) => {
      console.log('Redux: Closing checkout modal');
      state.isCheckoutModalOpen = false;
    },
    openSignUpModal: (state) => {
      console.log('Redux: Opening signup modal');
      state.showSignUpModal = true;
    },
    closeSignUpModal: (state) => {
      console.log('Redux: Closing signup modal');
      state.showSignUpModal = false;
    },
  },
});

export const {
  openCheckoutModal,
  closeCheckoutModal,
  openSignUpModal,
  closeSignUpModal,
} = uiSlice.actions;

export const selectIsCheckoutModalOpen = (state) =>
  state.ui.isCheckoutModalOpen;
export const selectShowSignUpModal = (state) => state.ui.showSignUpModal;

export default uiSlice.reducer;
