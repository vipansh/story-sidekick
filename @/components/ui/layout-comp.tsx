import { AnimatePresence, motion } from "framer-motion";
import React from "react";

import { cn } from "../../lib/utils";

export const LayoutComponent = ({
  layoutId,
  className,
  children,
}: {
  layoutId: string;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
        }}
        layoutId={layoutId}
        transition={{
          duration: 0.2,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
