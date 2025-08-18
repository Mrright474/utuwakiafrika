import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const NewsletterSubscription = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Please enter your email address.",
        variant: "destructive"
      });
      return;
    }

    setIsSubscribing(true);

    try {
      const { data, error } = await supabase.functions.invoke('newsletter-subscribe', {
        body: { email: email.trim() }
      });

      if (error) throw error;

      toast({
        title: "Successfully Subscribed!",
        description: "Thank you for subscribing to our Ubuntu Community Newsletter.",
      });

      setEmail('');
    } catch (error: any) {
      toast({
        title: "Subscription Failed",
        description: error.message || "Failed to subscribe. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="ubuntu-card rounded-3xl p-10 shadow-xl border border-white/20 bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-sm">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-utu-red to-red-600 mb-6">
          <Mail className="h-8 w-8 text-white" />
        </div>
        
        <h3 className="text-2xl font-bold mb-4 text-utu-black font-heading">Ubuntu Community Newsletter</h3>
        
        <div className="space-y-6">
          <p className="text-utu-gray mb-8 text-lg leading-relaxed">
            Subscribe to receive inspiring stories of Ubuntu in action, project updates, 
            and opportunities to deepen your involvement in building compassionate African communities.
          </p>
          
          <form onSubmit={handleSubmit} className="newsletter-signup">
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow px-6 py-4 border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-utu-red focus:border-transparent text-lg bg-white/80 backdrop-blur-sm"
                disabled={isSubscribing}
                required
              />
              <Button 
                type="submit"
                className="bg-gradient-to-r from-utu-red to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={isSubscribing}
              >
                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </div>
            <p className="text-sm text-utu-gray mt-4 italic">
              Your email will be kept private and you can unsubscribe at any time.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSubscription;