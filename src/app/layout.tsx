import type { Metadata } from "next";
import { Cutive } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { Providers } from "./GlobalRedux/provider";

const cutive = Cutive({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  // title: "RRC Sports Club",
  title: {
    template: "%s / RRC Sports Club",
    default: "RRC Sports Club",
  },
  description: "Sports Club",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cutive.className} flex flex-col relative max-w-screen-2xl`}
      >
        <Providers>
          <Header />
          <div className="flex-1 absolute">
            <main>{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
