"use client";
import React, { FC, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import LikeButton from "@/components/LikeButton";
import { StarIcon } from "@heroicons/react/24/solid";
import BagIcon from "@/components/BagIcon";
import NcInputNumber from "@/components/NcInputNumber";
import { PRODUCTS } from "@/data/data";
import {
  NoSymbolIcon,
  ClockIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import IconDiscount from "@/components/IconDiscount";
import Prices from "@/components/Prices";
import toast from "react-hot-toast";
import detail1JPG from "@/images/products/detail1.jpg";
import detail2JPG from "@/images/products/detail2.jpg";
import detail3JPG from "@/images/products/detail3.jpg";
import NotifyAddTocart from "./NotifyAddTocart";
import AccordionInfo from "@/components/AccordionInfo";
import Image from "next/image";
import Link from "next/link";
import Discount from "./Discount";
import { formatPrice } from "@/utils/price";
import { useCart } from "@/contexts/CartContext";

export interface ProductQuickViewProps {
  className?: string;
  data: any;
}

const ProductQuickView: FC<ProductQuickViewProps> = ({
  className = "",
  data,
}) => {
  const [qualitySelected, setQualitySelected] = useState(1);
  const { addToCart } = useCart();

  const notifyAddTocart = () => {
    addToCart({ ...data, quantity: qualitySelected });

    toast.custom(
      (t) => (
        <NotifyAddTocart
          data={data}
          qualitySelected={qualitySelected}
          show={t.visible}
        />
      ),
      { position: "top-right", id: "nc-product-notify", duration: 3000 }
    );
  };

  const renderSectionContent = () => {
    return (
      <div className="space-y-8">
        {/* ---------- 1 HEADING ----------  */}
        <div>
          <h2 className="text-2xl font-semibold hover:text-primary-6000 transition-colors">
            <Link href="/product-detail">{data?.name}</Link>
          </h2>

          <div className="flex justify-start rtl:justify-end items-center mt-5 space-x-4 sm:space-x-5 rtl:space-x-reverse">
            <div>
              <div className="flex gap-2 items-center">
                <p className="text-green-500">
                  {formatPrice(
                    data?.price * (1 - Number(data?.perDiscount) / 100)
                  )}
                </p>
                <Discount per={data?.perDiscount} />
              </div>
              {data?.perDiscount !== 0 && (
                <div style={{ textDecoration: "line-through", color: "gray" }}>
                  {formatPrice(data?.price)}
                </div>
              )}
            </div>

            <div className="h-6 border-s border-slate-300 dark:border-slate-700"></div>

            <div className="flex items-center">
              <Link
                href={`/product/${data?.url}` as any}
                className="flex items-center text-sm font-medium"
              >
                <StarIcon className="w-5 h-5 pb-[1px] text-yellow-400" />
                <div className="ms-1.5 flex">
                  <span> {data?.averageStarRating || 0}</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/*  ---------- 4  QTY AND ADD TO CART BUTTON */}
        <div className="flex space-x-3.5 rtl:space-x-reverse">
          <div className="flex items-center justify-center bg-slate-100/70 dark:bg-slate-800/70 px-2 py-3 sm:p-3.5 rounded-full">
            <NcInputNumber
              defaultValue={qualitySelected}
              onChange={setQualitySelected}
            />
          </div>
          <ButtonPrimary
            className="flex-1 flex-shrink-0"
            onClick={notifyAddTocart}
          >
            <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
            <span className="ms-3">Add to cart</span>
          </ButtonPrimary>
        </div>

        {/*  */}
        <hr className=" border-slate-200 dark:border-slate-700"></hr>
        {/*  */}

        {/* ---------- 5 ----------  */}
        <AccordionInfo
          data={[
            {
              name: "Description",
              content: data?.description,
            },
            {
              name: "Information",
              content:
                data?.information?.length > 0
                  ? `<ul class="list-disc list-inside leading-7">
                      ${data.information
                        .map(
                          (item: any) =>
                            `<li>${item.name}: ${item.content}</li>`
                        )
                        .join("")}
                    </ul>`
                  : "No information available",
            },
          ]}
        />
      </div>
    );
  };

  return (
    <div className={`nc-ProductQuickView ${className}`}>
      {/* MAIn */}
      <div className="lg:flex">
        {/* CONTENT */}
        <div className="w-full lg:w-[50%] ">
          {/* HEADING */}
          <div className="relative">
            <div className="aspect-w-16 aspect-h-16">
              <Image
                src={data?.avatar}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="w-full rounded-xl object-cover"
                alt="product detail 1"
              />
            </div>

            {/* META FAVORITES */}
            <LikeButton data={data} className="absolute end-3 top-3 " />
          </div>
          {data?.image?.length > 0 && (
            <div className="hidden lg:grid grid-cols-2 gap-3 mt-3 sm:gap-6 sm:mt-6 xl:gap-5 xl:mt-5">
              {[data.image[0], data.image[1]].map((item, index) => {
                if (!item) return null; // Tránh render phần tử rỗng
                return (
                  <div key={index} className="aspect-w-3 aspect-h-4">
                    <Image
                      fill
                      src={item}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="w-full rounded-xl object-cover"
                      alt={`product detail ${index + 1}`}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* SIDEBAR */}
        <div className="w-full lg:w-[50%] pt-6 lg:pt-0 lg:ps-7 xl:ps-8">
          {renderSectionContent()}
        </div>
      </div>
    </div>
  );
};

export default ProductQuickView;
