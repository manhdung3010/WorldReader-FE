import { StarIcon, PhotoIcon } from "@heroicons/react/24/solid";
import React, { FC, useState } from "react";
import Avatar from "@/shared/Avatar/Avatar";
import Image from "next/image";

interface ReviewItemDataType {
  name: string;
  author?: string;
  authorImage?: string;
  avatar?: string;
  date: string;
  comment: string;
  content?: string;
  starPoint: number;
  star?: number;
  images?: string[];
  image?: string[];
  display?: boolean;
}

export interface ReviewItemProps {
  className?: string;
  data?: ReviewItemDataType;
}

const DEMO_DATA: ReviewItemDataType = {
  name: "Cody Fisher",
  date: "May 20, 2021",
  comment:
    "Very nice feeling sweater. I like it better than a regular hoody because it is tailored to be a slimmer fit. Perfect for going out when you want to stay comfy. The head opening is a little tight which makes it a little.",
  starPoint: 5,
};

const ReviewItem: FC<ReviewItemProps> = ({
  className = "",
  data = DEMO_DATA,
}) => {
  // Create an array of stars based on the starPoint value
  const renderStars = () => {
    const stars = [];
    const rating = data.starPoint || data.star || 0;

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <StarIcon
          key={i}
          className={`w-5 h-5 ${
            i <= rating ? "text-yellow-500" : "text-gray-300 dark:text-gray-600"
          }`}
        />
      );
    }
    return stars;
  };

  // Check if the review has images - support both 'images' and 'image' properties
  const reviewImages = data.images || data.image || [];
  const hasImages = reviewImages.length > 0;

  // Use the appropriate name and avatar
  const reviewerName = data.name || data.author || "Anonymous";
  const reviewerAvatar = data.avatar || data.authorImage || "";

  // Use the appropriate comment content
  const reviewContent = data.comment || data.content || "";

  // State to track image loading errors
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  // Handle image loading errors
  const handleImageError = (index: number) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <div
      className={`nc-ReviewItem flex flex-col ${className}`}
      data-nc-id="ReviewItem"
    >
      <div className="flex space-x-4">
        <div className="flex-shrink-0 pt-0.5">
          <Avatar
            sizeClass="h-10 w-10 text-lg"
            radius="rounded-full"
            userName={reviewerName}
            imgUrl={reviewerAvatar}
          />
        </div>

        <div className="flex-1 flex justify-between">
          <div className="text-sm sm:text-base">
            <span className="block font-semibold">{reviewerName}</span>
            <span className="block mt-0.5 text-slate-500 dark:text-slate-400 text-sm">
              {data.date}
            </span>
          </div>

          <div className="mt-0.5 flex">{renderStars()}</div>
        </div>
      </div>

      <div className="mt-4 prose prose-sm sm:prose dark:prose-invert sm:max-w-2xl">
        <p className="text-slate-600 dark:text-slate-300">{reviewContent}</p>
      </div>

      {/* Display images if they exist */}
      {hasImages && (
        <div className="mt-4">
          <div className="flex items-center mb-2">
            <PhotoIcon className="w-5 h-5 text-slate-500 dark:text-slate-400 mr-1" />
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {reviewImages.length}{" "}
              {reviewImages.length === 1 ? "photo" : "photos"}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {reviewImages.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-neutral-800"
              >
                {!imageErrors[index] ? (
                  <Image
                    src={image}
                    alt={`Review image ${index + 1}`}
                    fill
                    className="object-cover"
                    onError={() => handleImageError(index)}
                    unoptimized
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <PhotoIcon className="w-8 h-8 text-gray-400 dark:text-neutral-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewItem;
