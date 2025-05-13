"use client";

import Label from "@/components/Label/Label";
import React, { FC, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import { useShipping } from "@/contexts/ShippingContext";
import type { ShippingAddress } from "@/contexts/ShippingContext";
import toast from "react-hot-toast";

const ShippingEditPage = () => {
  const { shippingAddress, setShippingAddress } = useShipping();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const address: ShippingAddress = {
        fullName: formData.get("fullName") as string,
        address: formData.get("address") as string,
        city: formData.get("city") as string,
        state: formData.get("state") as string,
        zipCode: formData.get("zipCode") as string,
        country: formData.get("country") as string,
        phone: formData.get("phone") as string,
      };

      // Validate phone number
      const phoneRegex = /^\+?[\d\s-]{10,}$/;
      if (!phoneRegex.test(address.phone)) {
        throw new Error("Please enter a valid phone number");
      }

      // Validate ZIP code
      const zipRegex = /^\d{5}(-\d{4})?$/;
      if (!zipRegex.test(address.zipCode)) {
        throw new Error("Please enter a valid ZIP code");
      }

      await setShippingAddress(address);
      toast.success("Shipping address updated successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update shipping address"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="nc-ShippingEditPage">
      <div className="space-y-10 sm:space-y-12">
        {/* HEADING */}
        <h2 className="text-2xl sm:text-3xl font-semibold">Shipping Address</h2>
        <div className="flex flex-col md:flex-row">
          <div className="flex-grow max-w-3xl space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label>Full name</Label>
                <Input
                  className="mt-1.5"
                  name="fullName"
                  defaultValue={shippingAddress?.fullName}
                  required
                />
              </div>

              <div>
                <Label>Address</Label>
                <div className="mt-1.5 flex">
                  <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                    <i className="text-2xl las la-map-signs"></i>
                  </span>
                  <Input
                    className="!rounded-l-none"
                    name="address"
                    defaultValue={shippingAddress?.address}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>City</Label>
                  <Input
                    className="mt-1.5"
                    name="city"
                    defaultValue={shippingAddress?.city}
                    required
                  />
                </div>
                <div>
                  <Label>State</Label>
                  <Input
                    className="mt-1.5"
                    name="state"
                    defaultValue={shippingAddress?.state}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>ZIP code</Label>
                  <Input
                    className="mt-1.5"
                    name="zipCode"
                    defaultValue={shippingAddress?.zipCode}
                    required
                    pattern="^\d{5}(-\d{4})?$"
                    title="Please enter a valid ZIP code (e.g., 12345 or 12345-6789)"
                  />
                </div>
                <div>
                  <Label>Country</Label>
                  <Input
                    className="mt-1.5"
                    name="country"
                    defaultValue={shippingAddress?.country}
                    required
                  />
                </div>
              </div>

              <div>
                <Label>Phone number</Label>
                <div className="mt-1.5 flex">
                  <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                    <i className="text-2xl las la-phone-volume"></i>
                  </span>
                  <Input
                    className="!rounded-l-none"
                    name="phone"
                    defaultValue={shippingAddress?.phone}
                    required
                    pattern="^\+?[\d\s-]{10,}$"
                    title="Please enter a valid phone number"
                  />
                </div>
              </div>

              <div className="pt-2">
                <ButtonPrimary type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Update shipping address"}
                </ButtonPrimary>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingEditPage;
