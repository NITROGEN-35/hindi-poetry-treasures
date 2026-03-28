import { Heart, Eye } from "lucide-react";
import { useEditorPicks } from "@/hooks/usePoems";
import { Link } from "react-router-dom";

const EditorPicks = () => {
  const { data: poems, isLoading } = useEditorPicks();

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-xl font-bold text-foreground mb-6">Editor's Picks</h2>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-muted rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {poems?.map((poem) => (
            <Link
              key={poem.id}
              to={`/poems/${poem.id}`}
              className="bg-card border border-border/50 rounded-xl p-5 hover:shadow-card-hover transition-shadow cursor-pointer group block"
            >
              <span className="text-[11px] px-2.5 py-1 rounded-full font-medium bg-secondary text-secondary-foreground">
                {poem.category}
              </span>
              <p className="text-sm text-muted-foreground mt-3 line-clamp-2 leading-relaxed">
                {poem.excerpt}
              </p>
              <h4 className="font-semibold text-foreground text-sm mt-3 group-hover:text-primary transition-colors">
                {poem.title}
              </h4>
              <p className="text-xs text-muted-foreground">{poem.poets?.name || "Unknown"}</p>
              <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Heart size={12} /> {poem.likes?.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <Eye size={12} /> {((poem.views || 0) / 1000).toFixed(1)}K
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default EditorPicks;
