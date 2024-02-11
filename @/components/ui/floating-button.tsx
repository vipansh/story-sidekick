import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import ArrowUp from "../../svg/ArrowUp";
import { cn } from "../../lib/utils";
import { Button } from "./button";

export const FloatingButton = ({ className }: { className?: string }) => {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    let direction = current - scrollYProgress.getPrevious();

    if (scrollYProgress.get() < 0.05) {
      setVisible(false);
    } else {
      if (direction < 0) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }
  });

  const onClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit fixed bottom-5 right-10 mx-auto border border-transparent z-30",
          className
        )}
      >
        <Button onClick={onClick}>
          Top <ArrowUp />
        </Button>
      </motion.div>
    </AnimatePresence>
  );
};
