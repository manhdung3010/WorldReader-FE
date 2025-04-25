"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { LikeProvider } from "@/contexts/LikeContext";
import { Toaster } from "react-hot-toast";
import { ReactNode } from "react";

// Create a client
const queryClient = new QueryClient();

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <LikeProvider>{children}</LikeProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
