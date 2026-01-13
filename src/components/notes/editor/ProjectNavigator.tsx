import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Folder,
  FolderOpen,
  Search,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Note {
  id: string;
  title: string;
  folder_path: string | null;
}

interface ProjectNavigatorProps {
  notes: Note[];
  currentNoteId: string;
  onSelectNote: (noteId: string) => void;
  onCreateNote: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

interface FolderNode {
  name: string;
  path: string;
  children: FolderNode[];
  notes: Note[];
}

function buildFolderTree(notes: Note[]): FolderNode {
  const root: FolderNode = { name: "Notes", path: "/", children: [], notes: [] };

  notes.forEach((note) => {
    if (!note.folder_path || note.folder_path === "/") {
      root.notes.push(note);
    } else {
      const parts = note.folder_path.split("/").filter(Boolean);
      let current = root;
      let currentPath = "";

      parts.forEach((part) => {
        currentPath += "/" + part;
        let child = current.children.find((c) => c.name === part);
        if (!child) {
          child = { name: part, path: currentPath, children: [], notes: [] };
          current.children.push(child);
        }
        current = child;
      });

      current.notes.push(note);
    }
  });

  return root;
}

function FolderItem({
  folder,
  depth,
  currentNoteId,
  onSelectNote,
}: {
  folder: FolderNode;
  depth: number;
  currentNoteId: string;
  onSelectNote: (noteId: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const hasContent = folder.children.length > 0 || folder.notes.length > 0;

  return (
    <div>
      {folder.name !== "Notes" && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-muted/50 rounded-md transition-colors",
          )}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
        >
          {isOpen ? (
            <FolderOpen className="h-4 w-4 text-muted-foreground shrink-0" />
          ) : (
            <Folder className="h-4 w-4 text-muted-foreground shrink-0" />
          )}
          <span className="truncate">{folder.name}</span>
        </button>
      )}

      {(isOpen || folder.name === "Notes") && hasContent && (
        <div>
          {folder.children.map((child) => (
            <FolderItem
              key={child.path}
              folder={child}
              depth={folder.name === "Notes" ? 0 : depth + 1}
              currentNoteId={currentNoteId}
              onSelectNote={onSelectNote}
            />
          ))}
          {folder.notes.map((note) => (
            <button
              key={note.id}
              onClick={() => onSelectNote(note.id)}
              className={cn(
                "w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-md transition-colors",
                note.id === currentNoteId
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-muted/50 text-muted-foreground"
              )}
              style={{ paddingLeft: `${(folder.name === "Notes" ? 0 : depth + 1) * 12 + 8}px` }}
            >
              <FileText className="h-4 w-4 shrink-0" />
              <span className="truncate">{note.title}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function ProjectNavigator({
  notes,
  currentNoteId,
  onSelectNote,
  onCreateNote,
  isCollapsed,
  onToggleCollapse,
}: ProjectNavigatorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const folderTree = buildFolderTree(notes);

  const filteredNotes = searchQuery
    ? notes.filter((note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : null;

  if (isCollapsed) {
    return (
      <div className="h-full flex flex-col items-center py-2 bg-muted/30 border-r border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className="h-8 w-8 p-0 mb-2"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCreateNote}
          className="h-8 w-8 p-0"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-muted/30 border-r border-border">
      {/* Header */}
      <div className="p-2 border-b border-border flex items-center justify-between">
        <span className="text-sm font-medium">Project</span>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onCreateNote}
            className="h-7 w-7 p-0"
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="h-7 w-7 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="p-2">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 pl-7 text-sm"
          />
        </div>
      </div>

      {/* Tree */}
      <ScrollArea className="flex-1">
        <div className="p-1">
          {filteredNotes ? (
            filteredNotes.map((note) => (
              <button
                key={note.id}
                onClick={() => onSelectNote(note.id)}
                className={cn(
                  "w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-md transition-colors",
                  note.id === currentNoteId
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted/50 text-muted-foreground"
                )}
              >
                <FileText className="h-4 w-4 shrink-0" />
                <span className="truncate">{note.title}</span>
              </button>
            ))
          ) : (
            <FolderItem
              folder={folderTree}
              depth={0}
              currentNoteId={currentNoteId}
              onSelectNote={onSelectNote}
            />
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
