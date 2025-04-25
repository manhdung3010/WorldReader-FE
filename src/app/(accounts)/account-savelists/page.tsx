"use client";

import BookCard from "@/components/BookCard";
import ProductCard from "@/components/ProductCard";
import { useLike } from "@/contexts/LikeContext";
import { PRODUCTS } from "@/data/data";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";

const AccountSavelists = () => {
  const { likedProducts } = useLike();

  const renderSection1 = () => {
    return (
      <div className="space-y-10 sm:space-y-12">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold">
            List of saved products
          </h2>
        </div>

        {likedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <svg
              className="w-16 h-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <p className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">
              No saved products yet
            </p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Start adding products to your wishlist
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
              {likedProducts.map((item, index) => (
                <BookCard data={item} key={index} />
              ))}
            </div>
            <div className="flex !mt-20 justify-center items-center">
              <ButtonSecondary loading>Show me more</ButtonSecondary>
            </div>
          </>
        )}
      </div>
    );
  };

  return renderSection1();
};

export default AccountSavelists;
