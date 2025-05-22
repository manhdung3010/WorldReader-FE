"use client";

import React, { FC, useEffect, useId, useRef, useState } from "react";
import Heading from "@/components/Heading/Heading";
// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm";
import { Product, PRODUCTS } from "@/data/data";
import { useQuery } from "@tanstack/react-query";
import { getProductRecommend } from "@/services/ai.service";
import BookCard from "@/components/BookCard";

export interface SectionSliderProductCardProps {
  className?: string;
  productId?: string;
  itemClassName?: string;
  heading?: string;
  headingFontClassName?: string;
  headingClassName?: string;
  subHeading?: string;
  data?: Product[];
}

const SectionSliderProductCard: FC<SectionSliderProductCardProps> = ({
  className = "",
  productId,
  itemClassName = "",
  headingFontClassName,
  headingClassName,
  heading,
  subHeading = "REY backpacks & bags",
  data = PRODUCTS.filter((_, i) => i < 8 && i > 2),
}) => {
  const sliderRef = useRef(null);
  const [isSliderMounted, setIsSliderMounted] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const {
    data: productRecommend,
    isLoading,
    isError,
  } = useQuery(
    ["PRODUCTS_RECOMMEND", productId],
    () =>
      getProductRecommend({
        product_id: productId,
        k: 10,
      }),
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      enabled: !!productId,
    }
  );

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
    slider?.mount();
    setIsSliderMounted(true);
    setIsShow(true);

    return () => {
      slider.destroy();
      setIsSliderMounted(false);
      setIsShow(false);
    };
  }, [sliderRef, productRecommend]);

  // Display data from API or fallback
  const displayData = productRecommend?.data?.recommendations || [];
  const showEmptyState = !isLoading && (isError || displayData.length === 0);

  return (
    <div className={`nc-SectionSliderProductCard ${className}`}>
      <div
        ref={sliderRef}
        className={`flow-root ${isShow ? "opacity-100" : "opacity-0"}`}
      >
        <Heading
          className={headingClassName}
          fontClass={headingFontClassName}
          rightDescText={subHeading}
          hasNextPrev
        >
          {heading || `New Arrivals`}
        </Heading>

        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {isLoading ? (
              // Loading state
              Array.from({ length: 4 }).map((_, index) => (
                <li key={index} className={`glide__slide ${itemClassName}`}>
                  <div className="animate-pulse">
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700"></div>
                    <div className="mt-4 space-y-3">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>
                  </div>
                </li>
              ))
            ) : isError ? (
              // Error state
              <li className={`glide__slide ${itemClassName} col-span-full`}>
                <div className="flex flex-col items-center justify-center py-12">
                  <svg
                    className="w-16 h-16 text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <p className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">
                    Something went wrong
                  </p>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Failed to load recommendations
                  </p>
                </div>
              </li>
            ) : !productRecommend?.data?.recommendations?.length ? (
              // Empty state
              <li
                className={`glide__slide ${itemClassName} w-full col-span-full flex justify-center items-center`}
              >
                <div className="flex flex-col items-center justify-center py-12 w-full max-w-3xl mx-auto">
                  <svg
                    className="w-16 h-16 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">
                    No recommendations available
                  </p>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Check back later for personalized recommendations
                  </p>
                </div>
              </li>
            ) : (
              // Success state - show recommendations
              displayData.map((item: any, index: number) => (
                <li
                  key={`item-${index}-${item.id}`}
                  className={`glide__slide ${itemClassName}`}
                >
                  <BookCard data={item} />
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SectionSliderProductCard;
