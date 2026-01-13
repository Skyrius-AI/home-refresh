import { useState } from "react";
import { CollectionView } from "@/components/notes/CollectionView";
import { DocumentEditor } from "@/components/notes/DocumentEditor";
import { CreateNoteDialog } from "@/components/notes/CreateNoteDialog";
import { CreateFolderDialog } from "@/components/notes/CreateFolderDialog";
import { useNotes, Note } from "@/hooks/useNotes";
import { useToast } from "@/hooks/use-toast";

type ViewMode = "collection" | "editor";

export default function Notes() {
  const [viewMode, setViewMode] = useState<ViewMode>("collection");
  const [currentPath, setCurrentPath] = useState("/");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [showCreateNote, setShowCreateNote] = useState(false);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  
  const { notes, loading, isSaving, isCreating, createNote, updateNote, deleteNote } = useNotes();
  const { toast } = useToast();

  const handleNavigateToFolder = (path: string) => {
    setCurrentPath(path);
  };

  const handleSelectNote = (note: Note) => {
    setSelectedNote(note);
    setViewMode("editor");
  };

  const handleBackToCollection = () => {
    setSelectedNote(null);
    setViewMode("collection");
  };

  const handleCreateNote = async (title: string) => {
    const newNote = await createNote(title, currentPath);
    if (newNote) {
      setSelectedNote(newNote);
      setViewMode("editor");
    }
  };

  const handleCreateFolder = (name: string) => {
    // Folders are virtual - they exist based on notes' folder_path
    // We just inform the user
    toast({
      title: "Folder created",
      description: `Create a note inside "${name}" to save the folder.`,
    });
    const newPath = currentPath === "/" ? `/${name}` : `${currentPath}/${name}`;
    setCurrentPath(newPath);
  };

  const handleSaveNote = async (id: string, title: string, content: string) => {
    await updateNote(id, title, content);
  };

  const handleDeleteNote = async (id: string) => {
    await deleteNote(id);
    handleBackToCollection();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-accent border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading notes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {viewMode === "collection" ? (
        <CollectionView
          notes={notes}
          currentPath={currentPath}
          onNavigateToFolder={handleNavigateToFolder}
          onSelectNote={handleSelectNote}
          onCreateNote={() => setShowCreateNote(true)}
          onCreateFolder={() => setShowCreateFolder(true)}
        />
      ) : selectedNote ? (
        <DocumentEditor
          note={selectedNote}
          notes={notes}
          onBack={handleBackToCollection}
          onSave={handleSaveNote}
          onDelete={handleDeleteNote}
          onSelectNote={handleSelectNote}
          onCreateNote={() => setShowCreateNote(true)}
          isSaving={isSaving}
        />
      ) : null}

      <CreateNoteDialog
        open={showCreateNote}
        onOpenChange={setShowCreateNote}
        onCreateNote={handleCreateNote}
        isCreating={isCreating}
      />

      <CreateFolderDialog
        open={showCreateFolder}
        onOpenChange={setShowCreateFolder}
        onCreateFolder={handleCreateFolder}
        currentPath={currentPath}
      />
    </div>
  );
}
