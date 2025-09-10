
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import SkipLinks from '@/components/accessibility/SkipLinks';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  // Initialize default data in localStorage if not available
  React.useEffect(() => {
    // Initialize testimonials data if not present
    if (!localStorage.getItem('utu-testimonials')) {
      const defaultTestimonials = [
        {
          quote: "The educational support provided by Utu Wa Kiafrika changed my life. I was able to complete my education and now I'm giving back to my community as a teacher.",
          name: "Grace Muthoni",
          role: "Teacher, Kenya",
          image: "/lovable-uploads/f18d343d-5225-4a78-9319-ab494bfd2de3.png"
        },
        {
          quote: "The clean water project in our village has dramatically reduced waterborne diseases. Children now spend more time in school instead of fetching water from distant sources.",
          name: "Joseph Onyango",
          role: "Community Leader, Tanzania",
          image: "/lovable-uploads/eccb4f96-1438-49ba-947c-c55ac2356fd0.png"
        },
        {
          quote: "The entrepreneurship training and microloan I received helped me start my small business. Now I can provide for my family and employ three people from my community.",
          name: "Amina Mohammed",
          role: "Entrepreneur, Uganda",
          image: "/lovable-uploads/a382b382-f2d2-4832-9343-db9d8abb367d.png"
        }
      ];
      localStorage.setItem('utu-testimonials', JSON.stringify(defaultTestimonials));
    }

    // Initialize team data if not present
    if (!localStorage.getItem('utu-team')) {
      const defaultTeam = [
        {
          name: "Ben Kazigo Luweru",
          role: "Executive Director",
          bio: "With over 10 years of experience in NGO management, Ben leads our strategic initiatives and operations across Africa.",
          image: "/lovable-uploads/6e61272d-7786-4ccc-950e-4ae86bc5f39d.png"
        },
        {
          name: "Lwasa Abdulbast",
          role: "Deputy Director",
          bio: "Lwasa oversees the implementation of our organizational strategies and ensures effective coordination between departments.",
          image: "/lovable-uploads/6f761c26-afdc-468f-8580-4cbc8c3cab83.png"
        },
        {
          name: "Laura Muwanguzi",
          role: "Director of Programs",
          bio: "Laura leads our program development and implementation, ensuring our initiatives create meaningful impact across communities.",
          image: "/lovable-uploads/6cc22289-337a-4964-ab0f-4058feb43e63.png"
        },
        {
          name: "Ellah Philp",
          role: "Secretary",
          bio: "Ellah manages administrative operations and ensures smooth coordination between different departments and stakeholders.",
          image: "/lovable-uploads/da74094e-d355-4e7f-bda9-811435437ab1.png"
        },
        {
          name: "Bule Paul",
          role: "Legal Advisor",
          bio: "Bule provides expert legal counsel and ensures compliance with regulatory requirements across our operations.",
          image: "/lovable-uploads/c520e25e-9088-4335-9397-90370407dd62.png"
        },
        {
          name: "Dr. Amina Kenyatta",
          role: "Health Programs Coordinator",
          bio: "Dr. Amina leads our healthcare initiatives and mobile clinics, bringing vital care to remote communities.",
          image: "/lovable-uploads/f18d343d-5225-4a78-9319-ab494bfd2de3.png"
        },
        {
          name: "Joseph Mwangi",
          role: "Education Director",
          bio: "Joseph oversees our educational programs, working to improve access to quality education across East Africa.",
          image: "/lovable-uploads/eccb4f96-1438-49ba-947c-c55ac2356fd0.png"
        },
        {
          name: "Sarah Ochieng",
          role: "Community Outreach Manager",
          bio: "Sarah works directly with local communities to identify needs and implement sustainable solutions.",
          image: "/lovable-uploads/a382b382-f2d2-4832-9343-db9d8abb367d.png"
        }
      ];
      localStorage.setItem('utu-team', JSON.stringify(defaultTeam));
    }

    // Initialize programs data if not present
    if (!localStorage.getItem('utu-programs')) {
      const defaultPrograms = [
        {
          title: "Education Support",
          description: "Providing scholarships, school supplies, and infrastructure improvements to schools across Africa.",
          image: "/lovable-uploads/969161e6-4a43-456e-8ceb-4578f7e45935.png"
        },
        {
          title: "Clean Water Projects",
          description: "Building wells and water filtration systems to provide clean water to communities in need.",
          image: "/lovable-uploads/7e1302ab-dabd-404d-b089-b1c7bdf0e631.png"
        },
        {
          title: "Healthcare Initiatives",
          description: "Mobile clinics and health education programs bringing vital care to remote areas.",
          image: "/lovable-uploads/52fedddf-3da6-485c-af83-de0020326139.png"
        },
        {
          title: "Women's Empowerment",
          description: "Entrepreneurship training and microloans helping women build sustainable businesses.",
          image: "/lovable-uploads/7645e834-1078-4707-9732-786fd4d93d8c.png"
        }
      ];
      localStorage.setItem('utu-programs', JSON.stringify(defaultPrograms));
    }

    // Initialize impact data if not present
    if (!localStorage.getItem('utu-impact')) {
      const defaultImpact = {
        stats: [
          { value: 150, label: "Schools Supported" },
          { value: 75, label: "Water Projects" },
          { value: 25000, label: "Lives Impacted" },
          { value: 45, label: "Communities Reached" }
        ],
        successStories: [
          {
            title: "Education for Rural Communities",
            description: "We built 5 new schools in remote villages, providing education to over 500 children who previously had no access to schooling.",
            image: "/lovable-uploads/b07d8f50-577a-4699-87ba-8759e7ace688.png"
          },
          {
            title: "Clean Water Initiative",
            description: "Our team installed 20 water wells in drought-affected regions, providing clean drinking water to more than 10,000 people.",
            image: "/lovable-uploads/f90b8fff-8fac-4c94-8b28-10ed3702cc33.png"
          }
        ]
      };
      localStorage.setItem('utu-impact', JSON.stringify(defaultImpact));
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <SkipLinks />
      <Navbar />
      <main id="main-content" className="flex-grow overflow-x-hidden" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
