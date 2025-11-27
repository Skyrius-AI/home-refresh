-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create notes table
CREATE TABLE public.notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  folder_path TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on notes
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;

-- Notes policies
CREATE POLICY "Users can view own notes"
  ON public.notes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own notes"
  ON public.notes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own notes"
  ON public.notes FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own notes"
  ON public.notes FOR DELETE
  USING (auth.uid() = user_id);

-- Create library items table
CREATE TABLE public.library_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  item_type TEXT NOT NULL CHECK (item_type IN ('paper', 'video', 'podcast', 'document')),
  url TEXT,
  source_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on library_items
ALTER TABLE public.library_items ENABLE ROW LEVEL SECURITY;

-- Library items policies
CREATE POLICY "Users can view own library items"
  ON public.library_items FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own library items"
  ON public.library_items FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own library items"
  ON public.library_items FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own library items"
  ON public.library_items FOR DELETE
  USING (auth.uid() = user_id);

-- Create tags table
CREATE TABLE public.tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  color TEXT DEFAULT '#6DD4C5',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(user_id, name)
);

-- Enable RLS on tags
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;

-- Tags policies
CREATE POLICY "Users can view own tags"
  ON public.tags FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own tags"
  ON public.tags FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tags"
  ON public.tags FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own tags"
  ON public.tags FOR DELETE
  USING (auth.uid() = user_id);

-- Create note_tags junction table
CREATE TABLE public.note_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  note_id UUID NOT NULL REFERENCES public.notes(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(note_id, tag_id)
);

-- Enable RLS on note_tags
ALTER TABLE public.note_tags ENABLE ROW LEVEL SECURITY;

-- Note tags policies
CREATE POLICY "Users can view own note tags"
  ON public.note_tags FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.notes
    WHERE notes.id = note_tags.note_id
    AND notes.user_id = auth.uid()
  ));

CREATE POLICY "Users can create own note tags"
  ON public.note_tags FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.notes
    WHERE notes.id = note_tags.note_id
    AND notes.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete own note tags"
  ON public.note_tags FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.notes
    WHERE notes.id = note_tags.note_id
    AND notes.user_id = auth.uid()
  ));

-- Create library_item_tags junction table
CREATE TABLE public.library_item_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  library_item_id UUID NOT NULL REFERENCES public.library_items(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(library_item_id, tag_id)
);

-- Enable RLS on library_item_tags
ALTER TABLE public.library_item_tags ENABLE ROW LEVEL SECURITY;

-- Library item tags policies
CREATE POLICY "Users can view own library item tags"
  ON public.library_item_tags FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.library_items
    WHERE library_items.id = library_item_tags.library_item_id
    AND library_items.user_id = auth.uid()
  ));

CREATE POLICY "Users can create own library item tags"
  ON public.library_item_tags FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.library_items
    WHERE library_items.id = library_item_tags.library_item_id
    AND library_items.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete own library item tags"
  ON public.library_item_tags FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.library_items
    WHERE library_items.id = library_item_tags.library_item_id
    AND library_items.user_id = auth.uid()
  ));

-- Create connections table for knowledge graph
CREATE TABLE public.connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  source_type TEXT NOT NULL CHECK (source_type IN ('note', 'library_item')),
  source_id UUID NOT NULL,
  target_type TEXT NOT NULL CHECK (target_type IN ('note', 'library_item')),
  target_id UUID NOT NULL,
  connection_strength DECIMAL DEFAULT 1.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(user_id, source_type, source_id, target_type, target_id)
);

-- Enable RLS on connections
ALTER TABLE public.connections ENABLE ROW LEVEL SECURITY;

-- Connections policies
CREATE POLICY "Users can view own connections"
  ON public.connections FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own connections"
  ON public.connections FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own connections"
  ON public.connections FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own connections"
  ON public.connections FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Create triggers for updated_at
CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_notes_updated_at
  BEFORE UPDATE ON public.notes
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_library_items_updated_at
  BEFORE UPDATE ON public.library_items
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Create indexes for better performance
CREATE INDEX idx_notes_user_id ON public.notes(user_id);
CREATE INDEX idx_library_items_user_id ON public.library_items(user_id);
CREATE INDEX idx_library_items_type ON public.library_items(item_type);
CREATE INDEX idx_tags_user_id ON public.tags(user_id);
CREATE INDEX idx_connections_user_id ON public.connections(user_id);
CREATE INDEX idx_connections_source ON public.connections(source_type, source_id);
CREATE INDEX idx_connections_target ON public.connections(target_type, target_id);