import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Share2 } from "lucide-react";
import { useTour } from "@/contexts/TourContext";

export default function Index() {
  const { startTour } = useTour();
  
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-8 py-6 space-y-6">
        {/* Tour restart button */}
        <div className="flex justify-end">
          <Button variant="outline" size="sm" onClick={startTour}>
            Restart Tour
          </Button>
        </div>
        
        <Card className="bg-gradient-to-r from-card to-card/50 border-accent/50" data-tour-id="weekly-summary">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl">Weekly Summary</CardTitle>
              <p className="text-muted-foreground text-sm mt-1">+12 new nodes, 45 mins spent</p>
            </div>
            <Button variant="ghost" size="icon">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card data-tour-id="knowledge-graph">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Knowledge Graph Preview</CardTitle>
                <Button variant="ghost" size="sm">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="3" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1v6m0 6v6m5.656-15.656l-4.242 4.242m0 5.656l-4.242 4.242m15.656-5.656l-4.242-4.242m-5.656 0l-4.242-4.242" />
                  </svg>
                  Add to
                </Button>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-background rounded-lg flex items-center justify-center relative overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 600 400">
                    <defs>
                      <radialGradient id="nodeGlowLarge">
                        <stop offset="0%" stopColor="hsl(174, 72%, 56%)" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="hsl(174, 72%, 56%)" stopOpacity="0" />
                      </radialGradient>
                      <radialGradient id="nodeGlowPurple">
                        <stop offset="0%" stopColor="hsl(280, 60%, 60%)" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="hsl(280, 60%, 60%)" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    
                    {/* Connection lines */}
                    <line x1="300" y1="200" x2="180" y2="120" stroke="hsl(174, 72%, 56%)" strokeWidth="1.5" opacity="0.3" />
                    <line x1="300" y1="200" x2="420" y2="120" stroke="hsl(174, 72%, 56%)" strokeWidth="1.5" opacity="0.3" />
                    <line x1="300" y1="200" x2="450" y2="200" stroke="hsl(174, 72%, 56%)" strokeWidth="1.5" opacity="0.3" />
                    <line x1="300" y1="200" x2="380" y2="280" stroke="hsl(174, 72%, 56%)" strokeWidth="1.5" opacity="0.3" />
                    <line x1="300" y1="200" x2="220" y2="280" stroke="hsl(174, 72%, 56%)" strokeWidth="1.5" opacity="0.3" />
                    <line x1="180" y1="120" x2="420" y2="120" stroke="hsl(174, 72%, 56%)" strokeWidth="1" opacity="0.2" />
                    <line x1="420" y1="120" x2="450" y2="200" stroke="hsl(280, 60%, 60%)" strokeWidth="1" opacity="0.2" />
                    <line x1="450" y1="200" x2="380" y2="280" stroke="hsl(280, 60%, 60%)" strokeWidth="1" opacity="0.2" />
                    
                    {/* Additional connections */}
                    <line x1="150" y1="200" x2="180" y2="120" stroke="hsl(220, 20%, 50%)" strokeWidth="1" opacity="0.2" />
                    <line x1="150" y1="200" x2="220" y2="280" stroke="hsl(220, 20%, 50%)" strokeWidth="1" opacity="0.2" />
                    <line x1="480" y1="150" x2="450" y2="200" stroke="hsl(220, 20%, 50%)" strokeWidth="1" opacity="0.2" />
                    
                    {/* Central node */}
                    <circle cx="300" cy="200" r="12" fill="hsl(174, 72%, 56%)" />
                    <circle cx="300" cy="200" r="30" fill="url(#nodeGlowLarge)" />
                    
                    {/* Primary nodes */}
                    <circle cx="180" cy="120" r="10" fill="hsl(174, 72%, 56%)" />
                    <circle cx="180" cy="120" r="25" fill="url(#nodeGlowLarge)" />
                    
                    <circle cx="420" cy="120" r="10" fill="hsl(280, 60%, 60%)" />
                    <circle cx="420" cy="120" r="25" fill="url(#nodeGlowPurple)" />
                    
                    <circle cx="450" cy="200" r="10" fill="hsl(174, 72%, 56%)" />
                    <circle cx="450" cy="200" r="25" fill="url(#nodeGlowLarge)" />
                    
                    <circle cx="380" cy="280" r="10" fill="hsl(280, 60%, 60%)" />
                    <circle cx="380" cy="280" r="25" fill="url(#nodeGlowPurple)" />
                    
                    <circle cx="220" cy="280" r="10" fill="hsl(174, 72%, 56%)" />
                    <circle cx="220" cy="280" r="25" fill="url(#nodeGlowLarge)" />
                    
                    {/* Secondary nodes */}
                    <circle cx="150" cy="200" r="7" fill="hsl(220, 20%, 50%)" />
                    <circle cx="480" cy="150" r="7" fill="hsl(220, 20%, 50%)" />
                    <circle cx="350" cy="320" r="7" fill="hsl(220, 20%, 50%)" />
                    <circle cx="250" cy="80" r="7" fill="hsl(220, 20%, 50%)" />
                    <circle cx="120" cy="140" r="6" fill="hsl(220, 20%, 50%)" />
                    <circle cx="500" cy="240" r="6" fill="hsl(220, 20%, 50%)" />
                    
                    {/* Dots for depth */}
                    <circle cx="80" cy="180" r="3" fill="hsl(220, 20%, 40%)" opacity="0.6" />
                    <circle cx="520" cy="280" r="3" fill="hsl(220, 20%, 40%)" opacity="0.6" />
                    <circle cx="300" cy="60" r="3" fill="hsl(220, 20%, 40%)" opacity="0.6" />
                    <circle cx="180" cy="340" r="3" fill="hsl(220, 20%, 40%)" opacity="0.6" />
                  </svg>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Recommendations</h2>
            
            <Card className="hover:border-accent transition-colors" data-tour-id="idea-roulette">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Idea Roulette</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Shary mar of idea roulette, ralks, shan or nreel nodes.
                </p>
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  Spin
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:border-accent transition-colors">
              <CardContent className="pt-6">
                <div className="w-12 h-12 mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <Share2 className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Suggested Connections</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Compoure wery to suit her about Connections.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Percenanological connections are brevend and use-use overthwing.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
