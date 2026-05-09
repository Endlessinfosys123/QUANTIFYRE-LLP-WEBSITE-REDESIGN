"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card = ({ children, className, hoverEffect = true }: CardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={hoverEffect ? { y: -10, scale: 1.02, boxShadow: "0 20px 40px -20px rgba(108, 63, 239, 0.2)" } : {}}
      className={cn(
        "bg-white border border-border p-7 rounded-2xl transition-all duration-300",
        hoverEffect && "hover:border-primary/30",
        className
      )}
    >
      {children}
    </motion.div>
  );
};
