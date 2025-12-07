import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FlipWords } from "@/components/ui/flip-words";
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
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full px-8 py-6 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-sm font-medium tracking-[0.3em] text-foreground">
            SKYRIUS
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            className="rounded-full px-6 border-border hover:bg-secondary"
            onClick={() => navigate("/auth")}
          >
            Log in
          </Button>
          <Button 
            className="rounded-full px-6 bg-foreground text-background hover:bg-foreground/90"
            onClick={() => navigate("/auth?mode=signup")}
          >
            Sign up
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-foreground"
          >
            The most thoughtful second brain you'll ever build.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex items-center justify-center gap-3"
          >
            <span className="text-muted-foreground text-lg">A space for</span>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-secondary border border-border text-foreground font-medium">
              <FlipWords words={ROTATING_WORDS} duration={2500} className="text-foreground" />
            </span>
          </motion.div>
        </div>
      </main>

      {/* Theme Toggle */}
      {mounted && (
        <div className="fixed bottom-6 left-6">
          <div className="flex items-center bg-secondary rounded-full p-1 border border-border">
            <button
              onClick={() => setTheme("dark")}
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                theme === "dark"
                  ? "bg-background text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Dark
            </button>
            <button
              onClick={() => setTheme("light")}
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                theme === "light"
                  ? "bg-background text-foreground"
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
