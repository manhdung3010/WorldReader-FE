import React, { FC, useState } from "react";
import Card3Small from "./Card3Small";
import WidgetHeading1 from "./WidgetHeading1";
import { useQuery } from "@tanstack/react-query";
import { getPost } from "@/services/post.service";

export interface WidgetPostsProps {
  className?: string;
}

const WidgetPosts: FC<WidgetPostsProps> = ({
  className = "bg-neutral-100 dark:bg-neutral-800",
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery<any>(
    ["POST", currentPage],
    () =>
      getPost({ sortBy: "popular", page: currentPage, pageSize: postsPerPage }),
    {
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) {
    return <p>Loading posts...</p>;
  }

  if (isError) {
    return <p>Error loading posts</p>;
  }

  return (
    <div
      className={`nc-WidgetPosts rounded-3xl overflow-hidden ${className}`}
      data-nc-id="WidgetPosts"
    >
      <WidgetHeading1
        title="🎯 Popular Posts"
      />
      <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700">
        {posts?.data?.map((post: any, index: number) => (
          <Card3Small
            className="p-4 xl:px-5 xl:py-6 hover:bg-neutral-200 dark:hover:bg-neutral-700"
            key={index}
            post={post}
          />
        ))}
      </div>
    </div>
  );
};

export default WidgetPosts;
