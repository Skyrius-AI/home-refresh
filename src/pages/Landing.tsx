import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Brain, Network, Sparkles, FileText, Zap } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
              <Brain className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold">brain-node</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/auth")}>
              Login
            </Button>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => navigate("/auth?mode=signup")}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="py-20 px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Your Second Brain,
              <br />
              <span className="text-accent">Intelligently Connected</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Transform scattered thoughts into a powerful knowledge network. Capture ideas, connect insights, and let AI reveal hidden patterns in your personal knowledge base.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => navigate("/auth?mode=signup")}>
                Start Building Your Brain
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/auth")}>
                Sign In
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-8 bg-card/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Everything You Need to Think Better</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg border border-border bg-card hover:border-accent transition-colors">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Note-Taking</h3>
                <p className="text-muted-foreground">
                  Capture thoughts with a powerful editor. Rich formatting, nested folders, and instant search keep everything organized.
                </p>
              </div>

              <div className="p-6 rounded-lg border border-border bg-card hover:border-accent transition-colors">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Network className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Knowledge Graph</h3>
                <p className="text-muted-foreground">
                  Visualize connections between ideas. See your knowledge come alive in an interactive graph that reveals hidden insights.
                </p>
              </div>

              <div className="p-6 rounded-lg border border-border bg-card hover:border-accent transition-colors">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Companion</h3>
                <p className="text-muted-foreground">
                  Get intelligent suggestions, discover patterns, and receive insights about your notes you never knew existed.
                </p>
              </div>

              <div className="p-6 rounded-lg border border-border bg-card hover:border-accent transition-colors">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
                <p className="text-muted-foreground">
                  Built for speed. Instant sync, blazing fast search, and seamless navigation keep you in flow.
                </p>
              </div>

              <div className="p-6 rounded-lg border border-border bg-card hover:border-accent transition-colors">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Library Management</h3>
                <p className="text-muted-foreground">
                  Organize papers, videos, and podcasts in one place. Link sources to notes for complete context.
                </p>
              </div>

              <div className="p-6 rounded-lg border border-border bg-card hover:border-accent transition-colors">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Tagging</h3>
                <p className="text-muted-foreground">
                  Create custom tags to organize your knowledge. Find related content instantly across all your notes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Build Your Second Brain?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of thinkers, researchers, and creators using brain-node to amplify their knowledge.
            </p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => navigate("/auth?mode=signup")}>
              Get Started for Free
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8 px-8">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>© 2024 brain-node. Your knowledge, intelligently connected.</p>
        </div>
      </footer>
    </div>
  );
}
