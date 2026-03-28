import { Heart, Share2 } from "lucide-react";
import { useFeaturedPoem } from "@/hooks/usePoems";
import { Link } from "react-router-dom";

const FeaturedPoem = () => {
  const { data: poem, isLoading } = useFeaturedPoem();

  if (isLoading || !poem) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="h-[280px] bg-muted rounded-2xl animate-pulse" />
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-primary">✦</span>
        <h2 className="text-xl font-bold text-foreground">Featured</h2>
      </div>

      <div className="gradient-featured rounded-2xl p-8 md:p-12 relative overflow-hidden min-h-[280px] flex flex-col justify-end">
        <div className="absolute top-4 left-4">
          <span className="bg-card/20 backdrop-blur-sm text-primary-foreground text-xs px-3 py-1 rounded-full">
            Featured Poem
          </span>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <button className="w-9 h-9 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-card/30 transition-colors">
            <Heart size={16} />
          </button>
          <button className="w-9 h-9 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-card/30 transition-colors">
            <Share2 size={16} />
          </button>
        </div>

        <span className="inline-block bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full mb-3 w-fit">
          {poem.category}
        </span>
        <h3 className="font-hindi text-3xl md:text-4xl font-bold text-primary-foreground mb-3">
          {poem.title}
        </h3>
        <p className="text-primary-foreground/80 text-sm md:text-base max-w-lg mb-4">
          {poem.excerpt}
        </p>
        <p className="text-primary-foreground/70 text-sm">— {poem.poets?.name || "Unknown"}</p>
        <Link
          to={`/poems/${poem.id}`}
          className="mt-4 bg-card text-foreground px-5 py-2 rounded-full text-sm font-medium hover:bg-card/90 transition-colors w-fit"
        >
          Read Full Poem
        </Link>
      </div>
    </section>
  );
};

export default FeaturedPoem;
