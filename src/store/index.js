import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import authSlice from "./slices/authSlice";
import feedSlice from "./slices/feedSlice";
import eventSlice from "./slices/eventSlice";

const appReducer = combineReducers({
  auth: authSlice,
  feed: feedSlice,
  event: eventSlice,
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};
const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    storage.removeItem("persist:root");
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      // {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
    }),
  devTools: true,
});
export const persistor = persistStore(store);
export default store;
