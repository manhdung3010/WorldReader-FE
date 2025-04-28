"use client";

import React, { FC, useEffect, useState } from "react";
import HeaderFilterSection from "@/components/HeaderFilterSection";
import ProductCard from "@/components/ProductCard";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { Product, PRODUCTS } from "@/data/data";
import Heading from "@/components/Heading/Heading";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/services/product.service";
import BookCard from "@/components/BookCard";

//
export interface SectionGridFeatureItemsProps {
  data?: Product[];
}

const ProductHomeList: FC<SectionGridFeatureItemsProps> = ({
  data = PRODUCTS,
}) => {
  const [rows, setRows] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isAppending, setIsAppending] = useState(false);

  const [formFilter, setFormFilter] = useState({
    name: "",
    code: "",
    priceMin: "",
    priceMax: "",
    status: "",
    categories: null,
    isDiscount: null,
    display: true,
    page: 1,
    pageSize: 12,
  });

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<any>(
    [
      "PRODUCTS",
      formFilter.name,
      formFilter.code,
      formFilter.priceMin,
      formFilter.priceMax,
      formFilter.categories,
      formFilter.status,
      formFilter.isDiscount,
      formFilter.display,
      formFilter.page,
      formFilter.pageSize,
    ],
    () => getProduct(formFilter),
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    if (products?.data) {
      setRows((prevRows) => {
        // Nếu page là 1 thì replace toàn bộ rows
        if (formFilter.page === 1 || !isAppending) {
          return products.data;
        }
        // Nếu đang append thì gộp dữ liệu mới
        return [...prevRows, ...products.data];
      });

      setTotalPages(
        products.totalPages ||
          Math.ceil(products.totalCount / formFilter.pageSize) ||
          1
      );

      setIsAppending(false);
    }
  }, [products, formFilter.pageSize, formFilter.page, isAppending]);

  const handleShowMore = () => {
    if (formFilter.page < totalPages) {
      setIsAppending(true);
      setFormFilter((prev) => ({
        ...prev,
        page: prev.page + 1,
      }));
    }
  };

  return (
    <div className="nc-SectionGridFeatureItems relative">
      <Heading>{`What's trending now`}</Heading>

      {rows.length > 0 ? (
        <div
          className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 `}
        >
          {rows.map((item, index) => (
            <BookCard data={item} key={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-24 h-24 mb-4 text-neutral-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
            No books found
          </h3>
          <p className="mt-2 text-neutral-500 dark:text-neutral-400 text-center max-w-md">
            {`We couldn't find any books matching your criteria. Try
                  adjusting your filters or search terms.`}
          </p>
        </div>
      )}
      <div className="flex mt-16 justify-center items-center">
        <ButtonPrimary
          loading={isAppending}
          disabled={formFilter.page >= totalPages}
          onClick={handleShowMore}
        >
          Show me more
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default ProductHomeList;
