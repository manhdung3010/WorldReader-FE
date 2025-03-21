import React, { FC } from "react";
import Avatar from "@/shared/Avatar/Avatar";
import { _getPersonNameRd } from "@/contains/fakeData";
import Link from "next/link";
import { formatDateCreateAt } from "@/utils/time";

export interface PostCardMetaProps {
  className?: string;
  hiddenAvatar?: boolean;
  avatar?: string;
  author?: string;
  time?: string;
}

const PostCardMeta: FC<PostCardMetaProps> = ({
  className = "leading-none",
  hiddenAvatar = false,
  avatar,
  author,
  time,
}) => {
  return (
    <div
      className={`nc-PostCardMeta inline-flex items-center fledx-wrap text-neutral-800 dark:text-neutral-200 text-sm ${className}`}
      data-nc-id="PostCardMeta"
    >
      <div className="flex-shrink-0 relative flex items-center space-x-2">
        {!hiddenAvatar && (
          <Avatar imgUrl={avatar} radius="rounded-full" sizeClass={"h-7 w-7 text-sm"} />
        )}
        <span className="block text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium">
          {author || _getPersonNameRd()}
        </span>
      </div>
      <>
        <span className="text-neutral-500 dark:text-neutral-400 mx-[6px] font-medium">
          ·
        </span>
        <span className="text-neutral-500 dark:text-neutral-400 font-normal line-clamp-1">
          {formatDateCreateAt?.(time) || "May 20, 2021"}
        </span>
      </>
    </div>
  );
};

export default PostCardMeta;
