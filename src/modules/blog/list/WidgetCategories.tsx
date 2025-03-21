import CardCategory1 from "@/components/CardCategories/CardCategory1";
import React, { FC, useState } from "react";
import WidgetHeading1 from "./WidgetHeading1";
import { useQuery } from "@tanstack/react-query";
import { getCategoryPost } from "@/services/post.service";

export interface WidgetCategoriesProps {
  className?: string;
}

const WidgetCategories: FC<WidgetCategoriesProps> = ({
  className = "bg-neutral-100 dark:bg-neutral-800",
}) => {
  const [postsPerPage, setPostsPerPage] = useState(5);

  const {
    data: categoryPost,
    isLoading,
    isError,
  } = useQuery<any>(
    ["CATEGORY_POST", postsPerPage],
    () => getCategoryPost({ pageSize: postsPerPage }),
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div
      className={`nc-WidgetCategories rounded-3xl overflow-hidden ${className}`}
      data-nc-id="WidgetCategories"
    >
      <WidgetHeading1
        title="✨ Trending topic"
      />
      <div className="flow-root">
        <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700">
          {categoryPost?.data.map((category: any, index: number) => (
            <CardCategory1
              className="p-4 xl:p-5 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              key={index}
              category={category}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WidgetCategories;
