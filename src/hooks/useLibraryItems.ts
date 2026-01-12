import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface LibraryItem {
  id: string;
  title: string;
  item_type: string;
  description: string | null;
  url: string | null;
  source_date: string | null;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface CreateLibraryItemData {
  title: string;
  item_type: string;
  description?: string;
  url?: string;
  domain?: string;
}

export function useLibraryItems(typeFilter?: string, domainFilter?: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["library-items", typeFilter, domainFilter],
    queryFn: async () => {
      let query = supabase
        .from("library_items")
        .select("*")
        .order("created_at", { ascending: false });

      if (typeFilter && typeFilter !== "all") {
        query = query.eq("item_type", typeFilter);
      }

      // Domain filter would require a tag/domain column - for now we filter by description containing domain
      // This could be enhanced with a proper domain column in the future

      const { data, error } = await query;

      if (error) throw error;
      return data as LibraryItem[];
    },
    enabled: !!user,
  });
}

export function useCreateLibraryItem() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (data: CreateLibraryItemData) => {
      if (!user) throw new Error("User not authenticated");

      // Combine notes with domain info in description
      const description = data.domain
        ? `[${data.domain}] ${data.description || ""}`
        : data.description;

      const { data: newItem, error } = await supabase
        .from("library_items")
        .insert({
          title: data.title,
          item_type: data.item_type,
          description: description || null,
          url: data.url || null,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return newItem;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["library-items"] });
    },
  });
}

export function useDeleteLibraryItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("library_items")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["library-items"] });
    },
  });
}
