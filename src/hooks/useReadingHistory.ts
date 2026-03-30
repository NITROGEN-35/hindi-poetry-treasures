import { useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const useReadingHistory = (poemId: string | undefined) => {
  const { user } = useAuth();
  const logged = useRef(false);

  useEffect(() => {
    if (!user || !poemId || logged.current) return;
    logged.current = true;

    supabase
      .from("reading_history")
      .insert({ poem_id: poemId, user_id: user.id })
      .then(({ error }) => {
        if (error) console.error("Failed to log reading history:", error.message);
      });
  }, [user, poemId]);
};
