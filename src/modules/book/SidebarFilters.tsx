"use client";

import React, { useState, useEffect } from "react";
import Checkbox from "@/shared/Checkbox/Checkbox";
import Slider from "rc-slider";
import Radio from "@/shared/Radio/Radio";
import MySwitch from "@/components/MySwitch";
import { useQuery } from "@tanstack/react-query";
import { getCategoryProduct } from "@/services/category-product.service";

const DATA_status = [
  { name: "In Stock", value: "IN_STOCK" },
  { name: "Out Of Stock", value: "OUT_OF_STOCK" },
];

const DATA_display = [
  { name: "Show", value: "show" },
  { name: "Hide", value: "hide" },
];

const PRICE_RANGE = [0, 1000000];
//
const SidebarFilters = ({
  onFilterChange,
}: {
  onFilterChange: (filters: any) => void;
}) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [rangePrices, setRangePrices] = useState([0, 1000000]);
  const [status, setStatus] = useState<string>("");
  const [isDiscount, setIsDiscount] = useState<boolean | null>(null);
  const [display, setDisplay] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery(["CATEGORY_PRODUCT"], getCategoryProduct, {
    refetchOnWindowFocus: false,
  });

  console.log(categories);

  // Update parent component when filters change
  useEffect(() => {
    onFilterChange({
      name,
      code,
      priceMin: rangePrices[0],
      priceMax: rangePrices[1],
      status,
      categories: selectedCategories.length > 0 ? selectedCategories : null,
      isDiscount,
      display,
    });
  }, [
    name,
    code,
    rangePrices,
    status,
    selectedCategories,
    isDiscount,
    display,
    onFilterChange,
  ]);

  const handleCategoryChange = (checked: boolean, categoryId: number) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      );
    }
  };

  const renderTabsSearch = () => {
    return (
      <div className="relative flex flex-col pb-8 space-y-4">
        <h3 className="font-semibold mb-2.5">Search</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-neutral-200 dark:border-neutral-700 bg-transparent"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
            />
          </div>
          {/* <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Code
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-neutral-200 dark:border-neutral-700 bg-transparent"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter product code"
            />
          </div> */}
        </div>
      </div>
    );
  };

  const renderTabsCategories = () => {
    if (!categories?.data) return null;

    const renderCategoryItem = (category: any) => {
      return (
        <div key={category.id} className="pl-4">
          <Checkbox
            name={category.name}
            label={category.name}
            defaultChecked={selectedCategories.includes(category.id)}
            sizeClassName="w-5 h-5"
            labelClassName="text-sm font-normal"
            onChange={(checked) => handleCategoryChange(checked, category.id)}
          />
          {category.children && category.children.length > 0 && (
            <div className="ml-4">
              {category.children.map((child: any) => (
                <div key={child.id} className="mt-2">
                  <Checkbox
                    name={child.name}
                    label={child.name}
                    defaultChecked={selectedCategories.includes(child.id)}
                    sizeClassName="w-5 h-5"
                    labelClassName="text-sm font-normal"
                    onChange={(checked) =>
                      handleCategoryChange(checked, child.id)
                    }
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      );
    };

    return (
      <div className="relative flex flex-col py-8 space-y-4">
        <h3 className="font-semibold mb-2.5">Categories</h3>
        {categories.data.map(renderCategoryItem)}
      </div>
    );
  };

  const renderTabsPriceRage = () => {
    return (
      <div className="relative flex flex-col py-8 space-y-5 pr-3">
        <div className="space-y-5">
          <span className="font-semibold">Price range</span>
          <Slider
            range
            min={PRICE_RANGE[0]}
            max={PRICE_RANGE[1]}
            step={1}
            defaultValue={[rangePrices[0], rangePrices[1]]}
            allowCross={false}
            onChange={(_input: number | number[]) =>
              setRangePrices(_input as number[])
            }
          />
        </div>

        <div className="flex justify-between space-x-5">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Min price
            </label>
            <div className="mt-1 relative rounded-md">
              <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-500 sm:text-sm">
                $
              </span>
              <input
                type="text"
                disabled
                className="block w-32 pr-10 pl-4 sm:text-sm border-neutral-200 dark:border-neutral-700 rounded-full bg-transparent"
                value={rangePrices[0]}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Max price
            </label>
            <div className="mt-1 relative rounded-md">
              <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-500 sm:text-sm">
                $
              </span>
              <input
                type="text"
                disabled
                className="block w-32 pr-10 pl-4 sm:text-sm border-neutral-200 dark:border-neutral-700 rounded-full bg-transparent"
                value={rangePrices[1]}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTabsStatus = () => {
    return (
      <div className="relative flex flex-col py-8 space-y-4">
        <h3 className="font-semibold mb-2.5">Status</h3>
        {DATA_status.map((item) => (
          <Radio
            id={`status-${item.value}`}
            key={item.value}
            name="status"
            label={item.name}
            defaultChecked={status === item.value}
            onChange={() => setStatus(item.value)}
            sizeClassName="w-5 h-5"
            className="!text-sm"
          />
        ))}
      </div>
    );
  };

  const renderTabsDisplay = () => {
    return (
      <div className="relative flex flex-col py-8 space-y-4">
        <h3 className="font-semibold mb-2.5">Display</h3>
        {DATA_display.map((item) => (
          <Radio
            id={`display-${item.value}`}
            key={item.value}
            name="display"
            label={item.name}
            defaultChecked={display === item.value}
            onChange={() => setDisplay(item.value)}
            sizeClassName="w-5 h-5"
            className="!text-sm"
          />
        ))}
      </div>
    );
  };

  return (
    <div className="divide-y divide-slate-200 dark:divide-slate-700">
      {renderTabsSearch()}
      {renderTabsCategories()}
      {renderTabsPriceRage()}
      {renderTabsStatus()}
      <div className="py-8 pr-2">
        <MySwitch
          label="On sale!"
          desc="Products currently on sale"
          enabled={isDiscount === true}
          onChange={(checked) => setIsDiscount(checked)}
        />
      </div>
      {/* {renderTabsDisplay()} */}
    </div>
  );
};

export default SidebarFilters;
