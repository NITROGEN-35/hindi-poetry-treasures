import { Link } from "react-router-dom";
import { User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePoets } from "@/hooks/usePoets";

const PoetsPage = () => {
  const { data: poets, isLoading } = usePoets();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Poets</h1>
        <p className="text-muted-foreground mb-8">Discover the voices behind the verses</p>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-48 bg-muted rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {poets?.map((poet) => (
              <Link
                key={poet.id}
                to={`/poets/${poet.id}`}
                className="bg-card border border-border/50 rounded-xl p-6 hover:shadow-card-hover transition-shadow group block"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    {poet.image_url ? (
                      <img src={poet.image_url} alt={poet.name} className="w-14 h-14 rounded-full object-cover" />
                    ) : (
                      <User size={24} className="text-primary" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                      {poet.name}
                    </h3>
                    {poet.name_hindi && (
                      <p className="font-hindi text-sm text-muted-foreground">{poet.name_hindi}</p>
                    )}
                    {(poet.birth_year || poet.death_year) && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {poet.birth_year} — {poet.death_year || "Present"}
                      </p>
                    )}
                  </div>
                </div>
                {poet.bio && (
                  <p className="text-sm text-muted-foreground mt-4 line-clamp-2">{poet.bio}</p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PoetsPage;
