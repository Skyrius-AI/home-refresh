import { useState, useEffect } from "react";
import { ArrowLeft, Save, Trash2, PanelLeftClose, PanelRightClose, PanelLeft, PanelRight } from "lucide-react";
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
import { useIsMobile } from "@/hooks/use-mobile";

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
  const [isNavigatorCollapsed, setIsNavigatorCollapsed] = useState(true);
  const [isRightPanelCollapsed, setIsRightPanelCollapsed] = useState(true);
  const isMobile = useIsMobile();

  // Auto-collapse panels on mobile
  useEffect(() => {
    if (isMobile) {
      setIsNavigatorCollapsed(true);
      setIsRightPanelCollapsed(true);
    }
  }, [isMobile]);

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
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="border-b border-border bg-card px-2 sm:px-4 py-2 flex items-center justify-between shrink-0 pt-14 md:pt-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <Button variant="ghost" size="sm" onClick={onBack} className="shrink-0">
            <ArrowLeft className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Back</span>
          </Button>
          {hasChanges && (
            <span className="text-xs text-muted-foreground hidden sm:inline">Unsaved changes</span>
          )}
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Mobile panel toggles */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsNavigatorCollapsed(!isNavigatorCollapsed)}
            className="h-8 w-8 p-0 md:hidden"
          >
            {isNavigatorCollapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsRightPanelCollapsed(!isRightPanelCollapsed)}
            className="h-8 w-8 p-0 md:hidden"
          >
            {isRightPanelCollapsed ? <PanelRight className="w-4 h-4" /> : <PanelRightClose className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="text-destructive hover:text-destructive h-8 w-8 p-0 sm:h-auto sm:w-auto sm:px-3"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
          >
            <Save className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">{isSaving ? "Saving..." : "Save"}</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar - Project Navigator (overlay on mobile) */}
        <div
          className={`absolute md:relative z-30 h-full shrink-0 transition-all duration-200 ${
            isNavigatorCollapsed 
              ? "w-0 md:w-10 overflow-hidden" 
              : "w-56 bg-background shadow-lg md:shadow-none"
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

        {/* Mobile overlay for left panel */}
        {!isNavigatorCollapsed && isMobile && (
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm z-20 md:hidden"
            onClick={() => setIsNavigatorCollapsed(true)}
          />
        )}

        {/* Center + Right Panels */}
        {isMobile ? (
          // Mobile layout - stacked
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-hidden">
              <RichTextEditor
                title={title}
                content={content}
                onTitleChange={handleTitleChange}
                onContentChange={handleContentChange}
              />
            </div>
            
            {/* Right panel overlay on mobile */}
            {!isRightPanelCollapsed && (
              <>
                <div 
                  className="absolute inset-0 bg-background/80 backdrop-blur-sm z-20"
                  onClick={() => setIsRightPanelCollapsed(true)}
                />
                <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-background z-30 shadow-lg flex flex-col">
                  <div className="flex-1 overflow-hidden flex flex-col">
                    <div className="flex-1 min-h-0">
                      <NoteChat noteId={note.id} noteTitle={note.title} />
                    </div>
                    <div className="h-px bg-border" />
                    <div className="flex-1 min-h-0">
                      <KnowledgeGraph noteId={note.id} noteTitle={note.title} />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          // Desktop layout - resizable
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
        )}
      </div>
    </div>
  );
}
