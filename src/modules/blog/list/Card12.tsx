import React, { FC } from "react";
import NcImage from "@/shared/NcImage/NcImage";
import SocialsShare from "@/shared/SocialsShare/SocialsShare";
import { imgHigtQualitys, _getTitleRd } from "@/contains/fakeData";
import PostCardMeta from "@/components/PostCardMeta/PostCardMeta";
import Link from "next/link";

export interface Card12Props {
  className?: string;
  post?: any;
  isLoading?: boolean;
}

const Card12: FC<Card12Props> = ({ className = "h-full", post, isLoading }) => {
  if (isLoading) {
    return (
      <div className={`nc-Card12 group relative flex flex-col ${className}`}>
        <div className="w-full h-60 bg-gray-300 animate-pulse rounded-3xl"></div>
        <div className="mt-8 pr-10 flex flex-col">
          <div className="h-6 bg-gray-300 animate-pulse w-3/4 rounded-md"></div>
          <div className="h-4 bg-gray-300 animate-pulse w-1/2 mt-4 rounded-md"></div>
          <div className="h-5 bg-gray-300 animate-pulse w-1/3 mt-5 rounded-md"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`nc-Card12 group relative flex flex-col ${className}`}>
      <Link
        href={`/news/${post?.url}` as any}
        className="block flex-shrink-0 flex-grow relative w-full h-0 aspect-w-4 aspect-h-3 rounded-3xl overflow-hidden"
      >
        <NcImage
          src={post?.thumbnail || imgHigtQualitys[0]}
          containerClassName="absolute inset-0"
          alt={post?.name || "Image"}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </Link>

      <SocialsShare className="absolute hidden md:grid gap-[5px] right-4 top-4 opacity-0 z-[-1] group-hover:z-10 group-hover:opacity-100 transition-all duration-300" />

      <div className="mt-8 pr-10 flex flex-col">
        <h2
          className={`nc-card-title block font-semibold text-neutral-900 dark:text-neutral-100 transition-colors text-lg sm:text-2xl`}
        >
          <Link
            href={`/news/${post?.url}` as any}
            className="line-clamp-2 capitalize"
            title={post?.name || "title"}
          >
            {post?.name || _getTitleRd()}
          </Link>
        </h2>
        <span className="hidden sm:block mt-4 text-neutral-500 dark:text-neutral-400">
          <span
            className="line-clamp-2"
            dangerouslySetInnerHTML={{
              __html:
                post?.content?.length > 100
                  ? post.content.slice(0, 100) + "..."
                  : post.content,
            }}
          />
        </span>
        <PostCardMeta
          className="mt-5"
          avatar={post?.authorImage}
          author={post?.author}
          time={post?.createdAt}
        />
      </div>
    </div>
  );
};

export default Card12;
