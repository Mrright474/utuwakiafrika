import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Users, Calendar, Briefcase, Globe, Heart, MapPin, Handshake, TrendingUp } from 'lucide-react';
import ChapterRegistrationForm from '@/components/communities/ChapterRegistrationForm';
import communityNetworking from '@/assets/ubuntu-community-networking.jpg';
import communityMeeting from '@/assets/ubuntu-community-meeting.jpg';
import communityMarketplace from '@/assets/ubuntu-community-marketplace.jpg';
import SEO from '@/components/seo/SEO';

const howItWorks = [
  {
    icon: MapPin,
    title: 'Join Your Local Chapter',
    description: 'Find or start an Ubuntu Community chapter in your residential area. Each chapter brings together donors, entrepreneurs, and professionals within the same locality.',
  },
  {
    icon: Calendar,
    title: 'Attend Weekly & Monthly Meetups',
    description: 'Participate in regular gatherings — weekly casual meetups and structured monthly meetings where members share updates, challenges, and opportunities.',
  },
  {
    icon: Briefcase,
    title: 'Promote Your Business',
    description: 'Showcase your products and services to fellow community members. Whether you run a restaurant, tech startup, or consultancy — your community supports you first.',
  },
  {
    icon: Handshake,
    title: 'Support Each Other',
    description: 'Buy from fellow members, refer clients, share expertise, and collaborate on joint ventures. When one rises, we all rise — that is the Ubuntu way.',
  },
];

const benefits = [
  { icon: TrendingUp, title: 'Business Growth', text: 'Gain loyal customers from your own community who believe in supporting each other.' },
  { icon: Users, title: 'Networking', text: 'Build meaningful relationships with professionals and entrepreneurs in your area.' },
  { icon: Heart, title: 'Mutual Development', text: 'Access mentorship, skill-sharing workshops, and collaborative opportunities.' },
  { icon: Globe, title: 'Global Ubuntu Network', text: 'Connect with Ubuntu Communities across Africa and the diaspora for cross-border opportunities.' },
];

const Communities = () => {
  return (
    <Layout>
      <SEO
        title="Ubuntu Communities — Local Chapters Near You"
        description="Join or start a local Ubuntu Community chapter. Network with donors and entrepreneurs, promote your business, and grow together."
        path="/communities"
      />
      <div className="bg-gradient-to-b from-white to-utu-light-gray">
        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${communityNetworking})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-utu-green/90 to-green-800/80" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-heading">
              Ubuntu Communities
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Local chapters where our donors and supporters come together weekly and monthly to promote their businesses, 
              support each other's services, and grow together — because true Ubuntu means lifting each other up.
            </p>
          </div>
        </section>

        {/* What Are Ubuntu Communities */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 font-heading">
                  What Are Ubuntu Communities?
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                  Ubuntu Communities are local chapters organized within residential areas across different countries. 
                  They bring together our donors, supporters, and community members who share the Ubuntu philosophy: 
                  <em className="text-primary font-medium"> "I am because we are."</em>
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                  In these communities, members don't just give — they also receive. Through weekly and monthly meetups, 
                  members promote their businesses and services, exchange ideas, mentor one another, and create a thriving 
                  local economy that benefits everyone.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  It's a circle of giving: you support African communities through donations, and your community 
                  supports your growth in return.
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={communityMeeting}
                  alt="Ubuntu Community members in a circle meeting discussing business ideas"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">
                How It Works
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Four simple steps to become part of a thriving Ubuntu Community near you.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorks.map((step, i) => (
                <Card key={i} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-full bg-utu-green/10 flex items-center justify-center mx-auto mb-4">
                      <step.icon className="h-8 w-8 text-utu-green" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-utu-gold text-white font-bold flex items-center justify-center mx-auto mb-2 text-sm">
                      {i + 1}
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Community Marketplace Image */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="rounded-2xl overflow-hidden shadow-xl order-2 lg:order-1">
                <img
                  src={communityMarketplace}
                  alt="Ubuntu Community marketplace where members showcase products and services"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 font-heading">
                  The Ubuntu Marketplace
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                  At every monthly gathering, members set up stalls and presentations to showcase their businesses. 
                  From tech services to artisanal food, consulting to fashion — every trade finds its audience.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  This isn't just networking — it's intentional economic empowerment. When community members 
                  choose to buy from each other, wealth stays within the community and multiplies.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild>
                    <a href="#register">Start a Chapter</a>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/donate">Become a Donor</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">
                Why Join an Ubuntu Community?
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {benefits.map((b, i) => (
                <div key={i} className="flex gap-4 p-6 rounded-xl bg-muted/40">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <b.icon className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{b.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{b.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Registration Form */}
        <ChapterRegistrationForm />

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6 font-heading">
              Ready to Build Your Community?
            </h2>
            <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
              Whether you're a donor looking to connect locally, or an entrepreneur wanting to grow with support — 
              there's a place for you in an Ubuntu Community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" asChild>
                <a href="#register">Register Now</a>
              </Button>
              <Button variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link to="/programs">View Our Programs</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Communities;
