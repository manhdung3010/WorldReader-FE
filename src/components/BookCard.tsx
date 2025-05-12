"use client";

import React, { FC, useState } from "react";
import LikeButton from "./LikeButton";
import Prices from "./Prices";
import { StarIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import { Transition } from "@/app/headlessui";
import ModalQuickView from "./ModalQuickView";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import NcImage from "@/shared/NcImage/NcImage";
import Discount from "./Discount";
import { formatPrice } from "@/utils/price";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import BagIcon from "./BagIcon";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/contexts/CartContext";
import BookFalse from "@/images/book-false.jpg";

export interface ProductCardProps {
  className?: string;
  data?: any;
}

const BookCard: FC<ProductCardProps> = ({ className = "", data }) => {
  const [variantActive, setVariantActive] = useState(0);
  const [showModalQuickView, setShowModalQuickView] = useState(false);
  const router = useRouter();
  const { addToCart } = useCart();

  const notifyAddTocart = () => {
    addToCart(data);
    toast.custom(
      (t) => (
        <Transition
          appear
          show={t.visible}
          className="p-4 max-w-md w-full bg-white dark:bg-slate-800 shadow-lg rounded-2xl pointer-events-auto ring-1 ring-black/5 dark:ring-white/10 text-slate-900 dark:text-slate-200"
          enter="transition-all duration-150"
          enterFrom="opacity-0 translate-x-20"
          enterTo="opacity-100 translate-x-0"
          leave="transition-all duration-150"
          leaveFrom="opacity-100 translate-x-0"
          leaveTo="opacity-0 translate-x-20"
        >
          <p className="block text-base font-semibold leading-none">
            Added to cart!
          </p>
          <div className="border-t border-slate-200 dark:border-slate-700 my-4" />
          {renderProductCartOnNotify()}
        </Transition>
      ),
      {
        position: "top-right",
        id: String(data?.id) || "product-detail",
        duration: 3000,
      }
    );
  };

  const renderGroupButtons: any = () => {
    return (
      <div className="absolute bottom-0 group-hover:bottom-4 inset-x-1 flex justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        <ButtonPrimary
          className="shadow-lg"
          fontSize="text-xs"
          sizeClass="py-2 px-4"
          onClick={() => notifyAddTocart()}
        >
          <BagIcon className="w-3.5 h-3.5 mb-0.5" />
          <span className="ms-1">Add to bag</span>
        </ButtonPrimary>
        <ButtonSecondary
          className="ms-1.5 bg-white hover:!bg-gray-100 hover:text-slate-900 transition-colors shadow-lg"
          fontSize="text-xs"
          sizeClass="py-2 px-4"
          onClick={() => setShowModalQuickView(true)}
        >
          <ArrowsPointingOutIcon className="w-3.5 h-3.5" />
          <span className="ms-1">Quick view</span>
        </ButtonSecondary>
      </div>
    );
  };

  const renderProductCartOnNotify = () => {
    return (
      <div className="flex ">
        <div className="h-24 w-20 relative flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <Image
            width={80}
            height={96}
            src={data?.avatar || BookFalse}
            alt={data?.name || "Product"}
            className="absolute object-cover object-center  overflow-hidden "
          />
        </div>

        <div className="ms-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-base font-medium ">{data?.name}</h3>
              </div>
              <Prices
                price={data?.price * (1 - Number(data?.perDiscount) / 100)}
                className="mt-0.5"
              />
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500 dark:text-slate-400">Qty 1</p>

            <div className="flex">
              <button
                type="button"
                className="font-medium text-primary-6000 dark:text-primary-500 "
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/cart");
                }}
              >
                View cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPrice = () => {
    const nowUTC = new Date(new Date().toISOString()); // ép current time thành UTC

    const start = data?.flashSale?.flashSaleStartTime
      ? new Date(data.flashSale.flashSaleStartTime)
      : null;
    const end = data?.flashSale?.flashSaleEndTime
      ? new Date(data.flashSale.flashSaleEndTime)
      : null;

    const isFlashSale = start && end && nowUTC >= start && nowUTC <= end;

    if (isFlashSale) {
      const flashPrice =
        data.price * (1 - data.flashSale.flashSaleDiscount / 100);
      return (
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <p className="text-red-500 font-semibold">
              {formatPrice(flashPrice)}
            </p>
            <span className="text-xs text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
              Flash Sale
            </span>
          </div>
          <p className="line-through text-gray-500">
            {formatPrice(data.price)}
          </p>
        </div>
      );
    }

    if (data.perDiscount > 0) {
      const discountPrice = data.price * (1 - data.perDiscount / 100);
      return (
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <p className="text-green-600 font-semibold">
              {formatPrice(discountPrice)}
            </p>
            <Discount per={data.perDiscount} />
          </div>
          <p className="line-through text-gray-500">
            {formatPrice(data.price)}
          </p>
        </div>
      );
    }

    return (
      <p className="font-semibold text-neutral-800">
        {formatPrice(data.price)}
      </p>
    );
  };

  return (
    <>
      <div
        className={`nc-ProductCard relative flex flex-col bg-transparent  ${className}`}
      >
        <Link href={`/books/${data?.url}`} className="absolute inset-0"></Link>

        <div className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group">
          <Link href={`/books/${data?.url}`} className="block">
            <NcImage
              containerClassName="flex aspect-w-11 aspect-h-15 w-full h-0"
              src={data?.avatar || BookFalse}
              className="object-cover w-full h-full drop-shadow-xl"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
              alt="product"
            />
          </Link>
          {/* <ProductStatus status={status} /> */}
          <LikeButton data={data} className="absolute top-3 end-3 z-10" />
          {renderGroupButtons()}
        </div>

        <div className="space-y-4 px-2.5 pt-5 pb-2.5 flex-1 flex flex-col justify-between">
          {/* {renderVariants()} */}
          <div>
            <h2 className="nc-ProductCard__title text-base font-semibold transition-colors line-clamp-2">
              {data?.name}
            </h2>
          </div>

          <div className="flex justify-between items-end ">
            {renderPrice()}
            <div className="flex items-center mb-0.5">
              <StarIcon className="w-5 h-5 pb-[1px] text-amber-400" />
              <span className="text-sm ms-1 text-slate-500 dark:text-slate-400">
                {data?.averageStarRating || 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* QUICKVIEW */}
      <ModalQuickView
        show={showModalQuickView}
        onCloseModalQuickView={() => setShowModalQuickView(false)}
        data={data}
      />
    </>
  );
};

export default BookCard;
