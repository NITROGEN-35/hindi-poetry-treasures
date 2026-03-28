import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type Poet = Tables<"poets">;

export const usePoets = () => {
  return useQuery({
    queryKey: ["poets"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("poets")
        .select("*")
        .order("name", { ascending: true });
      if (error) throw error;
      return data as Poet[];
    },
  });
};

export const usePoet = (id: string) => {
  return useQuery({
    queryKey: ["poet", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("poets")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data as Poet;
    },
    enabled: !!id,
  });
};

export const usePoetPoems = (poetId: string) => {
  return useQuery({
    queryKey: ["poet-poems", poetId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("poems")
        .select("*, poets(*)")
        .eq("poet_id", poetId)
        .order("likes", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!poetId,
  });
};
