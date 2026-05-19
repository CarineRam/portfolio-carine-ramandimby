import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";

const interSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/*const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});*/

export const metadata: Metadata = {
  title: "Ramandimby Carine | Portfolio",
  description: "This is the portfolio of Carine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-garet antialiased`}
      >
        {/*<LoadingScreen/>
        <CustomCursor/>*/}
        {children}
        <BackToTop/>
      </body>
    </html>
  );
}
