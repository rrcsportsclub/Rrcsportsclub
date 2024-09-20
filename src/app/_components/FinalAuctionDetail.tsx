"use client";

import Image from "next/image";
import questionMark from "../../../public/question.jpeg";

import { useDispatch, useSelector } from "react-redux";
import { setCaptainsList } from "../GlobalRedux/features/captainsSlice";
import axios from "axios";
import { RootState } from "../GlobalRedux/store";
import { Concert_One } from "next/font/google";

const concertOne = Concert_One({
  subsets: ["latin"],
  weight: "400",
});

export default function FinalAuctionDetail() {
  const captainsList = useSelector(
    (state: RootState) => state.captains.captainsList
  );

  const dispatch = useDispatch();

  const initCaptains = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/listofCaptain");

      dispatch(setCaptainsList(res.data));
    } catch (error) {
      console.error(error, "Captains not found");
    }
  };

  return (
    <div className="flex flex-col gap-1 p-8">
      {captainsList.map((captain) => (
        <div key={captain.srNo} className="flex items-center gap-6">
          <div
            key={captain.srNo}
            className={`w-[150PX] h-[180px]  bg-[#364D6D] `}
          >
            <Image
              src={captain.image}
              width={150}
              height={129}
              className="w-full h-[129px]"
              alt={captain.name}
            />
            <div
              className={`flex flex-col justify-between text-[16px] ${concertOne.className}`}
            >
              <p>{captain.name}</p>
              <p>Bal: {captain.totalAmt}</p>
            </div>
          </div>

          <div key={captain.srNo} className={`w-full`}>
            <div className="relative bg-[#364D6D] border-[5px] my-[38px] border-white rounded-[50px] w-fit flex gap-5 pt-6 pb-2 px-6">
              <div className="flex justify-center items-center gap-2 text-[#364D6D] py-[2px] font-semibold text-base absolute bg-white rounded-xl top-[-14px] left-10 px-2">
                <p>{captain.teamName}</p>
                <p
                  className={`rounded-full size-[20px] border border-[#364D6D]`}
                  style={{
                    backgroundColor: `${captain.teamColor}`,
                  }}
                ></p>
              </div>
              {captain.players.map((player, index) => (
                <>
                  <div key={index}>
                    <Image
                      src={
                        player?.image === "#N/A" ? questionMark : player.image
                        // player.image
                      }
                      // src={player?.image || questionMark}
                      width={100}
                      height={100}
                      className="rounded-full size-[100px] shadow-md shadow-[#767676]"
                      alt={player.name}
                    />
                    <p className="text-sm mt-2">
                      {player?.bid === "#REF!" || "#N/A" ? "" : player.bid}
                      {/* {player.bid} */}
                    </p>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
