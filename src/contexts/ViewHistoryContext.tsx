"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Product } from "@/data/data";

interface ViewHistoryContextType {
  viewedProducts: Product[];
  addToViewHistory: (product: Product) => void;
  removeFromViewHistory: (productId: number) => void;
  clearViewHistory: () => void;
}

const ViewHistoryContext = createContext<ViewHistoryContextType | undefined>(
  undefined
);

export const ViewHistoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [viewedProducts, setViewedProducts] = useState<Product[]>([]);

  // Load view history from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("viewHistory");
    if (stored) {
      setViewedProducts(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage whenever view history changes
  useEffect(() => {
    localStorage.setItem("viewHistory", JSON.stringify(viewedProducts));
  }, [viewedProducts]);

  const addToViewHistory = (product: Product) => {
    setViewedProducts((prev) => {
      // Remove if already exists to avoid duplicates
      const filtered = prev.filter((p) => p.id !== product.id);
      // Add to beginning of array
      return [product, ...filtered].slice(0, 50); // Keep only last 50 viewed products
    });
  };

  const removeFromViewHistory = (productId: number) => {
    setViewedProducts((prev) =>
      prev.filter((product) => product.id !== productId)
    );
  };

  const clearViewHistory = () => {
    setViewedProducts([]);
  };

  return (
    <ViewHistoryContext.Provider
      value={{
        viewedProducts,
        addToViewHistory,
        removeFromViewHistory,
        clearViewHistory,
      }}
    >
      {children}
    </ViewHistoryContext.Provider>
  );
};

export const useViewHistory = () => {
  const context = useContext(ViewHistoryContext);
  if (context === undefined) {
    throw new Error("useViewHistory must be used within a ViewHistoryProvider");
  }
  return context;
};
