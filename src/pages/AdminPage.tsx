import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Plus, Pencil, Trash2, BookOpen, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { useIsAdmin, useAdminPoems, useAdminPoets, useUpsertPoem, useDeletePoem, useUpsertPoet, useDeletePoet } from "@/hooks/useAdmin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Constants } from "@/integrations/supabase/types";

const categories = Constants.public.Enums.poem_category;

const emptyPoem = {
  title: "", title_hindi: "", content: "", content_hindi: "", excerpt: "",
  category: "Life" as string, poet_id: "" as string | null, likes: 0, views: 0,
  is_featured: false, is_poem_of_day: false, is_editor_pick: false, display_order: 0,
};

const emptyPoet = {
  name: "", name_hindi: "", bio: "", bio_hindi: "", image_url: "",
  birth_year: null as number | null, death_year: null as number | null,
};

const AdminPage = () => {
  const { user, loading: authLoading } = useAuth();
  const { data: isAdmin, isLoading: adminLoading } = useIsAdmin();
  const { data: poems } = useAdminPoems();
  const { data: poets } = useAdminPoets();
  const upsertPoem = useUpsertPoem();
  const deletePoem = useDeletePoem();
  const upsertPoet = useUpsertPoet();
  const deletePoet = useDeletePoet();

  const [poemDialog, setPoemDialog] = useState(false);
  const [poetDialog, setPoetDialog] = useState(false);
  const [poemForm, setPoemForm] = useState(emptyPoem as any);
  const [poetForm, setPoetForm] = useState(emptyPoet as any);

  if (authLoading || adminLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-20 text-center text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  const openPoemEdit = (poem?: any) => {
    setPoemForm(poem ? { ...poem } : { ...emptyPoem });
    setPoemDialog(true);
  };

  const openPoetEdit = (poet?: any) => {
    setPoetForm(poet ? { ...poet } : { ...emptyPoet });
    setPoetDialog(true);
  };

  const handlePoemSave = async () => {
    if (!poemForm.title || !poemForm.content) {
      return toast.error("Title and content are required");
    }
    try {
      await upsertPoem.mutateAsync({
        ...poemForm,
        poet_id: poemForm.poet_id || null,
      });
      toast.success(poemForm.id ? "Poem updated" : "Poem created");
      setPoemDialog(false);
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const handlePoetSave = async () => {
    if (!poetForm.name) {
      return toast.error("Name is required");
    }
    try {
      await upsertPoet.mutateAsync({
        ...poetForm,
        birth_year: poetForm.birth_year ? Number(poetForm.birth_year) : null,
        death_year: poetForm.death_year ? Number(poetForm.death_year) : null,
      });
      toast.success(poetForm.id ? "Poet updated" : "Poet created");
      setPoetDialog(false);
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const handlePoemDelete = async (id: string) => {
    if (!confirm("Delete this poem?")) return;
    try {
      await deletePoem.mutateAsync(id);
      toast.success("Poem deleted");
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const handlePoetDelete = async (id: string) => {
    if (!confirm("Delete this poet? This may fail if poems reference them.")) return;
    try {
      await deletePoet.mutateAsync(id);
      toast.success("Poet deleted");
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-foreground mb-6">Admin Dashboard</h1>

        <Tabs defaultValue="poems">
          <TabsList className="mb-6">
            <TabsTrigger value="poems" className="gap-2"><BookOpen size={16} /> Poems ({poems?.length ?? 0})</TabsTrigger>
            <TabsTrigger value="poets" className="gap-2"><Users size={16} /> Poets ({poets?.length ?? 0})</TabsTrigger>
          </TabsList>

          {/* POEMS TAB */}
          <TabsContent value="poems">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-muted-foreground">Manage all poems</p>
              <Button onClick={() => openPoemEdit()} size="sm" className="gap-2"><Plus size={16} /> Add Poem</Button>
            </div>
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">Title</th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Poet</th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Category</th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Flags</th>
                      <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {poems?.map((poem: any) => (
                      <tr key={poem.id} className="border-b border-border/50 hover:bg-muted/30">
                        <td className="px-4 py-3">
                          <div className="font-medium text-foreground">{poem.title}</div>
                          {poem.title_hindi && <div className="text-xs text-muted-foreground font-hindi">{poem.title_hindi}</div>}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{poem.poets?.name ?? "—"}</td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{poem.category}</span>
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <div className="flex gap-1 flex-wrap">
                            {poem.is_featured && <span className="text-[10px] bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-1.5 py-0.5 rounded">Featured</span>}
                            {poem.is_poem_of_day && <span className="text-[10px] bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-1.5 py-0.5 rounded">POTD</span>}
                            {poem.is_editor_pick && <span className="text-[10px] bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-1.5 py-0.5 rounded">Editor Pick</span>}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex gap-1 justify-end">
                            <Button variant="ghost" size="icon" onClick={() => openPoemEdit(poem)}><Pencil size={14} /></Button>
                            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handlePoemDelete(poem.id)}><Trash2 size={14} /></Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* POETS TAB */}
          <TabsContent value="poets">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-muted-foreground">Manage all poets</p>
              <Button onClick={() => openPoetEdit()} size="sm" className="gap-2"><Plus size={16} /> Add Poet</Button>
            </div>
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">Name</th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Years</th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Bio</th>
                      <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {poets?.map((poet: any) => (
                      <tr key={poet.id} className="border-b border-border/50 hover:bg-muted/30">
                        <td className="px-4 py-3">
                          <div className="font-medium text-foreground">{poet.name}</div>
                          {poet.name_hindi && <div className="text-xs text-muted-foreground font-hindi">{poet.name_hindi}</div>}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                          {poet.birth_year ?? "?"} – {poet.death_year ?? "present"}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground hidden md:table-cell max-w-xs truncate">{poet.bio ?? "—"}</td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex gap-1 justify-end">
                            <Button variant="ghost" size="icon" onClick={() => openPoetEdit(poet)}><Pencil size={14} /></Button>
                            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handlePoetDelete(poet.id)}><Trash2 size={14} /></Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* POEM DIALOG */}
      <Dialog open={poemDialog} onOpenChange={setPoemDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{poemForm.id ? "Edit Poem" : "Add Poem"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Title (English) *</Label>
                <Input value={poemForm.title} onChange={(e) => setPoemForm({ ...poemForm, title: e.target.value })} />
              </div>
              <div>
                <Label>Title (Hindi)</Label>
                <Input value={poemForm.title_hindi ?? ""} onChange={(e) => setPoemForm({ ...poemForm, title_hindi: e.target.value })} className="font-hindi" />
              </div>
            </div>
            <div>
              <Label>Content (English) *</Label>
              <Textarea value={poemForm.content} onChange={(e) => setPoemForm({ ...poemForm, content: e.target.value })} rows={6} />
            </div>
            <div>
              <Label>Content (Hindi)</Label>
              <Textarea value={poemForm.content_hindi ?? ""} onChange={(e) => setPoemForm({ ...poemForm, content_hindi: e.target.value })} rows={6} className="font-hindi" />
            </div>
            <div>
              <Label>Excerpt</Label>
              <Textarea value={poemForm.excerpt ?? ""} onChange={(e) => setPoemForm({ ...poemForm, excerpt: e.target.value })} rows={2} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Category</Label>
                <Select value={poemForm.category} onValueChange={(v) => setPoemForm({ ...poemForm, category: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Poet</Label>
                <Select value={poemForm.poet_id ?? ""} onValueChange={(v) => setPoemForm({ ...poemForm, poet_id: v || null })}>
                  <SelectTrigger><SelectValue placeholder="Select poet" /></SelectTrigger>
                  <SelectContent>
                    {poets?.map((p: any) => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Display Order</Label>
              <Input type="number" value={poemForm.display_order ?? 0} onChange={(e) => setPoemForm({ ...poemForm, display_order: Number(e.target.value) })} />
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Switch checked={poemForm.is_featured} onCheckedChange={(v) => setPoemForm({ ...poemForm, is_featured: v })} />
                <Label>Featured</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={poemForm.is_poem_of_day} onCheckedChange={(v) => setPoemForm({ ...poemForm, is_poem_of_day: v })} />
                <Label>Poem of Day</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={poemForm.is_editor_pick} onCheckedChange={(v) => setPoemForm({ ...poemForm, is_editor_pick: v })} />
                <Label>Editor Pick</Label>
              </div>
            </div>
            <Button onClick={handlePoemSave} disabled={upsertPoem.isPending} className="w-full">
              {upsertPoem.isPending ? "Saving..." : poemForm.id ? "Update Poem" : "Create Poem"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* POET DIALOG */}
      <Dialog open={poetDialog} onOpenChange={setPoetDialog}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{poetForm.id ? "Edit Poet" : "Add Poet"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Name (English) *</Label>
                <Input value={poetForm.name} onChange={(e) => setPoetForm({ ...poetForm, name: e.target.value })} />
              </div>
              <div>
                <Label>Name (Hindi)</Label>
                <Input value={poetForm.name_hindi ?? ""} onChange={(e) => setPoetForm({ ...poetForm, name_hindi: e.target.value })} className="font-hindi" />
              </div>
            </div>
            <div>
              <Label>Bio (English)</Label>
              <Textarea value={poetForm.bio ?? ""} onChange={(e) => setPoetForm({ ...poetForm, bio: e.target.value })} rows={3} />
            </div>
            <div>
              <Label>Bio (Hindi)</Label>
              <Textarea value={poetForm.bio_hindi ?? ""} onChange={(e) => setPoetForm({ ...poetForm, bio_hindi: e.target.value })} rows={3} className="font-hindi" />
            </div>
            <div>
              <Label>Image URL</Label>
              <Input value={poetForm.image_url ?? ""} onChange={(e) => setPoetForm({ ...poetForm, image_url: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Birth Year</Label>
                <Input type="number" value={poetForm.birth_year ?? ""} onChange={(e) => setPoetForm({ ...poetForm, birth_year: e.target.value || null })} />
              </div>
              <div>
                <Label>Death Year</Label>
                <Input type="number" value={poetForm.death_year ?? ""} onChange={(e) => setPoetForm({ ...poetForm, death_year: e.target.value || null })} />
              </div>
            </div>
            <Button onClick={handlePoetSave} disabled={upsertPoet.isPending} className="w-full">
              {upsertPoet.isPending ? "Saving..." : poetForm.id ? "Update Poet" : "Create Poet"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default AdminPage;
