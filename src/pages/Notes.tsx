import { useState } from "react";
import { ChevronRight, ChevronDown, FolderClosed, FileText, Send, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function FileTreeItem({ item, level = 0 }: { item: any; level?: number }) {
  const [expanded, setExpanded] = useState(item.expanded || false);

  return (
    <div>
      <div
        className={`flex items-center gap-2 px-3 py-1.5 text-sm cursor-pointer hover:bg-sidebar-accent rounded ${
          item.active ? "bg-sidebar-accent text-accent" : "text-sidebar-foreground"
        }`}
        style={{ paddingLeft: `${level * 12 + 12}px` }}
        onClick={() => item.type === "folder" && setExpanded(!expanded)}
      >
        {item.type === "folder" && (
          <>
            {expanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
            <FolderClosed className="w-4 h-4" />
          </>
        )}
        {item.type === "file" && <FileText className="w-4 h-4" />}
        <span className="truncate">{item.name}</span>
      </div>
      {item.children && expanded && (
        <div>
          {item.children.map((child: any, index: number) => (
            <FileTreeItem key={index} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Notes() {
  return (
    <div className="min-h-screen bg-background flex">
      <div className="w-64 bg-sidebar border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <h2 className="font-semibold text-sm">Files</h2>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
            No notes yet
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="border-b border-border bg-card px-6 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold">Notes</h1>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 flex items-center justify-center">
          <p className="text-muted-foreground">Select a note or create a new one to get started.</p>
        </div>
      </div>

      <div className="w-80 bg-card border-l border-border flex flex-col">
        <div className="border-b border-border px-4 py-3 flex items-center justify-between">
          <h2 className="font-semibold">AI Companion & Graph</h2>
          <button className="text-muted-foreground hover:text-foreground">×</button>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 flex items-center justify-center">
            <p className="text-sm text-muted-foreground text-center">
              Select a note to see AI suggestions and connections.
            </p>
          </div>

          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input placeholder="Type a message..." className="flex-1 bg-background" />
              <Button size="icon" className="bg-accent hover:bg-accent/90">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border p-4">
          <h3 className="font-semibold text-sm mb-3">Mini local graph</h3>
          <div className="aspect-square bg-background rounded-lg flex items-center justify-center">
            <p className="text-xs text-muted-foreground">No connections yet</p>
          </div>
        </div>
      </div>
    </div>
  );
}
