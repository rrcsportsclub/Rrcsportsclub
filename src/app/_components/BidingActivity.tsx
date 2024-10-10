"use client";

import { Concert_One } from "next/font/google";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../GlobalRedux/store";
import axios from "axios";
import { setBidingRoundData } from "../GlobalRedux/features/bidingSlice";
import { setBidingChance } from "../GlobalRedux/features/captainsSlice";
import {
  setCurrentBidingPlayer,
  setMovement,
  setPlayersList,
} from "../GlobalRedux/features/playersSlice";
import PlayersSoldAnimation from "./PlayersSoldAnimation";
import { ImSpinner3 } from "react-icons/im";

const concertOne = Concert_One({
  subsets: ["latin"],
  weight: "400",
});

export default function BidingActivity({
  isSoldClicked,
  isBidClicked,
  bidingAmt,
  submitData,
  bidingAmount,
}: any) {
  const captainsList = useSelector(
    (state: RootState) => state.captains.captainsList
  );
  const bidingChance = useSelector(
    (state: RootState) => state.captains.bidingChance
  );
  const bidingRoundData = useSelector(
    (state: RootState) => state.biding.bidingRoundData
  );
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  // const currentBidingPlayer = useSelector(
  //   (state: RootState) => state.players.currentBidingPlayer
  // );
  // const playersList = useSelector(
  //   (state: RootState) => state.players.playersList
  // );

  const movement = useSelector((state: RootState) => state.players.movement);

  // const initPlayers = async () => {
  //   try {
  //     await axios.get("http://localhost:3000/api/listofplayers").then((res) => {
  //       const filtredRes = res.data?.filter(
  //         (obj: any) => Object.keys(obj).length !== 0
  //       );
  //       // .slice(0, 5);

  //       dispatch(setPlayersList(filtredRes));
  //     });
  //   } catch (error) {
  //     console.error(error, "Players not found");
  //   }
  // };

  // console.log(listOfCaptainName);
  // console.log(activeCaptainIndex);

  // console.log(bidingRoundData);
  // console.log(bidingChance);
  console.log(isLoggedIn);

  return (
    <div className=" flex flex-col items-center gap-5 p-3 relative">
      <div className="bg-white rounded-full flex justify-center items-center border-[5px] border-[#364D6D] px-6 py-4 shadow-md shadow-[#757575]">
        <p className={`text-[#303B4A] ${concertOne.className} text-xl`}>
          Biding Activity
        </p>
      </div>
      <ul className={`flex flex-col gap-1 text-lg ${concertOne.className}`}>
        {captainsList.length > 0 &&
          captainsList.map((captain) => (
            <li key={captain.srNo}>
              #{captain.name}
              {bidingRoundData.filter(
                (data) => data.captain === captain.name
              )[0]
                ? ` (${
                    bidingRoundData.filter(
                      (data) => data.captain === captain.name
                    )[0].player
                  }) `
                : " "}
              -{" "}
              {
                bidingRoundData.filter(
                  (data) => data.captain === captain.name
                )[0]?.bidamt
              }
            </li>
          ))}
      </ul>

      <div className="bg-white w-[90%] h-[5px] rounded-full shadow-md shadow-[##757575]"></div>
      <div className="flex w-full justify-center gap-2 items-center">
        <div
          className={`${concertOne.className} shadow-md shadow-[#757575] text-sm rounded-2xl px-[10px] py-1 bg-white text-[#303B4A] border-[4px] border-[#364D6D]`}
        >
          Biding chance
        </div>
        <div className="bg-white w-[20px] h-[4px] rounded-full shadow-md shadow-[##757575]"></div>
        <div
          className={`${concertOne.className} shadow-md shadow-[#757575] text-sm rounded-2xl px-[10px] py-1 bg-white text-[#303B4A] border-[4px] border-[#364D6D]`}
        >
          {bidingChance.name}
        </div>
      </div>

      <div
        className={`w-full ${
          isBidClicked
            ? "scale-[.85] transition delay-500"
            : "transition delay-500"
        }`}
      >
        {/* <button
          className={`${concertOne.className} shadow-md shadow-[#757575] text-3xl rounded-2xl px-[20px] py-2 bg-white text-[#303B4A] border-[5px] border-[#364D6D]`}
          onClick={() => submitData("skip")}
        >
          SKIP
        </button> */}
        <button
          className={`${concertOne.className} ${
            !isLoggedIn && "hidden"
          } shadow-md shadow-[#757575] text-3xl rounded-2xl px-[20px] py-2 bg-white text-[#303B4A] border-[5px] border-[#364D6D]`}
          onClick={() => submitData("unsold")}
        >
          {isBidClicked ? <ImSpinner3 className="animate-pulse" /> : "BID"}
        </button>
      </div>

      <div className="">
        <input
          className={`${concertOne.className} ${
            !isLoggedIn && "hidden"
          } w-[150px] shadow-md shadow-[#757575] text-3xl rounded-2xl px-[15px] text-center py-2 bg-white text-[#303B4A] border-[5px] border-[#364D6D]`}
          value={bidingAmt}
          onChange={bidingAmount}
        />
      </div>

      <div
        className={`bg-white rounded-full ${!isLoggedIn && "hidden"} ${
          isSoldClicked
            ? "scale-[.85] transition delay-500"
            : " transition delay-500"
        } flex justify-center items-center border-[5px] border-[#364D6D] h-[100px] w-[200px] shadow-md shadow-[#757575]`}
      >
        <button
          onClick={() => submitData("sold")}
          className={`text-[#303B4A] ${concertOne.className} flex justify-center items-center size-full text-3xl`}
        >
          {isSoldClicked ? <ImSpinner3 className="animate-pulse" /> : "SOLD"}
        </button>
      </div>
      <div
        className={`absolute top-[200px] right-[740px] z-50 w-[200px] ${
          isSoldClicked ? "block" : "hidden"
        }`}
      >
        <PlayersSoldAnimation bidingAmt={bidingAmt} />
      </div>
    </div>
  );
}
