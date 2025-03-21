import React, { FC } from "react";
import NcImage from "@/shared/NcImage/NcImage";
import Badge from "@/shared/Badge/Badge";
import { _getImgRd, _getTagNameRd, _getTitleRd } from "@/contains/fakeData";
import PostCardMeta from "@/components/PostCardMeta/PostCardMeta";
import Link from "next/link";

export interface Card3Props {
  className?: string;
  post?: any;
}

const Card3: FC<Card3Props> = ({ className = "h-full", post }) => {
  return (
    <div
      className={`nc-Card3 relative flex flex-col sm:items-center rounded-[40px] group ${className}`}
      data-nc-id="Card3"
    >
      <div
        className={`block flex-shrink-0 sm:w-56  rounded-3xl overflow-hidden mb-5 sm:mb-0`}
      >
        <Link
          href={`/news/${post?.url}` as any}
          className={`block w-full h-0 aspect-h-9 sm:aspect-h-16 aspect-w-16 `}
        >
          <NcImage
            alt=""
            fill
            src={post?.thumbnail || _getImgRd()}
            containerClassName="absolute inset-0"
            sizes="(max-width: 768px) 100vw, 30vw"
          />
        </Link>
      </div>

      <div className="flex flex-col flex-grow gap-2">
        <div className="space-y-5 mb-4">
          <div>
            <h2
              className={`nc-card-title block font-semibold text-neutral-900 dark:text-neutral-100 text-xl`}
            >
              <Link
                href={`/news/${post?.url}` as any}
                className="line-clamp-2 capitalize"
                title={"title"}
              >
                {post?.name || _getTitleRd()}
              </Link>
            </h2>
            <div className="hidden sm:block sm:mt-2">
              <span
                className="text-neutral-500 dark:text-neutral-400 text-base line-clamp-1"
                dangerouslySetInnerHTML={{
                  __html:
                    post?.content?.length > 50
                      ? post.content.slice(0, 50) + "..."
                      : post.content,
                }}
              />
            </div>
          </div>
          <PostCardMeta
            className="mt-5"
            avatar={post?.authorImage}
            author={post?.author}
            time={post?.createdAt}
          />
        </div>
      </div>
    </div>
  );
};

export default Card3;
