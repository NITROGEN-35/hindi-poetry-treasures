import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const useIsAdmin = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["is-admin", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user!.id)
        .eq("role", "admin");
      if (error) throw error;
      return (data?.length ?? 0) > 0;
    },
    enabled: !!user,
  });
};

export const useAdminPoems = () => {
  return useQuery({
    queryKey: ["admin-poems"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("poems")
        .select("*, poets(name, name_hindi)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
};

export const useAdminPoets = () => {
  return useQuery({
    queryKey: ["admin-poets"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("poets")
        .select("*")
        .order("name", { ascending: true });
      if (error) throw error;
      return data;
    },
  });
};

export const useUpsertPoem = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (poem: Record<string, any>) => {
      if (poem.id) {
        const { id, poets, ...rest } = poem;
        const { error } = await supabase.from("poems").update(rest).eq("id", id);
        if (error) throw error;
      } else {
        const { poets, ...rest } = poem;
        const { error } = await supabase.from("poems").insert(rest);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-poems"] });
      qc.invalidateQueries({ queryKey: ["poems"] });
    },
  });
};

export const useDeletePoem = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("poems").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-poems"] });
      qc.invalidateQueries({ queryKey: ["poems"] });
    },
  });
};

export const useUpsertPoet = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (poet: Record<string, any>) => {
      if (poet.id) {
        const { id, ...rest } = poet;
        const { error } = await supabase.from("poets").update(rest).eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("poets").insert(poet);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-poets"] });
      qc.invalidateQueries({ queryKey: ["poets"] });
    },
  });
};

export const useDeletePoet = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("poets").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-poets"] });
      qc.invalidateQueries({ queryKey: ["poets"] });
    },
  });
};
