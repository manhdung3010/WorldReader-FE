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
import NcImage from "@/shared/NcImage/NcImage";
import { useQuery } from "@tanstack/react-query";
import Select from "@/shared/Select/Select";
import Pagination from "@/shared/Pagination/Pagination";
import { ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import NcModal from "@/shared/NcModal/NcModal";

interface Product {
  id: number;
  name: string;
  image: string[];
  url: string;
  price: number;
  avatar: string;
  status: string;
  flashSale?: {
    flashSaleStartTime: string;
    flashSaleEndTime: string;
    flashSaleDiscount: number;
  };
  perDiscount: number;
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

const ORDER_STATUS_OPTIONS = [
  { value: "", label: "All Status" },
  { value: "PENDING", label: "Pending" },
  { value: "RETURNED", label: "Returned" },
  { value: "SHIPPING", label: "Shipping" },
  { value: "DONE", label: "Done" },
  { value: "CANCELLED", label: "Cancelled" },
];

const PAYMENT_STATUS_OPTIONS = [
  { value: "", label: "All Payment Status" },
  { value: "PENDING", label: "Pending" },
  { value: "DONE", label: "Done" },
  { value: "FAIL", label: "Failed" },
];

const PAGE_SIZE_OPTIONS = [
  { value: "5", label: "5 per page" },
  { value: "10", label: "10 per page" },
  { value: "20", label: "20 per page" },
];

const AccountOrder = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    payStatus: "",
    page: 1,
    pageSize: 10,
  });

  const {
    data: orderResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders", filters] as const,
    queryFn: async () => {
      const response = await getOrderByUser(filters);
      return response as any;
    },
    enabled: isAuthenticated,
  });

  const orders = orderResponse?.data || [];
  const totalPages = orderResponse?.totalPages || 0;

  const handleFilterChange = (key: string, value: string | number) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      ...(key === "pageSize" && { page: 1 }), // Reset to first page when changing page size
    }));
  };

  const handleProductClick = (productUrl: string) => {
    if (productUrl) {
      router.push(`/books/${encodeURIComponent(productUrl)}`);
    }
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
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

  const renderOrderDetails = (order: Order) => {
    return (
      <div className="p-4 ">
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Order Information</h3>
            <p className="text-sm text-gray-500">
              Order Code: #{order.orderCode}
            </p>
            <p className="text-sm text-gray-500">
              Date: {format(new Date(order.createdAt), "MMM d, yyyy")}
            </p>
            <p className="text-sm text-gray-500">
              Status:{" "}
              <span className={getStatusColor(order.status)}>
                {order.status}
              </span>
            </p>
            <p className="text-sm text-gray-500">
              Payment Status:{" "}
              <span className={getPaymentStatusColor(order.payStatus)}>
                {order.payStatus}
              </span>
            </p>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold">Shipping Information</h3>
            <p className="text-sm text-gray-500">Name: {order.shipping.name}</p>
            <p className="text-sm text-gray-500">
              Phone: {order.shipping.phone}
            </p>
            <p className="text-sm text-gray-500">
              Address: {order.shipping.address}
            </p>
            <p className="text-sm text-gray-500">
              Street: {order.shipping.streetName}
            </p>
            <p className="text-sm text-gray-500">
              Type: {order.shipping.addressType}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold">Order Items</h3>
          <div className="grid grid-cols-3 gap-4">
            {order.orderItems.map((item, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="relative h-16 w-12 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                  <NcImage
                    containerClassName="flex aspect-w-11 aspect-h-15 w-full h-0"
                    src={item.product.avatar || BookFalse}
                    className="object-cover w-full h-full"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
                    alt={item.product.name}
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium">{item.product.name}</h4>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-sm font-medium">${item.product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Subtotal</span>
            <span className="font-medium">
              $
              {(
                parseFloat(order.totalPrice) + parseFloat(order.discountPrice)
              ).toFixed(2)}
            </span>
          </div>
          {parseFloat(order.discountPrice) > 0 && (
            <div className="flex justify-between text-sm text-green-600 mb-2">
              <span>Discount</span>
              <span className="font-medium">
                -${parseFloat(order.discountPrice).toFixed(2)}
              </span>
            </div>
          )}
          <div className="flex justify-between text-base font-semibold">
            <span>Total</span>
            <span>${parseFloat(order.totalPrice).toFixed(2)}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderProductItem = (item: OrderItem, index: number) => {
    const { product, quantity }: any = item;

    // Kiểm tra giảm giá cho sản phẩm (flash sale)
    const now = new Date().toISOString();
    const flashStart = product.flashSale?.flashSaleStartTime;
    const flashEnd = product.flashSale?.flashSaleEndTime;
    const flashDiscount = product.flashSale?.flashSaleDiscount || 0;

    const isOnSale =
      flashStart &&
      flashEnd &&
      now >= flashStart &&
      now <= flashEnd &&
      flashDiscount > 0;

    const effectivePrice = isOnSale
      ? product.price - (product.price * flashDiscount) / 100
      : product.price;

    return (
      <div key={index} className="flex py-4 sm:py-7 last:pb-0 first:pt-0">
        <div
          className="relative h-24 w-16 sm:w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100 cursor-pointer"
          onClick={() => handleProductClick(product.url)}
        >
          <NcImage
            containerClassName="flex aspect-w-11 aspect-h-15 w-full h-0"
            src={product.avatar || BookFalse}
            className="object-cover w-full h-full drop-shadow-xl"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
            alt="product"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between">
              <div>
                <h3
                  className="text-base font-medium line-clamp-1 cursor-pointer hover:text-primary-6000"
                  onClick={() => handleProductClick(product.url)}
                >
                  {product.name}
                </h3>
              </div>
              <Prices price={effectivePrice} className="mt-0.5 ml-2" />
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
              onClick={() => handleViewOrder(order)}
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
              ${parseFloat(order.totalPrice).toFixed(2)}
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
            <span>
              ${" "}
              {(
                parseFloat(order.totalPrice) - parseFloat(order.discountPrice)
              ).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    );
  };

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">
          {(error as any)?.response?.data?.message || "Failed to fetch orders"}
        </p>
        <ButtonSecondary className="mt-4">Try Again</ButtonSecondary>
      </div>
    );
  }

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* HEADING */}
      <h2 className="text-2xl sm:text-3xl font-semibold">Order History</h2>

      {/* FILTERS */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Select
          className="w-full sm:w-48"
          value={filters.status}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            handleFilterChange("status", e.target.value)
          }
        >
          {ORDER_STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <Select
          className="w-full sm:w-48"
          value={filters.payStatus}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            handleFilterChange("payStatus", e.target.value)
          }
        >
          {PAYMENT_STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <Select
          className="w-full sm:w-48"
          value={filters.pageSize.toString()}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            handleFilterChange("pageSize", parseInt(e.target.value))
          }
        >
          {PAGE_SIZE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>

      {/* ORDERS */}

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner />
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-10">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
            Order History
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            You haven&apos;t placed any orders yet.
          </p>
        </div>
      ) : (
        orders.map(renderOrder)
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination
            currentPage={filters.page}
            totalPages={totalPages}
            onPageChange={(page) => handleFilterChange("page", page)}
          />
        </div>
      )}

      {/* Order Details Modal */}
      <NcModal
        isOpenProp={showOrderModal}
        onCloseModal={() => setShowOrderModal(false)}
        contentExtraClass="max-w-3xl"
        modalTitle="Order Details"
        renderContent={() => selectedOrder && renderOrderDetails(selectedOrder)}
      />
    </div>
  );
};

export default AccountOrder;
