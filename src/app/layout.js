import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Announcements from "./components/common/AnnouncementBar";
import IntroLoader from "./components/common/IntroLoader";
import WhatsAppButton from "./components/common/Whatsapp";
import SmoothScrolling from "./components/common/SmoothScrolling";
import { Toaster } from "react-hot-toast";
import Script from "next/script"
import StructuredData from "./components/common/StructuredData";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata = {
//   title: "Hare Krishna Marwar Mandir Jodhpur",
//   description: "Official Website of Hare Krishna Marwar Mandir Jodhpur",
// };

const BASE_URL = "https://harekrishnamarwar.org"; // ← change to your actual domain

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Hare Krishna Marwar Mandir Jodhpur | Hare Krishna Temple",
    template: "%s | Hare Krishna Marwar Mandir Jodhpur",
  },
  description:
    "Hare Krishna Marwar Mandir is a Hare Krishna temple in Jodhpur, Rajasthan offering daily darshan, aartis, prasadam distribution, Bhagavad Gita classes, and spiritual programs.",
  keywords: [
    "Hare Krishna temple Jodhpur",
    "Hare Krishna Marwar Mandir",
    "ISKCON Jodhpur",
    "Krishna temple Rajasthan",
    "Bhagavad Gita classes Jodhpur",
    "prasadam distribution Jodhpur",
    "spiritual programs Jodhpur",
    "Ram Navami Jodhpur",
    "temple darshan Jodhpur",
  ],
  authors: [{ name: "Hare Krishna Marwar Mandir", url: BASE_URL }],
  creator: "Hare Krishna Marwar Mandir",
  publisher: "Hare Krishna Marwar Mandir",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Hare Krishna Marwar Mandir Jodhpur",
    title: "Hare Krishna Marwar Mandir Jodhpur | Hare Krishna Temple",
    description:
      "Experience divine darshan, aarti, and spiritual programs at Hare Krishna Marwar Mandir — the Hare Krishna temple in Jodhpur, Rajasthan.",
    images: [
      {
        url: "/og-image.jpg", // add a 1200×630 image to /public/
        width: 1200,
        height: 630,
        alt: "Hare Krishna Marwar Mandir Jodhpur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hare Krishna Marwar Mandir Jodhpur | Hare Krishna Temple",
    description:
      "Experience divine darshan, aarti, and spiritual programs at Hare Krishna Marwar Mandir, Jodhpur.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: BASE_URL,
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StructuredData />
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" />

        <SmoothScrolling>
          <Toaster
            position="top-center"
            reverseOrder={false}
          />
          <IntroLoader />
          <Announcements />
          <Header />
          {children}
          <WhatsAppButton />
          <Footer />
        </SmoothScrolling>

      </body>
    </html>
  );
}
