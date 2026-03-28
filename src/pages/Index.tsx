import Navbar from "@/components/Navbar";
import PoemOfTheDay from "@/components/PoemOfTheDay";
import FeaturedPoem from "@/components/FeaturedPoem";
import TrendingSection from "@/components/TrendingSection";
import CollectionSection from "@/components/CollectionSection";
import PoemSection from "@/components/PoemSection";
import EditorPicks from "@/components/EditorPicks";
import CategoryBrowse from "@/components/CategoryBrowse";
import { recentPoems, lovePoems } from "@/data/poems";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PoemOfTheDay />
      <FeaturedPoem />
      <TrendingSection />
      <CollectionSection />
      <PoemSection title="Recently Added" poems={recentPoems} viewAllLink="/poems?sort=recent" />
      <PoemSection title="Love & Romance" poems={lovePoems} viewAllLink="/poems?category=romance" />
      <EditorPicks />
      <CategoryBrowse />
    </div>
  );
};

export default Index;
