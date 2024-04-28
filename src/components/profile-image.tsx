import { cn } from "@/utils";
import Image from "next/image";
import React, { HTMLAttributes, memo } from "react";

interface Props extends HTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  layout?: "fill" | "fixed" | "intrinsic" | "responsive";
  objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down";
  className?: string;
}

const ProfileImage = ({
  src,
  alt,
  width,
  height,
  layout,
  objectFit,
  className,
}: Props) => {
  console.log("image rendering");

  return (
    <div>
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        className={cn(
          "border-box-border object-over rounded-full border",
          className
        )}
      />
    </div>
  );
};

export default React.memo(ProfileImage);
