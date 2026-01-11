import { useState, useEffect } from "react";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Note {
  id: string;
  title: string;
  content: string | null;
  folder_path: string | null;
  updated_at: string;
}

interface DocumentEditorProps {
  note: Note;
  onBack: () => void;
  onSave: (id: string, title: string, content: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isSaving: boolean;
}

export function DocumentEditor({
  note,
  onBack,
  onSave,
  onDelete,
  isSaving,
}: DocumentEditorProps) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content || "");
  const [hasChanges, setHasChanges] = useState(false);

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

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
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

      {/* Editor */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl mx-auto">
          <Input
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Note title..."
            className="text-2xl font-bold border-none bg-transparent px-0 mb-6 focus-visible:ring-0"
          />
          <Textarea
            value={content}
            onChange={(e) => handleContentChange(e.target.value)}
            placeholder="Start writing..."
            className="min-h-[60vh] border-none bg-transparent px-0 resize-none focus-visible:ring-0 text-base leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
}
