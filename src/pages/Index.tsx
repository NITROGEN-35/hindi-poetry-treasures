import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PoemOfTheDay from "@/components/PoemOfTheDay";
import FeaturedPoem from "@/components/FeaturedPoem";
import TrendingSection from "@/components/TrendingSection";
import CollectionSection from "@/components/CollectionSection";
import PoemSection from "@/components/PoemSection";
import EditorPicks from "@/components/EditorPicks";
import CategoryBrowse from "@/components/CategoryBrowse";
import ScrollReveal from "@/components/ScrollReveal";
import { usePoems } from "@/hooks/usePoems";

const Index = () => {
  const { data: recentPoems, isLoading: recentLoading } = usePoems({ sort: "recent", limit: 4 });
  const { data: lovePoems, isLoading: loveLoading } = usePoems({ category: "Love", limit: 4 });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ScrollReveal>
        <PoemOfTheDay />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <FeaturedPoem />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <TrendingSection />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <CollectionSection />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <PoemSection title="Recently Added" poems={recentPoems} isLoading={recentLoading} viewAllLink="/poems?sort=recent" />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <PoemSection title="Love & Romance" poems={lovePoems} isLoading={loveLoading} viewAllLink="/poems?category=Love" />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <EditorPicks />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <CategoryBrowse />
      </ScrollReveal>
      <Footer />
    </div>
  );
};

export default Index;
