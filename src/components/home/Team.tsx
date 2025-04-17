import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import TeamMemberCard from './TeamMemberCard';
import TeamMemberDialog from './TeamMemberDialog';

interface TeamMember {
  id: string;
  image: string;
  name: string;
  position: string;
  bio: string;
}

const Team = () => {
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [currentTeamMember, setCurrentTeamMember] = useState<TeamMember | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      image: "/lovable-uploads/6e61272d-7786-4ccc-950e-4ae86bc5f39d.png",
      name: "Ben Kazigo Luweru",
      position: "Executive Director",
      bio: "With over 10 years of experience in NGO management, Ben leads our strategic initiatives and operations across Africa."
    },
    {
      id: "7",
      image: "/lovable-uploads/da74094e-d355-4e7f-bda9-811435437ab1.png",
      name: "Ellah Philp",
      position: "Secretary",
      bio: "Ellah manages administrative operations and ensures smooth coordination between different departments and stakeholders."
    },
    {
      id: "2",
      image: "/lovable-uploads/6cc22289-337a-4964-ab0f-4058feb43e63.png",
      name: "Laura Muwanguzi",
      position: "Director of Programs",
      bio: "Laura leads our program development and implementation, ensuring our initiatives create meaningful impact across communities."
    },
    {
      id: "8",
      image: "/lovable-uploads/c520e25e-9088-4335-9397-90370407dd62.png",
      name: "Bule Paul",
      position: "Legal Advisor",
      bio: "Bule provides expert legal counsel and ensures compliance with regulatory requirements across our operations."
    }
  ]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setIsAdmin(!isAdmin);
        toast({
          title: isAdmin ? "Admin mode disabled" : "Admin mode enabled",
          description: isAdmin ? "You are now viewing as a regular user" : "You can now edit team members",
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAdmin, toast]);

  const handleEditMember = (id: string) => {
    const member = teamMembers.find(member => member.id === id);
    if (member) {
      setCurrentTeamMember(member);
      setImagePreview(member.image);
      setIsEditDialogOpen(true);
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
    setIsAddDialogOpen(true);
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
    setIsEditDialogOpen(false);
    
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
    setIsAddDialogOpen(false);
    
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
    setIsEditDialogOpen(false);
    
    toast({
      title: "Team member removed",
      description: `${currentTeamMember.name} has been removed from the team.`,
    });

    resetForm();
  };

  const resetForm = () => {
    setCurrentTeamMember(null);
    setImageFile(null);
    setImagePreview("");
  };

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
          {isAdmin && (
            <>
              <Button 
                onClick={handleAddMember} 
                className="mt-6 bg-utu-red hover:bg-red-700"
              >
                <Plus className="mr-2" size={16} />
                Add Team Member
              </Button>
              <p className="text-sm text-gray-500 mt-4">
                Admin mode is active. Press Ctrl+Shift+A to toggle admin mode.
              </p>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <TeamMemberCard
              key={member.id}
              {...member}
              onEdit={handleEditMember}
              isAdmin={isAdmin}
            />
          ))}
        </div>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        {currentTeamMember && (
          <TeamMemberDialog
            mode="edit"
            member={currentTeamMember}
            onClose={() => setIsEditDialogOpen(false)}
            onSave={handleSaveMember}
            onDelete={handleDeleteMember}
            onChange={handleInputChange}
          />
        )}
      </Dialog>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        {currentTeamMember && (
          <TeamMemberDialog
            mode="add"
            member={currentTeamMember}
            onClose={() => setIsAddDialogOpen(false)}
            onSave={handleAddNewMember}
            onChange={handleInputChange}
          />
        )}
      </Dialog>
    </section>
  );
};

export default Team;
