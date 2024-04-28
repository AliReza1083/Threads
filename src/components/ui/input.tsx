import React, { InputHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

export const inputVariants = cva("w-full outline-none", {
  variants: {
    variant: {
      default: "",
      auth: "mb-2 h-[55px] text-[15px] bg-input-background rounded-[16px] placeholder:text-black/20 dark:placeholder:text-input-placeholder/40 p-4 border border-transparent focus:border-input-border",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface inputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

export default function Input({ variant, className, ...props }: inputProps) {
  return (
    <input
      type="text"
      className={inputVariants({ variant, className })}
      {...props}
    />
  );
}
