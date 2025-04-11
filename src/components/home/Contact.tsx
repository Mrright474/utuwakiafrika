
import React from 'react';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Contact = () => {
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
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-utu-red/10 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <MapPin className="h-6 w-6 text-utu-red" />
                </div>
                <div>
                  <h4 className="font-semibold text-utu-black mb-1">Our Address</h4>
                  <p className="text-utu-gray">123 Charity Street, Nairobi, Kenya</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-utu-red/10 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <Mail className="h-6 w-6 text-utu-red" />
                </div>
                <div>
                  <h4 className="font-semibold text-utu-black mb-1">Email Us</h4>
                  <p className="text-utu-gray">info@utuwakiafrika.org</p>
                  <p className="text-utu-gray">support@utuwakiafrika.org</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-utu-red/10 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <Phone className="h-6 w-6 text-utu-red" />
                </div>
                <div>
                  <h4 className="font-semibold text-utu-black mb-1">Call Us</h4>
                  <p className="text-utu-gray">+254 123 456 789</p>
                  <p className="text-utu-gray">+254 987 654 321</p>
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
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-6 text-utu-black">Send Us a Message</h3>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-utu-gray mb-1">
                    Your Name
                  </label>
                  <Input 
                    id="name" 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-utu-gray mb-1">
                    Your Email
                  </label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-utu-gray mb-1">
                  Subject
                </label>
                <Input 
                  id="subject" 
                  type="text" 
                  placeholder="How can we help you?" 
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-utu-gray mb-1">
                  Message
                </label>
                <Textarea 
                  id="message" 
                  placeholder="Write your message here..." 
                  className="w-full min-h-[150px]"
                />
              </div>
              
              <Button type="submit" className="w-full bg-utu-red hover:bg-red-700 text-white">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
