-- Add view tracking to success_stories table
ALTER TABLE public.success_stories 
ADD COLUMN IF NOT EXISTS view_count integer DEFAULT 0 NOT NULL;

-- Add index for better performance when sorting by views
CREATE INDEX IF NOT EXISTS idx_success_stories_view_count ON public.success_stories(view_count DESC);

-- Create a function to increment view count
CREATE OR REPLACE FUNCTION public.increment_story_view_count(story_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.success_stories
  SET view_count = view_count + 1
  WHERE id = story_id;
END;
$$;

-- Grant execute permission to authenticated and anonymous users
GRANT EXECUTE ON FUNCTION public.increment_story_view_count(uuid) TO anon, authenticated;