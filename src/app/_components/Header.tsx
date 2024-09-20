"use client";

import Image from "next/image";
import logo from "../../../public/logo.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <nav
      className={`flex gap-4 sm:gap-8 justify-center py-4 sm:py-6 z-50 ${
        pathname === "/auction" ? "text-white min-w-[1300px]" : "text-black"
      }`}
    >
      <Link href={"/"}>
        <h1
          className={`text-sm sm:text-xl hover:underline hover:underline-offset-4`}
        >
          Home
        </h1>
      </Link>
      <Link href={"/auction"}>
        <h1
          className={`text-sm sm:text-xl hover:underline hover:underline-offset-4`}
        >
          Auction
        </h1>
      </Link>
      <Image
        src={logo}
        quality={100}
        height={173}
        width={180}
        alt="RRC club logo"
        className="w-[70px] h-[70px] sm:w-auto sm:h-auto"
      />
      <Link href={"/uploadDetails"}>
        <h1
          className={`text-sm sm:text-xl hover:underline hover:underline-offset-4`}
        >
          Upload Details
        </h1>
      </Link>
      <h1
        className={`text-sm sm:text-xl hover:underline hover:underline-offset-4`}
      >
        Gallery
      </h1>
    </nav>
  );
}
