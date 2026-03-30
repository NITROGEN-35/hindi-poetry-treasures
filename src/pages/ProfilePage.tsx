import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Heart, Bookmark, Clock, LogOut, Mail, CalendarDays } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PoemCard from "@/components/PoemCard";
import ScrollReveal from "@/components/ScrollReveal";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ProfilePage = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const { data: savedPoems, isLoading: savedLoading } = useQuery({
    queryKey: ["saved-poems-profile", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("saved_poems")
        .select("poem_id, created_at, poems(*, poets(*))")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: likedPoems, isLoading: likedLoading } = useQuery({
    queryKey: ["liked-poems-profile", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("poem_likes")
        .select("poem_id, created_at, poems(*, poets(*))")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: readingHistory, isLoading: historyLoading } = useQuery({
    queryKey: ["reading-history-profile", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reading_history")
        .select("poem_id, read_at, poems(*, poets(*))")
        .eq("user_id", user!.id)
        .order("read_at", { ascending: false })
        .limit(12);
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-20 w-20 bg-muted rounded-full mx-auto" />
            <div className="h-6 bg-muted rounded w-48 mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  const joinDate = new Date(user.created_at).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const PoemGrid = ({ items, loading: isLoading, emptyMsg }: { items: any[] | undefined; loading: boolean; emptyMsg: string }) => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-44 bg-muted rounded-xl animate-pulse" />
          ))}
        </div>
      );
    }
    if (!items || items.length === 0) {
      return <p className="text-muted-foreground text-sm py-8 text-center">{emptyMsg}</p>;
    }
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item: any) => (
          <PoemCard key={item.poem_id} poem={item.poems} />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <ScrollReveal>
          <div className="bg-card border border-border/50 rounded-2xl p-8 mb-10">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <User size={36} className="text-primary" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl font-bold text-foreground">
                  {user.user_metadata?.full_name || user.email?.split("@")[0] || "Poetry Lover"}
                </h1>
                <div className="flex flex-col sm:flex-row gap-3 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5 justify-center sm:justify-start">
                    <Mail size={14} /> {user.email}
                  </span>
                  <span className="flex items-center gap-1.5 justify-center sm:justify-start">
                    <CalendarDays size={14} /> Joined {joinDate}
                  </span>
                </div>
                <div className="flex gap-6 mt-4 justify-center sm:justify-start">
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">{savedPoems?.length || 0}</p>
                    <p className="text-xs text-muted-foreground">Saved</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">{likedPoems?.length || 0}</p>
                    <p className="text-xs text-muted-foreground">Liked</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">{readingHistory?.length || 0}</p>
                    <p className="text-xs text-muted-foreground">Read</p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:bg-destructive hover:text-destructive-foreground transition-colors"
              >
                <LogOut size={14} />
                Sign Out
              </button>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-5">
              <Bookmark size={18} className="text-primary" />
              <h2 className="text-lg font-bold text-foreground">Saved Poems</h2>
            </div>
            <PoemGrid items={savedPoems} loading={savedLoading} emptyMsg="No saved poems yet. Browse and save poems you love!" />
          </section>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-5">
              <Heart size={18} className="text-primary" />
              <h2 className="text-lg font-bold text-foreground">Liked Poems</h2>
            </div>
            <PoemGrid items={likedPoems} loading={likedLoading} emptyMsg="No liked poems yet. Tap the heart on poems you enjoy!" />
          </section>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-5">
              <Clock size={18} className="text-primary" />
              <h2 className="text-lg font-bold text-foreground">Reading History</h2>
            </div>
            <PoemGrid items={readingHistory} loading={historyLoading} emptyMsg="No reading history yet. Start exploring poems!" />
          </section>
        </ScrollReveal>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
