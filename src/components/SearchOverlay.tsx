import { useState, useEffect, useRef } from "react";
import { Search, X, FileText, User } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Poem } from "@/hooks/usePoems";
import type { Poet } from "@/hooks/usePoets";

const SearchOverlay = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [query, setQuery] = useState("");
  const [poems, setPoems] = useState<Poem[]>([]);
  const [poets, setPoets] = useState<Poet[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (open) {
      setQuery("");
      setPoems([]);
      setPoets([]);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!query.trim()) {
      setPoems([]);
      setPoets([]);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      const q = `%${query.trim()}%`;
      const [poemRes, poetRes] = await Promise.all([
        supabase
          .from("poems")
          .select("*, poets(*)")
          .or(`title.ilike.${q},title_hindi.ilike.${q},excerpt.ilike.${q}`)
          .limit(6),
        supabase
          .from("poets")
          .select("*")
          .or(`name.ilike.${q},name_hindi.ilike.${q}`)
          .limit(4),
      ]);
      setPoems((poemRes.data as Poem[]) || []);
      setPoets((poetRes.data as Poet[]) || []);
      setLoading(false);
    }, 250);
  }, [query]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onClose();
      }
    };
    if (open) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const hasResults = poems.length > 0 || poets.length > 0;
  const hasQuery = query.trim().length > 0;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]" onClick={onClose}>
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg mx-4 bg-card border border-border rounded-2xl shadow-xl overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 h-14 border-b border-border">
          <Search size={18} className="text-muted-foreground flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search poems, poets..."
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
          />
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X size={18} />
          </button>
        </div>

        {hasQuery && (
          <div className="max-h-[50vh] overflow-y-auto p-2">
            {loading && (
              <div className="p-4 text-center text-sm text-muted-foreground">Searching...</div>
            )}
            {!loading && !hasResults && (
              <div className="p-8 text-center text-sm text-muted-foreground">
                No results found for "{query}"
              </div>
            )}

            {poets.length > 0 && (
              <div className="mb-2">
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground px-3 py-2 font-medium">Poets</p>
                {poets.map((poet) => (
                  <Link
                    key={poet.id}
                    to={`/poets/${poet.id}`}
                    onClick={onClose}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <User size={14} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{poet.name}</p>
                      {poet.name_hindi && (
                        <p className="text-xs text-muted-foreground font-hindi">{poet.name_hindi}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {poems.length > 0 && (
              <div>
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground px-3 py-2 font-medium">Poems</p>
                {poems.map((poem) => (
                  <Link
                    key={poem.id}
                    to={`/poems/${poem.id}`}
                    onClick={onClose}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                      <FileText size={14} className="text-muted-foreground" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{poem.title}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {poem.poets?.name || "Unknown"} · {poem.category}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="px-4 py-2 border-t border-border flex items-center justify-end gap-3 text-[11px] text-muted-foreground">
          <span><kbd className="px-1.5 py-0.5 bg-secondary rounded text-[10px]">ESC</kbd> to close</span>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
