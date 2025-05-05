"use client";

import React, { useEffect, useState } from "react";
import Pagination from "@/shared/Pagination/Pagination";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import SectionSliderCollections from "@/components/SectionSliderLargeProduct";
import SectionPromo1 from "@/components/SectionPromo1";
import { useQuery } from "@tanstack/react-query";
import {
  getDetailCategoryProductByUrl,
  getProduct,
  getProductByCategory,
} from "@/services/product.service";
import BookCard from "@/components/BookCard";
import TabFilters from "./TabFilters";
import { useParams } from "next/navigation";
import { AxiosResponse } from "axios";

interface CategoryDetailData {
  id: number;
  name: string;
  description: string;
  url: string;
  display: boolean;
  homeDisplay: boolean;
  image: string | null;
  children: any[];
  parents: any[];
  seo: {
    title: string;
    description: string;
  };
}

interface ProductFilter {
  name?: string;
  code?: string;
  priceMin?: string;
  priceMax?: string;
  status?: string;
  isDiscount?: boolean | null;
  display?: boolean | null;
  page: number;
  pageSize: number;
}

export default function CategoryProductPage() {
  const { url }: any = useParams();
  const [rows, setRows] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isAppending, setIsAppending] = useState(false);

  const { data: categoryDetail } = useQuery<any>(
    ["CATEGORY_DETAIL", url],
    () => getDetailCategoryProductByUrl(url),
    {
      refetchOnWindowFocus: false,
    }
  );

  const [formFilter, setFormFilter] = useState<ProductFilter>({
    page: 1,
    pageSize: 24,
  });

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<any>(
    [
      "PRODUCTS",
      formFilter.page,
      formFilter.pageSize,
      formFilter.name,
      formFilter.code,
      formFilter.priceMin,
      formFilter.priceMax,
      formFilter.status,
      formFilter.isDiscount,
      formFilter.display,
    ],
    () => {
      const filteredParams = Object.fromEntries(
        Object.entries(formFilter).filter(([_, value]) => {
          if (value === null || value === undefined || value === "")
            return false;
          return true;
        })
      );
      return getProductByCategory({ urlCategory: url, params: filteredParams });
    },
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    if (products?.data) {
      setRows((prevRows) => {
        if (formFilter.page === 1 || !isAppending) {
          return products.data;
        }
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

  const handleFilterChange = (newFilters: Partial<ProductFilter>) => {
    setFormFilter((prev) => ({
      ...prev,
      ...newFilters,
      page: 1, // Reset to first page when filters change
    }));
  };

  return (
    <div className={`nc-PageCollection`}>
      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
        <div className="space-y-10 lg:space-y-14">
          {/* HEADING */}
          <div className="max-w-screen-sm">
            <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
              {categoryDetail?.data?.name || "Book Collection"}
            </h2>
            <span className="block mt-4 text-neutral-500 dark:text-neutral-400 text-sm sm:text-base">
              {categoryDetail?.data?.description ||
                `We don't just bring you exceptional books—we make it easy for you
              to explore, discover, and share knowledge with like-minded
              readers.`}
            </span>
          </div>

          <hr className="border-slate-200 dark:border-slate-700" />
          <main>
            {/* TABS FILTER */}
            <TabFilters setFormFilter={handleFilterChange} />

            {/* LOOP ITEMS */}
            {rows.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
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

            {/* PAGINATION + LOAD MORE */}
            <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
              <Pagination
                currentPage={formFilter.page}
                totalPages={totalPages}
                onPageChange={(page) => {
                  setFormFilter((prev) => ({
                    ...prev,
                    page,
                  }));
                }}
              />

              <ButtonPrimary
                loading={isAppending}
                disabled={formFilter.page >= totalPages}
                onClick={handleShowMore}
              >
                Show me more
              </ButtonPrimary>
            </div>
          </main>
        </div>

        <hr className="border-slate-200 dark:border-slate-700" />
        <SectionSliderCollections />
        <hr className="border-slate-200 dark:border-slate-700" />
        <SectionPromo1 />
      </div>
    </div>
  );
}
