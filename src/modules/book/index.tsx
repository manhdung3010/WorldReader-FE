"use client";

import React, { FC, useEffect, useState } from "react";
import SectionSliderCollections from "@/components/SectionSliderLargeProduct";
import SectionPromo1 from "@/components/SectionPromo1";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/data/data";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  getDetailCategoryProductByUrl,
  getProduct,
  getProductByCategory,
} from "@/services/product.service";
import BookCard from "@/components/BookCard";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Pagination from "@/shared/Pagination/Pagination";
import SidebarFilters from "./SidebarFilters";

export default function BookCollection() {
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
    pageSize: 24,
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
    <div className={`nc-PageCollection2`}>
      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
        <div className="space-y-10 lg:space-y-14">
          {/* HEADING */}
          <div className="max-w-screen-sm">
            <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
              Man collection
            </h2>
            <span className="block mt-4 text-neutral-500 dark:text-neutral-400 text-sm sm:text-base">
              We not only help you design exceptional products, but also make it
              easy for you to share your designs with more like-minded people.
            </span>
          </div>

          <hr className="border-slate-200 dark:border-slate-700" />
          <main>
            {/* LOOP ITEMS */}
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/3 xl:w-1/4 pr-4">
                <SidebarFilters onFilterChange={setFormFilter} />
              </div>
              <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mx-4 border-t lg:border-t-0"></div>
              <div className="flex-1 ">
                {rows.length > 0 ? (
                  <div className="flex-1 grid sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-10 ">
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
              </div>
            </div>
          </main>
        </div>

        {/* === SECTION 5 === */}
        <hr className="border-slate-200 dark:border-slate-700" />

        <SectionSliderCollections />
        <hr className="border-slate-200 dark:border-slate-700" />

        {/* SUBCRIBES */}
        <SectionPromo1 />
      </div>
    </div>
  );
}
