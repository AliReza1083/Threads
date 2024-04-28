import { cn } from "@/utils";
import React from "react";

type Props = {
  rightElement?: React.ReactNode;
  leftElement: React.ReactNode;
  title: string;
  className?: string;
};

export default function PageNavControl({
  title,
  rightElement,
  leftElement,
  className,
}: Props) {
  return (
    <header
      className={cn(
        "absolute left-0 top-0 flex h-[50px] w-full items-center justify-center bg-white dark:bg-[rgb(16,16,16)] md:hidden",
        className
      )}
    >
      {leftElement}
      <h3 className="font-semibold">{title}</h3>
      {rightElement}
    </header>
  );
}
