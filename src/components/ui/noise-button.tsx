"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

interface NoiseButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function NoiseButton({ children, className, onClick }: NoiseButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-lg px-8 py-4 font-semibold text-lg",
        "bg-gradient-to-br from-accent via-accent/90 to-primary",
        "text-accent-foreground shadow-lg",
        "transition-all duration-300",
        "before:absolute before:inset-0 before:opacity-20",
        "before:bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]",
        "hover:shadow-xl hover:shadow-accent/25",
        "after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/10 after:to-transparent",
        className
      )}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
