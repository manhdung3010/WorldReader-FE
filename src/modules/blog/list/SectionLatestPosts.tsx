"use client";

import React, { FC, useState } from "react";
import Heading from "@/components/Heading/Heading";
import Pagination from "@/shared/Pagination/Pagination";
import WidgetCategories from "./WidgetCategories";
import WidgetPosts from "./WidgetPosts";
import Card3 from "./Card3";
import { getPost } from "@/services/post.service";
import { useQuery } from "@tanstack/react-query";

export interface SectionLatestPostsProps {
  className?: string;
  postCardName?: "card3";
}

const SectionLatestPosts: FC<SectionLatestPostsProps> = ({
  postCardName = "card3",
  className = "",
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
      getPost({ sortBy: "latest", page: currentPage, pageSize: postsPerPage }),
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
    <div className={`nc-SectionLatestPosts relative ${className}`}>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 xl:pr-14">
          <Heading>Latest Articles 🎈</Heading>
          <div className={`grid gap-6 md:gap-8 grid-cols-1`}>
            {posts?.data.map((post: any, index: number) => (
              <Card3 key={index} className="" post={post} />
            ))}
          </div>
          <div className="flex flex-col mt-12 md:mt-20 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
            <Pagination
              currentPage={currentPage}
              totalPages={posts?.totalPages || 1}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
        <div className="w-full space-y-7 mt-24 lg:mt-0 lg:w-2/5 lg:pl-10 xl:pl-0 xl:w-1/3">
          <WidgetCategories />
          <WidgetPosts />
        </div>
      </div>
    </div>
  );
};

export default SectionLatestPosts;
