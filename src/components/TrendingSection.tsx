import { ArrowRight } from "lucide-react";
import PoemCard from "./PoemCard";
import { trendingPoems } from "@/data/poems";

const TrendingSection = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Trending Now</h2>
        <button className="flex items-center gap-1 text-sm text-primary hover:underline font-medium">
          View All <ArrowRight size={14} />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {trendingPoems.map((poem, i) => (
          <PoemCard key={i} poem={poem} />
        ))}
      </div>
    </section>
  );
};

export default TrendingSection;
