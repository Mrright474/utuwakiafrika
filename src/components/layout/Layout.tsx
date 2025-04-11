
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

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
          name: "Dr. Amina Kenyatta",
          role: "Founder & Executive Director",
          bio: "Dr. Amina has over 15 years of experience in international development and a passion for empowering African communities.",
          image: "/lovable-uploads/f18d343d-5225-4a78-9319-ab494bfd2de3.png"
        },
        {
          name: "Joseph Mwangi",
          role: "Director of Programs",
          bio: "Joseph oversees all our educational and health initiatives across East Africa.",
          image: "/lovable-uploads/eccb4f96-1438-49ba-947c-c55ac2356fd0.png"
        },
        {
          name: "Sarah Ochieng",
          role: "Community Outreach Manager",
          bio: "Sarah works directly with local communities to identify needs and implement sustainable solutions.",
          image: "/lovable-uploads/a382b382-f2d2-4832-9343-db9d8abb367d.png"
        },
        {
          name: "David Kariuki",
          role: "Finance Director",
          bio: "David ensures transparency and accountability in all our financial operations.",
          image: "/lovable-uploads/f18d343d-5225-4a78-9319-ab494bfd2de3.png"
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
            title: "Kibera School Transformation",
            description: "Renovated facilities and provided educational materials to a school in Kibera, improving attendance by 35%.",
            image: "/lovable-uploads/b07d8f50-577a-4699-87ba-8759e7ace688.png"
          },
          {
            title: "Masai Mara Clean Water",
            description: "Installed water filtration systems in 5 villages, reducing waterborne diseases by 60%.",
            image: "/lovable-uploads/f90b8fff-8fac-4c94-8b28-10ed3702cc33.png"
          }
        ]
      };
      localStorage.setItem('utu-impact', JSON.stringify(defaultImpact));
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow overflow-x-hidden">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
