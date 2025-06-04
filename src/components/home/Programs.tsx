
import React from 'react';
import { BookOpen, Heart, Briefcase, Users, Star, Globe, Calendar, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ProgramProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  image?: string;
}

const ProgramCard = ({ title, description, icon, color, image }: ProgramProps) => {
  return (
    <Card className="ubuntu-card hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 overflow-hidden">
      <div className={`h-2 ${color}`}></div>
      {image && (
        <div className="h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <CardHeader className="text-center">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${color.replace('bg-', 'bg-').replace('-500', '-100')}`}>
          {icon}
        </div>
        <CardTitle className="text-xl text-utu-black font-heading">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-utu-gray leading-relaxed text-center">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

const Programs = () => {
  const corePrograms = [
    {
      title: "Education & Scholarships",
      description: "Unlocking potential through quality learning. We provide school supplies, sponsorships, and community education to ensure every child has access to the education they deserve, breaking cycles of poverty through knowledge and opportunity.",
      icon: <BookOpen className="h-8 w-8 text-utu-red" />,
      color: "bg-utu-red",
      image: "/lovable-uploads/969161e6-4a43-456e-8ceb-4578f7e45935.png"
    },
    {
      title: "Health, Sanitation & Nutrition",
      description: "Building healthier communities from the ground up. Through maternal care, nutrition drives, clean water access, and mobile clinics, we ensure that good health is not a privilege but a right for every African.",
      icon: <Heart className="h-8 w-8 text-pink-600" />,
      color: "bg-pink-500",
      image: "/lovable-uploads/52fedddf-3da6-485c-af83-de0020326139.png"
    },
    {
      title: "Livelihood & Entrepreneurship",
      description: "Empowering economic independence. We equip women, youth, and families with vocational skills and microfinance tools to start sustainable businesses, fostering self-reliance and community prosperity.",
      icon: <Briefcase className="h-8 w-8 text-utu-green" />,
      color: "bg-utu-green",
      image: "/lovable-uploads/7645e834-1078-4707-9732-786fd4d93d8c.png"
    },
    {
      title: "Gender Equality & Women Empowerment",
      description: "Championing the rights and voices of African women and girls. We create safe spaces, promote leadership opportunities, and advocate for gender equality because when women thrive, communities flourish.",
      icon: <Users className="h-8 w-8 text-purple-600" />,
      color: "bg-purple-500",
      image: "/lovable-uploads/a382b382-f2d2-4832-9343-db9d8abb367d.png"
    },
    {
      title: "Youth Leadership & Mentorship",
      description: "Shaping tomorrow's visionary African leaders today. Through civic education, mentorship programs, and youth camps, we nurture ethical leadership that will transform our continent.",
      icon: <Star className="h-8 w-8 text-utu-gold" />,
      color: "bg-yellow-500",
      image: "/lovable-uploads/b07d8f50-577a-4699-87ba-8759e7ace688.png"
    },
    {
      title: "Pan-African Culture & Awareness",
      description: "Reviving our rich African identity and heritage. Through storytelling, arts, language preservation, and inter-community projects, we strengthen our cultural bonds and promote continental unity.",
      icon: <Globe className="h-8 w-8 text-orange-600" />,
      color: "bg-orange-500",
      image: "/lovable-uploads/eccb4f96-1438-49ba-947c-c55ac2356fd0.png"
    }
  ];

  const specialEvents = [
    {
      title: "UTU Yearly Conference",
      description: "An annual Pan-African gathering bringing together youth leaders, activists, volunteers, and partners from across the continent. Features workshops, cultural showcases, leadership forums, and keynote sessions. Held in a different African country each year to promote regional equity and unity.",
      icon: <Calendar className="h-8 w-8 text-blue-600" />,
      color: "bg-blue-500"
    },
    {
      title: "National Donation Day",
      description: "A day of mass mobilization in every country we operate, where citizens, schools, influencers, and businesses unite to contribute resources or time toward community aid efforts. Together, we demonstrate the power of collective action.",
      icon: <Gift className="h-8 w-8 text-green-600" />,
      color: "bg-green-500"
    }
  ];

  return (
    <section id="programs" className="py-16 md:py-24 bg-gradient-to-br from-white via-utu-light-gray to-white section-ubuntu">
      <div className="container mx-auto px-4">
        {/* Emotional Introduction */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="mb-6">
            <div className="inline-flex items-center bg-utu-red/10 backdrop-blur-sm border border-utu-red/20 rounded-full px-6 py-3 text-sm font-medium text-utu-red mb-6">
              <Heart className="mr-2 h-4 w-4" />
              Why It Matters
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-utu-black font-heading">
            Our <span className="text-gradient bg-gradient-to-r from-utu-red via-utu-gold to-utu-green bg-clip-text text-transparent">Programs</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-utu-red via-utu-gold to-utu-green mx-auto mb-8"></div>
          <p className="text-xl text-utu-gray leading-relaxed mb-6">
            At the heart of every thriving community lies <em>Utu</em> — our shared humanity. 
            Across Africa, millions face challenges that seem insurmountable alone, but together, 
            we have the power to restore dignity, create opportunity, and build stronger communities.
          </p>
          <p className="text-lg text-utu-gray leading-relaxed">
            Our programs are not just initiatives; they are movements of hope, designed to address 
            the root causes of inequality while celebrating the resilience and potential of African people. 
            Through sustainable action and community-driven solutions, we're not just changing lives — 
            we're transforming the narrative of what's possible when Africa rises together.
          </p>
        </div>

        {/* Core Programs */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-utu-black font-heading">
            Our Core Programs
          </h2>
          <div className="w-20 h-1 bg-utu-red mx-auto mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {corePrograms.map((program, index) => (
              <ProgramCard
                key={index}
                title={program.title}
                description={program.description}
                icon={program.icon}
                color={program.color}
                image={program.image}
              />
            ))}
          </div>
        </div>

        {/* Special Events Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-16 ubuntu-card">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-utu-black font-heading">
            Special Events & Initiatives
          </h2>
          <div className="w-20 h-1 bg-utu-gold mx-auto mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {specialEvents.map((event, index) => (
              <Card key={index} className="ubuntu-card hover:shadow-xl transition-all duration-300 border-0">
                <div className={`h-2 ${event.color}`}></div>
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${event.color.replace('bg-', 'bg-').replace('-500', '-100')}`}>
                    {event.icon}
                  </div>
                  <CardTitle className="text-xl text-utu-black font-heading">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-utu-gray leading-relaxed text-center">
                    {event.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-utu-gray italic">
              📌 <strong>Note:</strong> Visit our Events page for detailed information about upcoming conferences, 
              National Donation Days, and other community initiatives happening across Africa.
            </p>
          </div>
        </div>

        {/* Our Approach */}
        <div className="bg-ubuntu-gradient text-white p-8 md:p-12 rounded-3xl mb-16">
          <h3 className="text-3xl font-bold mb-8 text-center font-heading">Our Ubuntu Approach</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold mb-3 text-lg">Community-Driven</h4>
              <p className="text-white/90 text-sm leading-relaxed">
                Every program starts with listening to communities. We don't impose solutions; 
                we co-create them with the people who know their needs best.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold mb-3 text-lg">Culturally Rooted</h4>
              <p className="text-white/90 text-sm leading-relaxed">
                Our solutions honor African values, wisdom, and traditions while embracing 
                innovation and modern approaches to development.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold mb-3 text-lg">Sustainable Impact</h4>
              <p className="text-white/90 text-sm leading-relaxed">
                We build local capacity and empower communities to continue initiatives 
                independently, ensuring lasting change beyond our direct involvement.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white/90 backdrop-blur-sm p-8 md:p-12 rounded-3xl ubuntu-card">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-utu-black font-heading">
            Support a Program. Be Part of the Change.
          </h2>
          <p className="text-xl text-utu-red font-semibold mb-8 font-ubuntu">
            Utu Begins With You.
          </p>
          <p className="text-lg text-utu-gray mb-8 max-w-2xl mx-auto leading-relaxed">
            Every program represents hope, dignity, and possibility. Your support — whether through 
            donations, volunteering, or advocacy — becomes part of a movement that's transforming 
            communities across Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="donate-button text-lg px-8 py-4">
              Donate to a Program
            </Button>
            <Button variant="outline" className="border-utu-red text-utu-red hover:bg-utu-red hover:text-white text-lg px-8 py-4">
              Become a Volunteer
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;
