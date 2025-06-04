
import React from 'react';
import { Heart, Award, Users, Globe, CheckCircle, Clock, MapPin, Star, Handshake, BookOpen, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-white section-ubuntu">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="mb-6">
            <div className="inline-flex items-center bg-utu-red/10 backdrop-blur-sm border border-utu-red/20 rounded-full px-6 py-3 text-sm font-medium text-utu-red mb-6">
              <Heart className="mr-2 h-4 w-4" />
              Ubuntu Philosophy: "I am because we are"
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-utu-black font-heading">
            About <span className="text-gradient bg-gradient-to-r from-utu-red via-utu-gold to-utu-green bg-clip-text text-transparent">Utu Wa Kiafrika</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-utu-red via-utu-gold to-utu-green mx-auto mb-8"></div>
          <p className="text-xl text-utu-gray leading-relaxed">
            A grassroots humanitarian organization founded on the principle of <em>Utu</em> — 
            Swahili for humanity, compassion, and dignity.
          </p>
        </div>

        {/* Who We Are */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-utu-black font-heading">Who We Are</h2>
              <div className="w-16 h-1 bg-utu-red mb-6"></div>
              <p className="text-lg text-utu-gray leading-relaxed mb-6">
                Utu Wa Kiafrika Charity Network is more than an organization — we are a movement rooted in 
                the ancient African philosophy of Ubuntu. Born from the hearts of passionate African youth, 
                we exist to uplift the most vulnerable in our communities through compassion and collective action.
              </p>
              <p className="text-lg text-utu-gray leading-relaxed mb-6">
                Our name speaks to our essence: <em>Utu</em> represents the humanity that binds us all, 
                while <em>Kiafrika</em> celebrates our proud African identity. Together, we embody the 
                spirit of Pan-African unity and the belief that when we lift each other, we all rise.
              </p>
              <p className="text-lg text-utu-gray leading-relaxed">
                Since our founding in 2024, we have grown from a small group of dedicated individuals 
                into a continent-wide network of change-makers, all united by the vision of a dignified, 
                empowered Africa where every person can thrive.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="/lovable-uploads/b07d8f50-577a-4699-87ba-8759e7ace688.png" 
                alt="African children embodying Ubuntu spirit" 
                className="rounded-2xl shadow-xl w-full h-48 object-cover ubuntu-card" 
              />
              <img 
                src="/lovable-uploads/eccb4f96-1438-49ba-947c-c55ac2356fd0.png" 
                alt="Community leader" 
                className="rounded-2xl shadow-xl w-full h-48 object-cover ubuntu-card mt-8" 
              />
              <img 
                src="/lovable-uploads/a382b382-f2d2-4832-9343-db9d8abb367d.png" 
                alt="Empowered women" 
                className="rounded-2xl shadow-xl w-full h-48 object-cover ubuntu-card -mt-8" 
              />
              <img 
                src="/lovable-uploads/6cc22289-337a-4964-ab0f-4058feb43e63.png" 
                alt="Healthcare outreach" 
                className="rounded-2xl shadow-xl w-full h-48 object-cover ubuntu-card" 
              />
            </div>
          </div>
        </div>

        {/* Mission, Vision, Philosophy */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission */}
            <div className="ubuntu-card rounded-2xl p-8 text-center border border-white/20 hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-br from-utu-red to-red-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Heart className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-utu-black">Our Mission</h3>
              <div className="w-12 h-1 bg-utu-red mx-auto mb-4"></div>
              <p className="text-utu-gray leading-relaxed">
                To build compassionate, self-sustaining African communities through education, 
                empowerment, and advocacy, guided by the timeless wisdom of Ubuntu.
              </p>
            </div>

            {/* Vision */}
            <div className="ubuntu-card rounded-2xl p-8 text-center border border-white/20 hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-br from-utu-gold to-yellow-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Star className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-utu-black">Our Vision</h3>
              <div className="w-12 h-1 bg-utu-gold mx-auto mb-4"></div>
              <p className="text-utu-gray leading-relaxed">
                A united, empowered, and dignified Africa where every person thrives, 
                communities flourish, and the spirit of Ubuntu guides our collective progress.
              </p>
            </div>

            {/* Philosophy */}
            <div className="ubuntu-card rounded-2xl p-8 text-center border border-white/20 hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-br from-utu-green to-green-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-utu-black">Our Philosophy</h3>
              <div className="w-12 h-1 bg-utu-green mx-auto mb-4"></div>
              <p className="text-utu-gray leading-relaxed">
                Ubuntu values, Pan-Africanism, and community-based transformation. 
                We believe in the interconnectedness of humanity and the power of collective action.
              </p>
            </div>
          </div>
        </div>

        {/* Our Founder */}
        <div className="mb-20 bg-gradient-to-br from-utu-light-gray to-white rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-utu-black font-heading">Our Founder</h2>
              <div className="w-16 h-1 bg-utu-red mb-6"></div>
              <h3 className="text-2xl font-bold text-utu-red mb-4">Ben Kazigo Luweru</h3>
              <p className="text-lg font-semibold text-utu-gold mb-6">Executive Director & Visionary Leader</p>
              
              <p className="text-utu-gray leading-relaxed mb-4">
                Ben Kazigo Luweru is a passionate youth leader whose vision for African dignity and Ubuntu 
                philosophy sparked the creation of Utu Wa Kiafrika. Born and raised in Uganda, Ben witnessed 
                firsthand the challenges facing African communities and the incredible resilience of our people.
              </p>
              
              <p className="text-utu-gray leading-relaxed mb-4">
                A firm believer in the power of grassroots movements and community-led solutions, Ben has 
                dedicated his life to fostering Pan-African unity and empowerment. His leadership style 
                embodies the Ubuntu principle that "a person is a person through other persons."
              </p>
              
              <p className="text-utu-gray leading-relaxed">
                Under his guidance, what began as a small group of passionate individuals has grown into 
                a continent-wide network committed to creating lasting change across Africa. Ben's vision 
                continues to inspire our work as we build bridges of hope and dignity across our beloved continent.
              </p>
              
              <div className="flex items-center mt-6 p-4 bg-white/60 rounded-xl border border-utu-red/20">
                <Users className="h-5 w-5 text-utu-red mr-3" />
                <p className="text-sm italic text-utu-gray">
                  "Our strength lies not in our individual achievements, but in our collective commitment 
                  to lifting each other up." - Ben Kazigo Luweru
                </p>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 text-center">
              <div className="relative inline-block">
                <img 
                  src="/lovable-uploads/6e61272d-7786-4ccc-950e-4ae86bc5f39d.png" 
                  alt="Ben Kazigo Luweru, Founder and Executive Director" 
                  className="w-80 h-80 object-cover rounded-3xl shadow-2xl ubuntu-card mx-auto" 
                />
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-utu-red to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Heart className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Organizational Structure */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-utu-black font-heading">Organizational Structure</h2>
            <div className="w-20 h-1 bg-utu-gold mx-auto mb-6"></div>
            <p className="text-lg text-utu-gray max-w-3xl mx-auto">
              Our structure reflects our Ubuntu values — every level of our organization works in harmony 
              to serve our communities with transparency, accountability, and collective wisdom.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Board of Trustees",
                description: "Provides strategic oversight and governance, ensuring our mission stays true to Ubuntu principles.",
                icon: Shield,
                color: "from-utu-red to-red-600"
              },
              {
                title: "Executive Leadership",
                description: "Led by our founder, driving vision and operational excellence across all programs.",
                icon: Users,
                color: "from-utu-gold to-yellow-600"
              },
              {
                title: "Programs Department",
                description: "Designs and implements education, health, and empowerment initiatives.",
                icon: BookOpen,
                color: "from-utu-green to-green-600"
              },
              {
                title: "Women's Empowerment",
                description: "Focuses on gender equality and economic empowerment for African women.",
                icon: Heart,
                color: "from-purple-500 to-purple-600"
              },
              {
                title: "Youth Development",
                description: "Nurtures the next generation of African leaders and change-makers.",
                icon: Star,
                color: "from-blue-500 to-blue-600"
              },
              {
                title: "Grassroots Network",
                description: "Community-based teams working at national, regional, and local levels.",
                icon: Globe,
                color: "from-teal-500 to-teal-600"
              }
            ].map((department, index) => (
              <div key={department.title} className="ubuntu-card rounded-2xl p-6 border border-white/20 hover:shadow-lg transition-all duration-300">
                <div className={`w-14 h-14 bg-gradient-to-br ${department.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                  <department.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-utu-black mb-3">{department.title}</h3>
                <p className="text-utu-gray text-sm leading-relaxed">{department.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Where We Work */}
        <div className="mb-20">
          <div className="ubuntu-card rounded-3xl p-8 md:p-12 border-2 border-utu-green/20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-utu-black font-heading">Where We Work</h2>
                <div className="w-16 h-1 bg-utu-green mb-6"></div>
                
                <div className="flex items-center mb-6">
                  <MapPin className="h-6 w-6 text-utu-green mr-3" />
                  <p className="text-xl font-semibold text-utu-black">Based in Uganda, Serving All of Africa</p>
                </div>
                
                <p className="text-lg text-utu-gray leading-relaxed mb-6">
                  While our headquarters proudly stand in the pearl of Africa, Uganda, our vision extends 
                  far beyond borders. We are a truly Pan-African network, with our reach expanding across 
                  the continent as we build bridges of hope and solidarity.
                </p>
                
                <p className="text-lg text-utu-gray leading-relaxed mb-6">
                  Currently active in East Africa, we are steadily growing our presence across Central, 
                  West, and Southern Africa. Each new community we touch becomes part of our Ubuntu family, 
                  strengthening the bonds that unite us as one African people.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="text-center p-4 bg-white/60 rounded-xl border border-utu-green/20">
                    <p className="text-2xl font-bold text-utu-green">45+</p>
                    <p className="text-sm text-utu-gray">Communities Served</p>
                  </div>
                  <div className="text-center p-4 bg-white/60 rounded-xl border border-utu-green/20">
                    <p className="text-2xl font-bold text-utu-green">8</p>
                    <p className="text-sm text-utu-gray">African Countries</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <img 
                  src="/lovable-uploads/f90b8fff-8fac-4c94-8b28-10ed3702cc33.png" 
                  alt="African continent map showing our reach" 
                  className="w-full max-w-md h-80 object-cover rounded-2xl shadow-xl ubuntu-card mx-auto" 
                />
                <p className="text-sm text-utu-gray mt-4 italic">
                  "Africa is not just our continent — it is our home, our identity, our future."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <h3 className="text-2xl md:text-3xl font-bold mb-10 text-center text-utu-black font-heading">Our Ubuntu Values</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Heart,
                title: "Compassion",
                description: "We lead with empathy and understanding in all our interactions.",
                color: "text-utu-red"
              },
              {
                icon: Handshake,
                title: "Unity",
                description: "We believe in the power of collective action and solidarity.",
                color: "text-utu-gold"
              },
              {
                icon: CheckCircle,
                title: "Integrity",
                description: "We operate with transparency and accountability in everything we do.",
                color: "text-utu-green"
              },
              {
                icon: Globe,
                title: "Pan-Africanism",
                description: "We celebrate our African identity and work towards continental unity.",
                color: "text-blue-600"
              }
            ].map((value, index) => (
              <div key={value.title} className="text-center ubuntu-card rounded-2xl p-6 border border-white/20 hover:shadow-lg transition-all duration-300">
                <div className="bg-white/80 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                  <value.icon className={`h-8 w-8 ${value.color}`} />
                </div>
                <h4 className="font-bold text-lg text-utu-black mb-2">{value.title}</h4>
                <p className="text-utu-gray text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="text-center bg-gradient-to-br from-utu-black via-gray-900 to-utu-black text-white p-12 md:p-16 rounded-3xl bg-[url('/lovable-uploads/b07d8f50-577a-4699-87ba-8759e7ace688.png')] bg-cover bg-center bg-blend-overlay">
          <div className="bg-black/70 p-8 rounded-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white font-heading">Join Our Ubuntu Circle</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-utu-red via-utu-gold to-utu-green mx-auto mb-8"></div>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
              The spirit of Ubuntu calls us to remember that we rise by lifting others. 
              Your involvement — whether as a volunteer, donor, or ambassador — strengthens 
              our collective impact and brings dignity to communities across Africa.
            </p>
            
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10 italic">
              "Umuntu ngumuntu ngabantu" — A person is a person through other persons.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                className="donate-button group px-8 py-4 text-lg"
                asChild
              >
                <Link to="/donate">
                  <Heart className="mr-2 h-5 w-5 group-hover:animate-ubuntu-pulse" />
                  Become a Ubuntu Supporter
                </Link>
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-utu-black px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-sm bg-white/10"
                asChild
              >
                <Link to="/contact">
                  <Users className="mr-2 h-5 w-5" />
                  Get Involved
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <Heart className="h-8 w-8 text-utu-red mx-auto mb-3" />
                <h4 className="font-bold text-white mb-2">Volunteer</h4>
                <p className="text-white/80 text-sm">Share your skills and passion with communities in need.</p>
              </div>
              <div className="text-center">
                <Globe className="h-8 w-8 text-utu-gold mx-auto mb-3" />
                <h4 className="font-bold text-white mb-2">Advocate</h4>
                <p className="text-white/80 text-sm">Spread awareness and champion African dignity.</p>
              </div>
              <div className="text-center">
                <Handshake className="h-8 w-8 text-utu-green mx-auto mb-3" />
                <h4 className="font-bold text-white mb-2">Partner</h4>
                <p className="text-white/80 text-sm">Collaborate with us to amplify our collective impact.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
