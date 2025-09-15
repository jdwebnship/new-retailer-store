import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { clearState, loadState, saveState } from "../utils/sessionStorage";
import authSlice from "../redux/slices/authSlice";
import storeInfoSlice from "../redux/slices/storeInfoSlice";
import productSlice from "../redux/slices/productSlice";
import homeSectionsSlice from "../redux/slices/homeSectionsSlice";
import wishlistSlice from "../redux/slices/WishListSlice";
import newArrivalsSlice from "../redux/slices/newArrivalsSlice";
import resetPasswordSlice from "../redux/slices/resetPasswordSlice";
import shippingAddressSlice from "../redux/slices/shippingAddressSlice";
import accountDetailsSlice from "../redux/slices/accountDetailsSlice";
import customerOrdersSlice from "../redux/slices/customerOrdersSlice";
import orderPopupSlice from "../redux/slices/orderPopupSlice";
// import cartReducer from "./slices/cartSlice";
// import wishlistReducer from "./slices/wishlistSlice";
// import storeReducer from "./slices/storeSlice";
// import productReducer from "./slices/productSlice";
// import checkoutReducer from "./slices/checkoutSlice";
// import filtersReducer from "./slices/filterSlice";
// import ordersReducer from "./slices/ordersSlice";
// import accountDetailsReducer from "./slices/accountDetailsSlice";
// import shippingAddressReducer from "./slices/shippingAddressSlice";

// --- combine all slices
const appReducer = combineReducers({
  auth: authSlice,
  storeInfo: storeInfoSlice,
  products: productSlice,
  homeSections: homeSectionsSlice,
  wishlist: wishlistSlice,
  newArrivals: newArrivalsSlice,
  resetPassword: resetPasswordSlice,
  shippingAddress: shippingAddressSlice,
  accountDetails: accountDetailsSlice,
  customerOrders: customerOrdersSlice,
  orderPopup: orderPopupSlice,
  // cart: cartReducer,
  // orders: ordersReducer,
  // accountDetails: accountDetailsReducer,
  // shippingAddress: shippingAddressReducer,
  // wishlist: wishlistReducer,
  // store: storeReducer,
  // checkout: checkoutReducer,
  // filters: filtersReducer,
});

// --- root reducer with RESET_APP handling
const rootReducer = (state, action) => {
  if (action.type === "RESET_APP") {
    clearState();

    const storeInfoState = state?.storeInfo;

    state = {
      storeInfo: storeInfoState,
    };
  }
  return appReducer(state, action);
};

// --- load persisted state
const persistedState = loadState();

// --- create store
const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
});

// --- persist selected reducers on every change
store.subscribe(() => {
  saveState({
    auth: store.getState().auth,
    cart: store.getState().cart,
    wishlist: store.getState().wishlist,
    store: store.getState().store,
    products: store.getState().products,
    filters: store.getState().filters,
    storeInfo: store.getState().storeInfo,
  });
});

export default store;
