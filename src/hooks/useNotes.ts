import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export interface Note {
  id: string;
  title: string;
  content: string | null;
  folder_path: string | null;
  updated_at: string;
  created_at: string;
  user_id: string;
}

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchNotes = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });

      if (error) throw error;
      setNotes(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching notes",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [user]);

  const createNote = async (title: string, folderPath: string): Promise<Note | null> => {
    if (!user) return null;
    
    setIsCreating(true);
    try {
      const { data, error } = await supabase
        .from("notes")
        .insert({
          title,
          folder_path: folderPath === "/" ? null : folderPath,
          user_id: user.id,
          content: "",
        })
        .select()
        .single();

      if (error) throw error;
      
      setNotes((prev) => [data, ...prev]);
      toast({
        title: "Note created",
        description: `"${title}" has been created.`,
      });
      return data;
    } catch (error: any) {
      toast({
        title: "Error creating note",
        description: error.message,
        variant: "destructive",
      });
      return null;
    } finally {
      setIsCreating(false);
    }
  };

  const updateNote = async (id: string, title: string, content: string) => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("notes")
        .update({ title, content, updated_at: new Date().toISOString() })
        .eq("id", id);

      if (error) throw error;
      
      setNotes((prev) =>
        prev.map((note) =>
          note.id === id
            ? { ...note, title, content, updated_at: new Date().toISOString() }
            : note
        )
      );
      toast({
        title: "Note saved",
        description: "Your changes have been saved.",
      });
    } catch (error: any) {
      toast({
        title: "Error saving note",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      const { error } = await supabase.from("notes").delete().eq("id", id);

      if (error) throw error;
      
      setNotes((prev) => prev.filter((note) => note.id !== id));
      toast({
        title: "Note deleted",
        description: "The note has been deleted.",
      });
    } catch (error: any) {
      toast({
        title: "Error deleting note",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return {
    notes,
    loading,
    isSaving,
    isCreating,
    createNote,
    updateNote,
    deleteNote,
    refetch: fetchNotes,
  };
}
