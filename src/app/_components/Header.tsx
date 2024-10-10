"use client";

import Image from "next/image";
import logo from "../../../public/logo.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { VscAccount } from "react-icons/vsc";

export default function Header() {
  const pathname = usePathname();

  return (
    <nav
      className={`flex pl-[65px] w-full gap-4 sm:gap-8 justify-center py-4 sm:py-6 z-50 ${
        pathname === "/auction" ? "text-white min-w-[1300px]" : "text-black"
      }`}
    >
      <div className="text-xl">
        <Link href={"/login"}>
          <VscAccount />
        </Link>
      </div>
      <h1 className={`text-sm sm:text-xl `}>
        <Link href={"/"} className="hover:underline hover:underline-offset-4">
          Home
        </Link>
      </h1>
      <h1 className={`text-sm sm:text-xl `}>
        <Link
          href={"/auction"}
          className="hover:underline hover:underline-offset-4"
        >
          Auction
        </Link>
      </h1>

      <Image
        src={logo}
        quality={100}
        height={173}
        width={180}
        alt="RRC club logo"
        className="w-[70px] h-[70px] sm:w-auto sm:h-auto"
      />
      <h1 className={`text-sm sm:text-xl `}>
        <Link
          href={"/uploadDetails"}
          className="hover:underline hover:underline-offset-4"
        >
          Upload Details
        </Link>
      </h1>
      <h1 className={`text-sm sm:text-xl `}>
        <Link
          href={"/gallery"}
          className="hover:underline hover:underline-offset-4"
        >
          Gallery
        </Link>
      </h1>
    </nav>
  );
}
