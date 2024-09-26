// "use client";

import Image from "next/image";
import { Concert_One } from "next/font/google";
// import { FiRefreshCcw } from "react-icons/fi";
// import { RiStarSFill } from "react-icons/ri";
// import { useEffect, useState } from "react";

import type { RootState } from "../GlobalRedux/store";
import { useSelector } from "react-redux";

const concertOne = Concert_One({
  subsets: ["latin"],
  weight: "400",
});

// interface Player {
//   srNo: number;
//   basePrice: number;
//   imageUrl: string;
//   name: string;
//   speciality: string;
//   usp: string;
// }

export default function Players() {
  const playersList = useSelector(
    (state: RootState) => state.players.playersList
  );
  const currentBidingPlayer = useSelector(
    (state: RootState) => state.players.currentBidingPlayer
  );
  const bidingRoundData = useSelector(
    (state: RootState) => state.biding.bidingRoundData
  );

  const movement = useSelector((state: RootState) => state.players.movement);

  return (
    <div className="h-[390px] py-[55px]">
      <div className="relative">
        <p
          className={`absolute ${concertOne.className} z-50 left-[150px] top-[100px] w-fit text-3xl rounded-2xl px-[15px] py-2 bg-white text-[#303B4A] border-[5px] border-[#364D6D]`}
        >
          BID
        </p>
        <p
          className={`absolute ${concertOne.className} z-50 right-[150px] top-[100px] w-fit text-3xl rounded-2xl px-[15px] py-2 bg-white text-[#303B4A] border-[5px] border-[#364D6D]`}
        >
          {bidingRoundData.length > 0
            ? bidingRoundData[bidingRoundData.length - 1].status === "sold"
              ? currentBidingPlayer?.basePrice
              : bidingRoundData[bidingRoundData.length - 1].totalamt
            : currentBidingPlayer.basePrice}
        </p>

        {playersList && (
          <div
            className={`${concertOne.className} absolute left-[39%] z-50 flex flex-col items-center w-[210px] h-[300px] bg-[#364D6D]`}
            style={{
              transition: "transform 0.5s ease",
              transform: `perspective(1000px) translateZ(200px) ${
                movement ? "rotatey(360deg)" : ""
              } `,
            }}
          >
            <Image
              src={currentBidingPlayer?.imageUrl}
              width={210}
              height={210}
              className="w-[210px] h-[210px]"
              alt={currentBidingPlayer?.name}
            />

            <p>
              {currentBidingPlayer?.name} - {currentBidingPlayer?.basePrice}
            </p>

            <p>Position: {currentBidingPlayer?.speciality}</p>
            <p>USP: {currentBidingPlayer?.usp}</p>
          </div>
        )}

        <div
          className={`${concertOne.className} absolute left-[24%] z-40 blur-[2px] flex flex-col items-center gap-1 w-[210px] h-[300px] bg-[#364D6D]`}
          style={{
            transition: "transform 0.5s ease",
            transform: `perspective(1000px) translateZ(100px) 
            ${movement ? "translatex(260px)" : ""}`,
          }}
        >
          <Image
            src={playersList[1]?.imageUrl}
            width={210}
            height={210}
            className="w-[210px] h-[210px]"
            alt={playersList[1]?.name}
          />

          <p>
            {playersList[1]?.name} - {playersList[1]?.basePrice}
          </p>

          <p>Position: {playersList[1]?.speciality}</p>
          <p>USP: {playersList[1]?.usp}</p>
        </div>

        <div
          className={`${concertOne.className} absolute left-[54%] z-40 blur-[2px] flex flex-col items-center gap-1 w-[210px] h-[300px] bg-[#364D6D]`}
          style={{
            transition: "transform 0.5s ease",
            transform: `perspective(1000px) translateZ(100px) 
            ${movement ? "translatex(-260px)" : ""}`,
          }}
        >
          <Image
            src={playersList[2]?.imageUrl}
            width={210}
            height={210}
            className="w-[210px] h-[210px]"
            alt={playersList[2]?.name}
          />

          <p>
            {playersList[2]?.name} - {playersList[2]?.basePrice}
          </p>

          <p>Position: {playersList[2]?.speciality}</p>
          <p>USP: {playersList[2]?.usp}</p>
        </div>

        <div
          className={`${concertOne.className} absolute left-[9%] blur-[3px] flex flex-col items-center gap-1 w-[210px] h-[300px] bg-[#364D6D]`}
          style={{
            transition: "transform 0.5s ease",
            transform: `perspective(1000px) translateZ(5px) ${
              movement ? "translatex(580px)" : ""
            }`,
          }}
        >
          <Image
            src={playersList[3]?.imageUrl}
            width={210}
            height={210}
            className="w-[210px] h-[210px]"
            alt={playersList[3]?.name}
          />

          <p>
            {playersList[3]?.name} - {playersList[3]?.basePrice}
          </p>

          <p>Position: {playersList[3]?.speciality}</p>
          <p>USP: {playersList[3]?.usp}</p>
        </div>

        <div
          className={`${concertOne.className} absolute left-[69%] blur-[3px] flex flex-col items-center gap-1 w-[210px] h-[300px] bg-[#364D6D]`}
          style={{
            transition: "transform 0.5s ease",
            transform: `perspective(1000px) translateZ(5px) ${
              movement ? "translatex(-580px)" : ""
            }`,
          }}
        >
          <Image
            src={playersList[4]?.imageUrl}
            width={210}
            height={210}
            className="w-[210px] h-[210px]"
            alt={playersList[4]?.name}
          />

          <p>
            {playersList[4]?.name} - {playersList[4]?.basePrice}
          </p>

          <p>Position: {playersList[4]?.speciality}</p>
          <p>USP: {playersList[4]?.usp}</p>
        </div>
        {/* <div className="absolute top-[320px] right-[100px] bg-white rounded-full shadow-md p-1 size-[24px] shadow-[#E3E3E3]">
          <button className={`text-[#303B4A]`} onClick={() => toogleRotate()}>
            <FiRefreshCcw style={{ stroke: "black", strokeWidth: "4px" }} />
          </button>
        </div> */}
      </div>
    </div>
  );
}
