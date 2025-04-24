"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import Heading from "@/components/Heading/Heading";
// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm";
import { Product, PRODUCTS } from "@/data/data";
import BookCard from "@/components/BookCard";
import {
  getProductByExpert,
  getProductFlashSale,
} from "@/services/product.service";
import { useQuery } from "@tanstack/react-query";

interface FlashSaleProduct extends Product {
  flashSale?: {
    flashSalePrice: number;
    flashSaleEndTime: string;
    flashSaleDiscount: number;
    flashSaleStartTime: string;
  };
}

export interface SectionSliderProductCardProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  headingFontClassName?: string;
  headingClassName?: string;
  subHeading?: string;
  data?: Product[];
  endTime?: Date;
}

// Component đồng hồ đếm ngược
const CountdownTimer: FC<{ endTime: Date }> = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +endTime - +new Date();
      let timeLeft = {
        hours: 0,
        minutes: 0,
        seconds: 0,
      };

      if (difference > 0) {
        timeLeft = {
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return timeLeft;
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-1">
        <div className="bg-red-600 text-white rounded-md px-2 py-1 text-sm font-bold">
          {timeLeft.hours.toString().padStart(2, "0")}
        </div>
        <span className="text-red-600 font-bold">:</span>
        <div className="bg-red-600 text-white rounded-md px-2 py-1 text-sm font-bold">
          {timeLeft.minutes.toString().padStart(2, "0")}
        </div>
        <span className="text-red-600 font-bold">:</span>
        <div className="bg-red-600 text-white rounded-md px-2 py-1 text-sm font-bold">
          {timeLeft.seconds.toString().padStart(2, "0")}
        </div>
      </div>
    </div>
  );
};

// Component Loading Skeleton cho BookCard
const BookCardSkeleton: FC = () => {
  return (
    <div className="relative flex flex-col bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
      <div className="absolute top-3 left-3 z-10">
        <div className="flex items-center px-2 py-1 bg-red-500 text-white rounded-full">
          <div className="h-3 bg-white/50 rounded w-12"></div>
        </div>
      </div>
      <div className="aspect-w-3 aspect-h-4 bg-gray-200 h-60"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        <div className="flex items-center space-x-2">
          <div className="h-5 bg-red-200 rounded w-1/3"></div>
          <div className="h-5 bg-gray-200 rounded w-1/4 line-through"></div>
        </div>
        <div className="flex space-x-2 mt-3">
          <div className="h-8 bg-red-200 rounded w-1/2"></div>
          <div className="h-8 bg-gray-200 rounded w-8"></div>
        </div>
      </div>
    </div>
  );
};

// Component Flash Sale Badge
const FlashSaleBadge: FC<{ discount: string }> = ({ discount }) => {
  return (
    <div className="absolute top-3 left-3 z-10">
      <div className="flex items-center px-2 py-1 bg-red-600 text-white rounded-full text-xs font-bold">
        -{discount}
      </div>
    </div>
  );
};

const FlashSale: FC<SectionSliderProductCardProps> = ({
  className = "",
  itemClassName = "",
  headingFontClassName,
  headingClassName,
  heading = "Flash Sale",
  subHeading = "Amazing Deals - Hot Prices Every Day",
  data = PRODUCTS.filter((_, i) => i < 8 && i > 2),
  endTime = new Date(new Date().setHours(24, 0, 0, 0)),
}) => {
  const sliderRef = useRef(null);
  const [isShow, setIsShow] = useState(false);

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<{ data: FlashSaleProduct[] }>(
    ["PRODUCTS_FLASH_SALE"],
    () => getProductFlashSale(),
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    if (isLoading || !products || !sliderRef.current) return;

    const OPTIONS: Partial<Glide.Options> = {
      perView: 4,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          perView: 4 - 1,
        },
        1024: {
          gap: 20,
          perView: 4 - 1,
        },
        768: {
          gap: 20,
          perView: 4 - 2,
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
    setIsShow(true);

    return () => {
      slider.destroy();
    };
  }, [sliderRef, products, isLoading]);

  // Xử lý hiển thị BookCard với badge giảm giá
  const renderBookCard = (item: FlashSaleProduct, index: number) => {
    const discount = item.flashSale?.flashSaleDiscount || 0;
    const flashSalePrice = item.flashSale?.flashSalePrice || item.price;
    const originalPrice = item.price;

    return (
      <li key={index} className={`glide__slide ${itemClassName}`}>
        <div className="relative">
          {discount > 0 && <FlashSaleBadge discount={`${discount}%`} />}
          <BookCard
            data={{
              ...item,
              price: flashSalePrice,
              oldPrice: originalPrice,
            }}
            key={index}
          />
        </div>
      </li>
    );
  };

  // Xử lý trạng thái lỗi
  if (isError) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500">
          An error occurred while loading data. Please try again later.
        </p>
      </div>
    );
  }

  // Render phần header của Flash Sale
  const renderHeader = () => {
    return (
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div className="flex-1">
          <h2 className={`text-3xl font-bold ${headingFontClassName || ""}`}>
            <span className="text-red-600">{heading}</span>
            <span className="animate-pulse inline-block ml-2">🔥</span>
          </h2>
          <p className="text-gray-500 mt-1">{subHeading}</p>
        </div>
        <div className="flex flex-col items-start sm:items-end mt-3 sm:mt-0">
          <p className="text-gray-600 font-medium mb-1">Ends in:</p>
          <CountdownTimer endTime={endTime} />
        </div>
      </div>
    );
  };

  // Hiển thị skeleton loading khi đang tải dữ liệu
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div key={`skeleton-${index}`} className={`${itemClassName}`}>
                <BookCardSkeleton />
              </div>
            ))}
        </div>
      );
    }

    return (
      <div ref={sliderRef} className={`flow-root ${isShow ? "" : "invisible"}`}>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {products?.data.map((item, index) => renderBookCard(item, index))}
          </ul>
        </div>

        {/* Thêm nút điều hướng slider */}
        <div className="mt-8 flex justify-center items-center">
          <div data-glide-el="controls" className="flex space-x-2">
            <button
              data-glide-dir="<"
              className="bg-white shadow-md rounded-full w-9 h-9 flex items-center justify-center border border-gray-200 hover:border-red-300 focus:outline-none"
              aria-label="Prev"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              data-glide-dir=">"
              className="bg-white shadow-md rounded-full w-9 h-9 flex items-center justify-center border border-gray-200 hover:border-red-300 focus:outline-none"
              aria-label="Next"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-SectionSliderProductCard ${className}`}>
      <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 sm:p-8 rounded-2xl">
        {renderHeader()}
        {renderContent()}
      </div>
    </div>
  );
};

export default FlashSale;
