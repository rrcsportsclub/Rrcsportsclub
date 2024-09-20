import Auction from "../_components/Auction";

export const metadata = {
  title: "Auction",
};

export default function Page() {
  return (
    <div className="flex flex-col items-center bg-black py-[200px] px-[30px] min-w-[1400px] text-white text-center">
      {/* <h1
        className={`${concertOne.className} mb-6 w-fit text-3xl rounded-[20px] bg-white text-[#303B4A] border-[5px] border-[#364D6D] px-[35px] py-[15px]`}
      >
        AUCTION
      </h1> */}

      <Auction />
    </div>
  );
}
