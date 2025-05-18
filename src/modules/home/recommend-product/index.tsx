"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import Heading from "@/components/Heading/Heading";
// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm";

import { Product } from "@/data/data";
import { useLike } from "@/contexts/LikeContext";
import { useQuery } from "@tanstack/react-query";
import { getRecommendFavorites } from "@/services/ai.service";
import BookCard from "@/components/BookCard";
import { useViewHistory } from "@/contexts/ViewHistoryContext";

export interface SectionSliderProductCardProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  headingFontClassName?: string;
  headingClassName?: string;
  subHeading?: string;
  fallbackData?: Product[];
}

const RecommendProduct: FC<SectionSliderProductCardProps> = ({
  className = "",
  itemClassName = "",
  headingFontClassName,
  headingClassName,
  heading = "Recommended For You",
  subHeading = "Based on your favorites",
  fallbackData = [],
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const { likedProducts } = useLike();
  const { viewedProducts } = useViewHistory();
  const [isSliderMounted, setIsSliderMounted] = useState(false);

  // Combine IDs from liked products and viewed products
  const favoriteIds = likedProducts.map((product) => product.id);
  const viewedIds = viewedProducts.map((product) => product.id);
  const combinedIds = Array.from(new Set([...favoriteIds, ...viewedIds])); // Remove duplicates

  const {
    data: productRecommendations,
    isLoading,
    isError,
  } = useQuery(
    ["PRODUCTS_RECOMMEND_FAVORITE", combinedIds],
    () =>
      getRecommendFavorites({
        favorite_ids: combinedIds.length > 0 ? combinedIds : [],
        k: 10,
      }),
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  // Initialize and destroy slider
  useEffect(() => {
    if (!sliderRef.current) return;

    const OPTIONS: Partial<Glide.Options> = {
      perView: 4,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          perView: 3,
        },
        1024: {
          gap: 20,
          perView: 3,
        },
        768: {
          gap: 20,
          perView: 2,
        },
        640: {
          gap: 20,
          perView: 1.5,
        },
        500: {
          gap: 20,
          perView: 1.3,
        },
      },
    };

    let slider = new Glide(sliderRef.current, OPTIONS);
    slider.mount();
    setIsSliderMounted(true);

    return () => {
      slider.destroy();
      setIsSliderMounted(false);
    };
  }, [sliderRef, productRecommendations]);

  // Display data from API or fallback
  const displayData =
    productRecommendations?.data?.recommendations || fallbackData;
  const showEmptyState = !isLoading && (isError || displayData.length === 0);

  return (
    <div className={`nc-SectionSliderProductCard ${className}`}>
      <div
        ref={sliderRef}
        className={`flow-root ${isSliderMounted ? "" : "opacity-0"}`}
      >
        <Heading
          className={headingClassName}
          fontClass={headingFontClassName}
          rightDescText={subHeading}
          hasNextPrev={!showEmptyState}
        >
          {heading}
        </Heading>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {isLoading
              ? // Loading skeletons
                Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <li
                      key={`skeleton-${index}`}
                      className={`glide__slide ${itemClassName}`}
                    >
                      <div className="h-full w-full animate-pulse bg-gray-200 rounded-lg p-4">
                        <div className="h-40 bg-gray-300 rounded-md mb-3"></div>
                        <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                      </div>
                    </li>
                  ))
              : // Display recommendations
                displayData.map((item: any, index: number) => (
                  <li
                    key={`item-${index}-${item.id}`}
                    className={`glide__slide ${itemClassName}`}
                  >
                    <BookCard data={item} />
                  </li>
                ))}
          </ul>
        </div>
        {showEmptyState && (
          <div className="flex justify-center items-center p-8">
            <div className="flex flex-col items-center justify-center space-y-3">
              <svg
                className="w-16 h-16 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                ></path>
              </svg>
              <h3 className="text-lg font-medium text-gray-900">
                No recommendations yet
              </h3>
              <p className="text-gray-500">
                Try liking some items to get personalized recommendations
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendProduct;
