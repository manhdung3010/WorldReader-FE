"use client";

import React, { FC, useEffect, useState } from "react";
import Pagination from "@/shared/Pagination/Pagination";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import SectionSliderCollections from "@/components/SectionSliderLargeProduct";
import SectionPromo1 from "@/components/SectionPromo1";
import Input from "@/shared/Input/Input";
import ButtonCircle from "@/shared/Button/ButtonCircle";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/data/data";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/services/product.service";
import BookCard from "@/components/BookCard";
import HeaderFilterSearchPage from "./HeaderFilterSearchPage";
import { useSearchParams } from "next/navigation";

const PageSearch = ({}) => {
  const searchParams = useSearchParams();
  const nameParam = searchParams?.get("name") || "";

  const [rows, setRows] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isAppending, setIsAppending] = useState(false);
  const [searchTerm, setSearchTerm] = useState(nameParam);

  const [formFilter, setFormFilter] = useState({
    name: nameParam,
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
    error,
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
  }, [products]);

  const handleShowMore = () => {
    if (formFilter.page < totalPages) {
      setIsAppending(true);
      setFormFilter((prev) => ({
        ...prev,
        page: prev.page + 1,
      }));
    }
  };

  const handleFilterChange = (newFilters: any) => {
    setFormFilter((prev) => ({
      ...prev,
      ...newFilters,
      page: 1, // Reset to first page when filters change
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFormFilter((prev) => ({
      ...prev,
      name: searchTerm,
      page: 1,
    }));
  };

  return (
    <div className={`nc-PageSearch`} data-nc-id="PageSearch">
      <div
        className={`nc-HeadBackgroundCommon h-24 2xl:h-28 top-0 left-0 right-0 w-full bg-primary-50 dark:bg-neutral-800/20 `}
      />
      <div className="container">
        <header className="max-w-2xl mx-auto -mt-10 flex flex-col lg:-mt-7">
          <form
            className="relative w-full "
            method="post"
            onSubmit={handleSearch}
          >
            <label
              htmlFor="search-input"
              className="text-neutral-500 dark:text-neutral-300"
            >
              <span className="sr-only">Search all icons</span>
              <Input
                className="shadow-lg border-0 dark:border"
                id="search-input"
                type="search"
                placeholder="Type your keywords"
                sizeClass="pl-14 py-5 pr-5 md:pl-16"
                rounded="rounded-full"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  // If the input is cleared, update the form filter to refresh the search
                  if (e.target.value === "") {
                    setFormFilter((prev) => ({
                      ...prev,
                      name: "",
                      page: 1,
                    }));
                  }
                }}
              />
              <ButtonCircle
                className="absolute right-2.5 top-1/2 transform -translate-y-1/2"
                size=" w-11 h-11"
                type="submit"
              >
                <i className="las la-arrow-right text-xl"></i>
              </ButtonCircle>
              <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl md:left-6">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 22L20 20"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </label>
          </form>
        </header>
      </div>

      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
        <main>
          {/* FILTER */}
          <HeaderFilterSearchPage handleFilterChange={handleFilterChange} />

          {/* Loading state */}
          {isLoading && formFilter.page === 1 && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-500 border-t-transparent mb-4"></div>
              <p className="text-neutral-500 dark:text-neutral-400">
                Loading books...
              </p>
            </div>
          )}

          {/* Error state */}
          {isError && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-24 h-24 mb-4 text-red-500">
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
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
                Error loading books
              </h3>
              <p className="mt-2 text-neutral-500 dark:text-neutral-400 text-center max-w-md">
                {error && typeof error === "object" && "message" in error
                  ? (error as { message: string }).message
                  : "There was a problem loading the books. Please try again later."}
              </p>
              <ButtonPrimary
                className="mt-4"
                onClick={() => window.location.reload()}
              >
                Try Again
              </ButtonPrimary>
            </div>
          )}

          {/* Results */}
          {!isLoading && !isError && rows.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
              {rows.map((item, index) => (
                <BookCard data={item} key={index} />
              ))}
            </div>
          )}

          {/* No results */}
          {!isLoading && !isError && rows.length === 0 && (
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

          {/* Loading more indicator */}
          {isLoading && formFilter.page > 1 && (
            <div className="flex justify-center my-8">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-500 border-t-transparent"></div>
            </div>
          )}

          {/* PAGINATION */}
          <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
            {/* <Pagination /> */}
            {!isError && rows.length > 0 && (
              <ButtonPrimary
                loading={isAppending}
                disabled={formFilter.page >= totalPages}
                onClick={handleShowMore}
              >
                Show me more
              </ButtonPrimary>
            )}
          </div>
        </main>

        {/* === SECTION 5 === */}
        <hr className="border-slate-200 dark:border-slate-700" />
        <SectionSliderCollections />
        <hr className="border-slate-200 dark:border-slate-700" />

        {/* SUBCRIBES */}
        <SectionPromo1 />
      </div>
    </div>
  );
};

export default PageSearch;
