import type { Metadata } from "next";
import { Signika } from 'next/font/google';
import TopNavBar from "@/components/TopNavBar";
import './globals.css';
import '@/styles/main.scss';

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
