"use client";

import BgGlassmorphism from "@/components/BgGlassmorphism/BgGlassmorphism";
import SectionPromo3 from "@/components/SectionPromo3";
import {
  getDetailCategoryPostByUrl,
  getPostByCategory,
} from "@/services/post.service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import Card3 from "./Card3";

export default function CategoryBlogDetailPage() {
  const { url } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const { data: categoryPostDetail } = useQuery(
    ["CATEGORY_POST_DETAIL", url],
    () => (url !== "add" ? getDetailCategoryPostByUrl(url) : null),
    { enabled: url !== "add" }
  );

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery(
    ["POST", url],
    () =>
      url !== "add"
        ? getPostByCategory(url, {
            page: currentPage,
            pageSize: postsPerPage,
          })
        : null,
    { enabled: url !== "add" }
  );

  console.log(posts);

  return (
    <div className="nc-BlogPage overflow-hidden relative">
      <BgGlassmorphism />
      <div className="container relative mt-10">
        <div className="max-w-screen-sm">
          <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
            {categoryPostDetail?.data?.name}
          </h2>
        </div>

        <div className={`grid gap-6 md:gap-8 grid-cols-4 my-10`}>
          {posts?.data.map((post: any, index: number) => (
            <Card3 key={index} className="" post={post} />
          ))}
        </div>
        <SectionPromo3 className="pb-16 lg:pb-28" />
      </div>
    </div>
  );
}
