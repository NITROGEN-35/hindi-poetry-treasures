import { ArrowRight } from "lucide-react";
import PoemCard from "./PoemCard";
import { usePoems } from "@/hooks/usePoems";
import { Link } from "react-router-dom";

const TrendingSection = () => {
  const { data: poems, isLoading } = usePoems({ sort: "popular", limit: 4 });

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Trending Now</h2>
        <Link to="/poems" className="flex items-center gap-1 text-sm text-primary hover:underline font-medium">
          View All <ArrowRight size={14} />
        </Link>
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-40 bg-muted rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {poems?.map((poem) => (
            <PoemCard key={poem.id} poem={poem} />
          ))}
        </div>
      )}
    </section>
  );
};

export default TrendingSection;
