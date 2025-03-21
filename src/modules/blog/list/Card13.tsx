import React, { FC } from "react";
import NcImage from "@/shared/NcImage/NcImage";
import { _getImgRd, _getTitleRd } from "@/contains/fakeData";
import PostCardMeta from "@/components/PostCardMeta/PostCardMeta";
import Link from "next/link";

export interface Card13Props {
  className?: string;
  post?: any;
  isLoading?: boolean;
}

const Card13: FC<Card13Props> = ({ className = "", post, isLoading }) => {
  if (isLoading) {
    return (
      <div
        className={`nc-Card13 relative flex ${className}`}
        data-nc-id="Card13"
      >
        <div className="flex flex-col h-full py-2 w-full">
          <div className="h-6 bg-gray-300 animate-pulse w-3/4 rounded-md"></div>
          <div className="h-4 bg-gray-300 animate-pulse w-1/2 my-3 rounded-md"></div>
          <div className="h-5 bg-gray-300 animate-pulse w-1/3 mt-auto hidden sm:block rounded-md"></div>
        </div>
        <div className="block relative h-full flex-shrink-0 w-2/5 sm:w-1/3 ml-3 sm:ml-5">
          <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-xl sm:rounded-3xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`nc-Card13 relative flex ${className}`} data-nc-id="Card13">
      <div className="flex flex-col h-full py-2 w-full">
        <h2 className={`nc-card-title block font-semibold text-base`}>
          <Link
            href={`/news/${post?.url}` as any}
            className="line-clamp-2 capitalize"
            title={post?.name || "title"}
          >
            {post?.name || _getTitleRd()}
          </Link>
        </h2>
        <span className="hidden sm:block my-3 text-slate-500 dark:text-slate-400">
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
        <span className="mt-4 block sm:hidden text-sm text-slate-500">
          May 20, 2021 · 2 min read
        </span>
        <div className="mt-auto hidden sm:block">
          <PostCardMeta
            className="mt-5"
            avatar={post?.authorImage}
            author={post?.author}
            time={post?.createdAt}
          />
        </div>
      </div>
      <Link
        href={`/news/${post?.url}` as any}
        className={`block relative h-full flex-shrink-0 w-2/5 sm:w-1/3 ml-3 sm:ml-5`}
      >
        <NcImage
          alt=""
          src={post?.thumbnail || _getImgRd()}
          containerClassName="absolute inset-0"
          className="object-cover w-full h-full rounded-xl sm:rounded-3xl"
          sizes="400px"
          fill
        />
      </Link>
    </div>
  );
};

export default Card13;
