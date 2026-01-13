import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FlipWords } from "@/components/ui/flip-words";
import { EncryptedHeading } from "@/components/ui/encrypted-heading";

import { Boxes } from "@/components/ui/background-boxes";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ROTATING_WORDS = [
  "researchers",
  "perpetual learners",
  "students",
  "coders",
  "developers",
  "philosophers",
  "polymaths",
  "curious minds",
];

export default function Landing() {
  const navigate = useNavigate();
  const { resolvedTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch (next-themes requirement)
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Animated background */}
      <Boxes className="z-10" />
      <div className="absolute inset-0 w-full h-full bg-background z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      {/* Header */}
      <header className="w-full px-4 sm:px-8 py-4 sm:py-6 flex items-center justify-between relative z-30">
        <span className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          SKYRIUS
        </span>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Login */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Button
              variant="outline"
              className="rounded-full px-4 sm:px-6 border-border text-foreground hover:bg-secondary hover:text-foreground text-sm sm:text-base"
              onClick={() => navigate("/auth")}
            >
              Log in
            </Button>
          </motion.div>

          {/* Signup */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Button
              className="rounded-full px-4 sm:px-6 bg-foreground text-background hover:bg-foreground/90 text-sm sm:text-base"
              onClick={() => navigate("/auth?mode=signup")}
            >
              Sign up
            </Button>
          </motion.div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-8 relative z-30 pointer-events-none">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-foreground"
          >
            <EncryptedHeading
              text="The most thoughtful second brain you'll ever build."
              className="font-sans"
            />
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3"
          >
            <span className="text-muted-foreground text-base sm:text-lg">
              A space for
            </span>

            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-foreground border border-border text-background font-medium pointer-events-auto">
              <FlipWords
                words={ROTATING_WORDS}
                duration={2500}
                className="text-background"
              />
            </span>
          </motion.div>
        </div>
      </main>

      {/* Theme Toggle */}
      {mounted && (
        <div className="fixed bottom-6 left-6 z-30 pointer-events-auto">
          <div className="flex items-center bg-secondary rounded-full p-1 border border-border shadow-sm">
            <button
              onClick={() => setTheme("dark")}
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                (resolvedTheme ?? theme) === "dark"
                  ? "bg-foreground text-background shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Dark
            </button>
            <button
              onClick={() => setTheme("light")}
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                (resolvedTheme ?? theme) === "light"
                  ? "bg-foreground text-background shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Light
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
