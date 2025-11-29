import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const HoverBorderGradient = ({
  children,
  containerClassName,
  className,
  as: Tag = "div",
  duration = 1,
  clockwise = true,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType;
    containerClassName?: string;
    className?: string;
    duration?: number;
    clockwise?: boolean;
  } & React.HTMLAttributes<HTMLElement>
>) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Tag
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex rounded-lg p-[1px] overflow-hidden bg-background",
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0 z-0 rounded-lg",
          hovered ? "opacity-100" : "opacity-0"
        )}
        style={{
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            background: `conic-gradient(from ${clockwise ? "0deg" : "180deg"}, 
              hsl(var(--accent)), 
              hsl(var(--primary)), 
              hsl(var(--accent)))`,
          }}
          animate={{
            rotate: clockwise ? 360 : -360,
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div
        className={cn(
          "relative z-10 w-full h-full rounded-lg bg-card",
          className
        )}
      >
        {children}
      </div>
    </Tag>
  );
};
