
import React, { useState } from 'react';
import { MapPin, Mail, Phone, Clock, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('contact-submit', {
        body: formData
      });

      if (error) throw error;

      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-utu-light-gray">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-utu-black font-heading">Contact Us</h2>
          <div className="w-20 h-1 bg-utu-red mx-auto mb-6"></div>
          <p className="text-lg text-utu-gray">
            Have questions or want to learn more about our work? We'd love to hear from you.
            Reach out to us through any of the following channels.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-6 text-utu-black">Get in Touch</h3>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="bg-utu-red/10 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <MapPin className="h-6 w-6 text-utu-red" />
                </div>
                <div>
                  <h4 className="font-semibold text-utu-black mb-1">Our Address</h4>
                  <p className="text-utu-gray mb-1">123 Kampala Road</p>
                  <p className="text-utu-gray">Kampala, Uganda</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-utu-red/10 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <Mail className="h-6 w-6 text-utu-red" />
                </div>
                <div>
                  <h4 className="font-semibold text-utu-black mb-1">Email Us</h4>
                  <p className="text-utu-gray break-all">utuwakiafrikacharitynetwork@gmail.com</p>
                  <p className="text-utu-gray">info@utuwakiafrika.org</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-utu-red/10 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <Phone className="h-6 w-6 text-utu-red" />
                </div>
                <div>
                  <h4 className="font-semibold text-utu-black mb-1">Call Us</h4>
                  <p className="text-utu-gray">+256 744 552 195</p>
                  <p className="text-utu-gray">+256 778 777 976</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-utu-red/10 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <Clock className="h-6 w-6 text-utu-red" />
                </div>
                <div>
                  <h4 className="font-semibold text-utu-black mb-1">Operating Hours</h4>
                  <p className="text-utu-gray">Monday - Friday: 8:00 AM - 5:00 PM</p>
                  <p className="text-utu-gray">Saturday: 9:00 AM - 1:00 PM</p>
                  <p className="text-utu-gray">Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div>
              <h4 className="font-semibold text-utu-black mb-3">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="bg-utu-red/10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-utu-red hover:text-white text-utu-red transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="bg-utu-red/10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-utu-red hover:text-white text-utu-red transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="bg-utu-red/10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-utu-red hover:text-white text-utu-red transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="bg-utu-red/10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-utu-red hover:text-white text-utu-red transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Map or Location Image */}
            <div className="mt-6 bg-gray-200 h-48 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Map View</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-6 text-utu-black">Send Us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-utu-gray mb-1">
                    Your Name <span className="text-utu-red">*</span>
                  </label>
                  <Input 
                    id="name" 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-utu-gray mb-1">
                    Your Email <span className="text-utu-red">*</span>
                  </label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-utu-gray mb-1">
                  Phone Number
                </label>
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="+1 (123) 456-7890" 
                  className="w-full"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-utu-gray mb-1">
                  Subject <span className="text-utu-red">*</span>
                </label>
                <Input 
                  id="subject" 
                  type="text" 
                  placeholder="How can we help you?" 
                  className="w-full"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-utu-gray mb-1">
                  Message <span className="text-utu-red">*</span>
                </label>
                <Textarea 
                  id="message" 
                  placeholder="Write your message here..." 
                  className="w-full min-h-[150px]"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-utu-red hover:bg-red-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>

        {/* Additional Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6">
                <h4 className="font-bold mb-2 text-utu-black">Media Inquiries</h4>
                <p className="text-utu-gray mb-4 text-sm">
                  For press and media inquiries, please contact our communications team.
                </p>
                <a href="mailto:media@utuwakiafrika.org" className="text-utu-red hover:text-red-700 flex items-center">
                  Contact Press Office <ArrowRight className="h-4 w-4 ml-1" />
                </a>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6">
                <h4 className="font-bold mb-2 text-utu-black">Partnership Opportunities</h4>
                <p className="text-utu-gray mb-4 text-sm">
                  Interested in partnering with us? We welcome collaborations with organizations that share our vision.
                </p>
                <a href="mailto:partnerships@utuwakiafrika.org" className="text-utu-red hover:text-red-700 flex items-center">
                  Explore Partnerships <ArrowRight className="h-4 w-4 ml-1" />
                </a>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6">
                <h4 className="font-bold mb-2 text-utu-black">Volunteer With Us</h4>
                <p className="text-utu-gray mb-4 text-sm">
                  Looking to make a difference? Join our volunteer program and contribute your skills and time.
                </p>
                <a href="/volunteer" className="text-utu-red hover:text-red-700 flex items-center">
                  Become a Volunteer <ArrowRight className="h-4 w-4 ml-1" />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-6 text-center text-utu-black">Frequently Asked Questions</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold mb-2 text-utu-black">How can I donate to Utu Wa Kiafrika?</h4>
              <p className="text-utu-gray mb-4">
                You can donate online through our website, by bank transfer, or by mobile money. All donation methods 
                can be found on our Donate page.
              </p>
              
              <h4 className="font-bold mb-2 text-utu-black">Is my donation tax-deductible?</h4>
              <p className="text-utu-gray mb-4">
                Yes, Utu Wa Kiafrika is a registered non-profit organization, and donations are tax-deductible in many countries. 
                We provide receipts for all donations.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-2 text-utu-black">How can I volunteer with Utu Wa Kiafrika?</h4>
              <p className="text-utu-gray mb-4">
                Visit our Volunteer page to learn about current opportunities and fill out our volunteer application form. 
                We offer both in-person and virtual volunteer positions.
              </p>
              
              <h4 className="font-bold mb-2 text-utu-black">How do I know my donation is being used effectively?</h4>
              <p className="text-utu-gray mb-4">
                We are committed to transparency. Our annual reports and financial statements are available on our website, 
                and we regularly share updates on our projects and their impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
