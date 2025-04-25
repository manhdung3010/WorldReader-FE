"use client";

import React, { FC, useEffect, useState } from "react";
import CardCategory1 from "@/components/CardCategories/CardCategory1";
import CardCategory4 from "@/components/CardCategories/CardCategory4";
import Heading from "@/components/Heading/Heading";
import NavItem2 from "@/components/NavItem2";
import Nav from "@/shared/Nav/Nav";
import CardCategory6 from "@/components/CardCategories/CardCategory6";
import {
  DEMO_MORE_EXPLORE_DATA,
  ExploreType,
} from "@/components/SectionGridMoreExplore/data";
import { useQuery } from "@tanstack/react-query";
import { getCategoryProduct } from "@/services/category-product.service";
import { AxiosResponse } from "axios";

interface Category {
  id: number;
  name: string;
  description: string;
  url: string;
  display: boolean;
  homeDisplay: boolean;
  image: string | null;
  children: Category[];
  parents: any[];
  seo: {
    title: string;
    description: string;
  };
}

interface CategoryResponse {
  data: Category[];
  statusNumber: number;
  message: string;
  totalElements: number;
  totalPages: number;
}

interface CardData {
  id: number;
  name: string;
  desc: string;
  image: string;
  color: string;
  svgBg: string;
  url: string;
}

export interface SectionGridMoreExploreProps {
  className?: string;
  gridClassName?: string;
  boxCard?: "box1" | "box4" | "box6";
  data?: ExploreType[];
}

const SectionGridMoreExplore: FC<SectionGridMoreExploreProps> = ({
  className = "",
  boxCard = "box4",
  gridClassName = "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
  data = DEMO_MORE_EXPLORE_DATA.filter((_, i) => i < 6),
}) => {
  const [tabActive, setTabActive] = useState("All");

  const {
    data: categoryResponse,
    isLoading,
    isError,
  } = useQuery<CategoryResponse>(
    ["CATEGORY_PRODUCT"],
    async () => {
      const response: AxiosResponse<CategoryResponse> =
        await getCategoryProduct({});
      return response.data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (categoryResponse?.data?.length) {
      setTabActive(categoryResponse.data[0].name);
    }
  }, [categoryResponse]);

  const renderCard = (item: Category) => {
    const cardData: CardData = {
      id: item.id,
      name: item.name,
      desc: item.description,
      image: item.image || "",
      color: "bg-blue-50",
      svgBg: "",
      url: item.url,
    };

    const cardProps = {
      ...cardData,
      featuredImage: cardData.image,
      bgSVG: cardData.svgBg,
      color: cardData.color,
    };

    switch (boxCard) {
      case "box1":
        return <CardCategory1 key={item.id} {...cardProps} />;
      case "box4":
        return <CardCategory4 key={item.id} {...cardProps} />;
      case "box6":
        return <CardCategory6 key={item.id} {...cardProps} />;
      default:
        return <CardCategory4 key={item.id} {...cardProps} />;
    }
  };

  const renderCategorySection = (parentCategory: Category) => {
    return (
      <div key={parentCategory.id} className="mb-12">
        <Heading
          className="mb-8 text-neutral-900 dark:text-neutral-50"
          fontClass="text-2xl md:text-3xl font-semibold"
          isCenter
          desc=""
        >
          {parentCategory.name}
        </Heading>
        <div className={`grid gap-4 md:gap-7 ${gridClassName}`}>
          {parentCategory.children.map((child) => renderCard(child))}
        </div>
      </div>
    );
  };

  const renderHeading = () => {
    return (
      <div>
        <Heading
          className="mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50"
          fontClass="text-3xl md:text-4xl 2xl:text-5xl font-semibold"
          isCenter
          desc=""
        >
          Start exploring
        </Heading>
        <Nav
          className="p-1 bg-white dark:bg-neutral-800 rounded-full shadow-lg overflow-x-auto hiddenScrollbar"
          containerClassName="mb-12 lg:mb-14 relative flex justify-center w-full text-sm md:text-base"
        >
          {[
            // {
            //   name: "All",
            //   icon: `<svg class="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            //   <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            //   <path d="M12 8V16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            //   <path d="M8 12H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            // </svg>`,
            // },
            ...(categoryResponse?.data || []).map((category: Category) => ({
              name: category.name,
              icon: `<svg class="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 8V16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8 12H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>`,
            })),
          ].map((item, index) => (
            <NavItem2
              key={index}
              isActive={tabActive === item.name}
              onClick={() => setTabActive(item.name)}
            >
              <div className="flex items-center justify-center space-x-1.5 sm:space-x-2.5 text-xs sm:text-sm ">
                <span
                  className="inline-block"
                  dangerouslySetInnerHTML={{ __html: item.icon }}
                ></span>
                <span>{item.name}</span>
              </div>
            </NavItem2>
          ))}
        </Nav>
      </div>
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading categories</div>;
  }

  const filteredData =
    tabActive === "All"
      ? categoryResponse?.data || []
      : categoryResponse?.data?.filter(
          (cat: Category) => cat.name === tabActive
        ) || [];

  return (
    <div className={`nc-SectionGridMoreExplore relative ${className}`}>
      {renderHeading()}
      {filteredData.map((parentCategory) =>
        renderCategorySection(parentCategory)
      )}
    </div>
  );
};

export default SectionGridMoreExplore;
