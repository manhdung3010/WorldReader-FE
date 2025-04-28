import React from "react";
import SectionAds from "./SectionAds";
import SectionMagazine5 from "./SectionMagazine5";
import SectionLatestPosts from "./SectionLatestPosts";
import BgGlassmorphism from "@/components/BgGlassmorphism/BgGlassmorphism";
import SectionPromo3 from "@/components/SectionPromo3";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | WorldReader - Latest Reading Insights & News",
  description:
    "Stay updated with the latest articles, reading tips, book reviews, and literary insights from WorldReader. Explore our blog for expert recommendations and reading community updates.",
  keywords: [
    "WorldReader blog",
    "reading insights",
    "book reviews",
    "reading tips",
    "literary news",
    "digital reading",
  ],
  openGraph: {
    title: "WorldReader Blog - Latest Reading Insights & News",
    description:
      "Stay updated with the latest articles, reading tips, book reviews, and literary insights from WorldReader.",
    type: "website",
    images: [
      {
        url: "/images/aboutUs.png",
        width: 1200,
        height: 630,
        alt: "WorldReader Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WorldReader Blog - Reading Insights & News",
    description:
      "Explore expert recommendations and reading community updates.",
    images: ["/images/aboutUs.png"],
  },
  alternates: {
    canonical: "/blog",
  },
};

// DEMO DATA

const BlogPage: React.FC = () => {
  return (
    <div className="nc-BlogPage overflow-hidden relative">
      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />
      {/* ======== ALL SECTIONS ======== */}
      <div className="container relative">
        {/* === SECTION 1 === */}
        <div className="pt-12 pb-16 lg:pb-28">
          <SectionMagazine5 />
        </div>

        {/* === SECTION 1 === */}
        <SectionAds />

        {/* === SECTION 8 === */}
        <SectionLatestPosts className="py-16 lg:py-28" />

        {/* === SECTION 1 === */}
        <SectionPromo3 className="pb-16 lg:pb-28" />
      </div>
    </div>
  );
};

export default BlogPage;
