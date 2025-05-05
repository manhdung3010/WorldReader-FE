"use client";

import React from "react";
import Avatar from "@/shared/Avatar/Avatar";
import Badge from "@/shared/Badge/Badge";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Comment from "@/shared/Comment/Comment";
import NcImage from "@/shared/NcImage/NcImage";
import SocialsList from "@/shared/SocialsList/SocialsList";
import Textarea from "@/shared/Textarea/Textarea";
import { _getImgRd, _getPersonNameRd, _getTitleRd } from "@/contains/fakeData";
import Tag from "@/shared/Tag/Tag";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getDetailPostByUrl, getPost } from "@/services/post.service";
import { useParams } from "next/navigation";
import { formatDateCreateAt } from "@/utils/time";

const BlogDetailPage = () => {
  const { url }: any = useParams();

  // Lấy chi tiết sản phẩm
  const {
    data: postDetail,
    isLoading,
    isError,
  } = useQuery(
    ["POST_DETAIL", url],
    () => (url !== "add" ? getDetailPostByUrl(url) : null),
    { enabled: url !== "add" }
  );

  const {
    data: posts,
    isLoading: isLoadingPostRelated,
    isError: isErrorPostRelated,
  } = useQuery<any>(
    ["POST"],
    () =>
      getPost({
        sortBy: "latest",
        page: 1,
        pageSize: 4,
      }),
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

  const renderHeader = () => {
    return (
      <header className="container rounded-xl">
        <div className="max-w-screen-md mx-auto space-y-5">
          <h1
            className=" text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-4xl dark:text-neutral-100 max-w-4xl "
            title="Quiet ingenuity: 120,000 lunches and counting"
          >
            {postDetail?.data?.name}
          </h1>
          <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
          <div className="flex flex-col items-center sm:flex-row sm:justify-between">
            <div className="nc-PostMeta2 flex items-center flex-wrap text-neutral-700 text-left dark:text-neutral-200 text-sm leading-none flex-shrink-0">
              <Avatar
                containerClassName="flex-shrink-0"
                sizeClass="w-8 h-8 sm:h-11 sm:w-11 "
                imgUrl={postDetail?.data?.authorImage}
              />
              <div className="ml-3">
                <div className="flex items-center">
                  <a className="block font-semibold" href="##">
                    {postDetail?.data?.author}
                  </a>
                </div>
                <div className="text-xs mt-[6px]">
                  <span className="text-neutral-700 dark:text-neutral-300">
                    {formatDateCreateAt(postDetail?.data?.createdAt)}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-3 sm:mt-1.5 sm:ml-3">
              <SocialsList />
            </div>
          </div>
        </div>
      </header>
    );
  };

  const renderImage = () => {
    if (!postDetail?.data?.image?.length) return null;

    return (
      <div className="mx-auto !max-w-screen-md my-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {postDetail.data.image.map((image: string, index: number) => (
            <div
              key={index}
              className="relative group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <NcImage
                alt={`Gallery image ${index + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                loading="lazy"
                containerClassName="aspect-[4/3] w-full relative"
                className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500 ease-out"
                src={image}
              />
              {/* Optional overlay for hover effects */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div
        id="single-entry-content"
        className="prose prose-sm !max-w-screen-md sm:prose lg:prose-lg mx-auto dark:prose-invert"
      >
        <p
          dangerouslySetInnerHTML={{
            __html: postDetail?.data?.content,
          }}
        />
      </div>
    );
  };

  const renderTags = () => {
    return (
      <div className="max-w-screen-md mx-auto flex flex-wrap space-x-2">
        {postDetail?.data?.categories.map((category: any, index: number) => (
          <Tag
            key={index}
            data={category}
            href={`/news/category/${category?.url}` as any}
          />
        ))}
      </div>
    );
  };

  const renderPostRelated = (post: any, index: number) => {
    if (isLoadingPostRelated) {
      return <p>Loading related posts...</p>;
    }

    if (isErrorPostRelated) {
      return <p>Error loading related posts</p>;
    }

    return (
      <div
        key={index}
        className="relative aspect-w-3 aspect-h-4 rounded-3xl overflow-hidden group"
      >
        <Link href={`/news/${post?.url}` as any} />
        <Image
          alt="Related"
          fill
          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
          src={post?.thumbnail || _getImgRd()}
          sizes="400px"
        />
        <div>
          <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black"></div>
        </div>
        <div className="flex flex-col justify-end items-start text-xs text-neutral-300 space-y-2.5 p-4">
          <h2 className="block text-lg font-semibold text-white ">
            <span className="line-clamp-2">{post?.name || _getTitleRd()}</span>
          </h2>

          <div className="flex">
            <span className="block text-neutral-200 hover:text-white font-medium truncate">
              {post?.author || _getPersonNameRd()}
            </span>
            <span className="mx-1.5 font-medium">·</span>
            <span className="font-normal truncate">
              {formatDateCreateAt?.(post?.createdAt) || "May 20, 2021"}
            </span>
          </div>
        </div>
        <Link href={`/news/${post?.url}` as any} />
      </div>
    );
  };

  return (
    <div className="nc-PageSingle pt-8 lg:pt-16 ">
      {renderHeader()}

      <div className="nc-SingleContent container space-y-10">
        {renderImage()}
        {renderContent()}
        {renderTags()}
      </div>
      <div className="relative bg-neutral-100 dark:bg-neutral-800 py-16 lg:py-28 mt-16 lg:mt-24">
        <div className="container ">
          <h2 className="text-3xl font-semibold">Related posts</h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {/*  */}
            {posts?.data
              .filter((_: any, i: number) => i < 4)
              .map((post: any, i: number) => renderPostRelated(post, i))}

            {/*  */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
