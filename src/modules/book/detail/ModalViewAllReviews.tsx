import { Dialog, Transition } from "@/app/headlessui";
import { StarIcon } from "@heroicons/react/24/solid";
import ReviewItem from "@/components/ReviewItem";
import SortOrderFilter from "@/components/SectionGridMoreExplore/SortOrderFilter";
import React, { FC, Fragment } from "react";
import ButtonClose from "@/shared/ButtonClose/ButtonClose";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";

export interface ModalViewAllReviewsProps {
  show: boolean;
  averageStarRating: any;
  onCloseModalViewAllReviews: () => void;
  data: any; // Reviews data passed from the parent
  formFilter: { page: number; pageSize: number };
  setFormFilter: React.Dispatch<
    React.SetStateAction<{ page: number; pageSize: number }>
  >;
}

const ModalViewAllReviews: FC<ModalViewAllReviewsProps> = ({
  show,
  averageStarRating,
  onCloseModalViewAllReviews,
  data, // Use data prop here
  formFilter,
  setFormFilter,
}) => {
  const reviews = data?.data?.data || []; // Reviews array
  const totalReviews = data?.data?.total || 0;

  // Pagination handlers
  const handleNextPage = () => {
    if (formFilter.page * formFilter.pageSize < totalReviews) {
      setFormFilter((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };

  const handlePrevPage = () => {
    if (formFilter.page > 1) {
      setFormFilter((prev) => ({ ...prev, page: prev.page - 1 }));
    }
  };

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={onCloseModalViewAllReviews}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block py-8 h-screen w-full max-w-5xl">
              <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                  <h3
                    className="text-lg font-medium leading-6 text-gray-900"
                    id="headlessui-dialog-title-70"
                  >
                    View all reviews
                  </h3>
                  <span className="absolute left-3 top-3">
                    <ButtonClose onClick={onCloseModalViewAllReviews} />
                  </span>
                </div>
                <div className="px-8 my-5 flex justify-between flex-wrap">
                  <h2 className="text-xl sm:text-2xl font-semibold flex items-center">
                    <StarIcon className="w-7 h-7 mb-0.5" />
                    <span className="ml-1.5">{`${
                      averageStarRating || 0
                    } · ${totalReviews} Reviews`}</span>
                  </h2>
                  <SortOrderFilter
                    className="my-2"
                    data={[
                      { name: "Sort order" },
                      { name: "Newest rating" },
                      { name: "Highest rating" },
                      { name: "Lowest rating" },
                    ]}
                  />
                </div>
                <div className="px-8 py-8 border-t border-slate-200 dark:border-slate-700 overflow-auto grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-10">
                  {reviews.length > 0 ? (
                    reviews.map((review: any) => (
                      <ReviewItem
                        key={review.id}
                        data={{
                          comment: review.content,
                          date: new Date(review.createdAt).toLocaleDateString(),
                          name: review.name,
                          starPoint: review.star,
                        }}
                      />
                    ))
                  ) : (
                    <p>No reviews available</p>
                  )}
                </div>

                {/* Pagination */}
                <div className="flex justify-between px-8 py-4">
                  <ButtonSecondary
                    onClick={handlePrevPage}
                    className="border border-slate-300 dark:border-slate-700"
                    disabled={formFilter.page === 1}
                  >
                    Previous
                  </ButtonSecondary>
                  <ButtonSecondary
                    onClick={handleNextPage}
                    className="border border-slate-300 dark:border-slate-700"
                    disabled={
                      formFilter.page * formFilter.pageSize >= totalReviews
                    }
                  >
                    Next
                  </ButtonSecondary>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalViewAllReviews;
