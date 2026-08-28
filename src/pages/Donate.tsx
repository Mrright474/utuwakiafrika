import React from 'react';
import Layout from '@/components/layout/Layout';
import DonationForm from '@/components/donation/DonationForm';
import MobileMoneyDonate from '@/components/donation/MobileMoneyDonate';
import { Heart, Users, Globe, Sparkles } from 'lucide-react';
import SEO from '@/components/seo/SEO';

const Donate = () => {
  return (
    <Layout>
      <SEO
        title="Donate — Support Ubuntu Communities in Africa"
        description="Make a secure one-time or recurring donation to fund education, clean water, healthcare, and empowerment programs across Africa."
        path="/donate"
      />
      <div className="bg-gradient-to-br from-utu-light-gray via-white to-gray-50 py-20 md:py-28 section-ubuntu">
        <div className="container mx-auto px-4">
          {/* Ubuntu-inspired header */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="mb-6">
              <div className="inline-flex items-center bg-utu-red/10 backdrop-blur-sm border border-utu-red/20 rounded-full px-6 py-3 text-sm font-medium text-utu-red mb-6">
                <Heart className="mr-2 h-4 w-4" />
                Ubuntu Giving: "Your generosity strengthens our collective humanity"
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-utu-black font-heading">
              Make an <span className="text-gradient bg-gradient-to-r from-utu-red via-utu-gold to-utu-green bg-clip-text text-transparent">Ubuntu</span> Donation
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-utu-red via-utu-gold to-utu-green mx-auto mb-8"></div>
            
            <p className="text-xl text-utu-gray leading-relaxed mb-8">
              Your generous contribution embodies the Ubuntu philosophy — "I am because we are." 
              Together, we create sustainable solutions and lasting support for African communities, 
              building a future where every person's dignity and potential can flourish.
            </p>

            {/* Ubuntu Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: Heart,
                  title: "Compassion",
                  description: "Every donation reflects our shared humanity and care for others",
                  color: "from-utu-red to-red-600"
                },
                {
                  icon: Users,
                  title: "Unity",
                  description: "Together, we build stronger, more resilient communities across Africa",
                  color: "from-utu-gold to-yellow-600"
                },
                {
                  icon: Globe,
                  title: "Collective Impact",
                  description: "Your contribution joins thousands of others creating meaningful change",
                  color: "from-utu-green to-green-600"
                }
              ].map((value, index) => (
                <div key={value.title} className="ubuntu-card rounded-2xl p-6 text-center border border-white/20 hover:shadow-lg transition-all duration-300">
                  <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-utu-black mb-2">{value.title}</h3>
                  <p className="text-utu-gray text-sm">{value.description}</p>
                </div>
              ))}
            </div>

            {/* Impact Promise */}
            <div className="ubuntu-card rounded-2xl p-8 border-2 border-utu-red/20 bg-gradient-to-br from-white/95 to-utu-red/5">
              <div className="flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-utu-gold mr-2" />
                <h3 className="text-xl font-bold text-utu-black">Your Ubuntu Impact Promise</h3>
                <Sparkles className="h-6 w-6 text-utu-gold ml-2" />
              </div>
              <p className="text-utu-gray leading-relaxed">
                Every dollar you contribute goes directly toward education, healthcare, clean water, 
                women's empowerment, and youth leadership programs. You'll receive impact updates 
                showing exactly how your Ubuntu spirit is transforming lives across African communities.
              </p>
            </div>
          </div>

          <MobileMoneyDonate />

          <DonationForm />

          {/* Ubuntu Trust Statement */}
          <div className="text-center mt-16 max-w-3xl mx-auto">
            <div className="ubuntu-card rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-utu-black mb-4">Ubuntu Trust & Transparency</h3>
              <p className="text-utu-gray leading-relaxed mb-4">
                In the spirit of Ubuntu, we believe in complete transparency. Your donation is processed 
                securely through Airtel Money Global Pay Mastercard, and you'll receive detailed reports 
                on how your contribution creates lasting change in African communities.
              </p>
              <div className="flex items-center justify-center text-sm text-utu-gray">
                <Users className="mr-2 h-4 w-4" />
                Trusted by thousands of Ubuntu supporters worldwide
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Donate;
