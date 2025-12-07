import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Brain, Network, Sparkles, FileText, Zap } from "lucide-react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { FlipWords } from "@/components/ui/flip-words";
import { NoiseButton } from "@/components/ui/noise-button";
import { motion } from "framer-motion";

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

  return (
    <AuroraBackground className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
              <Brain className="w-6 h-6 text-accent-foreground" />
            </div>
            <span className="text-xl font-bold">Skyrius</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/auth")}>
              Login
            </Button>
            <Button 
              className="bg-accent hover:bg-accent/90 text-accent-foreground" 
              onClick={() => navigate("/auth?mode=signup")}
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      <main className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="py-24 px-8">
          <div className="max-w-5xl mx-auto text-center">
            {/* Skyrius with Text Hover Effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="h-24 md:h-32 mb-6"
            >
              <TextHoverEffect text="SKYRIUS" />
            </motion.div>

            {/* Main headline with encrypted text */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              <EncryptedText 
                text="Your Second Brain," 
                interval={40}
                className="block font-sans"
              />
              <span className="text-accent mt-2 block font-sans">
                <EncryptedText 
                  text="Intelligently Connected" 
                  interval={40}
                />
              </span>
            </motion.h1>

            {/* Description with encrypted text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
            >
              <EncryptedText 
                text="Transform scattered thoughts into a powerful knowledge network. Capture ideas, connect insights, and let AI reveal hidden patterns."
                interval={20}
              />
            </motion.p>

            {/* CTA with Noise Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex gap-4 justify-center flex-wrap"
            >
              <NoiseButton onClick={() => navigate("/auth?mode=signup")}>
                Start Building Your Brain
              </NoiseButton>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6"
                onClick={() => navigate("/auth")}
              >
                Sign In
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Flip Words Section */}
        <section className="py-16 px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              A space for{" "}
              <FlipWords words={ROTATING_WORDS} duration={2500} />
            </h2>
          </motion.div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-8">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-center mb-12"
            >
              <EncryptedText text="Everything You Need to Think Better" interval={30} />
            </motion.h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: FileText,
                  title: "Smart Note-Taking",
                  description: "Capture thoughts with a powerful editor. Rich formatting, nested folders, and instant search keep everything organized."
                },
                {
                  icon: Network,
                  title: "Knowledge Graph",
                  description: "Visualize connections between ideas. See your knowledge come alive in an interactive graph that reveals hidden insights."
                },
                {
                  icon: Sparkles,
                  title: "AI Companion",
                  description: "Get intelligent suggestions, discover patterns, and receive insights about your notes you never knew existed."
                },
                {
                  icon: Zap,
                  title: "Lightning Fast",
                  description: "Built for speed. Instant sync, blazing fast search, and seamless navigation keep you in flow."
                },
                {
                  icon: FileText,
                  title: "Library Management",
                  description: "Organize papers, videos, and podcasts in one place. Link sources to notes for complete context."
                },
                {
                  icon: Sparkles,
                  title: "Smart Tagging",
                  description: "Create custom tags to organize your knowledge. Find related content instantly across all your notes."
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-lg border border-border bg-card/50 backdrop-blur-sm hover:border-accent hover:bg-card/80 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-6">
              <EncryptedText text="Ready to Build Your Second Brain?" interval={30} />
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of thinkers, researchers, and creators using Skyrius to amplify their knowledge.
            </p>
            <NoiseButton onClick={() => navigate("/auth?mode=signup")}>
              Get Started for Free
            </NoiseButton>
          </motion.div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-border/50 py-8 px-8 bg-background/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>© 2024 Skyrius. Your knowledge, intelligently connected.</p>
        </div>
      </footer>
    </AuroraBackground>
  );
}
