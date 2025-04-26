"use client";

import { useAuth } from "@/contexts/AuthContext";
import Label from "@/components/Label/Label";
import React, { FC, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Input from "@/shared/Input/Input";

interface ContactInfoProps {
  isActive: boolean;
  onOpenActive: () => void;
  onCloseActive: () => void;
}

const ContactInfo: React.FC<ContactInfoProps> = ({
  isActive,
  onOpenActive,
  onCloseActive,
}) => {
  const { user, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the contact info to your state or context
    onCloseActive();
  };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl ">
      <div
        className="flex items-center p-4 xl:p-6 cursor-pointer"
        onClick={onOpenActive}
      >
        <div className="flex-1">
          <h3 className=" text-lg font-medium">Contact information</h3>
          {isAuthenticated && user ? (
            <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              <p>{user.email}</p>
              <p>{user.fullName}</p>
            </div>
          ) : formData.email && formData.fullName ? (
            <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              <p>{formData.email}</p>
              <p>{formData.fullName}</p>
            </div>
          ) : (
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Add your contact information
            </p>
          )}
        </div>
      </div>
      {isActive && (
        <div className="p-4 xl:p-6 border-t border-slate-200 dark:border-slate-700">
          {isAuthenticated && user ? (
            <div className="space-y-4">
              <div>
                <Label className="text-sm">Email</Label>
                <Input
                  className="mt-1.5"
                  type="email"
                  value={user.email}
                  disabled
                />
              </div>
              <div>
                <Label className="text-sm">Full name</Label>
                <Input className="mt-1.5" value={user.fullName} disabled />
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="text-sm">Email</Label>
                <Input
                  className="mt-1.5"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label className="text-sm">Full name</Label>
                <Input
                  className="mt-1.5"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
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
          )}
        </div>
      )}
    </div>
  );
};

export default ContactInfo;
