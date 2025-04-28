import React from "react";
import SectionHowItWork from "@/components/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import SectionPromo1 from "@/components/SectionPromo1";
import SectionHero2 from "@/components/SectionHero/SectionHero2";
import SectionSliderLargeProduct from "@/components/SectionSliderLargeProduct";
import SectionSliderProductCard from "@/components/SectionSliderProductCard";
import SectionPromo2 from "@/components/SectionPromo2";
import SectionSliderCategories from "@/components/SectionSliderCategories/SectionSliderCategories";
import SectionPromo3 from "@/components/SectionPromo3";
import SectionClientSay from "@/components/SectionClientSay/SectionClientSay";
import Heading from "@/components/Heading/Heading";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import SectionGridFeatureItems from "@/components/SectionGridFeatureItems";
import FlashSale from "@/modules/home/flash-sale";
import DiscoverMoreSlider from "@/modules/home/discover-slider";
import SectionGridMoreExplore from "@/modules/home/exploring";
import RecommendProduct from "@/modules/home/recommend-product";
import ProductHomeList from "@/modules/home/product-list";
import Link from "next/link";
import SectionMagazine5 from "@/modules/blog/list/SectionMagazine5";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WorldReader - Your Digital Reading Companion",
  description:
    "Discover thousands of books, news articles, and educational content in one place. WorldReader offers a vast digital library for readers of all interests.",
  openGraph: {
    title: "WorldReader - Your Digital Reading Companion",
    description:
      "Discover thousands of books, news articles, and educational content in one place. WorldReader offers a vast digital library for readers of all interests.",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WorldReader Homepage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WorldReader - Your Digital Reading Companion",
    description:
      "Discover thousands of books, news articles, and educational content in one place.",
    images: ["/twitter-image.jpg"],
  },
  alternates: {
    canonical: "/",
  },
};

function PageHome() {
  return (
    <div className="nc-PageHome relative overflow-hidden">
      <SectionHero2 />

      <div className="mt-24 lg:mt-32">
        <DiscoverMoreSlider />
      </div>

      <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
        <FlashSale />

        <div className="py-24 lg:py-32 border-t border-b border-slate-200 dark:border-slate-700">
          <SectionHowItWork />
        </div>
        <SectionPromo1 />

        <div className="relative py-24 lg:py-32">
          <BackgroundSection />
          <SectionGridMoreExplore />
        </div>

        <RecommendProduct
          heading="Recommended For You"
          subHeading="Based on your favorites"
        />

        <SectionPromo2 />

        <SectionSliderLargeProduct cardStyle="style2" />

        <SectionPromo3 />

        <ProductHomeList />

        <div className="relative py-24 lg:py-32">
          <BackgroundSection />
          <div>
            <Heading rightDescText="From the World Reader blog">
              The latest news
            </Heading>
            <SectionMagazine5 />
            <div className="flex mt-16 justify-center">
              <Link href={"/news"}>
                <ButtonSecondary>Show all blog articles</ButtonSecondary>
              </Link>
            </div>
          </div>
        </div>
        <SectionClientSay />
      </div>
    </div>
  );
}

export default PageHome;
