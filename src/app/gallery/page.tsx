import Gallery from "../_components/Gallery";

export const metadata = {
  title: "Gallery",
};
export default function Page() {
  return (
    <div className="px-[40px] sm:px-[100px] py-[110px] sm:py-[220px] w-screen">
      <div className="flex gap-1 text-sm mb-4">
        <p className="text-gray-600">Gallery</p>
        <p className="text-blue-500">/ Photos</p>
      </div>
      <p className="font-bold text-xl mb-3">Photos</p>
      <div className="">
        <Gallery />
      </div>
    </div>
  );
}
