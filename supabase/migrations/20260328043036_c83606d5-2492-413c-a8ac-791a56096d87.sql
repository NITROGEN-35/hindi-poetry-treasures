
CREATE TYPE public.poem_category AS ENUM (
  'Love', 'Nature', 'Life', 'Friendship', 'Spirituality',
  'Patriotic', 'Romance', 'Philosophy', 'Social', 'Modern',
  'Inspiration', 'Empowerment', 'Poetry', 'Classic'
);

CREATE TABLE public.poets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  name_hindi TEXT,
  bio TEXT,
  bio_hindi TEXT,
  image_url TEXT,
  birth_year INTEGER,
  death_year INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.poets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Poets are viewable by everyone" ON public.poets FOR SELECT USING (true);

CREATE TABLE public.poems (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  title_hindi TEXT,
  content TEXT NOT NULL,
  content_hindi TEXT,
  excerpt TEXT,
  poet_id UUID REFERENCES public.poets(id) ON DELETE SET NULL,
  category poem_category NOT NULL DEFAULT 'Life',
  likes INTEGER NOT NULL DEFAULT 0,
  views INTEGER NOT NULL DEFAULT 0,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_poem_of_day BOOLEAN NOT NULL DEFAULT false,
  is_editor_pick BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.poems ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Poems are viewable by everyone" ON public.poems FOR SELECT USING (true);

CREATE TABLE public.saved_poems (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  poem_id UUID NOT NULL REFERENCES public.poems(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, poem_id)
);

ALTER TABLE public.saved_poems ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their saved poems" ON public.saved_poems FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can save poems" ON public.saved_poems FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unsave poems" ON public.saved_poems FOR DELETE USING (auth.uid() = user_id);

CREATE TABLE public.poem_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  poem_id UUID NOT NULL REFERENCES public.poems(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, poem_id)
);

ALTER TABLE public.poem_likes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their likes" ON public.poem_likes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can like poems" ON public.poem_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unlike poems" ON public.poem_likes FOR DELETE USING (auth.uid() = user_id);

CREATE TABLE public.reading_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  poem_id UUID NOT NULL REFERENCES public.poems(id) ON DELETE CASCADE,
  read_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.reading_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their reading history" ON public.reading_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can add reading history" ON public.reading_history FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_poems_category ON public.poems(category);
CREATE INDEX idx_poems_poet_id ON public.poems(poet_id);
CREATE INDEX idx_poems_featured ON public.poems(is_featured);
CREATE INDEX idx_poems_editor_pick ON public.poems(is_editor_pick);
CREATE INDEX idx_poems_poem_of_day ON public.poems(is_poem_of_day);
CREATE INDEX idx_saved_poems_user ON public.saved_poems(user_id);
CREATE INDEX idx_poem_likes_user ON public.poem_likes(user_id);
CREATE INDEX idx_reading_history_user ON public.reading_history(user_id);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_poems_updated_at
  BEFORE UPDATE ON public.poems
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
