import { Josefin_Sans } from "next/font/google";
import UploadPlayers from "../_components/UploadPlayers";
import UploadCaptains from "../_components/UploadCaptains";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: "400",
});

export default function page() {
  return (
    <div
      className={`${josefinSans.className} min-w-[1300px] relative py-[200px] w-screen flex flex-col items-center justify-center`}
    >
      <div
        className={`absolute top-0 h-[280px] sm:h-[340px] bg-[#767070] w-full text-center `}
      >
        <h1 className="font-semibold text-2xl mt-[100px] sm:mt-[200px]">
          UPLOAD DETAILS
        </h1>
      </div>

      <div className="bg-white flex flex-col gap-6 xl:flex-row justify-evenly items-center w-full sm:mt-14 px-[25px] sm:px-[80px]">
        <UploadPlayers />
        <UploadCaptains />
      </div>
    </div>
  );
}
