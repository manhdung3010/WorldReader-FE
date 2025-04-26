import React, { useState } from "react";
import { useDiscount } from "@/contexts/DiscountContext";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";

interface DiscountFormProps {
  products: { productId: number; quantity: number }[];
}

const DiscountForm: React.FC<DiscountFormProps> = ({ products }) => {
  const [code, setCode] = useState("");
  const {
    discount,
    priceReduce,
    loading,
    error,
    checkDiscountCode,
    clearDiscount,
  } = useDiscount();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      await checkDiscountCode(code, products);
    }
  };

  console.log(priceReduce);

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 xl:p-6">
      <h3 className="text-lg font-medium mb-4">Discount Code</h3>

      {discount ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{discount.name}</p>
              <p className="text-sm text-slate-500">Code: {discount.code}</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-green-600">
                -${priceReduce.toFixed(2)}
              </p>
              <button
                onClick={clearDiscount}
                className="text-sm text-red-500 hover:text-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <Input
              className="flex-1"
              type="text"
              placeholder="Enter discount code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <ButtonPrimary type="submit" disabled={loading || !code.trim()}>
              {loading ? "Applying..." : "Apply"}
            </ButtonPrimary>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default DiscountForm;
