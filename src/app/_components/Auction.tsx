"use client";

import { useDispatch, useSelector } from "react-redux";
import BidingActivity from "./BidingActivity";
import Captains from "./Captains";
import Players from "./Players";
import { RootState } from "../GlobalRedux/store";
import { Concert_One } from "next/font/google";
import FinalAuctionDetail from "./FinalAuctionDetail";
import axios from "axios";
import {
  setCurrentBidingPlayer,
  setMovement,
  setPlayersList,
} from "../GlobalRedux/features/playersSlice";
import { useEffect, useState } from "react";
import {
  setBidingChance,
  setCaptainsList,
} from "../GlobalRedux/features/captainsSlice";
import { setBidingRoundData } from "../GlobalRedux/features/bidingSlice";

const concertOne = Concert_One({
  subsets: ["latin"],
  weight: "400",
});

interface Player {
  srNo: number;
  basePrice: number;
  imageUrl: string;
  name: string;
  speciality: string;
  usp: string;
}

export default function Auction() {
  const [bidingAmt, setBidingAmt] = useState(0);
  const [isBidClicked, setBidIsClicked] = useState(false);
  const [isSoldClicked, setIsSoldClicked] = useState(false);

  const playersList = useSelector(
    (state: RootState) => state.players.playersList
  );
  const captainsList = useSelector(
    (state: RootState) => state.captains.captainsList
  );
  const currentBidingPlayer = useSelector(
    (state: RootState) => state.players.currentBidingPlayer
  );
  const bidingChance = useSelector(
    (state: RootState) => state.captains.bidingChance
  );
  const bidingRoundData = useSelector(
    (state: RootState) => state.biding.bidingRoundData
  );

  const movement = useSelector((state: RootState) => state.players.movement);

  const dispatch = useDispatch();

  const initPlayers = async () => {
    try {
      await axios.get("/api/listofplayers").then((res) => {
        const filtredRes = res.data?.filter(
          (obj: any) => Object.keys(obj).length !== 0
        );
        // .slice(0, 5);

        dispatch(setPlayersList(filtredRes));

        if (
          bidingRoundData.length > 0 &&
          bidingRoundData[bidingRoundData.length - 1].status === "unsold"
        ) {
          const bidingPlayer = filtredRes.filter(
            (player: Player) =>
              player.name === bidingRoundData[bidingRoundData.length - 1].player
          );

          dispatch(setCurrentBidingPlayer(bidingPlayer[0]));
        } else {
          const randomIndex = Math.floor(Math.random() * filtredRes.length);
          dispatch(setCurrentBidingPlayer(filtredRes[randomIndex]));
        }
      });
    } catch (error) {
      console.error(error, "Players not found");
    }
  };

  const initCaptains = async () => {
    try {
      const res = await axios.get("/api/listofCaptain");

      dispatch(setCaptainsList(res.data));
      // const abc = latestBidingAct ? activeCaptainIndex + 1 : 0;
      // dispatch(setBidingChance(res.data[abc]));
    } catch (error) {
      console.error(error, "Captains not found");
    }
  };

  function bidingAmount(e: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value);
    setBidingAmt(value);
  }

  // const dispatch = useDispatch();

  const submitData = async (value: string) => {
    const latestBidingAct = bidingRoundData[bidingRoundData.length - 1];
    // console.log(latestBidingAct);
    const serialNoValue = Number(latestBidingAct?.round.slice(1, 2)) + 1;
    const srNo = latestBidingAct ? "R" + serialNoValue : "R1";
    const basePrice = latestBidingAct
      ? latestBidingAct.status === "sold"
        ? currentBidingPlayer.basePrice
        : latestBidingAct.totalamt
      : currentBidingPlayer.basePrice;

    const totalamt = Number(bidingAmt) + Number(basePrice);

    const bidingData = {
      newData: [
        srNo,
        bidingChance.name,
        currentBidingPlayer.name,
        basePrice,
        bidingAmt,
        totalamt,
        value,
      ],
    };
    try {
      await axios
        .post("/api/biddingactivity", bidingData)
        .then(() => {
          value === "sold" ? setIsSoldClicked(true) : setBidIsClicked(true);
          if (value === "sold") {
            setTimeout(() => {
              setIsSoldClicked(false);
            }, 5000);
          } else {
            setTimeout(() => {
              setBidIsClicked(false);
            }, 5000);
          }
        })
        .then(() => {
          if (value === "sold") {
            setTimeout(() => {
              bidingActivity();
            }, 5000);
          } else {
            bidingActivity();
          }
        })
        .then(() => {
          setTimeout(() => {
            if (value === "sold") {
              initPlayers().then(() => {
                // const randomIndex = Math.floor(
                //   Math.random() * playersList.length
                // );
                // dispatch(setCurrentBidingPlayer(playersList[randomIndex]));
                dispatch(setMovement(!movement));
              });
              // .then(() => dispatch(setBidingChance(captainsList[0]))); // check if its correct
            }
          }, 5000);
        });
    } catch (error) {
      console.error(error, "error submiting data");
    }
  };

  const bidingActivity = async () => {
    try {
      await axios.get("/api/biddingactivity").then((data: any) => {
        const firstvalueofslice = data.data.length - captainsList?.length;
        const latestCaptainData = data.data.slice(
          firstvalueofslice < 0 ? 0 : firstvalueofslice,
          data.data.length
        );
        dispatch(setBidingRoundData(latestCaptainData));
        setBidingAmt(0);
        if (latestCaptainData.length > 0) {
          const listOfCaptainName = captainsList.map((captain) => captain.name);
          const activeCaptainIndex = listOfCaptainName.indexOf(
            latestCaptainData[latestCaptainData.length - 1]?.captain
          );
          dispatch(
            setBidingChance(
              captainsList[
                activeCaptainIndex === listOfCaptainName.length - 1
                  ? 0
                  : activeCaptainIndex + 1
              ]
            )
          );
        } else {
          dispatch(setBidingChance(captainsList[0]));
        }
      });
    } catch (error) {
      console.error(error, "Error in biding activity");
    }
  };

  useEffect(() => {
    initPlayers().then(() => {
      if (bidingRoundData[bidingRoundData.length - 1]?.status === "sold")
        dispatch(setMovement(!movement));
    });
  }, [bidingRoundData]);

  useEffect(() => {
    initCaptains();
  }, []);

  useEffect(() => {
    if (captainsList.length > 0) {
      bidingActivity();
    }
  }, [captainsList]);

  //   console.log(playersList);
  return (
    <div className="flex gap-6">
      <div
        className={`w-[992px] ${
          playersList.length === 0 ? "" : "h-[880px]"
        }  bg-[#303B4A] rounded-3xl p-3 shadow-md shadow-[#66686B]`}
      >
        {playersList.length === 0 ? (
          <div>
            <FinalAuctionDetail />
          </div>
        ) : (
          <>
            <div>
              <h1 className={`${concertOne.className} text-xl`}>PLAYERS</h1>
              <Players />
            </div>
            <div>
              <h1 className={`${concertOne.className} text-xl my-3`}>
                CAPTAINS
              </h1>
              <Captains />
            </div>
          </>
        )}
      </div>

      {playersList.length > 0 && (
        <div className=" w-[300px] h-[880px] bg-[#303B4A] rounded-3xl shadow-md shadow-[#66686B]">
          <BidingActivity
            isBidClicked={isBidClicked}
            isSoldClicked={isSoldClicked}
            bidingAmt={bidingAmt}
            submitData={submitData}
            bidingAmount={bidingAmount}
          />
        </div>
      )}
    </div>
  );
}
