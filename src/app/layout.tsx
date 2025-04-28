import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import Footer from "@/shared/Footer/Footer";
import SiteHeader from "@/app/SiteHeader";
import CommonClient from "./CommonClient";
import Providers from "./providers";
import ChatBot from "@/components/ChatBot/ChatBot";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "WorldReader - Your Digital Reading Companion",
    template: "%s | WorldReader",
  },
  description:
    "WorldReader - Your Digital Reading Companion. Access thousands of books, news articles, and educational content in one place.",
  keywords: [
    "WorldReader",
    "digital library",
    "ebooks",
    "online reading",
    "digital books",
    "news articles",
  ],
  authors: [{ name: "WorldReader Team" }],
  creator: "WorldReader",
  publisher: "WorldReader",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://worldreader.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://worldreader.com",
    siteName: "WorldReader",
    title: "WorldReader - Your Digital Reading Companion",
    description:
      "Access thousands of books, news articles, and educational content in one place.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WorldReader",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WorldReader - Your Digital Reading Companion",
    description:
      "Access thousands of books, news articles, and educational content in one place.",
    images: ["/twitter-image.jpg"],
    creator: "@worldreader",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
  },
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <html lang="en" dir="" className={inter.className}>
      <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <Providers>
          <SiteHeader />
          {children}
          <CommonClient />
          <ChatBot />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
