import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Share2 } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-16 md:pt-6 space-y-6">
        <Card className="bg-gradient-to-r from-card to-card/50 border-accent/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg sm:text-xl">Weekly Summary</CardTitle>
              <p className="text-muted-foreground text-sm mt-1">Your progress this week</p>
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
            <Card>
              <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <CardTitle className="text-base sm:text-lg">Knowledge Graph Preview</CardTitle>
                <Button variant="ghost" size="sm">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="3" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1v6m0 6v6m5.656-15.656l-4.242 4.242m0 5.656l-4.242 4.242m15.656-5.656l-4.242-4.242m-5.656 0l-4.242-4.242" />
                  </svg>
                  Add to
                </Button>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-background rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground text-sm sm:text-base text-center px-4">Your knowledge graph will appear here</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold">Recommendations</h2>
            
            <Card className="hover:border-accent transition-colors">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Idea Roulette</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Discover unexpected connections between your notes and sources.
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
                <p className="text-sm text-muted-foreground">
                  No suggestions yet. Add more content to discover connections.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
