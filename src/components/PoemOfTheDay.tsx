import { Heart, Bookmark, ArrowRight } from "lucide-react";
import { poemOfTheDay } from "@/data/poems";

const PoemOfTheDay = () => {
  const poem = poemOfTheDay;

  return (
    <section className="gradient-hero py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-10">
          <span className="text-primary">✦</span>
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-medium">
            Poem of the Day
          </span>
          <span className="text-primary">✦</span>
        </div>

        <div className="text-primary/30 text-5xl font-serif mb-4">"</div>

        <div className="font-hindi text-xl md:text-2xl leading-relaxed text-foreground/90 whitespace-pre-line mb-4">
          {poem.excerpt}
        </div>

        <div className="text-primary/30 text-5xl font-serif mb-8">"</div>

        <div className="w-12 h-0.5 bg-primary mx-auto mb-4" />
        <h3 className="font-hindi text-lg font-semibold text-foreground">{poem.title}</h3>
        <p className="text-muted-foreground text-sm mt-1">— {poem.poet}</p>

        <div className="flex items-center justify-center gap-6 mt-8">
          <button className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors text-sm">
            <Heart size={16} />
            <span>{(poem.likes / 1000).toFixed(1)}k</span>
          </button>
          <button className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors text-sm">
            <Bookmark size={16} />
            <span>Save</span>
          </button>
          <button className="flex items-center gap-1.5 bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
            Read More
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PoemOfTheDay;
