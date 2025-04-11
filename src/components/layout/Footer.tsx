
import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-utu-black text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Organization info */}
          <div>
            <div className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/7645e834-1078-4707-9732-786fd4d93d8c.png" 
                alt="Utu Wa Kiafrika Logo" 
                className="h-12 w-auto mr-3" 
              />
              <div>
                <h3 className="text-lg font-bold">UTU WA KIAFRIKA</h3>
                <p className="text-xs">A Helping Hand For Every African</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              We are dedicated to providing sustainable solutions and support to African communities through various initiatives and programs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-utu-red transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-utu-red transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-utu-red transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#programs" className="text-gray-300 hover:text-white transition-colors">Our Programs</a></li>
              <li><a href="#team" className="text-gray-300 hover:text-white transition-colors">Our Team</a></li>
              <li><a href="#donate" className="text-gray-300 hover:text-white transition-colors">Donate</a></li>
              <li><a href="#volunteer" className="text-gray-300 hover:text-white transition-colors">Volunteer</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact information */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-300">123 Charity Street, Nairobi, Kenya</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 flex-shrink-0" />
                <span className="text-gray-300">+254 123 456 789</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 flex-shrink-0" />
                <span className="text-gray-300">info@utuwakiafrika.org</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-sm text-gray-300 mb-4">
              Subscribe to our newsletter to receive updates on our projects and campaigns.
            </p>
            <div className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              <Button className="bg-utu-red hover:bg-red-700 text-white">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Utu Wa Kiafrika Charity Network. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
