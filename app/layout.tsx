import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/website/Navbar";
import Footer from "@/components/website/Footer";
import Quick from "@/components/website/Quick";
import { Bricolage_Grotesque } from "next/font/google";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

export const metadata: Metadata = {
  title: "Living Faith Church New Jerusalem",
  description: "This initiative aims to strengthen the church's digital presence and expand its outreach.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.className} h-full antialiased`}
    >
      <body className=" flex flex-col">
        <Navbar />
        {children}

        <Quick/>
        <Footer />
        </body>
    </html>
  );
}
