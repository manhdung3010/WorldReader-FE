import { _getImgRd, _getTagNameRd } from "@/contains/fakeData";
import React, { FC } from "react";
import NcImage from "@/shared/NcImage/NcImage";
import Link from "next/link";
import { StaticImageData } from "next/image";

export interface CardCategory1Props {
  className?: string;
  size?: "large" | "normal";
  featuredImage?: string | StaticImageData;
  name?: string;
  desc?: string;
  category?: any;
  width?: number;
  height?: number;
}

const CardCategory1: FC<CardCategory1Props> = ({
  className = "",
  size = "normal",
  name = "",
  desc = "",
  featuredImage = "",
  category,
  width,
  height,
}) => {
  return (
    <Link
      href={`/news/category/${category?.url}` as any}
      className={`nc-CardCategory1 flex items-center ${className}`}
    >
      <NcImage
        alt=""
        containerClassName={`flex-shrink-0 relative ${
          size === "large" ? "w-20 h-20" : "w-12 h-12"
        } rounded-lg mr-4 overflow-hidden`}
        src={category?.image || _getImgRd()}
        sizes="(max-width: 640px) 100vw, 40vw"
        fill
        width={width}
        height={height}
      />
      <div>
        <h2
          className={`${
            size === "large" ? "text-lg" : "text-base"
          } nc-card-title text-neutral-900 dark:text-neutral-100 font-semibold`}
        >
          {category?.name || _getTagNameRd()}
        </h2>
        <span
          className={`${
            size === "large" ? "text-sm" : "text-xs"
          } block mt-[2px] text-neutral-500 dark:text-neutral-400`}
        >
          {category?.description}
        </span>
      </div>
    </Link>
  );
};

export default CardCategory1;
