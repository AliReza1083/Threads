import React, { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/utils";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

interface Props {
  isOpen: boolean;
  children: React.ReactNode;
  className?: string;
  originX?: "left" | "center" | "right";
  originY?: "top" | "center" | "bottom";
  onCloseHandler: () => void;
}

export default function DropdownList({
  isOpen,
  children,
  className,
  originX = "center",
  originY = "top",
  onCloseHandler,
}: Props) {
  const dropdownList = useRef<null | HTMLDivElement>(null);

  useOnClickOutside(dropdownList, onCloseHandler);

  return (
    isOpen && (
      <motion.div
        ref={dropdownList}
        initial={{ scale: 0, originX, originY }}
        animate={{ scale: 1 }}
        transition={{ type: "tween", duration: 0.1 }}
        className={cn(
          "absolute top-[calc(100%+5px)] z-50 flex w-[245px] flex-col overflow-hidden rounded-xl bg-box-background shadow-[0px_6.51px_28.2px_0px_rgba(0,0,0,0.11)] backdrop-blur-3xl",
          className
        )}
      >
        {children}
      </motion.div>
    )
  );
}
