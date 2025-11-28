import { Button } from "@/components/ui/button";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Sparkles, Share2, TrendingUp, Network } from "lucide-react";
import { useTour } from "@/contexts/TourContext";

export default function Index() {
  const { startTour } = useTour();
  
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-8 py-6 space-y-8">
        {/* Header with tour restart */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Mind OS Dashboard</h1>
            <p className="text-muted-foreground mt-1">Your neural command center</p>
          </div>
          <Button variant="outline" size="sm" onClick={startTour}>
            Restart Tour
          </Button>
        </div>
        
        <BentoGrid className="mx-auto">
          {/* Weekly Summary - Full Width */}
          <BentoGridItem
            title="Growth Tracker"
            description="+12 new nodes, 45 mins spent this week"
            header={
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/10 to-primary/10 rounded-lg" data-tour-id="weekly-summary">
                <TrendingUp className="w-12 h-12 text-accent" />
              </div>
            }
            className="md:col-span-3"
            icon={
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
            }
          />

          {/* Knowledge Graph - 2 columns */}
          <BentoGridItem
            title="The Nexus"
            description="Your knowledge constellation visualized"
            header={
              <div className="flex h-full w-full bg-gradient-to-br from-background to-muted/20 rounded-lg p-4" data-tour-id="knowledge-graph">
                <svg className="w-full h-full" viewBox="0 0 200 150">
                  <defs>
                    <radialGradient id="nodeGlow">
                      <stop offset="0%" stopColor="hsl(174, 72%, 56%)" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="hsl(174, 72%, 56%)" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  
                  {/* Connection lines */}
                  <line x1="100" y1="75" x2="60" y2="40" stroke="hsl(174, 72%, 56%)" strokeWidth="1" opacity="0.3" />
                  <line x1="100" y1="75" x2="140" y2="40" stroke="hsl(174, 72%, 56%)" strokeWidth="1" opacity="0.3" />
                  <line x1="100" y1="75" x2="150" y2="75" stroke="hsl(174, 72%, 56%)" strokeWidth="1" opacity="0.3" />
                  <line x1="100" y1="75" x2="130" y2="110" stroke="hsl(174, 72%, 56%)" strokeWidth="1" opacity="0.3" />
                  <line x1="100" y1="75" x2="70" y2="110" stroke="hsl(174, 72%, 56%)" strokeWidth="1" opacity="0.3" />
                  
                  {/* Central node */}
                  <circle cx="100" cy="75" r="6" fill="hsl(174, 72%, 56%)" />
                  <circle cx="100" cy="75" r="15" fill="url(#nodeGlow)" />
                  
                  {/* Outer nodes */}
                  <circle cx="60" cy="40" r="4" fill="hsl(174, 72%, 56%)" />
                  <circle cx="140" cy="40" r="4" fill="hsl(280, 60%, 60%)" />
                  <circle cx="150" cy="75" r="4" fill="hsl(174, 72%, 56%)" />
                  <circle cx="130" cy="110" r="4" fill="hsl(280, 60%, 60%)" />
                  <circle cx="70" cy="110" r="4" fill="hsl(174, 72%, 56%)" />
                  
                  {/* Small nodes */}
                  <circle cx="40" cy="60" r="2" fill="hsl(220, 20%, 50%)" />
                  <circle cx="160" cy="90" r="2" fill="hsl(220, 20%, 50%)" />
                </svg>
              </div>
            }
            className="md:col-span-2"
            icon={
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Network className="w-5 h-5 text-primary" />
              </div>
            }
          />

          {/* Idea Roulette */}
          <BentoGridItem
            title="Idea Roulette"
            description="Spin for serendipitous connections"
            header={
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg" data-tour-id="idea-roulette">
                <Sparkles className="w-12 h-12 text-accent animate-pulse" />
              </div>
            }
            icon={
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-accent" />
              </div>
            }
          />

          {/* Suggested Connections */}
          <BentoGridItem
            title="Neural Links"
            description="AI-powered connection suggestions"
            header={
              <div className="flex h-full w-full flex-col gap-2 bg-gradient-to-br from-muted/50 to-background rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                  <div className="h-1.5 flex-1 rounded-full bg-muted" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <div className="h-1.5 flex-1 rounded-full bg-muted" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent/50" />
                  <div className="h-1.5 flex-1 rounded-full bg-muted" />
                </div>
              </div>
            }
            icon={
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Share2 className="w-5 h-5 text-primary" />
              </div>
            }
          />

          {/* Recent Activity */}
          <BentoGridItem
            title="Activity Stream"
            description="Your latest neural pathways"
            header={
              <div className="flex h-full w-full flex-col justify-between bg-gradient-to-br from-muted/30 to-background rounded-lg p-3">
                <div className="space-y-2">
                  <div className="h-2 w-3/4 rounded-full bg-accent/30" />
                  <div className="h-2 w-1/2 rounded-full bg-primary/30" />
                  <div className="h-2 w-5/6 rounded-full bg-accent/20" />
                </div>
                <p className="text-xs text-muted-foreground">12 activities today</p>
              </div>
            }
            icon={
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
            }
          />
        </BentoGrid>
      </div>
    </div>
  );
}
