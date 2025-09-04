-- Fix newsletter unsubscribe policy with better approach
-- Drop the previous policy that relied on request headers
DROP POLICY "Users can unsubscribe by email match" ON public.newsletter_subscribers;

-- Create a more practical policy for newsletter unsubscribe
-- Users can only set status to unsubscribed, and only for records that aren't already unsubscribed
CREATE POLICY "Anyone can unsubscribe by email" 
ON public.newsletter_subscribers 
FOR UPDATE 
USING (status = 'active'::text)  -- Can only update active subscriptions
WITH CHECK (
  status = 'unsubscribed'::text  -- Can only change status to unsubscribed
  AND unsubscribed_at IS NULL  -- Prevent multiple unsubscribe attempts
);