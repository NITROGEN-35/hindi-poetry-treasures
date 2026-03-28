import { useParams, Link } from "react-router-dom";
import { ArrowLeft, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import PoemCard from "@/components/PoemCard";
import { usePoet, usePoetPoems } from "@/hooks/usePoets";

const PoetDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: poet, isLoading: poetLoading } = usePoet(id || "");
  const { data: poems, isLoading: poemsLoading } = usePoetPoems(id || "");

  if (poetLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="animate-pulse space-y-6">
            <div className="h-20 w-20 bg-muted rounded-full" />
            <div className="h-8 bg-muted rounded w-48" />
            <div className="h-4 bg-muted rounded w-96" />
          </div>
        </div>
      </div>
    );
  }

  if (!poet) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <p className="text-xl text-muted-foreground">Poet not found</p>
          <Link to="/poets" className="text-primary hover:underline mt-4 inline-block">Back to Poets</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/poets" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-sm">
          <ArrowLeft size={16} />
          Back to Poets
        </Link>

        <div className="flex items-start gap-6 mb-10">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            {poet.image_url ? (
              <img src={poet.image_url} alt={poet.name} className="w-20 h-20 rounded-full object-cover" />
            ) : (
              <User size={36} className="text-primary" />
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{poet.name}</h1>
            {poet.name_hindi && (
              <p className="font-hindi text-lg text-muted-foreground">{poet.name_hindi}</p>
            )}
            {(poet.birth_year || poet.death_year) && (
              <p className="text-sm text-muted-foreground mt-1">
                {poet.birth_year} — {poet.death_year || "Present"}
              </p>
            )}
            {poet.bio && (
              <p className="text-muted-foreground mt-4 leading-relaxed">{poet.bio}</p>
            )}
          </div>
        </div>

        <h2 className="text-xl font-bold text-foreground mb-6">
          Poems ({poems?.length || 0})
        </h2>

        {poemsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-44 bg-muted rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {poems?.map((poem) => (
              <PoemCard key={poem.id} poem={poem} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PoetDetailPage;
