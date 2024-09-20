"use client";
import Image from "next/image";
import image1 from "../../../public/sliderImage/Image (1).svg";
import image2 from "../../../public/sliderImage/Image (2).svg";
import image3 from "../../../public/sliderImage/Image (3).svg";
import image4 from "../../../public/sliderImage/Image (4).svg";
import image5 from "../../../public/sliderImage/Image (5).svg";
import image6 from "../../../public/sliderImage/Image (6).svg";
import { useEffect, useState } from "react";

const sliderImage = [image1, image2, image3, image4, image5, image6];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImage.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex w-[90%] 2xl:w-[80%] mx-auto overflow-hidden">
      <div
        className="flex transition-transform duration-500 w-full h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {sliderImage.map((src, index) => (
          <Image
            src={src}
            alt="games"
            className="border-[10px] border-black w-full h-full"
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
