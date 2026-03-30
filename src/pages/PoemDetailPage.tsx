import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, Bookmark, Share2, Eye } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePoem } from "@/hooks/usePoems";
import { usePoemLike, useSavedPoem } from "@/hooks/usePoemActions";
import { useAuth } from "@/hooks/useAuth";
import { useReadingHistory } from "@/hooks/useReadingHistory";
import { toast } from "sonner";

const PoemDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: poem, isLoading } = usePoem(id || "");
  const { user } = useAuth();
  const { isLiked, toggleLike, isToggling: likeToggling } = usePoemLike(id || "");
  const { isSaved, toggleSave, isToggling: saveToggling } = useSavedPoem(id || "");
  useReadingHistory(id);

  const handleLike = () => {
    if (!user) return toast.error("Please sign in to like poems");
    toggleLike();
  };

  const handleSave = () => {
    if (!user) return toast.error("Please sign in to save poems");
    toggleSave();
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-64" />
            <div className="h-4 bg-muted rounded w-40" />
            <div className="h-64 bg-muted rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!poem) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <p className="text-xl text-muted-foreground">Poem not found</p>
          <Link to="/poems" className="text-primary hover:underline mt-4 inline-block">
            Back to Poems
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link to="/poems" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-sm">
          <ArrowLeft size={16} />
          Back to Poems
        </Link>

        <div className="text-center mb-10">
          <span className="inline-block bg-primary/10 text-primary text-xs px-3 py-1 rounded-full font-medium mb-4">
            {poem.category}
          </span>
          <h1 className="font-hindi text-3xl md:text-4xl font-bold text-foreground mb-3">
            {poem.title}
          </h1>
          {poem.poets && (
            <Link
              to={`/poets/${poem.poet_id}`}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              — {poem.poets.name_hindi || poem.poets.name}
            </Link>
          )}
        </div>

        <div className="bg-card rounded-2xl border border-border/50 p-8 md:p-12 mb-8">
          <div className="text-primary/30 text-4xl font-serif mb-6">"</div>
          <div className="font-hindi text-lg md:text-xl leading-relaxed text-foreground/90 whitespace-pre-line">
            {poem.content}
          </div>
          <div className="text-primary/30 text-4xl font-serif mt-6 text-right">"</div>
        </div>

        <div className="flex items-center justify-center gap-6">
          <button
            onClick={handleLike}
            disabled={likeToggling}
            className={`flex items-center gap-2 transition-colors ${
              isLiked ? "text-rose-500" : "text-muted-foreground hover:text-rose-500"
            }`}
          >
            <Heart size={20} className={isLiked ? "fill-rose-500" : ""} />
            <span className="text-sm">{poem.likes.toLocaleString()}</span>
          </button>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Eye size={20} />
            <span className="text-sm">{poem.views.toLocaleString()}</span>
          </div>
          <button
            onClick={handleSave}
            disabled={saveToggling}
            className={`flex items-center gap-2 transition-colors ${
              isSaved ? "text-primary" : "text-muted-foreground hover:text-primary"
            }`}
          >
            <Bookmark size={20} className={isSaved ? "fill-primary" : ""} />
            <span className="text-sm">{isSaved ? "Saved" : "Save"}</span>
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Share2 size={20} />
            <span className="text-sm">Share</span>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PoemDetailPage;
