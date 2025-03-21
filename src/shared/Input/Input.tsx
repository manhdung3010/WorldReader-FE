import React, { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  sizeClass?: string;
  fontClass?: string;
  rounded?: string;
  error?: boolean;
  helperText?: string;
}

// eslint-disable-next-line react/display-name
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      sizeClass = "h-11 px-4 py-3",
      fontClass = "text-sm font-normal",
      rounded = "rounded-2xl",
      children,
      error = false,
      helperText = "",
      type = "text",
      ...args
    },
    ref
  ) => {
    return (
      <>
        <input
          ref={ref}
          type={type}
          className={`block w-full ${
            error ? "border-red-500" : "border-neutral-200"
          } focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 disabled:bg-neutral-200 dark:disabled:bg-neutral-800 ${rounded} ${fontClass} ${sizeClass} ${className}`}
          {...args}
        />
        {helperText && (
          <p className="text-red-500 text-sm mt-1">{helperText}</p>
        )}
      </>
    );
  }
);

export default Input;
