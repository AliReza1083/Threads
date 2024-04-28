import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
  panelDoneClick: () => void;
  title: string;
};

export default function Panel({
  children,
  onClose,
  className,
  panelDoneClick,
  title,
}: Props) {
  return (
    <div className="fixed left-0 top-0 isolate z-50 flex h-full w-full flex-col items-center justify-center">
      <div className="absolute inset-0 -z-10 bg-black/70" onClick={onClose} />

      <motion.div
        initial={{ scale: "var(--scale-from)" }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2, type: "spring", bounce: 0 }}
        className="flex h-full w-full flex-col items-center justify-center md:h-auto md:[--scale-from:.95]"
      >
        <header className="relative hidden h-[60px] w-full max-w-[619px] items-center justify-center text-white md:flex">
          <button
            onClick={onClose}
            className="absolute left-6 text-[17px] font-light duration-100 active:scale-95"
          >
            Cancel
          </button>
          <h3 className="font-semibold">{title}</h3>
          <button
            className="absolute right-6 text-[17px] font-light text-blue duration-100 active:scale-95"
            onClick={panelDoneClick}
          >
            Done
          </button>
        </header>

        <motion.div
          initial={{ y: "var(--y-from)" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0 }}
          className={cn(
            "flex h-full w-full items-start justify-start bg-white px-4 pt-16 max-md:[--y-from:100%] md:h-auto md:min-h-20 md:max-w-[619px] md:rounded-2xl md:bg-transparent md:bg-white md:p-6 md:[--scale-from:.9]",
            className
          )}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
