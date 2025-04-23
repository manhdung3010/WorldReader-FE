"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface CartContextType {
  cartProducts: any[];
  addToCart: (product: any) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartProducts, setCartProducts] = useState<any[]>([]);

  // Load dữ liệu từ localStorage khi mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cartProducts");
    if (storedCart) {
      try {
        setCartProducts(JSON.parse(storedCart));
      } catch {
        localStorage.removeItem("cartProducts"); // Xóa nếu dữ liệu lỗi
      }
    }
  }, []);

  // Lưu vào localStorage khi giỏ hàng thay đổi
  useEffect(() => {
    if (cartProducts.length > 0) {
      localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  const addToCart = (product: any) => {
    setCartProducts((prev) => {
      const existingProduct = prev.find((p) => p.id === product.id);
      const productQuantity = product.quantity ?? 1; // Kiểm tra nếu có quantity, nếu không thì mặc định là 1

      let updatedCart;
      if (existingProduct) {
        updatedCart = prev.map((p) =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + productQuantity }
            : p
        );
      } else {
        updatedCart = [...prev, { ...product, quantity: productQuantity }];
      }

      localStorage.setItem("cartProducts", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeFromCart = (productId: string) => {
    setCartProducts((prev) => {
      const updatedCart = prev.filter((p) => p.id !== productId);
      localStorage.setItem("cartProducts", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCartProducts([]);
    localStorage.removeItem("cartProducts");
  };

  return (
    <CartContext.Provider
      value={{ cartProducts, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
