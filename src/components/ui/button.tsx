import React, { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils";

export const buttonVariant = cva(
  "w-full outline-none disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default:
          "button-shrink text-[15px] text-white border-none dark:text-black bg-black dark:bg-white rounded-[16px] border font-medium border-transparent focus:border-input-border/20 disabled:opacity-50 duration-100",
        secondary:
          "mb-3 mt-4 rounded-lg border border-box-border text-[15px] duration-200 active:scale-[0.97]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface inputProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariant> {}

export default function Button({ variant, className, ...props }: inputProps) {
  return (
    <button className={cn(buttonVariant({ variant, className }))} {...props} />
  );
}
