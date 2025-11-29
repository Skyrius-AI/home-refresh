import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { createContext, useContext, useState, ReactNode } from "react";

interface ExpandableCardContextType {
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
}

const ExpandableCardContext = createContext<ExpandableCardContextType | undefined>(undefined);

export const useExpandableCard = () => {
  const context = useContext(ExpandableCardContext);
  if (!context) {
    throw new Error("useExpandableCard must be used within ExpandableCardProvider");
  }
  return context;
};

interface ExpandableCardProps {
  children: ReactNode;
}

export const ExpandableCard = ({ children }: ExpandableCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <ExpandableCardContext.Provider value={{ isExpanded, setIsExpanded }}>
      {children}
    </ExpandableCardContext.Provider>
  );
};

interface ExpandableCardTriggerProps {
  children: ReactNode;
  className?: string;
}

export const ExpandableCardTrigger = ({ children, className }: ExpandableCardTriggerProps) => {
  const { setIsExpanded } = useExpandableCard();

  return (
    <div
      onClick={() => setIsExpanded(true)}
      className={cn("cursor-pointer", className)}
    >
      {children}
    </div>
  );
};

interface ExpandableCardContentProps {
  children: ReactNode;
  className?: string;
}

export const ExpandableCardContent = ({ children, className }: ExpandableCardContentProps) => {
  const { isExpanded, setIsExpanded } = useExpandableCard();

  return (
    <AnimatePresence>
      {isExpanded && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Expanded Card */}
          <motion.div
            layoutId="expandable-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
            className={cn(
              "fixed inset-4 md:inset-8 lg:inset-16 z-50",
              "bg-card rounded-lg border border-border shadow-2xl",
              "overflow-hidden",
              className
            )}
          >
            {/* Close button */}
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/50 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="w-full h-full overflow-y-auto p-8">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
