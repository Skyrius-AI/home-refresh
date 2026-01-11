import { FolderClosed, FileText, Plus, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Note {
  id: string;
  title: string;
  content: string | null;
  folder_path: string | null;
  updated_at: string;
}

interface Folder {
  name: string;
  path: string;
}

interface CollectionViewProps {
  notes: Note[];
  currentPath: string;
  onNavigateToFolder: (path: string) => void;
  onSelectNote: (note: Note) => void;
  onCreateNote: () => void;
  onCreateFolder: () => void;
}

export function CollectionView({
  notes,
  currentPath,
  onNavigateToFolder,
  onSelectNote,
  onCreateNote,
  onCreateFolder,
}: CollectionViewProps) {
  // Get unique folders at current path level
  const getFoldersAtPath = (): Folder[] => {
    const folderSet = new Set<string>();
    
    notes.forEach((note) => {
      if (!note.folder_path) return;
      
      const normalizedNotePath = note.folder_path.startsWith("/") 
        ? note.folder_path 
        : `/${note.folder_path}`;
      const normalizedCurrentPath = currentPath === "/" ? "" : currentPath;
      
      if (normalizedNotePath.startsWith(normalizedCurrentPath + "/") || 
          (normalizedCurrentPath === "" && normalizedNotePath.startsWith("/"))) {
        const remaining = normalizedNotePath.slice(normalizedCurrentPath.length + 1);
        const nextFolder = remaining.split("/")[0];
        if (nextFolder) {
          folderSet.add(nextFolder);
        }
      }
    });
    
    return Array.from(folderSet).map((name) => ({
      name,
      path: currentPath === "/" ? `/${name}` : `${currentPath}/${name}`,
    }));
  };

  // Get notes at current path (not in subfolders)
  const getNotesAtPath = (): Note[] => {
    return notes.filter((note) => {
      const notePath = note.folder_path || "/";
      const normalizedNotePath = notePath === "/" ? "/" : notePath;
      return normalizedNotePath === currentPath || 
        (currentPath === "/" && (notePath === null || notePath === "" || notePath === "/"));
    });
  };

  const folders = getFoldersAtPath();
  const currentNotes = getNotesAtPath();
  const pathParts = currentPath === "/" ? [] : currentPath.split("/").filter(Boolean);

  return (
    <div className="flex-1 p-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-sm">
        <button
          onClick={() => onNavigateToFolder("/")}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          Notes
        </button>
        {pathParts.map((part, index) => (
          <div key={index} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <button
              onClick={() =>
                onNavigateToFolder("/" + pathParts.slice(0, index + 1).join("/"))
              }
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {part}
            </button>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3 mb-6">
        <Button variant="outline" size="sm" onClick={onCreateNote}>
          <Plus className="w-4 h-4 mr-2" />
          New Note
        </Button>
        <Button variant="outline" size="sm" onClick={onCreateFolder}>
          <FolderClosed className="w-4 h-4 mr-2" />
          New Folder
        </Button>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {/* Folders */}
        {folders.map((folder) => (
          <Card
            key={folder.path}
            className="p-4 cursor-pointer hover:bg-sidebar-accent transition-colors group"
            onClick={() => onNavigateToFolder(folder.path)}
          >
            <div className="flex flex-col items-center gap-3 py-4">
              <FolderClosed className="w-12 h-12 text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="text-sm font-medium text-center truncate w-full">
                {folder.name}
              </span>
            </div>
          </Card>
        ))}

        {/* Notes */}
        {currentNotes.map((note) => (
          <Card
            key={note.id}
            className="p-4 cursor-pointer hover:bg-sidebar-accent transition-colors group"
            onClick={() => onSelectNote(note)}
          >
            <div className="flex flex-col items-center gap-3 py-4">
              <FileText className="w-12 h-12 text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="text-sm font-medium text-center truncate w-full">
                {note.title}
              </span>
              <span className="text-xs text-muted-foreground">
                {new Date(note.updated_at).toLocaleDateString()}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {folders.length === 0 && currentNotes.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <FileText className="w-16 h-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No notes yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first note or folder to get started
          </p>
        </div>
      )}
    </div>
  );
}
