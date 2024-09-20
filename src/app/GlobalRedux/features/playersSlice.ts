"use client";

import { createSlice } from "@reduxjs/toolkit";

interface Player {
  srNo: number;
  basePrice: number;
  imageUrl: string;
  name: string;
  speciality: string;
  usp: string;
}

export interface PlayerState {
  playersList: Player[];
  currentBidingPlayer: Player;
  movement: boolean;
}

const initialState: PlayerState = {
  playersList: [],
  currentBidingPlayer: {
    srNo: 1,
    basePrice: 0,
    imageUrl: "",
    name: "",
    speciality: "",
    usp: "",
  },
  movement: false,
};

export const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    setPlayersList: (state, action) => {
      state.playersList = action.payload;
    },
    setCurrentBidingPlayer: (state, action) => {
      state.currentBidingPlayer = action.payload;
    },
    setMovement: (state, action) => {
      state.movement = action.payload;
    },
  },
});

export const { setPlayersList, setCurrentBidingPlayer, setMovement } =
  playersSlice.actions;

export default playersSlice.reducer;
