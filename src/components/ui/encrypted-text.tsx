"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface EncryptedTextProps {
  text: string;
  interval?: number;
  className?: string;
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

export function EncryptedText({ text, interval = 50, className }: EncryptedTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [isAnimating, setIsAnimating] = useState(true);

  const getRandomChar = useCallback(() => {
    return chars[Math.floor(Math.random() * chars.length)];
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    let timer: NodeJS.Timeout;

    const animate = () => {
      if (currentIndex <= text.length) {
        const revealed = text.slice(0, currentIndex);
        const remaining = text.length - currentIndex;
        const gibberish = Array.from({ length: remaining }, () => getRandomChar()).join("");
        
        setDisplayText(revealed + gibberish);
        currentIndex++;
        timer = setTimeout(animate, interval);
      } else {
        setIsAnimating(false);
      }
    };

    animate();

    return () => clearTimeout(timer);
  }, [text, interval, getRandomChar]);

  return (
    <motion.span
      className={cn("font-mono", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {displayText}
    </motion.span>
  );
}
