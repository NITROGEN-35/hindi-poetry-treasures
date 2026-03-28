import { ArrowRight } from "lucide-react";
import PoemCard from "./PoemCard";
import type { Poem } from "@/data/poems";

interface PoemSectionProps {
  title: string;
  poems: Poem[];
  viewAllLink?: string;
}

const PoemSection = ({ title, poems, viewAllLink }: PoemSectionProps) => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
        {viewAllLink && (
          <button className="flex items-center gap-1 text-sm text-primary hover:underline font-medium">
            View All <ArrowRight size={14} />
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {poems.map((poem, i) => (
          <PoemCard key={i} poem={poem} />
        ))}
      </div>
    </section>
  );
};

export default PoemSection;
