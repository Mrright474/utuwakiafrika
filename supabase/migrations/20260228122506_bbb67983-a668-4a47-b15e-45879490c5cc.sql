
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  event_date TEXT NOT NULL,
  event_time TEXT,
  location TEXT,
  image_url TEXT,
  attendees TEXT,
  category TEXT DEFAULT 'upcoming',
  impact TEXT,
  active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active events" ON public.events
  FOR SELECT USING (active = true);

CREATE POLICY "Admins can view all events" ON public.events
  FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert events" ON public.events
  FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update events" ON public.events
  FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete events" ON public.events
  FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Seed default events
INSERT INTO public.events (title, description, event_date, event_time, location, image_url, attendees, category) VALUES
('Annual Fundraising Gala', 'Join us for an evening of celebration and fundraising to support our ongoing projects across Africa.', 'March 15, 2025', '6:00 PM - 10:00 PM', 'Kampala Serena Hotel, Uganda', '/lovable-uploads/b07d8f50-577a-4699-87ba-8759e7ace688.png', '200+ expected', 'upcoming'),
('Community Health Workshop', 'Educational workshop on preventive healthcare and hygiene practices for rural communities.', 'April 8, 2025', '9:00 AM - 4:00 PM', 'Jinja Community Center, Uganda', '/lovable-uploads/52fedddf-3da6-485c-af83-de0020326139.png', '150+ expected', 'upcoming'),
('Youth Leadership Summit', 'Empowering young African leaders with skills and knowledge for community development.', 'May 20, 2025', '8:00 AM - 6:00 PM', 'Nairobi Conference Center, Kenya', '/lovable-uploads/969161e6-4a43-456e-8ceb-4578f7e45935.png', '300+ expected', 'upcoming'),
('Water Project Launch - Mbarara', 'Provided clean water access to 5,000 residents', 'January 2025', NULL, NULL, NULL, NULL, 'past'),
('Educational Support Initiative', 'Distributed school supplies to 1,200 students', 'December 2024', NULL, NULL, NULL, NULL, 'past'),
('Women''s Empowerment Workshop', 'Trained 85 women in entrepreneurship skills', 'November 2024', NULL, NULL, NULL, NULL, 'past');
