import { Heart } from "lucide-react";
import type { Poem } from "@/data/poems";

interface PoemCardProps {
  poem: Poem;
}

const categoryColors: Record<string, string> = {
  Life: "bg-primary/10 text-primary",
  Inspiration: "bg-amber-100 text-amber-700",
  Love: "bg-rose-100 text-rose-700",
  Nature: "bg-emerald-100 text-emerald-700",
  Romance: "bg-pink-100 text-pink-700",
  Spirituality: "bg-violet-100 text-violet-700",
  Empowerment: "bg-orange-100 text-orange-700",
  Poetry: "bg-blue-100 text-blue-700",
  Classic: "bg-stone-100 text-stone-700",
  Patriotic: "bg-yellow-100 text-yellow-700",
};

const PoemCard = ({ poem }: PoemCardProps) => {
  return (
    <div className="bg-card rounded-xl p-5 shadow-card hover:shadow-card-hover transition-shadow cursor-pointer group border border-border/50">
      <span className={`text-[11px] px-2.5 py-1 rounded-full font-medium ${categoryColors[poem.category] || "bg-secondary text-secondary-foreground"}`}>
        {poem.category}
      </span>
      <p className="text-sm text-muted-foreground mt-3 line-clamp-2 leading-relaxed">
        {poem.excerpt}
      </p>
      <div className="flex items-center justify-between mt-4">
        <div>
          <h4 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
            {poem.title}
          </h4>
          <p className="text-xs text-muted-foreground">{poem.poet}</p>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground text-xs">
          <Heart size={12} />
          <span>{poem.likes}</span>
        </div>
      </div>
    </div>
  );
};

export default PoemCard;
