
import React from 'react';
import { Facebook, Twitter, Linkedin } from 'lucide-react';

interface TeamMemberProps {
  image: string;
  name: string;
  position: string;
  bio: string;
}

const TeamMember = ({ image, name, position, bio }: TeamMemberProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
      <div className="aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover" 
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1 text-utu-black">{name}</h3>
        <p className="text-utu-red font-medium mb-3">{position}</p>
        <p className="text-utu-gray text-sm mb-4">{bio}</p>
        <div className="flex space-x-3">
          <a href="#" className="text-gray-500 hover:text-utu-red transition-colors">
            <Facebook size={18} />
          </a>
          <a href="#" className="text-gray-500 hover:text-utu-red transition-colors">
            <Twitter size={18} />
          </a>
          <a href="#" className="text-gray-500 hover:text-utu-red transition-colors">
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </div>
  );
};

const Team = () => {
  const teamMembers = [
    {
      image: "/lovable-uploads/7e1302ab-dabd-404d-b089-b1c7bdf0e631.png",
      name: "David Kimani",
      position: "Executive Director",
      bio: "With over 10 years of experience in NGO management, David leads our strategic initiatives and operations across Africa."
    },
    {
      image: "/lovable-uploads/23b57522-ea5d-4ead-b599-c148558a4474.png",
      name: "Michael Odhiambo",
      position: "Program Director",
      bio: "Michael oversees the development and implementation of all our programs, ensuring they create maximum impact."
    },
    {
      image: "/lovable-uploads/b07d8f50-577a-4699-87ba-8759e7ace688.png",
      name: "James Otieno",
      position: "Communications Manager",
      bio: "James manages our communications strategy, ensuring our message reaches supporters and beneficiaries effectively."
    },
    {
      image: "/lovable-uploads/a382b382-f2d2-4832-9343-db9d8abb367d.png",
      name: "Sarah Mwangi",
      position: "Finance Director",
      bio: "Sarah oversees our financial operations, ensuring transparency and accountability in all our financial dealings."
    },
    {
      image: "/lovable-uploads/52fedddf-3da6-485c-af83-de0020326139.png",
      name: "John Kamau",
      position: "Field Operations Manager",
      bio: "John coordinates our field teams and ensures smooth implementation of all projects across different regions."
    },
    {
      image: "/lovable-uploads/f90b8fff-8fac-4c94-8b28-10ed3702cc33.png",
      name: "Faith Achieng",
      position: "Outreach Coordinator",
      bio: "Faith develops and maintains relationships with communities, volunteers, and partners to advance our mission."
    },
    {
      image: "/placeholder.svg",
      name: "Position Available",
      position: "Program Officer",
      bio: "We're looking for a dedicated individual to join our team and help manage our growing number of programs."
    },
    {
      image: "/placeholder.svg",
      name: "Position Available",
      position: "Fundraising Specialist",
      bio: "We're seeking a motivated professional to help expand our fundraising initiatives and partnerships."
    },
    {
      image: "/placeholder.svg",
      name: "Position Available",
      position: "Community Liaison",
      bio: "This role will serve as a bridge between our organization and the communities we serve."
    },
    {
      image: "/placeholder.svg",
      name: "Position Available",
      position: "Volunteer Coordinator",
      bio: "We're looking for someone to manage our volunteer program and help expand our reach."
    }
  ];

  return (
    <section id="team" className="py-16 md:py-24 bg-utu-light-gray">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-utu-black font-heading">Our Team</h2>
          <div className="w-20 h-1 bg-utu-red mx-auto mb-6"></div>
          <p className="text-lg text-utu-gray">
            Meet the dedicated professionals who work tirelessly to achieve our mission of providing
            a helping hand for every African.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMember
              key={index}
              image={member.image}
              name={member.name}
              position={member.position}
              bio={member.bio}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
