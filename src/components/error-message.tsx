import React, { HTMLAttributes } from "react";
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
import { FieldError } from "react-hook-form";
import { cn } from "@/utils";

type Props = HTMLAttributes<HTMLParagraphElement> &
  HTMLMotionProps<"p"> & {
    error: FieldError | undefined;
    message?: null | string;
    className?: string;
  };

export function ErrorMessageInput({
  error,
  className,
  message,
  ...props
}: Props) {
  return (
    <AnimatePresence>
      {error && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          transition={{ duration: 0.2 }}
          className={cn("w-full overflow-hidden", className)}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.2 } }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-full px-4 text-xs text-foreground/60"
            {...props}
          >
            {message ? message : error.message}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
