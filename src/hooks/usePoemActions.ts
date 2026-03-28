import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export const usePoemLike = (poemId: string) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: isLiked = false } = useQuery({
    queryKey: ["poem-like", poemId, user?.id],
    queryFn: async () => {
      if (!user) return false;
      const { data } = await supabase
        .from("poem_likes")
        .select("id")
        .eq("poem_id", poemId)
        .eq("user_id", user.id)
        .maybeSingle();
      return !!data;
    },
    enabled: !!user && !!poemId,
  });

  const toggleLike = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Please sign in to like poems");
      if (isLiked) {
        const { error } = await supabase
          .from("poem_likes")
          .delete()
          .eq("poem_id", poemId)
          .eq("user_id", user.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("poem_likes")
          .insert({ poem_id: poemId, user_id: user.id });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["poem-like", poemId] });
      queryClient.invalidateQueries({ queryKey: ["poem", poemId] });
      queryClient.invalidateQueries({ queryKey: ["poems"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return { isLiked, toggleLike: toggleLike.mutate, isToggling: toggleLike.isPending };
};

export const useSavedPoem = (poemId: string) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: isSaved = false } = useQuery({
    queryKey: ["saved-poem", poemId, user?.id],
    queryFn: async () => {
      if (!user) return false;
      const { data } = await supabase
        .from("saved_poems")
        .select("id")
        .eq("poem_id", poemId)
        .eq("user_id", user.id)
        .maybeSingle();
      return !!data;
    },
    enabled: !!user && !!poemId,
  });

  const toggleSave = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Please sign in to save poems");
      if (isSaved) {
        const { error } = await supabase
          .from("saved_poems")
          .delete()
          .eq("poem_id", poemId)
          .eq("user_id", user.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("saved_poems")
          .insert({ poem_id: poemId, user_id: user.id });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-poem", poemId] });
      toast.success(isSaved ? "Removed from saved" : "Poem saved!");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return { isSaved, toggleSave: toggleSave.mutate, isToggling: toggleSave.isPending };
};
