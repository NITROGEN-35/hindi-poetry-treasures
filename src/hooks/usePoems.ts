import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type Poem = Tables<"poems"> & {
  poets?: Tables<"poets"> | null;
};

export const usePoems = (options?: {
  category?: string;
  sort?: "recent" | "popular";
  limit?: number;
  search?: string;
}) => {
  return useQuery({
    queryKey: ["poems", options],
    queryFn: async () => {
      let query = supabase
        .from("poems")
        .select("*, poets(*)");

      if (options?.category) {
        query = query.eq("category", options.category as any);
      }
      if (options?.search) {
        query = query.or(`title.ilike.%${options.search}%,excerpt.ilike.%${options.search}%`);
      }
      if (options?.sort === "recent") {
        query = query.order("created_at", { ascending: false });
      } else if (options?.sort === "popular") {
        query = query.order("likes", { ascending: false });
      } else {
        query = query.order("display_order", { ascending: true });
      }
      if (options?.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Poem[];
    },
  });
};

export const usePoem = (id: string) => {
  return useQuery({
    queryKey: ["poem", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("poems")
        .select("*, poets(*)")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data as Poem;
    },
    enabled: !!id,
  });
};

export const usePoemOfTheDay = () => {
  return useQuery({
    queryKey: ["poem-of-day"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("poems")
        .select("*, poets(*)")
        .eq("is_poem_of_day", true)
        .single();
      if (error) throw error;
      return data as Poem;
    },
  });
};

export const useFeaturedPoem = () => {
  return useQuery({
    queryKey: ["featured-poem"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("poems")
        .select("*, poets(*)")
        .eq("is_featured", true)
        .limit(1)
        .single();
      if (error) throw error;
      return data as Poem;
    },
  });
};

export const useEditorPicks = () => {
  return useQuery({
    queryKey: ["editor-picks"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("poems")
        .select("*, poets(*)")
        .eq("is_editor_pick", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data as Poem[];
    },
  });
};

export const usePoemsByCategory = (category: string) => {
  return useQuery({
    queryKey: ["poems-category", category],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("poems")
        .select("*, poets(*)")
        .eq("category", category as any)
        .order("likes", { ascending: false })
        .limit(4);
      if (error) throw error;
      return data as Poem[];
    },
    enabled: !!category,
  });
};
