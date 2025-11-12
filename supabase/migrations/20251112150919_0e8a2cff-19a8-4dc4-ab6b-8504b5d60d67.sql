-- Create storage bucket for uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'uploads',
  'uploads',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
);

-- RLS policies for uploads bucket
CREATE POLICY "Public can view uploaded images"
ON storage.objects FOR SELECT
USING (bucket_id = 'uploads');

CREATE POLICY "Admins can upload images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'uploads' AND
  has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can update images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'uploads' AND
  has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can delete images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'uploads' AND
  has_role(auth.uid(), 'admin'::app_role)
);