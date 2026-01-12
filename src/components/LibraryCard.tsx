import { FileText, PlayCircle, ExternalLink, Link2, BookOpen, Mic, Film, Newspaper } from "lucide-react";
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
import { format } from "date-fns";

interface LibraryCardProps {
  item: {
    id: string;
    title: string;
    item_type: string;
    description: string | null;
    url: string | null;
    created_at: string;
  };
  isTourTarget?: boolean;
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case "video":
      return <PlayCircle className="w-6 h-6 text-accent" />;
    case "documentary":
      return <Film className="w-6 h-6 text-accent" />;
    case "podcast":
      return <Mic className="w-6 h-6 text-accent" />;
    case "book":
      return <BookOpen className="w-6 h-6 text-accent" />;
    case "article":
      return <Newspaper className="w-6 h-6 text-accent" />;
    default:
      return <FileText className="w-6 h-6 text-accent" />;
  }
};

const getTypeLabel = (type: string) => {
  return type.charAt(0).toUpperCase() + type.slice(1);
};

// Extract domain from description if present (format: [Domain] description)
const extractDomain = (description: string | null): string | null => {
  if (!description) return null;
  const match = description.match(/^\[([^\]]+)\]/);
  return match ? match[1] : null;
};

const extractDescription = (description: string | null): string => {
  if (!description) return "";
  return description.replace(/^\[[^\]]+\]\s*/, "");
};

export const LibraryCard = ({ item, isTourTarget }: LibraryCardProps) => {
  const domain = extractDomain(item.description);
  const cleanDescription = extractDescription(item.description);
  const formattedDate = format(new Date(item.created_at), "MMM d, yyyy");

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
                {getTypeIcon(item.item_type)}
                {domain && (
                  <Badge variant="outline" className="text-xs">
                    {domain}
                  </Badge>
                )}
              </div>

              {/* Title */}
              <h3 className="text-base font-semibold leading-tight mb-2">
                {item.title}
              </h3>

              {/* Date */}
              <p className="text-xs text-muted-foreground mb-3">{formattedDate}</p>

              {/* Description */}
              {cleanDescription && (
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {cleanDescription}
                </p>
              )}

              {/* Type Badge */}
              <Badge variant="secondary" className="text-xs">
                {getTypeLabel(item.item_type)}
              </Badge>
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
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                {getTypeIcon(item.item_type)}
              </div>
              <div>
                <div className="flex gap-2 mb-2">
                  <Badge variant="outline">
                    {getTypeLabel(item.item_type)}
                  </Badge>
                  {domain && (
                    <Badge variant="secondary">
                      {domain}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{formattedDate}</p>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold mb-4">{item.title}</h2>
            
            <div className="flex gap-3">
              {item.url && (
                <Button
                  variant="default"
                  className="gap-2"
                  onClick={() => window.open(item.url!, "_blank")}
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Source
                </Button>
              )}
              <Button variant="outline" className="gap-2">
                <Link2 className="w-4 h-4" />
                Create Connection
              </Button>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Notes/Description */}
          {cleanDescription && (
            <>
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Notes</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {cleanDescription}
                </p>
              </div>
              <Separator className="my-6" />
            </>
          )}

          {/* AI Summary Placeholder */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              AI Summary
            </h3>
            <p className="text-muted-foreground leading-relaxed italic">
              AI-generated summary will appear here once the content is processed.
            </p>
          </div>

          <Separator className="my-6" />

          {/* Key Insights Placeholder */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Key Insights</h3>
            <p className="text-muted-foreground italic">
              Key insights will be extracted after AI processing.
            </p>
          </div>
        </div>
      </ExpandableCardContent>
    </ExpandableCard>
  );
};
