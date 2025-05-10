"use client";
import { createContext, useContext, useState, useEffect } from "react";

export interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

interface ShippingContextType {
  shippingAddress: ShippingAddress | null;
  setShippingAddress: (address: ShippingAddress) => void;
  clearShippingAddress: () => void;
}

const ShippingContext = createContext<ShippingContextType | undefined>(
  undefined
);

export const ShippingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [shippingAddress, setShippingAddress] =
    useState<ShippingAddress | null>(null);

  // Load shipping address from localStorage when component mounts
  useEffect(() => {
    const storedAddress = localStorage.getItem("shippingAddress");
    if (storedAddress) {
      try {
        setShippingAddress(JSON.parse(storedAddress));
      } catch {
        localStorage.removeItem("shippingAddress"); // Remove if data is corrupted
      }
    }
  }, []);

  // Save to localStorage whenever shipping address changes
  useEffect(() => {
    if (shippingAddress) {
      localStorage.setItem("shippingAddress", JSON.stringify(shippingAddress));
    }
  }, [shippingAddress]);

  const clearShippingAddress = () => {
    setShippingAddress(null);
    localStorage.removeItem("shippingAddress");
  };

  return (
    <ShippingContext.Provider
      value={{
        shippingAddress,
        setShippingAddress,
        clearShippingAddress,
      }}
    >
      {children}
    </ShippingContext.Provider>
  );
};

export const useShipping = () => {
  const context = useContext(ShippingContext);
  if (!context) {
    throw new Error("useShipping must be used within ShippingProvider");
  }
  return context;
};
