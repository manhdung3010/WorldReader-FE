import React, { createContext, useContext, useState, ReactNode } from "react";
import { checkDiscount, getPriceReduce } from "@/services/discount.service";

interface DiscountData {
  id: number;
  name: string;
  code: string;
  active: boolean;
  display: boolean;
  discountType: string;
  price: number;
  usageLimit: number;
  maxDiscount: number;
  minPurchase: number;
  isFullDiscount: boolean;
  startTime: string;
  endTime: string;
  categoryDiscount: any[];
}

interface DiscountContextType {
  discount: DiscountData | null;
  priceReduce: number;
  loading: boolean;
  error: string | null;
  checkDiscountCode: (
    code: string,
    products: { productId: number; quantity: number }[]
  ) => Promise<void>;
  clearDiscount: () => void;
}

const DiscountContext = createContext<DiscountContextType | undefined>(
  undefined
);

export const DiscountProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [discount, setDiscount] = useState<DiscountData | null>(null);
  const [priceReduce, setPriceReduce] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const checkDiscountCode = async (
    code: string,
    products: { productId: number; quantity: number }[]
  ) => {
    try {
      setLoading(true);
      setError(null);

      // First check if the discount code is valid
      const checkResponse = await checkDiscount(code);
      console.log("Check discount response:", checkResponse);

      // Check if the response has the expected structure
      if (checkResponse.data && checkResponse.data.id) {
        // Set discount data directly from the response
        setDiscount(checkResponse.data);

        // Calculate price reduction based on discount type
        const discountData = checkResponse.data;
        if (discountData.discountType === "PERCENTAGE") {
          // Calculate percentage discount
          const subtotal = products.reduce(
            (total, item) => total + item.quantity,
            0
          );
          const discountAmount = (subtotal * discountData.price) / 100;

          // Apply max discount limit if specified
          if (
            discountData.maxDiscount > 0 &&
            discountAmount > discountData.maxDiscount
          ) {
            setPriceReduce(discountData.maxDiscount);
          } else {
            setPriceReduce(discountAmount);
          }
        } else {
          // Fixed amount discount
          setPriceReduce(discountData.price);
        }

        // Try to get price reduction from API if available
        try {
          const reduceResponse = await getPriceReduce([{ code, products }]);
          console.log("Price reduce response:", reduceResponse);

          if (reduceResponse.data && reduceResponse.data.priceReduce) {
            setPriceReduce(reduceResponse.data.priceReduce);
          }
        } catch (reduceErr) {
          console.error("Error getting price reduction:", reduceErr);
          // Continue with the calculated price reduction
        }
      } else {
        setError("Invalid discount code");
      }
    } catch (err: any) {
      console.error("Discount error:", err);
      setError(err.response?.data?.message || "Failed to apply discount");
      setDiscount(null);
      setPriceReduce(0);
    } finally {
      setLoading(false);
    }
  };

  const clearDiscount = () => {
    setDiscount(null);
    setPriceReduce(0);
    setError(null);
  };

  return (
    <DiscountContext.Provider
      value={{
        discount,
        priceReduce,
        loading,
        error,
        checkDiscountCode,
        clearDiscount,
      }}
    >
      {children}
    </DiscountContext.Provider>
  );
};

export const useDiscount = () => {
  const context = useContext(DiscountContext);
  if (context === undefined) {
    throw new Error("useDiscount must be used within a DiscountProvider");
  }
  return context;
};
