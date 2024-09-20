import Image from "next/image";
import cricketbg from "../../public/cricketbg.svg";
import cricket from "../../public/cricket.svg";
import volleyball from "../../public/volleyboll.svg";
import football from "../../public/football.svg";
import batminton from "../../public/batminton.svg";
import line from "../../public/Vector 1.svg";
import volleyballTournament from "../../public/volleyTournament.svg";
import { Cutive_Mono } from "next/font/google";
import { TiTick } from "react-icons/ti";
import ImageSlider from "./_components/ImageSlider";

const cutiveMono = Cutive_Mono({
  subsets: ["latin"],
  weight: "400",
});

export default function Page() {
  return (
    <main className="">
      <div className="relative">
        <div className="">
          <Image src={cricketbg} className="w-full" alt="cricket" />
        </div>
        <div className="flex gap-[20px] sm:gap-[70px] justify-around px-[30px] sm:px-[85px] top-[140px] sm:top-[510px] absolute w-full">
          <div className="w-[236px] h-[387px]">
            <Image
              src={cricket}
              className="rounded-lg hover:shadow-2xl shadow-black"
              alt="cricket"
            />
          </div>
          <div className="w-[236px] h-[387px]">
            <Image
              src={volleyball}
              className="rounded-lg hover:shadow-2xl shadow-black"
              alt="volleyball"
            />
          </div>
          <div className="w-[236px] h-[387px]">
            <Image
              src={football}
              className="rounded-lg hover:shadow-2xl shadow-black"
              alt="football"
            />
          </div>
          <div className="w-[236px] h-[387px]">
            <Image
              src={batminton}
              className="rounded-lg hover:shadow-2xl shadow-black"
              alt="badminton"
            />
          </div>
        </div>
      </div>

      <div className="bg-[#FDDBA2] h-[100px] sm:h-[335px]"></div>

      <div>
        <Image src={line} className="w-full" alt="zig zag line" />
      </div>

      <div className="flex justify-around py-2">
        <p className="bg-[#FDDBA2] font-semibold text-[20px] px-4 sm:text-[40px] text-[#364D6D] text-center bordered-text shadowed-text -rotate-[8deg] rounded-[10px] border-[5px] border-[#EACD75] drop-shadow-lg shadow-[#D5DADF] sm:w-[397px]">
          UPCOMING
        </p>
        <p className="bg-[#FDDBA2] font-semibold text-[20px] px-4 sm:text-[40px] text-[#364D6D] text-center bordered-text shadowed-text -rotate-[8deg] rounded-[10px] border-[5px] border-[#EACD75] drop-shadow-lg shadow-[#D5DADF] sm:w-[322px]">
          EVENTS
        </p>
      </div>

      <div className="relative px-[45px] sm:px-[210px] py-[30px] sm:py-[210px]">
        <div className="bg-[#FDDBA2] border-[5px] border-[#EACD75] sm:pr-[350px] px-[15px] py-[20px] sm:py-[54px] sm:p-[54px] rounded-[10px] w-[300px] sm:w-[787px] flex flex-col gap-[10px] drop-shadow-xl">
          <p className={`${cutiveMono.className} text-md sm:text-xl`}>
            26 July 2024
          </p>
          <p className=" text-lg sm:text-2xl">Volleyball Tournament 2024</p>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur. Velit a felis maecenas nunc
            egestas pretium tincidunt pharetra sit.
          </p>
          <ul className="text-xs sm:text-sm">
            <li className="flex gap-1">
              <TiTick />
              Volleyball Tournament 2024
            </li>
            <li className="flex gap-1">
              <TiTick />
              Volleyball Tournament 2024
            </li>
            <li className="flex gap-1">
              <TiTick />
              Volleyball Tournament 2024
            </li>
          </ul>
          <div className="flex gap-4">
            <button
              className={`${cutiveMono.className} bg-[#E3E3E3] border border-[#767676] text-sm p-1 px-2 rounded-lg`}
            >
              BOOK NOW
            </button>
            <button
              className={`${cutiveMono.className} bg-[#E3E3E3] border border-[#767676] text-sm p-1 px-2 rounded-lg`}
            >
              READ MORE
            </button>
          </div>
        </div>
        <div className="hidden sm:block absolute right-[100px] sm:right-[200px] 2xl:right-[300px] z-50 top-20">
          <Image src={volleyballTournament} alt="playing games" />
        </div>
      </div>

      <div className="bg-[#FDDBA2] py-[70px] flex flex-col items-center">
        <ImageSlider />
        <button className="w-[200px] sm:w-[474px] bg-black text-white rounded-md my-6 text-xl p-2">
          Gallery
        </button>
      </div>

      <div className="">
        <Image src={line} className="w-full" alt="zig zag line" />
      </div>
    </main>
  );
}
