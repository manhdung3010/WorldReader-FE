"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface LikeContextType {
  likedProducts: any[];
  toggleLike: (product: any) => void;
}

const LikeContext = createContext<LikeContextType | undefined>(undefined);

export const LikeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [likedProducts, setLikedProducts] = useState<any[]>([]);

  useEffect(() => {
    const storedLikes = localStorage.getItem("likedProducts");
    if (storedLikes) {
      try {
        setLikedProducts(JSON.parse(storedLikes));
      } catch {
        localStorage.removeItem("likedProducts");
      }
    }
  }, []);

  useEffect(() => {
    if (likedProducts.length > 0) {
      localStorage.setItem("likedProducts", JSON.stringify(likedProducts));
    }
  }, [likedProducts]);

  const toggleLike = (product: any) => {
    setLikedProducts((prev) => {
      const isLiked = prev.some((p) => p.id === product.id);
      const updatedLikes = isLiked
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product];

      localStorage.setItem("likedProducts", JSON.stringify(updatedLikes));
      return updatedLikes;
    });
  };

  return (
    <LikeContext.Provider value={{ likedProducts, toggleLike }}>
      {children}
    </LikeContext.Provider>
  );
};

export const useLike = () => {
  const context = useContext(LikeContext);
  if (!context) {
    throw new Error("useLike must be used within LikeProvider");
  }
  return context;
};
