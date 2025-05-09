
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";

export interface TeamMember {
  id: string;
  image: string;
  name: string;
  position: string;
  bio: string;
  role: string; // Added the missing 'role' property
}

const initialTeamMembers: TeamMember[] = [
  {
    id: "1",
    image: "/lovable-uploads/6e61272d-7786-4ccc-950e-4ae86bc5f39d.png",
    name: "Ben Kazigo Luweru",
    position: "Executive Director",
    bio: "With over 10 years of experience in NGO management, Ben leads our strategic initiatives and operations across Africa.",
    role: "Executive" // Added role property to match the filters in Team.tsx
  },
  {
    id: "2",
    image: "/lovable-uploads/6f761c26-afdc-468f-8580-4cbc8c3cab83.png",
    name: "Lwasa Abdulbast",
    position: "Deputy Director",
    bio: "Lwasa oversees the implementation of our organizational strategies and ensures effective coordination between departments.",
    role: "Director" // Added role property
  },
  {
    id: "3",
    image: "/lovable-uploads/6cc22289-337a-4964-ab0f-4058feb43e63.png",
    name: "Laura Muwanguzi",
    position: "Director of Programs",
    bio: "Laura leads our program development and implementation, ensuring our initiatives create meaningful impact across communities.",
    role: "Director" // Added role property
  },
  {
    id: "4",
    image: "/lovable-uploads/da74094e-d355-4e7f-bda9-811435437ab1.png",
    name: "Ellah Philp",
    position: "Secretary",
    bio: "Ellah manages administrative operations and ensures smooth coordination between different departments and stakeholders.",
    role: "Secretary" // Added role property
  },
  {
    id: "5",
    image: "/lovable-uploads/c520e25e-9088-4335-9397-90370407dd62.png",
    name: "Bule Paul",
    position: "Legal Advisor",
    bio: "Bule provides expert legal counsel and ensures compliance with regulatory requirements across our operations.",
    role: "Advisor" // Added role property
  },
  {
    id: "6",
    image: "/lovable-uploads/f18d343d-5225-4a78-9319-ab494bfd2de3.png",
    name: "Dr. Amina Kenyatta",
    position: "Health Programs Coordinator",
    bio: "Dr. Amina leads our healthcare initiatives and mobile clinics, bringing vital care to remote communities.",
    role: "Coordinator" // Added role property
  },
  {
    id: "7",
    image: "/lovable-uploads/eccb4f96-1438-49ba-947c-c55ac2356fd0.png",
    name: "Joseph Mwangi",
    position: "Education Director",
    bio: "Joseph oversees our educational programs, working to improve access to quality education across East Africa.",
    role: "Director" // Added role property
  },
  {
    id: "8",
    image: "/lovable-uploads/a382b382-f2d2-4832-9343-db9d8abb367d.png",
    name: "Bakasumba Arnest",
    position: "Community Outreach Manager",
    bio: "Bakasumba works directly with local communities to identify needs and implement sustainable solutions.",
    role: "Manager" // Added role property
  }
];

export const useTeamManagement = () => {
  const { toast } = useToast();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [currentTeamMember, setCurrentTeamMember] = useState<TeamMember | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleEditMember = (id: string) => {
    const member = teamMembers.find(member => member.id === id);
    if (member) {
      setCurrentTeamMember(member);
      setImagePreview(member.image);
    }
  };

  const handleAddMember = () => {
    setCurrentTeamMember({
      id: String(Date.now()),
      image: "/placeholder.svg",
      name: "",
      position: "",
      bio: ""
    });
    setImagePreview("/placeholder.svg");
  };

  const handleInputChange = (field: string, value: string) => {
    if (!currentTeamMember) return;
    setCurrentTeamMember({
      ...currentTeamMember,
      [field]: value
    });
  };

  const handleSaveMember = () => {
    if (!currentTeamMember) return;

    const updatedMember = {
      ...currentTeamMember,
      image: imagePreview || currentTeamMember.image,
    };

    const updatedMembers = teamMembers.map(member => 
      member.id === updatedMember.id ? updatedMember : member
    );
    
    setTeamMembers(updatedMembers);
    
    toast({
      title: "Team member updated",
      description: `${updatedMember.name}'s profile has been updated successfully.`,
    });

    resetForm();
  };

  const handleAddNewMember = () => {
    if (!currentTeamMember) return;

    if (!currentTeamMember.name || !currentTeamMember.position) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please provide at least a name and position.",
      });
      return;
    }

    const newMember = {
      ...currentTeamMember,
      image: imagePreview || "/placeholder.svg",
    };

    setTeamMembers([...teamMembers, newMember]);
    
    toast({
      title: "Team member added",
      description: `${newMember.name} has been added to the team successfully.`,
    });

    resetForm();
  };

  const handleDeleteMember = () => {
    if (!currentTeamMember) return;
    
    const updatedMembers = teamMembers.filter(member => member.id !== currentTeamMember.id);
    setTeamMembers(updatedMembers);
    
    toast({
      title: "Team member removed",
      description: `${currentTeamMember.name} has been removed from the team.`,
    });

    resetForm();
  };

  const resetForm = () => {
    setCurrentTeamMember(null);
    setImagePreview("");
  };

  return {
    teamMembers,
    currentTeamMember,
    imagePreview,
    handleEditMember,
    handleAddMember,
    handleInputChange,
    handleSaveMember,
    handleAddNewMember,
    handleDeleteMember,
    resetForm,
  };
};
