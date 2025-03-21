"use client";

import React, { FC } from "react";
import Card12 from "./Card12";
import Card13 from "./Card13";
import { useQuery } from "@tanstack/react-query";
import { getPost } from "@/services/post.service";

export interface SectionMagazine5Props {}

const SectionMagazine5: FC<SectionMagazine5Props> = () => {
  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery(["POST"], getPost, {
    refetchOnWindowFocus: false,
  });

  if (isError) {
    return <p>Error loading posts</p>;
  }

  return (
    <div className="nc-SectionMagazine5">
      <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
        <Card12 post={posts?.data?.[0]} isLoading={isLoading} />
        <div className="grid gap-6 md:gap-8">
          {posts?.data?.slice(1, 4).map((post: any, index: number) => (
            <Card13 key={index} post={post} isLoading={isLoading} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionMagazine5;
