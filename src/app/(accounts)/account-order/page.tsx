"use client";

import Prices from "@/components/Prices";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getOrderByUser } from "@/services/order.service";
import { useAuth } from "@/contexts/AuthContext";
import Spinner from "@/shared/Spinner";
import { format } from "date-fns";
import BookFalse from "@/images/book-false.jpg";

interface Product {
  id: number;
  name: string;
  image: string[];
  url: string;
  price: number;
  avatar: string;
  status: string;
}

interface OrderItem {
  product: Product;
  quantity: number;
  productId: number;
}

interface Shipping {
  name: string;
  phone: string;
  address: string;
  streetName: string;
  addressType: string;
}

interface Order {
  id: number;
  orderCode: string;
  status: string;
  payStatus: string;
  totalPrice: string;
  discountPrice: string;
  discountCode: string;
  createdAt: string;
  updatedAt: string;
  notes: string;
  shipping: Shipping;
  orderItems: OrderItem[];
}

interface OrderResponse {
  data: Order[];
  statusNumber: number;
  message: string;
  totalElements: number;
  totalPages: number;
  size: number;
}

const AccountOrder = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await getOrderByUser({});
        if (response.data && Array.isArray(response.data)) {
          setOrders(response.data);
        }
      } catch (err: any) {
        console.error("Error fetching orders:", err);
        setError(err.response?.data?.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated]);

  const renderProductItem = (item: OrderItem, index: number) => {
    const { product, quantity } = item;
    const productImage =
      product.image && product.image.length > 0
        ? product.image[0]
        : product.avatar || BookFalse;

    return (
      <div key={index} className="flex py-4 sm:py-7 last:pb-0 first:pt-0">
        <div className="relative h-24 w-16 sm:w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <Image
            fill
            sizes="100px"
            src={productImage}
            alt={product.name}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-base font-medium line-clamp-1">
                  {product.name}
                </h3>
              </div>
              <Prices price={product.price} className="mt-0.5 ml-2" />
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500 dark:text-slate-400 flex items-center">
              <span className="hidden sm:inline-block">Qty</span>
              <span className="inline-block sm:hidden">x</span>
              <span className="ml-2">{quantity}</span>
            </p>
          </div>
        </div>
      </div>
    );
  };

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "PENDING":
        return "text-yellow-500";
      case "PROCESSING":
        return "text-blue-500";
      case "SHIPPED":
        return "text-indigo-500";
      case "DELIVERED":
        return "text-green-500";
      case "CANCELLED":
        return "text-red-500";
      default:
        return "text-slate-500";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "PENDING":
        return "text-yellow-500";
      case "PAID":
        return "text-green-500";
      case "FAILED":
        return "text-red-500";
      default:
        return "text-slate-500";
    }
  };

  const renderOrder = (order: Order) => {
    const orderDate = new Date(order.createdAt);
    const formattedDate = format(orderDate, "MMM d, yyyy");

    return (
      <div
        key={order.id}
        className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden z-0 mb-6"
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-500/5">
          <div>
            <p className="text-lg font-semibold">#{order.orderCode}</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 sm:mt-2">
              <span>{formattedDate}</span>
              <span className="mx-2">·</span>
              <span className={getStatusColor(order.status)}>
                {order.status}
              </span>
              <span className="mx-2">·</span>
              <span className={getPaymentStatusColor(order.payStatus)}>
                {order.payStatus}
              </span>
            </p>
          </div>
          <div className="mt-3 sm:mt-0">
            <ButtonSecondary
              sizeClass="py-2.5 px-4 sm:px-6"
              fontSize="text-sm font-medium"
            >
              View Order
            </ButtonSecondary>
          </div>
        </div>
        <div className="border-t border-slate-200 dark:border-slate-700 p-2 sm:p-8 divide-y divide-y-slate-200 dark:divide-slate-700">
          {order.orderItems.map(renderProductItem)}
        </div>
        <div className="border-t border-slate-200 dark:border-slate-700 p-4 sm:p-8">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span className="font-medium">
              $
              {(
                parseFloat(order.totalPrice) + parseFloat(order.discountPrice)
              ).toFixed(2)}
            </span>
          </div>
          {parseFloat(order.discountPrice) > 0 && (
            <div className="flex justify-between text-sm text-green-600 mt-2">
              <span>Discount</span>
              <span className="font-medium">
                -${parseFloat(order.discountPrice).toFixed(2)}
              </span>
            </div>
          )}
          <div className="flex justify-between text-base font-semibold mt-4">
            <span>Total</span>
            <span>${parseFloat(order.totalPrice).toFixed(2)}</span>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
        <ButtonSecondary className="mt-4">Try Again</ButtonSecondary>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
          Order History
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
          You haven&apos;t placed any orders yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* HEADING */}
      <h2 className="text-2xl sm:text-3xl font-semibold">Order History</h2>
      {orders.map(renderOrder)}
    </div>
  );
};

export default AccountOrder;
