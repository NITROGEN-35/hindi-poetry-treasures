import { BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PoemCard from "@/components/PoemCard";
import { usePoems } from "@/hooks/usePoems";
import { Constants } from "@/integrations/supabase/types";
import { Link } from "react-router-dom";

const categories = Constants.public.Enums.poem_category;

const LibraryPage = () => {
  const { data: poems, isLoading } = usePoems();

  // Group poems by category
  const grouped = poems?.reduce((acc, poem) => {
    if (!acc[poem.category]) acc[poem.category] = [];
    acc[poem.category].push(poem);
    return acc;
  }, {} as Record<string, typeof poems>);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen size={28} className="text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Library</h1>
        </div>
        <p className="text-muted-foreground mb-8">Browse our complete collection organized by category</p>

        {isLoading ? (
          <div className="space-y-12">
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <div className="h-6 bg-muted rounded w-32 mb-4" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="h-44 bg-muted rounded-xl animate-pulse" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-12">
            {categories.map((cat) => {
              const catPoems = grouped?.[cat];
              if (!catPoems || catPoems.length === 0) return null;
              return (
                <div key={cat}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-foreground">{cat}</h2>
                    <Link
                      to={`/poems?category=${cat}`}
                      className="text-sm text-primary hover:underline"
                    >
                      View All
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {catPoems.map((poem) => (
                      <PoemCard key={poem.id} poem={poem} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default LibraryPage;
