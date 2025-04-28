import rightImg from "@/images/hero-right1.png";
import React, { FC } from "react";
import SectionFounder from "./SectionFounder";
import SectionStatistic from "./SectionStatistic";
import BgGlassmorphism from "@/components/BgGlassmorphism/BgGlassmorphism";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import SectionHero from "./SectionHero";
import SectionClientSay from "@/components/SectionClientSay/SectionClientSay";
import SectionPromo3 from "@/components/SectionPromo3";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | WorldReader - Your Digital Reading Companion",
  description:
    "Discover WorldReader's journey in revolutionizing digital reading. Learn about our mission to make knowledge accessible worldwide, our dedicated team, and our commitment to transforming education through technology.",
  keywords: [
    "WorldReader",
    "digital reading",
    "online library",
    "ebook platform",
    "digital literacy",
    "education technology",
  ],
  openGraph: {
    title: "About WorldReader - Your Digital Reading Companion",
    description:
      "Discover WorldReader's journey in revolutionizing digital reading. Learn about our mission to make knowledge accessible worldwide.",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "About WorldReader - Digital Reading Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About WorldReader - Digital Reading Platform",
    description:
      "Discover how WorldReader is transforming education through digital reading technology.",
    images: ["/twitter-image.jpg"],
  },
  alternates: {
    canonical: "/about",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const PageAbout = ({}) => {
  return (
    <div className={`nc-PageAbout overflow-hidden relative`}>
      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />

      <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
        <SectionHero
          rightImg={rightImg}
          heading="👋 About Us."
          btnText=""
          subHeading="We're impartial and independent, and every day we create distinctive, world-class programmes and content which inform, educate and entertain millions of people in the around the world."
        />

        <SectionFounder />
        <div className="relative py-16">
          <BackgroundSection />
          <SectionClientSay />
        </div>

        <SectionStatistic />

        <SectionPromo3 />
      </div>
    </div>
  );
};

export default PageAbout;
