import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
import authSlice from "../slice/authSlice"; // default import

// --- combine all reducers
const rootReducer = combineReducers({
  auth: authSlice,
  // add other reducers here
  // cart: cartReducer,
  // wishlist: wishlistReducer,
});

// --- persist config: only persist selected slices
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // only these will be saved
};

// --- create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// --- create store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // needed for redux-persist
    }),
});

// --- create persistor
export const persistor = persistStore(store);

export default store;
