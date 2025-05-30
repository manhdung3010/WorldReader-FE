"use client";

import React, { FC, useEffect, useRef, useState, useMemo } from "react";
import Heading from "@/components/Heading/Heading";
// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm";
import CollectionCard from "./CollectionCard";
import CollectionCard2 from "./CollectionCard2";
import Link from "next/link";
import { getProductByExpert } from "@/services/product.service";
import { useQuery } from "@tanstack/react-query";

export interface SectionSliderLargeProductProps {
  className?: string;
  itemClassName?: string;
  cardStyle?: "style1" | "style2";
}

const SectionSliderLargeProduct: FC<SectionSliderLargeProductProps> = ({
  className = "",
  cardStyle = "style2",
}) => {
  const {
    data: productsResponse,
    isLoading,
    isError,
  } = useQuery<any>(["PRODUCTS_BY_EXPERT"], () => getProductByExpert(5), {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  // Extract products from the response
  const products = useMemo(
    () => productsResponse?.data || [],
    [productsResponse?.data]
  );

  const sliderRef = useRef(null);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const OPTIONS: Partial<Glide.Options> = {
      perView: 3,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          gap: 28,
          perView: 2.5,
        },
        1024: {
          gap: 20,
          perView: 2.15,
        },
        768: {
          gap: 20,
          perView: 1.5,
        },
        500: {
          gap: 20,
          perView: 1,
        },
      },
    };
    if (!sliderRef.current) return;

    let slider = new Glide(sliderRef.current, OPTIONS);
    slider.mount();
    setIsShow(true);
    return () => {
      slider.destroy();
    };
  }, [sliderRef, products]); // Added products to dependency array to reinitialize slider when products load

  const MyCollectionCard =
    cardStyle === "style1" ? CollectionCard : CollectionCard2;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-80">
        Loading products...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-80">
        Error loading products. Please try again later.
      </div>
    );
  }

  return (
    <div className={`nc-SectionSliderLargeProduct ${className}`}>
      <div ref={sliderRef} className={`flow-root ${isShow ? "" : "invisible"}`}>
        <Heading isCenter={false} hasNextPrev>
          Chosen by our experts
        </Heading>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {products.map((product: any) => {
              const now = new Date().toISOString();
              const flashStart = product.flashSale?.flashSaleStartTime;
              const flashEnd = product.flashSale?.flashSaleEndTime;
              const flashDiscount = product.flashSale?.flashSaleDiscount || 0;

              const isOnSale =
                flashStart &&
                flashEnd &&
                now >= flashStart &&
                now <= flashEnd &&
                flashDiscount > 0;

              const effectivePrice = isOnSale
                ? product.price - (product.price * flashDiscount) / 100
                : product.price;

              return (
                <li className={`glide__slide`} key={product.id}>
                  <MyCollectionCard
                    name={product.name}
                    price={effectivePrice}
                    imgs={
                      product.avatar
                        ? [product.avatar, ...(product.image || [])]
                        : []
                    }
                    averageStarRating={product.averageStarRating}
                    url={product.url}
                  />
                </li>
              );
            })}

            <li className={`glide__slide`}>
              <Link href={"/search"} className="block relative group">
                <div className="relative rounded-2xl overflow-hidden h-[410px]">
                  <div className="h-[410px] bg-black/5 dark:bg-neutral-800"></div>
                  <div className="absolute inset-y-6 inset-x-10 flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center relative">
                      <span className="text-xl font-semibold">More items</span>
                      <svg
                        className="absolute left-full w-5 h-5 ml-2 rotate-45 group-hover:scale-110 transition-transform"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.0701 9.57L12.0001 3.5L5.93005 9.57"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 20.4999V3.66992"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-sm mt-1">Show me more</span>
                  </div>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SectionSliderLargeProduct;
