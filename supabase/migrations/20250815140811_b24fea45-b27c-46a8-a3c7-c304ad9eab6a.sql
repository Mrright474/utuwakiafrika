-- Create volunteer profiles table
CREATE TABLE public.volunteer_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  
  -- Personal Information
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  city TEXT,
  country TEXT,
  age INTEGER,
  occupation TEXT,
  education TEXT,
  
  -- Volunteer Information
  volunteer_area TEXT,
  availability TEXT,
  skills TEXT,
  languages TEXT,
  experience TEXT,
  motivation TEXT,
  
  -- Emergency Contact
  emergency_contact TEXT,
  emergency_phone TEXT,
  
  -- Volunteer Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'active', 'inactive')),
  volunteer_id TEXT,
  join_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create volunteer activities table
CREATE TABLE public.volunteer_activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  volunteer_id UUID NOT NULL REFERENCES public.volunteer_profiles(id) ON DELETE CASCADE,
  
  -- Activity Details
  activity_type TEXT NOT NULL,
  description TEXT,
  hours_contributed DECIMAL(5,2) DEFAULT 0,
  activity_date DATE NOT NULL,
  project_name TEXT,
  location TEXT,
  
  -- Status and Notes
  status TEXT DEFAULT 'completed' CHECK (status IN ('planned', 'in_progress', 'completed', 'cancelled')),
  notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.volunteer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteer_activities ENABLE ROW LEVEL SECURITY;

-- Create policies for volunteer_profiles
CREATE POLICY "Volunteers can view their own profile" 
ON public.volunteer_profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Volunteers can update their own profile" 
ON public.volunteer_profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their volunteer profile" 
ON public.volunteer_profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create policies for volunteer_activities
CREATE POLICY "Volunteers can view their own activities" 
ON public.volunteer_activities 
FOR SELECT 
USING (volunteer_id IN (SELECT id FROM public.volunteer_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Volunteers can create their own activities" 
ON public.volunteer_activities 
FOR INSERT 
WITH CHECK (volunteer_id IN (SELECT id FROM public.volunteer_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Volunteers can update their own activities" 
ON public.volunteer_activities 
FOR UPDATE 
USING (volunteer_id IN (SELECT id FROM public.volunteer_profiles WHERE user_id = auth.uid()));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_volunteer_profiles_updated_at
BEFORE UPDATE ON public.volunteer_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_volunteer_activities_updated_at
BEFORE UPDATE ON public.volunteer_activities
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to generate volunteer ID
CREATE OR REPLACE FUNCTION public.generate_volunteer_id()
RETURNS TRIGGER AS $$
BEGIN
  NEW.volunteer_id = 'UTU-' || LPAD(EXTRACT(YEAR FROM NOW())::TEXT, 4, '0') || '-' || LPAD(nextval('volunteer_id_seq')::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create sequence for volunteer IDs
CREATE SEQUENCE volunteer_id_seq START 1;

-- Create trigger for volunteer ID generation
CREATE TRIGGER generate_volunteer_id_trigger
BEFORE INSERT ON public.volunteer_profiles
FOR EACH ROW
EXECUTE FUNCTION public.generate_volunteer_id();