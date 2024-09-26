import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../GlobalRedux/store";

export default function PlayersSoldAnimation({ bidingAmt }: any) {
  const bidingChance = useSelector(
    (state: RootState) => state.captains.bidingChance
  );
  const bidingRoundData = useSelector(
    (state: RootState) => state.biding.bidingRoundData
  );
  const currentBidingPlayer = useSelector(
    (state: RootState) => state.players.currentBidingPlayer
  );
  const latestBidingAct = bidingRoundData[bidingRoundData.length - 1];
  const basePrice = latestBidingAct
    ? latestBidingAct.status === "sold"
      ? currentBidingPlayer?.basePrice
      : latestBidingAct.totalamt
    : currentBidingPlayer.basePrice;

  const totalamt = Number(bidingAmt) + Number(basePrice);

  return (
    <div
      className="bg-black text-white border-[2.5px] border-white shadow-md shadow-[#757575] font-bold text-xs py-2 px-4"
      //   style={{ animation: "spin 3s ease infinite alternate" }}
      style={{ animation: "spin 3s ease 1 normal forwards" }}
    >
      {currentBidingPlayer?.name} sold to {bidingChance.name} at Rs.{totalamt}
    </div>
  );
}
