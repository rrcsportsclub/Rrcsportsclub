"use client";

import { createSlice } from "@reduxjs/toolkit";

interface Player {
  name: string;
  image: string;
  bid: number | string;
  baseprice: number;
}

interface Captain {
  srNo: number;
  name: string;
  teamColor: string;
  image: string;
  teamName: string;
  totalAmt: number;
  players: Player[];
}

interface CaptainsState {
  captainsList: Captain[];
  bidingChance: Captain;
}
const initialState: CaptainsState = {
  captainsList: [],
  bidingChance: {
    srNo: 0,
    name: "",
    teamColor: "",
    image: "",
    teamName: "",
    totalAmt: 0,
    players: [],
  },
};

export const captainsSlice = createSlice({
  name: "captains",
  initialState,
  reducers: {
    setCaptainsList: (state, action) => {
      state.captainsList = action.payload;
    },
    setBidingChance: (state, action) => {
      state.bidingChance = action.payload;
    },
  },
});

export const { setCaptainsList, setBidingChance } = captainsSlice.actions;
export default captainsSlice.reducer;
