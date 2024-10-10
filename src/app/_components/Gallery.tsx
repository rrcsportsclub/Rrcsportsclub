"use client";

import Image from "next/image";
import cricketbg from "../../../public/cricketbg.svg";
import cricket from "../../../public/cricket.svg";
import volleyball from "../../../public/volleyboll.svg";
import football from "../../../public/football.svg";
import batminton from "../../../public/batminton.svg";
import volleyballTournament from "../../../public/volleyTournament.svg";
import viratKohli from "../../../public/players/virat_kohli1.jpg";
import rishabPant from "../../../public/players/Rishabh Pant.jpg";
import dhoni from "../../../public/players/MS dhoni.jpg";
import rohitSharma from "../../../public/players/Rohit Sharma.jpg";
import ShubhamGill from "../../../public/players/Shubham Gill.jpg";
import sureshRaina from "../../../public/players/suresh Raina.jpg";
import { useState } from "react";

const photos = [
  { url: cricketbg, id: 1, name: "cricketbg" },
  { url: cricket, id: 2, name: "cricket" },
  { url: volleyball, id: 3, name: "volleyball" },
  { url: football, id: 4, name: "football" },
  { url: batminton, id: 5, name: "batminton" },
  { url: volleyballTournament, id: 6, name: "volleyballTournament" },
  { url: viratKohli, id: 7, name: "viratKohli" },
  { url: rishabPant, id: 8, name: "rishabPant" },
  { url: dhoni, id: 9, name: "dhoni" },
  { url: rohitSharma, id: 10, name: "rohit Sharma" },
  { url: ShubhamGill, id: 11, name: "Shubham" },
  { url: sureshRaina, id: 12, name: "Suresh Raina" },
  { url: cricketbg, id: 13, name: "cricketbg" },
  { url: cricket, id: 14, name: "cricket" },
  { url: volleyball, id: 15, name: "volleyball" },
  { url: football, id: 16, name: "football" },
  { url: batminton, id: 17, name: "batminton" },
  { url: volleyballTournament, id: 18, name: "volleyballTournament" },
  { url: viratKohli, id: 19, name: "Virat Kohli" },
  { url: rishabPant, id: 20, name: "Rishab Pant" },
  { url: dhoni, id: 21, name: "Dhoni" },
  { url: rohitSharma, id: 22, name: "Rohit Sharma" },
  { url: ShubhamGill, id: 23, name: "Shubham Gill" },
  { url: sureshRaina, id: 24, name: "Suresh Raina" },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (url: string) => {
    setSelectedImage(url);
  };
  const handleClose = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 shadow-xl p-4 rounded-xl">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className={`relative w-[200px] h-[200px]
            ${
              photos.length > 4 &&
              index === photos.length - photos.length + 1 &&
              "col-span-2 "
            }
            ${
              photos.length > 4 &&
              index === Math.floor(photos.length / 3 + 8) &&
              "row-span-2"
            }
            ${
              photos.length > 4 &&
              index === Math.floor(photos.length / 4) &&
              "row-span-2"
            }
            ${
              photos.length > 4 &&
              index === Math.floor(photos.length / 2 + 5) &&
              "col-span-2 "
            }
            ${
              photos.length > 4
                ? index === Math.floor(photos.length / 2 - 1) &&
                  "col-span-2 row-span-2"
                : ""
            }
            
            `}
            style={{
              width: "100%",
              height:
                photos.length > 4
                  ? index === Math.floor(photos.length / 3 + 8)
                    ? "400px"
                    : index === Math.floor(photos.length / 4)
                    ? "400px"
                    : index === Math.floor(photos.length / 2 - 1)
                    ? "400px"
                    : "200px"
                  : "200px",
              //   height:
              //     index === 4
              //       ? "400px"
              //       : index === 9
              //       ? "400px"
              //       : index === 3
              //       ? "400px"
              //       : "200px",
            }}
            onClick={() => handleImageClick(photo.url)}
          >
            <Image
              src={photo.url}
              layout="fill"
              //   width={200}
              //   height={200}
              className={`object-cover`}
              alt={photo.name}
              priority={index < 5}
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-80 z-50 "
          onClick={handleClose}
        >
          <div className="relative">
            <Image
              src={selectedImage}
              width={360}
              height={360}
              className="object-contain"
              alt="Selected Image"
            />
            {/* <button
              className="absolute top-2 right-2 text-white text-3xl"
              onClick={handleClose}
            >
              &times;
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
}

// ${index === 3 && "row-span-2"}
//             ${index === 4 && "row-span-2"}
//             ${index === 19 && "col-span-2 "}
//             ${index === 9 && "col-span-2 row-span-2"}
