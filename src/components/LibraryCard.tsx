import { FileText, PlayCircle, ExternalLink, Link2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GlowingCard } from "@/components/ui/glowing-card";
import { Card3D } from "@/components/ui/card-3d";
import {
  ExpandableCard,
  ExpandableCardTrigger,
  ExpandableCardContent,
} from "@/components/ui/expandable-card";

interface LibraryCardProps {
  item: {
    id: number;
    type: string;
    title: string;
    date: string;
    description: string;
    relatedNotes: number;
  };
  isTourTarget?: boolean;
}

export const LibraryCard = ({ item, isTourTarget }: LibraryCardProps) => {
  return (
    <ExpandableCard>
      <ExpandableCardTrigger>
        <Card3D containerClassName="w-full">
          <GlowingCard>
            <div
              className="p-6 h-full"
              data-tour-id={isTourTarget ? "content-card-summary" : undefined}
            >
              {/* Icon */}
              <div className="flex items-start justify-between mb-4">
                {item.type === "video" ? (
                  <PlayCircle className="w-6 h-6 text-accent" />
                ) : (
                  <FileText className="w-6 h-6 text-accent" />
                )}
              </div>

              {/* Title */}
              <h3 className="text-base font-semibold leading-tight mb-2">
                {item.title}
              </h3>

              {/* Date */}
              <p className="text-xs text-muted-foreground mb-3">{item.date}</p>

              {/* Description */}
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                {item.description}
              </p>

              {/* Related Notes Badge */}
              {item.relatedNotes > 0 && (
                <Badge variant="secondary" className="text-xs">
                  Related to {item.relatedNotes} existing notes
                </Badge>
              )}
            </div>
          </GlowingCard>
        </Card3D>
      </ExpandableCardTrigger>

      {/* Expanded View */}
      <ExpandableCardContent>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              {item.type === "video" ? (
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <PlayCircle className="w-6 h-6 text-accent" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-accent" />
                </div>
              )}
              <div>
                <Badge variant="outline" className="mb-2">
                  {item.type === "video" ? "Video" : "Document"}
                </Badge>
                <p className="text-sm text-muted-foreground">{item.date}</p>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold mb-4">{item.title}</h2>
            
            <div className="flex gap-3">
              <Button variant="default" className="gap-2">
                <ExternalLink className="w-4 h-4" />
                Open Source
              </Button>
              <Button variant="outline" className="gap-2">
                <Link2 className="w-4 h-4" />
                Create Connection
              </Button>
            </div>
          </div>

          <Separator className="my-6" />

          {/* AI Summary */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              AI Summary
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {item.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
          </div>

          <Separator className="my-6" />

          {/* Key Insights */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Key Insights</h3>
            <div className="space-y-3">
              {[
                "Core concept explores the relationship between neural networks and cognitive systems",
                "Proposes a novel framework for understanding information processing",
                "Discusses practical applications in knowledge management systems",
              ].map((insight, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-accent">{idx + 1}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{insight}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          {/* Related Notes */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Related Notes ({item.relatedNotes})
            </h3>
            <div className="grid gap-3">
              {Array.from({ length: item.relatedNotes }).map((_, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg border border-border bg-card/50 hover:border-accent transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium mb-1">Connected Note {idx + 1}</p>
                      <p className="text-sm text-muted-foreground">
                        Shares concepts about neural processing and knowledge graphs
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ExpandableCardContent>
    </ExpandableCard>
  );
};
