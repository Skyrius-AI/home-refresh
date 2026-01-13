import { useEffect, useRef } from "react";
import { Network, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface KnowledgeGraphProps {
  noteId: string;
  noteTitle: string;
}

export function KnowledgeGraph({ noteId, noteTitle }: KnowledgeGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Draw placeholder graph
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Draw central node
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
    ctx.fillStyle = "hsl(var(--primary) / 0.2)";
    ctx.fill();
    ctx.strokeStyle = "hsl(var(--primary))";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw connected nodes
    const nodes = [
      { x: centerX - 80, y: centerY - 60 },
      { x: centerX + 80, y: centerY - 40 },
      { x: centerX - 60, y: centerY + 70 },
      { x: centerX + 70, y: centerY + 60 },
    ];

    nodes.forEach((node) => {
      // Draw connection line
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(node.x, node.y);
      ctx.strokeStyle = "hsl(var(--muted-foreground) / 0.3)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw node
      ctx.beginPath();
      ctx.arc(node.x, node.y, 15, 0, Math.PI * 2);
      ctx.fillStyle = "hsl(var(--muted))";
      ctx.fill();
      ctx.strokeStyle = "hsl(var(--border))";
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Draw central text
    ctx.fillStyle = "hsl(var(--foreground))";
    ctx.font = "10px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(noteTitle.slice(0, 8) + "...", centerX, centerY);
  }, [noteId, noteTitle]);

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="p-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Network className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Knowledge Graph</span>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
            <ZoomOut className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
            <ZoomIn className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
            <Maximize2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Graph Canvas */}
      <div className="flex-1 relative">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
            Knowledge graph visualization coming soon
          </p>
        </div>
      </div>
    </div>
  );
}
