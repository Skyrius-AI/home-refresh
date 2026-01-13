import { useState, useEffect } from "react";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { RichTextEditor } from "./editor/RichTextEditor";
import { ProjectNavigator } from "./editor/ProjectNavigator";
import { NoteChat } from "./editor/NoteChat";
import { KnowledgeGraph } from "./editor/KnowledgeGraph";

interface Note {
  id: string;
  title: string;
  content: string | null;
  folder_path: string | null;
  updated_at: string;
}

interface DocumentEditorProps {
  note: Note;
  notes: Note[];
  onBack: () => void;
  onSave: (id: string, title: string, content: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onSelectNote: (note: Note) => void;
  onCreateNote: () => void;
  isSaving: boolean;
}

export function DocumentEditor({
  note,
  notes,
  onBack,
  onSave,
  onDelete,
  onSelectNote,
  onCreateNote,
  isSaving,
}: DocumentEditorProps) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content || "");
  const [hasChanges, setHasChanges] = useState(false);
  const [isNavigatorCollapsed, setIsNavigatorCollapsed] = useState(false);

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content || "");
    setHasChanges(false);
  }, [note]);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    setHasChanges(true);
  };

  const handleContentChange = (value: string) => {
    setContent(value);
    setHasChanges(true);
  };

  const handleSave = async () => {
    await onSave(note.id, title, content);
    setHasChanges(false);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      await onDelete(note.id);
    }
  };

  const handleSelectNote = (noteId: string) => {
    const selectedNote = notes.find((n) => n.id === noteId);
    if (selectedNote) {
      onSelectNote(selectedNote);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border bg-card px-4 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          {hasChanges && (
            <span className="text-xs text-muted-foreground">Unsaved changes</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Project Navigator */}
        <div
          className={`shrink-0 transition-all duration-200 ${
            isNavigatorCollapsed ? "w-10" : "w-56"
          }`}
        >
          <ProjectNavigator
            notes={notes}
            currentNoteId={note.id}
            onSelectNote={handleSelectNote}
            onCreateNote={onCreateNote}
            isCollapsed={isNavigatorCollapsed}
            onToggleCollapse={() => setIsNavigatorCollapsed(!isNavigatorCollapsed)}
          />
        </div>

        {/* Center + Right Panels */}
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          {/* Center - Main Editor */}
          <ResizablePanel defaultSize={65} minSize={40}>
            <RichTextEditor
              title={title}
              content={content}
              onTitleChange={handleTitleChange}
              onContentChange={handleContentChange}
            />
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Right Sidebar - Chat + Knowledge Graph */}
          <ResizablePanel defaultSize={35} minSize={25}>
            <ResizablePanelGroup direction="vertical">
              {/* Top - LLM Chat */}
              <ResizablePanel defaultSize={50} minSize={30}>
                <NoteChat noteId={note.id} noteTitle={note.title} />
              </ResizablePanel>

              <ResizableHandle withHandle />

              {/* Bottom - Knowledge Graph */}
              <ResizablePanel defaultSize={50} minSize={25}>
                <KnowledgeGraph noteId={note.id} noteTitle={note.title} />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
