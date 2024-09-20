// "use client";

import questionMark from "../../../public/question.jpeg";
import Image from "next/image";
import { Concert_One } from "next/font/google";
import { AiFillCaretUp } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState } from "../GlobalRedux/store";

const concertOne = Concert_One({
  subsets: ["latin"],
  weight: "400",
});

export default function Captains() {
  // const [selectedCaptainId, setSelectedCaptainId] = useState<number | null>(
  //   null
  // );

  const captainsList = useSelector(
    (state: RootState) => state.captains.captainsList
  );
  const bidingChance = useSelector(
    (state: RootState) => state.captains.bidingChance
  );
  // const bidingRoundData = useSelector(
  //   (state: RootState) => state.biding.bidingRoundData
  // );
  // const latestBidingAct = bidingRoundData[bidingRoundData.length - 1];

  // console.log(latestBidingAct);

  // const listOfCaptainName = captainsList.map((captain) => captain.name);
  // const activeCaptainIndex = listOfCaptainName.indexOf(
  //   latestBidingAct?.captain
  // );

  // console.log(listOfCaptainName);
  // console.log(activeCaptainIndex);

  // console.log(captainsList);
  // console.log(bidingChance);

  // function handleClick(id: number) {
  //   if (selectedCaptainId === id) {
  //     setSelectedCaptainId(null);
  //   } else setSelectedCaptainId(id);
  // }

  return (
    <div>
      <div className="flex gap-2">
        {captainsList.map((captain) => (
          <div
            key={captain.srNo}
            className={`${
              bidingChance.srNo === captain.srNo ? "blinking-shadow" : ""
            }  w-[150PX] h-[180px] hover:border-[2.5px] hover:border-white bg-[#364D6D] hover:shadow-md hover:shadow-[#FFFFFF]`}
            // onClick={() => handleClick(captain.srNo)}
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
              {bidingChance.srNo === captain.srNo && (
                <div className="mx-[35px]">
                  <AiFillCaretUp size={60} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {captainsList.map((captain, i) => (
        <div
          key={captain.srNo}
          className={`w-full`}
          style={{
            marginLeft: `${34 * i}px`,
          }}
        >
          {bidingChance.srNo === captain.srNo && (
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
                      }
                      // src={player?.image || questionMark}
                      width={100}
                      height={100}
                      className="rounded-full size-[100px] shadow-md shadow-[#767676]"
                      alt={player.name}
                    />
                    <p className="text-sm mt-2">
                      {player?.bid === "#REF!" || "#N/A" ? "" : player.bid}
                    </p>
                  </div>
                </>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
