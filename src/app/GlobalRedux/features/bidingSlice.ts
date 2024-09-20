"use client";

import { createSlice } from "@reduxjs/toolkit";

interface BidingRound {
  round: string;
  captain: string;
  player: string;
  baseprice: number;
  bidamt: number;
  totalamt: number;
  status: string;
}

export interface BidingState {
  bidingRoundData: BidingRound[];
}

const initialState: BidingState = {
  bidingRoundData: [],
};

export const bidingSlice = createSlice({
  name: "biding",
  initialState,
  reducers: {
    setBidingRoundData: (state, action) => {
      state.bidingRoundData = action.payload;
    },
  },
});

export const { setBidingRoundData } = bidingSlice.actions;

export default bidingSlice.reducer;
