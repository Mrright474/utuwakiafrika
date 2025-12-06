-- Fix programs table RLS policies (drop restrictive, add permissive)
DROP POLICY IF EXISTS "Admins can manage programs" ON public.programs;
DROP POLICY IF EXISTS "Public can view active programs" ON public.programs;

CREATE POLICY "Public can view active programs" 
ON public.programs 
FOR SELECT 
USING (active = true);

CREATE POLICY "Admins can insert programs" 
ON public.programs 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update programs" 
ON public.programs 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete programs" 
ON public.programs 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can view all programs" 
ON public.programs 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Fix testimonials table RLS policies
DROP POLICY IF EXISTS "Admins can manage testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Public can view active testimonials" ON public.testimonials;

CREATE POLICY "Public can view active testimonials" 
ON public.testimonials 
FOR SELECT 
USING (active = true);

CREATE POLICY "Admins can insert testimonials" 
ON public.testimonials 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update testimonials" 
ON public.testimonials 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete testimonials" 
ON public.testimonials 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can view all testimonials" 
ON public.testimonials 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Fix success_metrics table RLS policies
DROP POLICY IF EXISTS "Admins can manage metrics" ON public.success_metrics;
DROP POLICY IF EXISTS "Public can view active metrics" ON public.success_metrics;

CREATE POLICY "Public can view active metrics" 
ON public.success_metrics 
FOR SELECT 
USING (active = true);

CREATE POLICY "Admins can insert metrics" 
ON public.success_metrics 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update metrics" 
ON public.success_metrics 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete metrics" 
ON public.success_metrics 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can view all metrics" 
ON public.success_metrics 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Fix success_stories table RLS policies
DROP POLICY IF EXISTS "Admins can manage success stories" ON public.success_stories;
DROP POLICY IF EXISTS "Public can view active success stories" ON public.success_stories;

CREATE POLICY "Public can view active success stories" 
ON public.success_stories 
FOR SELECT 
USING (active = true);

CREATE POLICY "Admins can insert success stories" 
ON public.success_stories 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update success stories" 
ON public.success_stories 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete success stories" 
ON public.success_stories 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can view all success stories" 
ON public.success_stories 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Fix gallery_images table RLS policies
DROP POLICY IF EXISTS "Admins can manage gallery images" ON public.gallery_images;
DROP POLICY IF EXISTS "Public can view active gallery images" ON public.gallery_images;

CREATE POLICY "Public can view active gallery images" 
ON public.gallery_images 
FOR SELECT 
USING (active = true);

CREATE POLICY "Admins can insert gallery images" 
ON public.gallery_images 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update gallery images" 
ON public.gallery_images 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete gallery images" 
ON public.gallery_images 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can view all gallery images" 
ON public.gallery_images 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));