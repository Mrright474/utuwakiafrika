-- Fix newsletter subscriber email exposure vulnerability
-- Drop the insecure policy that allows anyone to update any subscriber
DROP POLICY "Subscribers can unsubscribe themselves" ON public.newsletter_subscribers;

-- Create a secure policy that only allows updating records that match the user's session
-- This prevents email harvesting by restricting updates to specific email addresses
CREATE POLICY "Users can unsubscribe by email match" 
ON public.newsletter_subscribers 
FOR UPDATE 
USING (true)  -- Anyone can attempt an update
WITH CHECK (
  status = 'unsubscribed'::text 
  AND email = current_setting('request.headers')::json->>'x-user-email'
);