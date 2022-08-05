import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import authSlice from "../components/auth/authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
