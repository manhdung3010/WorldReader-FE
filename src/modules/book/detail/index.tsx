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
import Policy from "./Policy";
import ReviewItem from "@/components/ReviewItem";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import SectionPromo2 from "@/components/SectionPromo2";
import ModalViewAllReviews from "./ModalViewAllReviews";
import NotifyAddTocart from "@/components/NotifyAddTocart";
import Image from "next/image";
import AccordionInfo from "@/components/AccordionInfo";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getDetailProductByUrl,
  getReviewProduct,
} from "@/services/product.service";
import { useCart } from "@/contexts/CartContext";
import { Transition } from "@headlessui/react";
import { formatPrice } from "@/utils/price";
import Discount from "@/components/Discount";
import SectionSliderProductCard from "./SectionSliderProductCard";
import { useAuth } from "@/contexts/AuthContext";
import ModalReviewForm from "./ModalReviewForm";

const ProductDetailPage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [formFilter, setFormFilter] = useState({
    page: 1,
    pageSize: 10,
  });

  const { url } = useParams();

  const { data: productDetail } = useQuery(["PRODUCT_DETAIL", url], () =>
    getDetailProductByUrl(url)
  );

  const { data: reviewProduct } = useQuery(
    [
      "REVIEW_PRODUCT",
      productDetail?.data?.id,
      formFilter.page,
      formFilter.pageSize,
    ],
    () =>
      productDetail?.data?.id &&
      getReviewProduct(Number(productDetail?.data?.id), formFilter),
    { enabled: !!productDetail?.data?.id }
  );

  //
  const [qualitySelected, setQualitySelected] = useState(1);
  const [isOpenModalViewAllReviews, setIsOpenModalViewAllReviews] =
    useState(false);
  const [isOpenModalReviewForm, setIsOpenModalReviewForm] = useState(false);
  const { isAuthenticated } = useAuth();

  const { addToCart } = useCart();

  const notifyAddTocart = () => {
    addToCart(productDetail?.data);
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
        id: String(productDetail?.data?.id) || "product-detail",
        duration: 3000,
      }
    );
  };

  const renderProductCartOnNotify = () => {
    return (
      <div className="flex ">
        <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <Image
            width={80}
            height={96}
            src={productDetail?.data?.avatar || "/public/book-false.jpg"}
            alt={productDetail?.data?.name || "Product"}
            className="absolute object-cover object-center"
          />
        </div>

        <div className="ms-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-base font-medium ">
                  {productDetail?.data?.name}
                </h3>
              </div>
              <Prices
                price={formatPrice(
                  productDetail?.data?.price *
                    (1 - Number(productDetail?.data?.perDiscount) / 100)
                )}
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
    return (
      <div>
        <div className="flex gap-2 items-center">
          <p className="text-green-500">
            {formatPrice(
              productDetail?.data?.price *
                (1 - Number(productDetail?.data?.perDiscount) / 100)
            )}
          </p>
          <Discount per={productDetail?.data?.perDiscount} />
        </div>
        {productDetail?.data?.perDiscount !== 0 && (
          <div style={{ textDecoration: "line-through", color: "gray" }}>
            {formatPrice(productDetail?.data?.price)}
          </div>
        )}
      </div>
    );
  };

  const renderSectionContent = () => {
    return (
      <div className="space-y-7 2xl:space-y-8">
        {/* ---------- 1 HEADING ----------  */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold">
            {productDetail?.data?.name}
          </h2>

          <div className="flex items-center mt-5 space-x-4 sm:space-x-5">
            {/* <div className="flex text-xl font-semibold">$112.00</div> */}
            {renderPrice()}

            <div className="h-7 border-l border-slate-300 dark:border-slate-700"></div>

            <div className="flex items-center mb-0.5">
              <StarIcon className="w-5 h-5 pb-[1px] text-amber-400" />
              <span className="text-sm ms-1 text-slate-500 dark:text-slate-400">
                {productDetail?.data?.averageStarRating || 0}
              </span>
            </div>
          </div>
        </div>

        {/*  ---------- 4  QTY AND ADD TO CART BUTTON */}
        <div className="flex space-x-3.5">
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
            <span className="ml-3">Add to cart</span>
          </ButtonPrimary>
        </div>

        {/*  */}
        <hr className=" 2xl:!my-10 border-slate-200 dark:border-slate-700"></hr>
        {/*  */}

        {/* ---------- 5 ----------  */}
        <AccordionInfo
          data={[
            {
              name: "Categories",
              content:
                productDetail?.data?.categories?.length > 0
                  ? `<ul class="list-disc list-inside leading-7">
                    ${productDetail?.data.categories
                      .map((item: any) => `<li>${item.name}</li>`)
                      .join("")}
                  </ul>`
                  : "No information available",
            },
            {
              name: "Information",
              content:
                productDetail?.data?.information?.length > 0
                  ? `<ul class="list-disc list-inside leading-7">
                      ${productDetail?.data.information
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

        {/* ---------- 6 ----------  */}
        <div className="hidden xl:block">
          <Policy />
        </div>
      </div>
    );
  };

  const renderDetailSection = () => {
    return (
      <div className="">
        <h2 className="text-2xl font-semibold">Product Details</h2>
        <div
          className="prose prose-sm sm:prose dark:prose-invert sm:max-w-4xl mt-7"
          dangerouslySetInnerHTML={{ __html: productDetail?.data?.description }}
        />
      </div>
    );
  };

  const renderReviews = () => {
    const reviews = reviewProduct?.data?.data || []; // Default to empty array if no reviews

    return (
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 sm:p-8 shadow-sm">
        {/* HEADING */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold flex items-center">
            <StarIcon className="w-7 h-7 mb-0.5 text-yellow-500" />
            <span className="ml-1.5">
              {`${productDetail?.data?.averageStarRating || 0} · ${
                reviewProduct?.data?.total || 0
              } Reviews`}
            </span>
          </h2>

          {isAuthenticated && (
            <ButtonPrimary
              onClick={() => setIsOpenModalReviewForm(true)}
              className="flex items-center"
            >
              <StarIcon className="w-5 h-5 mr-2" />
              Write a Review
            </ButtonPrimary>
          )}
        </div>

        {/* Reviews */}
        <div className="mt-6">
          {reviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-8">
              {reviews.map((review: any) => (
                <ReviewItem
                  key={review.id}
                  data={{
                    comment: review.content,
                    content: review.content,
                    date: new Date(review.createdAt).toLocaleDateString(),
                    name: review.name,
                    author: review.author,
                    authorImage: review.authorImage,
                    starPoint: review.star,
                    star: review.star,
                    image: review.image || [],
                    display: review.display,
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-neutral-800 mb-4">
                <StarIcon className="w-8 h-8 text-gray-400 dark:text-neutral-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                No reviews yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Be the first to review this product
              </p>
              {isAuthenticated && (
                <ButtonPrimary
                  onClick={() => setIsOpenModalReviewForm(true)}
                  className="flex items-center mx-auto"
                >
                  <StarIcon className="w-5 h-5 mr-2" />
                  Write a Review
                </ButtonPrimary>
              )}
            </div>
          )}

          {reviews.length > 0 && (
            <div className="mt-10 text-center">
              <ButtonSecondary
                onClick={() => setIsOpenModalViewAllReviews(true)}
                className="border border-slate-300 dark:border-slate-700"
              >
                Show me all {reviewProduct?.data?.total || 0} reviews
              </ButtonSecondary>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-ProductDetailPage `}>
      {/* MAIn */}
      <main className="container mt-5 lg:mt-11">
        <div className="lg:flex">
          {/* CONTENT */}
          <div className="w-full lg:w-[55%] lg:px-20">
            {/* HEADING */}
            <div className="relative">
              <div className="aspect-w-14 aspect-h-16 relative">
                <Image
                  src={productDetail?.data?.avatar}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="w-full rounded-xl object-cover"
                  alt="product detail 1"
                />
              </div>
              {/* META FAVORITES */}
              <LikeButton
                data={productDetail?.data}
                className="absolute top-3 end-3 z-10"
              />
            </div>
            <div className="grid grid-cols-1 gap-3 mt-3 sm:gap-6 sm:mt-6 xl:gap-8 xl:mt-8">
              {productDetail?.data?.image?.length > 0 && (
                <div className=" grid grid-cols-4 gap-3 mt-3 sm:gap-6 sm:mt-6 xl:gap-5 xl:mt-5">
                  {productDetail?.data.image.map((item, index) => {
                    if (!item) return null; // Tránh render phần tử rỗng
                    return (
                      <div key={index} className="aspect-w-2 aspect-h-3">
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
          </div>

          {/* SIDEBAR */}
          <div className="w-full lg:w-[45%] pt-10 lg:pt-0 lg:pl-7 xl:pl-9 2xl:pl-10">
            {renderSectionContent()}
          </div>
        </div>

        {/* DETAIL AND REVIEW */}
        <div className="mt-12 sm:mt-16 space-y-10 sm:space-y-16">
          <div className="block xl:hidden">
            <Policy />
          </div>

          {renderDetailSection()}

          <hr className="border-slate-200 dark:border-slate-700" />

          {renderReviews()}

          <hr className="border-slate-200 dark:border-slate-700" />

          {/* OTHER SECTION */}
          <SectionSliderProductCard
            productId={productDetail?.data?.id}
            heading="Similar products"
            subHeading=""
            headingFontClassName="text-2xl font-semibold"
            headingClassName="mb-10 text-neutral-900 dark:text-neutral-50"
          />

          {/* SECTION */}
          <div className="pb-20 xl:pb-28 lg:pt-14">
            <SectionPromo2 />
          </div>
        </div>
      </main>

      <ModalViewAllReviews
        data={reviewProduct}
        averageStarRating={productDetail?.data?.averageStarRating}
        show={isOpenModalViewAllReviews}
        onCloseModalViewAllReviews={() => setIsOpenModalViewAllReviews(false)}
        formFilter={formFilter}
        setFormFilter={setFormFilter}
      />

      <ModalReviewForm
        show={isOpenModalReviewForm}
        onCloseModalReviewForm={() => setIsOpenModalReviewForm(false)}
        productId={productDetail?.data?.id}
      />
    </div>
  );
};

export default ProductDetailPage;
