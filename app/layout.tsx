import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/website/Navbar";
import Footer from "@/components/website/Footer";
import Quick from "@/components/website/Quick";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
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
