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
import contactSlice from "./slices/contactSlice";
import cartSlice from "./slices/cartSlice";
import uiSlice from "./slices/uiSlice";
import checkoutSlice from "./slices/checkoutSlice";

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
  contact: contactSlice,
  cart: cartSlice,
  ui: uiSlice,
  checkout: checkoutSlice,
});

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

const persistedState = loadState();

if (persistedState?.ui) {
  delete persistedState.ui;
}

const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
});

function removeLoadingKeys(obj) {
  if (!obj || typeof obj !== "object") return obj;

  if (Array.isArray(obj)) {
    return obj.map(removeLoadingKeys);
  }

  return Object.keys(obj).reduce((acc, key) => {
    if (key.toLowerCase().endsWith("loading")) {
      return acc;
    }
    acc[key] = removeLoadingKeys(obj[key]);
    return acc;
  }, {});
}

store.subscribe(() => {
  const currentState = store.getState();

  saveState({
    auth: removeLoadingKeys(currentState.auth),
    cart: removeLoadingKeys(currentState.cart),
    wishlist: removeLoadingKeys(currentState.wishlist),
    store: removeLoadingKeys(currentState.store),
    products: removeLoadingKeys(currentState.products),
    filters: removeLoadingKeys(currentState.filters),
    storeInfo: removeLoadingKeys(currentState.storeInfo),
  });
});

export default store;
