import "./globals.css";
import { Bricolage_Grotesque } from "next/font/google";
import AppShell from "@/components/layout/AppShell";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

export const metadata = {
  title: "Living Faith Church New Jerusalem",
  description: "This initiative aims to strengthen the church's digital presence and expand its outreach.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bricolage.className} h-full antialiased`}>
      <body className="min-h-screen">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
