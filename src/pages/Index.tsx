import Navbar from "@/components/Navbar";
import PoemOfTheDay from "@/components/PoemOfTheDay";
import FeaturedPoem from "@/components/FeaturedPoem";
import TrendingSection from "@/components/TrendingSection";
import CollectionSection from "@/components/CollectionSection";
import PoemSection from "@/components/PoemSection";
import EditorPicks from "@/components/EditorPicks";
import CategoryBrowse from "@/components/CategoryBrowse";
import { usePoems } from "@/hooks/usePoems";

const Index = () => {
  const { data: recentPoems, isLoading: recentLoading } = usePoems({ sort: "recent", limit: 4 });
  const { data: lovePoems, isLoading: loveLoading } = usePoems({ category: "Love", limit: 4 });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PoemOfTheDay />
      <FeaturedPoem />
      <TrendingSection />
      <CollectionSection />
      <PoemSection title="Recently Added" poems={recentPoems} isLoading={recentLoading} viewAllLink="/poems?sort=recent" />
      <PoemSection title="Love & Romance" poems={lovePoems} isLoading={loveLoading} viewAllLink="/poems?category=Love" />
      <EditorPicks />
      <CategoryBrowse />
    </div>
  );
};

export default Index;
