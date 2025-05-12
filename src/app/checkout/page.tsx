"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import CheckoutPage from "@/modules/checkout";

export default function Checkout() {
  const router = useRouter();
  const { isAuthenticated, checkAuth } = useAuth();

  useEffect(() => {
    if (!checkAuth()) {
      router.push("/login");
    }
  }, [checkAuth, router]);

  if (!isAuthenticated) {
    return null;
  }

  return <CheckoutPage />;
}
