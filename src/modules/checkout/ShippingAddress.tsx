"use client";

import Label from "@/components/Label/Label";
import React, { FC } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Input from "@/shared/Input/Input";
import Radio from "@/shared/Radio/Radio";
import Select from "@/shared/Select/Select";
import type { ShippingAddress as ShippingAddressType } from "@/contexts/ShippingContext";

interface ShippingAddressProps {
  isActive: boolean;
  onOpenActive: () => void;
  onCloseActive: () => void;
  shippingAddress: ShippingAddressType | null;
  setShippingAddress: (address: ShippingAddressType) => void;
}

const ShippingAddress: React.FC<ShippingAddressProps> = ({
  isActive,
  onOpenActive,
  onCloseActive,
  shippingAddress,
  setShippingAddress,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const address: ShippingAddressType = {
      fullName: formData.get("fullName") as string,
      address: formData.get("address") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      zipCode: formData.get("zipCode") as string,
      country: formData.get("country") as string,
      phone: formData.get("phone") as string,
    };
    setShippingAddress(address);
    onCloseActive();
  };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl ">
      <div
        className="flex items-center p-4 xl:p-6 cursor-pointer"
        onClick={onOpenActive}
      >
        <div className="flex-1">
          <h3 className=" text-lg font-medium">Shipping address</h3>
          {shippingAddress ? (
            <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              <p>{shippingAddress.fullName}</p>
              <p>{shippingAddress.address}</p>
              <p>
                {shippingAddress.city}, {shippingAddress.state}{" "}
                {shippingAddress.zipCode}
              </p>
              <p>{shippingAddress.country}</p>
              <p>{shippingAddress.phone}</p>
            </div>
          ) : (
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Add your shipping address
            </p>
          )}
        </div>
      </div>
      {isActive && (
        <div className="p-4 xl:p-6 border-t border-slate-200 dark:border-slate-700">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-sm">Full name</Label>
              <Input
                className="mt-1.5"
                name="fullName"
                defaultValue={shippingAddress?.fullName}
                required
              />
            </div>
            <div>
              <Label className="text-sm">Address</Label>
              <Input
                className="mt-1.5"
                name="address"
                defaultValue={shippingAddress?.address}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm">City</Label>
                <Input
                  className="mt-1.5"
                  name="city"
                  defaultValue={shippingAddress?.city}
                  required
                />
              </div>
              <div>
                <Label className="text-sm">State</Label>
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
                <Label className="text-sm">ZIP code</Label>
                <Input
                  className="mt-1.5"
                  name="zipCode"
                  defaultValue={shippingAddress?.zipCode}
                  required
                />
              </div>
              <div>
                <Label className="text-sm">Country</Label>
                <Input
                  className="mt-1.5"
                  name="country"
                  defaultValue={shippingAddress?.country}
                  required
                />
              </div>
            </div>
            <div>
              <Label className="text-sm">Phone number</Label>
              <Input
                className="mt-1.5"
                name="phone"
                type="tel"
                defaultValue={shippingAddress?.phone}
                required
              />
            </div>
            <div className="flex flex-col sm:flex-row pt-6">
              <ButtonPrimary type="submit" className="sm:!px-7 shadow-none">
                Save and continue
              </ButtonPrimary>
              <ButtonSecondary
                className="mt-3 sm:mt-0 sm:ml-3"
                onClick={() => onCloseActive()}
              >
                Cancel
              </ButtonSecondary>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ShippingAddress;
