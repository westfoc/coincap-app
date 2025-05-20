import { configureStore } from "@reduxjs/toolkit";
import coinsReducer from "./features/coin/coinSlice";

export const store = configureStore({
  reducer: {
    coins: coinsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
