"use client";

import { configureStore } from "@reduxjs/toolkit";
import playersReducer from "./features/playersSlice";
import captainsReducer from "./features/captainsSlice";
import bidingReducer from "./features/bidingSlice";

export const store = configureStore({
  reducer: {
    players: playersReducer,
    captains: captainsReducer,
    biding: bidingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
