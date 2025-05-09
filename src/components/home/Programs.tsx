
import React from 'react';
import { BookOpen, Heart, Home, Lightbulb, Droplet, Briefcase, Users, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProgramProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
  impact: string;
}

const ProgramCard = ({ title, description, icon, benefits, impact }: ProgramProps) => {
  return (
    <Card className="border border-gray-100 hover:shadow-xl transition-shadow">
      <CardHeader>
        <div className="bg-utu-red/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
          {icon}
        </div>
        <CardTitle className="text-xl text-utu-black">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <h4 className="text-sm font-semibold mb-2 text-utu-black">Key Benefits:</h4>
        <ul className="list-disc pl-5 mb-4 text-utu-gray text-sm">
          {benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
        <div className="bg-utu-light-gray p-3 rounded-md mt-4">
          <h4 className="text-sm font-semibold mb-1 text-utu-black">Impact:</h4>
          <p className="text-sm text-utu-gray">{impact}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="link" className="text-utu-red p-0 hover:text-red-700">
          Learn more
        </Button>
      </CardFooter>
    </Card>
  );
};

const Programs = () => {
  const programCategories = [
    {
      id: "education",
      name: "Education",
      programs: [
        {
          title: "Scholarship Program",
          description: "Financial support for talented students from disadvantaged backgrounds to access quality education.",
          icon: <BookOpen className="h-6 w-6 text-utu-red" />,
          benefits: [
            "Tuition fees coverage",
            "School supplies and uniform",
            "Mentorship support",
            "Career guidance"
          ],
          impact: "We've supported over 2,000 students to complete their education, with 85% successfully transitioning to employment or higher education."
        },
        {
          title: "School Infrastructure",
          description: "Building and renovating classrooms, libraries, and other educational facilities in underserved areas.",
          icon: <Home className="h-6 w-6 text-utu-red" />,
          benefits: [
            "Modern learning spaces",
            "Improved learning environment",
            "Increased school attendance",
            "Community involvement"
          ],
          impact: "15 schools built or renovated, providing quality learning environments for more than 7,500 students."
        }
      ]
    },
    {
      id: "health",
      name: "Healthcare",
      programs: [
        {
          title: "Mobile Health Clinics",
          description: "Bringing essential healthcare services to remote and underserved communities.",
          icon: <Heart className="h-6 w-6 text-utu-red" />,
          benefits: [
            "Basic health check-ups",
            "Maternal and child healthcare",
            "Immunization services",
            "Health education"
          ],
          impact: "Our mobile clinics have served over 7,500 patients who otherwise would have limited access to healthcare."
        },
        {
          title: "Health Education",
          description: "Promoting preventive healthcare through community-based education and awareness programs.",
          icon: <ShieldCheck className="h-6 w-6 text-utu-red" />,
          benefits: [
            "Disease prevention knowledge",
            "Improved hygiene practices",
            "Maternal health awareness",
            "Community health volunteers"
          ],
          impact: "Reached over 12,000 people with critical health information, reducing preventable diseases by 40% in target communities."
        }
      ]
    },
    {
      id: "water",
      name: "Clean Water",
      programs: [
        {
          title: "Well Construction",
          description: "Building safe water sources in communities facing water scarcity and contamination issues.",
          icon: <Droplet className="h-6 w-6 text-utu-red" />,
          benefits: [
            "Clean drinking water access",
            "Reduced waterborne diseases",
            "Time saved for women and children",
            "Local maintenance training"
          ],
          impact: "75 wells constructed, providing clean water to over 15,000 people and reducing waterborne diseases by 65%."
        },
        {
          title: "Rainwater Harvesting",
          description: "Implementing systems to collect and store rainwater for domestic and agricultural use.",
          icon: <Droplet className="h-6 w-6 text-utu-red" />,
          benefits: [
            "Water security during dry seasons",
            "Sustainable water management",
            "Support for small-scale farming",
            "Reduced environmental impact"
          ],
          impact: "30 rainwater harvesting systems installed in schools and community centers, storing over 500,000 liters of water annually."
        }
      ]
    },
    {
      id: "economic",
      name: "Economic",
      programs: [
        {
          title: "Microfinance Initiative",
          description: "Providing small loans and financial training to entrepreneurs to start or grow their businesses.",
          icon: <Briefcase className="h-6 w-6 text-utu-red" />,
          benefits: [
            "Access to capital",
            "Business skills training",
            "Peer support networks",
            "Savings culture promotion"
          ],
          impact: "Supported over 500 entrepreneurs, with 78% of businesses still operational and growing after two years."
        },
        {
          title: "Vocational Training",
          description: "Equipping youth and women with marketable skills to enhance their employment opportunities.",
          icon: <Users className="h-6 w-6 text-utu-red" />,
          benefits: [
            "Practical skills development",
            "Industry-relevant training",
            "Job placement support",
            "Entrepreneurship pathways"
          ],
          impact: "Trained 1,200 youth and women in various vocational skills, with 78% finding employment or starting businesses."
        }
      ]
    },
    {
      id: "innovation",
      name: "Innovation",
      programs: [
        {
          title: "Innovation Hub",
          description: "Supporting young African innovators developing solutions to local challenges.",
          icon: <Lightbulb className="h-6 w-6 text-utu-red" />,
          benefits: [
            "Mentorship from experts",
            "Seed funding opportunities",
            "Networking with investors",
            "Product development support"
          ],
          impact: "Supported 45 innovative projects addressing challenges in agriculture, education, health, and energy."
        }
      ]
    }
  ];

  return (
    <section id="programs" className="py-16 md:py-24 bg-utu-light-gray">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-utu-black font-heading">Our Programs</h2>
          <div className="w-20 h-1 bg-utu-red mx-auto mb-6"></div>
          <p className="text-lg text-utu-gray">
            We implement a wide range of programs designed to address the most pressing challenges
            facing African communities and create sustainable impact.
          </p>
        </div>

        <Tabs defaultValue="education" className="mb-8">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
            {programCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-utu-black">
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {programCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {category.programs.map((program, index) => (
                  <ProgramCard
                    key={index}
                    title={program.title}
                    description={program.description}
                    icon={program.icon}
                    benefits={program.benefits}
                    impact={program.impact}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Program Achievements */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center text-utu-black">Our Approach</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-utu-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-utu-red" />
              </div>
              <h4 className="font-bold mb-2 text-utu-black">Community-Centered</h4>
              <p className="text-utu-gray text-sm">
                We involve community members in every step, from needs assessment to implementation and evaluation, 
                ensuring local ownership and sustainability.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-utu-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="h-8 w-8 text-utu-red" />
              </div>
              <h4 className="font-bold mb-2 text-utu-black">Innovative Solutions</h4>
              <p className="text-utu-gray text-sm">
                We combine traditional knowledge with modern approaches to develop culturally appropriate 
                and effective solutions to complex challenges.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-utu-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="h-8 w-8 text-utu-red" />
              </div>
              <h4 className="font-bold mb-2 text-utu-black">Sustainable Impact</h4>
              <p className="text-utu-gray text-sm">
                We focus on building local capacity and empowering communities to continue initiatives 
                independently long after our direct involvement ends.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button className="bg-utu-red hover:bg-red-700 text-white px-8 py-6">
            View All Programs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Programs;
