import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface GlowingCardProps {
  children: React.ReactNode;
  className?: string;
  glowClassName?: string;
}

export const GlowingCard = ({ children, className, glowClassName }: GlowingCardProps) => {
  return (
    <div className={cn("relative group", className)}>
      {/* Glow effect */}
      <motion.div
        className={cn(
          "absolute -inset-0.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          "bg-gradient-to-r from-accent/50 via-primary/50 to-accent/50",
          "blur-sm",
          glowClassName
        )}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundSize: "200% 200%",
        }}
      />
      
      {/* Subtle persistent border */}
      <div className="absolute -inset-[1px] rounded-lg bg-gradient-to-r from-accent/20 via-primary/20 to-accent/20 opacity-50" />
      
      {/* Content */}
      <div className="relative bg-card rounded-lg">
        {children}
      </div>
    </div>
  );
};
