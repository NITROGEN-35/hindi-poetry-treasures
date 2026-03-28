import { ArrowRight } from "lucide-react";
import { collectionPoem } from "@/data/poems";

const CollectionSection = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="bg-secondary/60 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-1">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">संग्रह से</p>
          <blockquote className="font-hindi text-lg md:text-xl leading-relaxed text-foreground/90 whitespace-pre-line border-l-2 border-primary pl-4">
            {collectionPoem.excerpt}
          </blockquote>
        </div>
        <div className="md:text-right flex-shrink-0">
          <h3 className="font-hindi text-2xl font-bold text-foreground">{collectionPoem.title}</h3>
          <p className="text-muted-foreground text-sm mt-1">{collectionPoem.poet}</p>
          <button className="mt-4 flex items-center gap-1.5 text-sm text-primary hover:underline font-medium md:ml-auto">
            पूरी कविता पढ़ें <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CollectionSection;
