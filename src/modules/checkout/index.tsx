"use client";

import Label from "@/components/Label/Label";
import NcInputNumber from "@/components/NcInputNumber";
import Prices from "@/components/Prices";
import { Product } from "@/data/data";
import { useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import ContactInfo from "./ContactInfo";
import ShippingAddress from "./ShippingAddress";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { useShipping } from "@/contexts/ShippingContext";
import { useAuth } from "@/contexts/AuthContext";
import BookFalse from "@/images/book-false.jpg";
import { NoSymbolIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useDiscount } from "@/contexts/DiscountContext";
import DiscountForm from "./DiscountForm";
import { createOrder } from "@/services/order.service";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Route } from "@/routers/types";
import NcImage from "@/shared/NcImage/NcImage";

const CheckoutPage = () => {
  const [tabActive, setTabActive] = useState<"ContactInfo" | "ShippingAddress">(
    "ShippingAddress"
  );
  const { cartProducts, removeFromCart, updateQuantity, clearCart } = useCart();
  const { shippingAddress, setShippingAddress } = useShipping();
  const { discount, priceReduce } = useDiscount();
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: newQuantity,
    }));
    updateQuantity(productId.toString(), newQuantity);
  };

  const handleScrollToEl = (id: string) => {
    const element = document.getElementById(id);
    setTimeout(() => {
      element?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  const renderStatusSoldout = () => {
    return (
      <div className="rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
        <NoSymbolIcon className="w-3.5 h-3.5" />
        <span className="ml-1 leading-none">Out of Stock</span>
      </div>
    );
  };

  const renderStatusInstock = () => {
    return (
      <div className="rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
        <CheckIcon className="w-3.5 h-3.5" />
        <span className="ml-1 leading-none">In Stock</span>
      </div>
    );
  };

  const renderProduct = (item: any, index: number) => {
    const { avatar, price, name, id, url, status, flashSale } = item;
    const isOutOfStock = status === "OUT_OF_STOCK";
    const currentQuantity = quantities[id] || item.quantity || 1;

    const now = new Date().toISOString();
    const flashStart = flashSale?.flashSaleStartTime;
    const flashEnd = flashSale?.flashSaleEndTime;
    const flashDiscount = flashSale?.flashSaleDiscount || 0;

    const isOnSale =
      flashStart &&
      flashEnd &&
      now >= flashStart &&
      now <= flashEnd &&
      flashDiscount > 0;

    const effectivePrice = isOnSale
      ? price - (price * flashDiscount) / 100
      : price;

    return (
      <div key={index} className="relative flex py-7 first:pt-0 last:pb-0">
        <div className="relative h-36 w-24 sm:w-28 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <NcImage
            containerClassName="flex aspect-w-11 aspect-h-15 w-full h-0"
            src={avatar || BookFalse}
            className="object-cover w-full h-full drop-shadow-xl"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
            alt="product"
          />
          <Link href={`/books/${url}` as any} className="absolute inset-0" />
        </div>

        <div className="ml-3 sm:ml-6 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div className="flex-[1.5] ">
                <h3 className="text-base font-semibold">
                  <Link href={`/books/${url}` as any}>{name}</Link>
                </h3>

                <div className="mt-3 flex justify-between w-full sm:hidden relative">
                  <select
                    name="qty"
                    id="qty"
                    className="form-select text-sm rounded-md py-1 border-slate-200 dark:border-slate-700 relative z-10 dark:bg-slate-800"
                    value={currentQuantity}
                    onChange={(e) =>
                      handleQuantityChange(id, parseInt(e.target.value))
                    }
                    disabled={isOutOfStock}
                  >
                    {[1, 2, 3, 4, 5, 6, 7].map((qty) => (
                      <option key={qty} value={qty}>
                        {qty}
                      </option>
                    ))}
                  </select>
                  {isOnSale ? (
                    <Prices
                      contentClass="py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium h-full"
                      price={effectivePrice}
                    />
                  ) : (
                    <Prices
                      contentClass="py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium h-full"
                      price={price}
                    />
                  )}
                </div>
              </div>

              <div className="hidden sm:block text-center relative">
                <NcInputNumber
                  className="relative z-10"
                  defaultValue={currentQuantity}
                  onChange={(value) => handleQuantityChange(id, value)}
                  disabled={isOutOfStock}
                />
              </div>

              <div className="hidden flex-1 sm:flex justify-end">
                {isOnSale ? (
                  <Prices price={effectivePrice} className="mt-0.5" />
                ) : (
                  <Prices price={price} className="mt-0.5" />
                )}
              </div>
            </div>
          </div>

          <div className="flex mt-auto pt-4 items-end justify-between text-sm">
            {isOutOfStock ? renderStatusSoldout() : renderStatusInstock()}

            <button
              onClick={() => removeFromCart(id.toString())}
              className="relative z-10 flex items-center mt-3 font-medium text-primary-6000 hover:text-primary-500 text-sm"
            >
              <span>Remove</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const calculateSubtotal = () => {
    const now = new Date().toISOString();

    return cartProducts.reduce((total, item) => {
      const quantity = quantities[item.id] || item.quantity || 1;
      const flashStart = item.flashSale?.flashSaleStartTime;
      const flashEnd = item.flashSale?.flashSaleEndTime;
      const flashDiscount = item.flashSale?.flashSaleDiscount || 0;

      const isOnSale =
        flashStart &&
        flashEnd &&
        now >= flashStart &&
        now <= flashEnd &&
        flashDiscount > 0;

      const effectivePrice = isOnSale
        ? item.price - (item.price * flashDiscount) / 100
        : item.price;

      return total + effectivePrice * quantity;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const shipping = 0;
  const tax = 0;
  const total = subtotal + shipping + tax - (priceReduce || 0);

  const handleConfirmOrder = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to place an order");
      router.push("/login" as Route);
      return;
    }

    if (cartProducts.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!shippingAddress) {
      toast.error("Please fill in your shipping information");
      return;
    }

    if (
      !shippingAddress.fullName ||
      !shippingAddress.phone ||
      !shippingAddress.address
    ) {
      toast.error("Please fill in all required shipping information");
      return;
    }

    try {
      setIsSubmitting(true);

      const orderItems = cartProducts.map((item) => ({
        productId: item.id,
        quantity: quantities[item.id] || item.quantity || 1,
      }));

      const orderPayload = {
        discountCode: discount?.code || "",
        notes: notes,
        orderItems: orderItems,
        shipping: {
          name: shippingAddress.fullName,
          phone: shippingAddress.phone,
          address: shippingAddress.address,
          streetName: shippingAddress.address, // Using address as streetName
          addressType: "HOME", // Default value
        },
      };


      const response = await createOrder(orderPayload);

      if (response.data) {
        toast.success("Order placed successfully!");
        clearCart();
        router.push("/account-order" as Route);
      } else {
        toast.error("Failed to place order");
      }
    } catch (error: any) {
      console.error("Error creating order:", error);
      toast.error(error.response?.data?.message || "Failed to place order");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderLeft = () => {
    return (
      <div className="space-y-8">
        <div id="ContactInfo" className="scroll-mt-24">
          <ContactInfo
            isActive={tabActive === "ContactInfo"}
            onOpenActive={() => {
              setTabActive("ContactInfo");
              handleScrollToEl("ContactInfo");
            }}
            onCloseActive={() => {
              setTabActive("ShippingAddress");
              handleScrollToEl("ShippingAddress");
            }}
          />
        </div>

        <div id="ShippingAddress" className="scroll-mt-24">
          <ShippingAddress
            isActive={tabActive === "ShippingAddress"}
            onOpenActive={() => {
              setTabActive("ShippingAddress");
              handleScrollToEl("ShippingAddress");
            }}
            onCloseActive={() => setTabActive("ShippingAddress")}
            shippingAddress={shippingAddress}
            setShippingAddress={setShippingAddress}
          />
        </div>

        <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 xl:p-6">
          <h3 className="text-lg font-medium mb-4">Order Notes</h3>
          <textarea
            className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800"
            rows={4}
            placeholder="Add notes to your order (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
      </div>
    );
  };

  return (
    <div className="nc-CheckoutPage">
      <main className="container py-16 lg:pb-28 lg:pt-20 ">
        <div className="mb-16">
          <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold ">
            Checkout
          </h2>
          <div className="block mt-3 sm:mt-5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-400">
            <Link href={"/"} className="">
              Homepage
            </Link>
            <span className="text-xs mx-1 sm:mx-1.5">/</span>
            <Link href={"/collection"} className="">
              Books Categories
            </Link>
            <span className="text-xs mx-1 sm:mx-1.5">/</span>
            <span className="underline">Checkout</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 xl:gap-14">
          <div className="flex-1">{renderLeft()}</div>

          <div className="flex-shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 my-10 lg:my-0 lg:mx-10 xl:lg:mx-14 2xl:mx-16 "></div>

          <div className="w-full lg:w-[36%] ">
            <h3 className="text-lg font-semibold">Order summary</h3>
            <div className="mt-8 divide-y divide-slate-200/70 dark:divide-slate-700">
              {cartProducts.map((item, index) => renderProduct(item, index))}
            </div>

            <div className="mt-10 pt-6 text-sm text-slate-500 dark:text-slate-400 border-t border-slate-200/70 dark:border-slate-700 ">
              <DiscountForm
                products={cartProducts.map((item) => ({
                  productId: item.id,
                  quantity: quantities[item.id] || item.quantity || 1,
                }))}
              />

              <div className="mt-4 flex justify-between py-2.5">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900 dark:text-slate-200">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between py-2.5">
                <span>Shipping estimate</span>
                <span className="font-semibold text-slate-900 dark:text-slate-200">
                  ${shipping.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between py-2.5">
                <span>Tax estimate</span>
                <span className="font-semibold text-slate-900 dark:text-slate-200">
                  ${tax.toFixed(2)}
                </span>
              </div>
              {discount && (
                <div className="flex justify-between py-2.5 text-green-600">
                  <span>Discount</span>
                  <span className="font-semibold">
                    -${priceReduce.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
                <span>Order total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <ButtonPrimary
              className="mt-8 w-full"
              onClick={handleConfirmOrder}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Confirm order"}
            </ButtonPrimary>
            <div className="mt-5 text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center">
              <p className="block relative pl-5">
                <svg
                  className="w-4 h-4 absolute -left-1 top-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 8V13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.9945 16H12.0035"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Learn more{` `}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="##"
                  className="text-slate-900 dark:text-slate-200 underline font-medium"
                >
                  Taxes
                </a>
                <span>
                  {` `}and{` `}
                </span>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="##"
                  className="text-slate-900 dark:text-slate-200 underline font-medium"
                >
                  Shipping
                </a>
                {` `} infomation
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
