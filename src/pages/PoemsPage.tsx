import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PoemCard from "@/components/PoemCard";
import { usePoems } from "@/hooks/usePoems";
import { Constants } from "@/integrations/supabase/types";

const categories = Constants.public.Enums.poem_category;

const PoemsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  
  const activeCategory = searchParams.get("category") || "";
  const sort = (searchParams.get("sort") as "recent" | "popular") || "popular";

  const { data: poems, isLoading } = usePoems({
    category: activeCategory || undefined,
    sort,
    search: search || undefined,
  });

  const setCategory = (cat: string) => {
    const params = new URLSearchParams(searchParams);
    if (cat) {
      params.set("category", cat);
    } else {
      params.delete("category");
    }
    setSearchParams(params);
  };

  const setSort = (s: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", s);
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Poems</h1>
        <p className="text-muted-foreground mb-8">Explore our collection of beautiful Hindi and world poetry</p>

        {/* Search */}
        <div className="relative mb-6">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search poems..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setCategory("")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              !activeCategory ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex gap-4 mb-8 text-sm">
          <button
            onClick={() => setSort("popular")}
            className={`font-medium transition-colors ${sort === "popular" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
          >
            Most Popular
          </button>
          <button
            onClick={() => setSort("recent")}
            className={`font-medium transition-colors ${sort === "recent" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
          >
            Most Recent
          </button>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-44 bg-muted rounded-xl animate-pulse" />
            ))}
          </div>
        ) : poems?.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">No poems found</p>
            <p className="text-sm mt-1">Try a different search or category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {poems?.map((poem) => (
              <PoemCard key={poem.id} poem={poem} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PoemsPage;
