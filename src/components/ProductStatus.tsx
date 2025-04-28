import {
  NoSymbolIcon,
  ClockIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { Product } from "@/data/data";
import React, { FC } from "react";
import IconDiscount from "./IconDiscount";
import { Route } from "next";

type ProductStatus =
  | "IN_STOCK"
  | "OUT_OF_STOCK"
  | "NEW_IN"
  | "DISCOUNT"
  | "Sold Out"
  | "limited edition";

interface Props {
  status: Product["status"];
  className?: string;
}

const ProductStatus: FC<Props> = ({
  status,
  className = "absolute top-3 start-3 px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300",
}) => {
  const renderStatus = () => {
    if (!status) {
      return null;
    }
    const CLASSES = `nc-shadow-lg rounded-full flex items-center justify-center ${className}`;
    const productStatus = status as ProductStatus;
    if (productStatus === "NEW_IN") {
      return (
        <div className={CLASSES}>
          <SparklesIcon className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">New in</span>
        </div>
      );
    }
    if (productStatus === "DISCOUNT") {
      return (
        <div className={CLASSES}>
          <IconDiscount className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{productStatus}</span>
        </div>
      );
    }
    if (productStatus === "Sold Out") {
      return (
        <div className={CLASSES}>
          <NoSymbolIcon className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{productStatus}</span>
        </div>
      );
    }
    if (productStatus === "limited edition") {
      return (
        <div className={CLASSES}>
          <ClockIcon className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{productStatus}</span>
        </div>
      );
    }
    return null;
  };

  return renderStatus();
};

export default ProductStatus;
