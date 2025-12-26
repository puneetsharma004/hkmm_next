import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./common/Header";
import Footer from "./common/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Hare Krishna Marwar Mandir Jodhpur",
  description: "Official Website of Hare Krishna Marwar Mandir Jodhpur",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
