import type { Metadata } from "next";
import TopNavBar from "@/components/TopNavBar";
import { Signika } from 'next/font/google';
import { Bebas_Neue, Manrope } from "next/font/google";
import bg from '/public/bg.png';

const bebasNeue = Bebas_Neue({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
  variable: "--bebas-neue",
});

const manrope = Manrope({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
  variable: "--manrope",
});

const signika = Signika({
  weight: '400',
  subsets: ['latin'],
})
export const metadata: Metadata = {
  title: "Swift Resume",
  description: "ATS Friendly Resume Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{ backgroundColor: '#F7F9F2'}}
        className={signika.className}
      >
        <TopNavBar />
        {children}
      </body>
    </html>
  );
}
