
import React, { useState, useEffect } from 'react';
import { Facebook, Twitter, Linkedin, Edit, X, Plus, Upload } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface TeamMemberProps {
  id: string;
  image: string;
  name: string;
  position: string;
  bio: string;
  onEdit: (id: string) => void;
  isAdmin?: boolean;
}

interface TeamMember {
  id: string;
  image: string;
  name: string;
  position: string;
  bio: string;
}

const TeamMember = ({ id, image, name, position, bio, onEdit, isAdmin = false }: TeamMemberProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow relative">
      {isAdmin && (
        <button 
          onClick={() => onEdit(id)}
          className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md z-10 hover:bg-gray-100"
          aria-label="Edit team member"
        >
          <Edit size={16} className="text-utu-red" />
        </button>
      )}
      <div className="aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.svg";
          }}
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
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [currentTeamMember, setCurrentTeamMember] = useState<TeamMember | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  
  // Initialize team members state from the static array
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      image: "/lovable-uploads/7e1302ab-dabd-404d-b089-b1c7bdf0e631.png",
      name: "David Kimani",
      position: "Executive Director",
      bio: "With over 10 years of experience in NGO management, David leads our strategic initiatives and operations across Africa."
    },
    {
      id: "2",
      image: "/lovable-uploads/23b57522-ea5d-4ead-b599-c148558a4474.png",
      name: "Michael Odhiambo",
      position: "Program Director",
      bio: "Michael oversees the development and implementation of all our programs, ensuring they create maximum impact."
    },
    {
      id: "3",
      image: "/lovable-uploads/b07d8f50-577a-4699-87ba-8759e7ace688.png",
      name: "James Otieno",
      position: "Communications Manager",
      bio: "James manages our communications strategy, ensuring our message reaches supporters and beneficiaries effectively."
    },
    {
      id: "4",
      image: "/lovable-uploads/a382b382-f2d2-4832-9343-db9d8abb367d.png",
      name: "Sarah Mwangi",
      position: "Finance Director",
      bio: "Sarah oversees our financial operations, ensuring transparency and accountability in all our financial dealings."
    },
    {
      id: "5",
      image: "/lovable-uploads/52fedddf-3da6-485c-af83-de0020326139.png",
      name: "John Kamau",
      position: "Field Operations Manager",
      bio: "John coordinates our field teams and ensures smooth implementation of all projects across different regions."
    },
    {
      id: "6",
      image: "/lovable-uploads/f90b8fff-8fac-4c94-8b28-10ed3702cc33.png",
      name: "Faith Achieng",
      position: "Outreach Coordinator",
      bio: "Faith develops and maintains relationships with communities, volunteers, and partners to advance our mission."
    },
    {
      id: "7",
      image: "/placeholder.svg",
      name: "Position Available",
      position: "Program Officer",
      bio: "We're looking for a dedicated individual to join our team and help manage our growing number of programs."
    },
    {
      id: "8",
      image: "/placeholder.svg",
      name: "Position Available",
      position: "Fundraising Specialist",
      bio: "We're seeking a motivated professional to help expand our fundraising initiatives and partnerships."
    },
    {
      id: "9",
      image: "/placeholder.svg",
      name: "Position Available",
      position: "Community Liaison",
      bio: "This role will serve as a bridge between our organization and the communities we serve."
    },
    {
      id: "10",
      image: "/placeholder.svg",
      name: "Position Available",
      position: "Volunteer Coordinator",
      bio: "We're looking for someone to manage our volunteer program and help expand our reach."
    }
  ]);

  // Enable admin mode with a simple keyboard shortcut (Ctrl+Shift+A)
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      
      // Create a local URL for preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        
        // Log for debugging
        console.log("Image preview set:", result ? "Image data loaded" : "No image data");
      };
      reader.readAsDataURL(file);
      
      // Confirm file selection in UI
      toast({
        title: "Image selected",
        description: `File "${file.name}" selected and ready to upload.`,
      });
    }
  };

  const handleSaveMember = () => {
    if (!currentTeamMember) return;

    // For a real implementation, you would upload the image to a server here
    // In this demo version, we just use the data URL from the preview
    const updatedMember = {
      ...currentTeamMember,
      image: imagePreview || currentTeamMember.image,
    };

    // Log the image we're saving
    console.log("Saving member with image:", updatedMember.image.substring(0, 30) + "...");

    const updatedMembers = teamMembers.map(member => 
      member.id === updatedMember.id ? updatedMember : member
    );
    
    setTeamMembers(updatedMembers);
    setIsEditDialogOpen(false);
    
    toast({
      title: "Team member updated",
      description: `${updatedMember.name}'s profile has been updated successfully.`,
    });

    // Reset state
    setCurrentTeamMember(null);
    setImageFile(null);
    setImagePreview("");
  };

  const handleAddNewMember = () => {
    if (!currentTeamMember) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Team member information is missing.",
      });
      return;
    }

    if (!currentTeamMember.name || !currentTeamMember.position) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please provide at least a name and position.",
      });
      return;
    }

    // For a real implementation, you would upload the image to a server here
    // In this demo version, we just use the data URL from the preview
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

    // Reset state
    setCurrentTeamMember(null);
    setImageFile(null);
    setImagePreview("");
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

    // Reset state
    setCurrentTeamMember(null);
    setImageFile(null);
    setImagePreview("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!currentTeamMember) return;
    
    setCurrentTeamMember({
      ...currentTeamMember,
      [e.target.name]: e.target.value
    });
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
            <Button 
              onClick={handleAddMember} 
              className="mt-6 bg-utu-red hover:bg-red-700"
            >
              <Plus className="mr-2" size={16} />
              Add Team Member
            </Button>
          )}
          {isAdmin && (
            <p className="text-sm text-gray-500 mt-4">
              Admin mode is active. Press Ctrl+Shift+A to toggle admin mode.
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <TeamMember
              key={member.id}
              id={member.id}
              image={member.image}
              name={member.name}
              position={member.position}
              bio={member.bio}
              onEdit={handleEditMember}
              isAdmin={isAdmin}
            />
          ))}
        </div>
      </div>

      {/* Edit Team Member Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Team Member</DialogTitle>
          </DialogHeader>
          
          {currentTeamMember && (
            <div className="grid gap-4 py-4">
              <div className="flex justify-center mb-4">
                <div className="relative w-32 h-32 rounded-md overflow-hidden border border-gray-300">
                  <img 
                    src={imagePreview} 
                    alt="Profile preview" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                  <Label 
                    htmlFor="image-upload" 
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <Upload className="text-white" size={24} />
                  </Label>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={currentTeamMember.name}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  name="position"
                  value={currentTeamMember.position}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={currentTeamMember.bio}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>
            </div>
          )}
          
          <DialogFooter className="flex justify-between">
            <Button variant="destructive" onClick={handleDeleteMember}>
              <X className="mr-2" size={16} />
              Delete
            </Button>
            <Button onClick={handleSaveMember} className="bg-utu-red hover:bg-red-700">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Team Member Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Team Member</DialogTitle>
          </DialogHeader>
          
          {currentTeamMember && (
            <div className="grid gap-4 py-4">
              <div className="flex justify-center mb-4">
                <div className="relative w-32 h-32 rounded-md overflow-hidden border border-gray-300">
                  <img 
                    src={imagePreview} 
                    alt="Profile preview" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                  <Label 
                    htmlFor="new-image-upload" 
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <Upload className="text-white" size={24} />
                  </Label>
                  <Input
                    id="new-image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="new-name">Name</Label>
                <Input
                  id="new-name"
                  name="name"
                  value={currentTeamMember.name}
                  onChange={handleInputChange}
                  placeholder="Enter team member name"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="new-position">Position</Label>
                <Input
                  id="new-position"
                  name="position"
                  value={currentTeamMember.position}
                  onChange={handleInputChange}
                  placeholder="Enter position title"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="new-bio">Bio</Label>
                <Textarea
                  id="new-bio"
                  name="bio"
                  value={currentTeamMember.bio}
                  onChange={handleInputChange}
                  placeholder="Enter a short bio"
                  rows={3}
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddNewMember} className="bg-utu-red hover:bg-red-700">
              Add Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Team;
