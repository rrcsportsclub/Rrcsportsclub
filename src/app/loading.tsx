import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading() {
  return (
    <div className="w-screen h-screen  flex items-center justify-center">
      <span className="text-4xl">
        <AiOutlineLoading3Quarters className="animate-spin" />
      </span>
    </div>
  );
}
