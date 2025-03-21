import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { NavItemType } from "@/shared/Navigation/NavigationItem";
import ncNanoId from "@/utils/ncNanoId";
import { getCategoryProduct } from "@/services/category-product.service";

export const useMegaMenuBooks = () => {
  const [megaMenuBooks, setMegaMenuBooks] = useState<NavItemType[]>([]);

  const {
    data: category,
    isLoading,
    isError,
  } = useQuery(["CATEGORY_PRODUCT"], getCategoryProduct, {
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!category) {
      setMegaMenuBooks([]);
      return;
    }

    const menuItems = category?.data?.map((item: any) => ({
      id: item.id || ncNanoId(),
      href: item.url || "#",
      name: item.name || "Unnamed Category",
      children: Array.isArray(item.children)
        ? item.children.map((child: any) => ({
            id: child.id || ncNanoId(),
            href: child.url || "#",
            name: child.name || "Unnamed Child",
            isNew: !!child.isNew,
          }))
        : [],
    }));

    setMegaMenuBooks(menuItems);
  }, [category]);

  return { megaMenuBooks, isLoading, isError };
};
