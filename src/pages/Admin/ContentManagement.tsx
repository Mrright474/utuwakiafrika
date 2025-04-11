
import React, { useState, useEffect } from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// Team Management Component
const TeamManagement = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [currentMember, setCurrentMember] = useState({
    name: "",
    role: "",
    bio: "",
    image: ""
  });
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    const savedTeam = localStorage.getItem('utu-team');
    if (savedTeam) {
      try {
        setTeamMembers(JSON.parse(savedTeam));
      } catch (error) {
        console.error("Error parsing team data:", error);
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentMember(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!currentMember.name || !currentMember.role) {
      toast.error("Name and role are required");
      return;
    }
    
    let updatedTeam;
    
    if (editIndex >= 0) {
      // Edit existing member
      updatedTeam = [...teamMembers];
      updatedTeam[editIndex] = currentMember;
    } else {
      // Add new member
      updatedTeam = [...teamMembers, currentMember];
    }
    
    setTeamMembers(updatedTeam);
    localStorage.setItem('utu-team', JSON.stringify(updatedTeam));
    
    // Reset form
    setCurrentMember({ name: "", role: "", bio: "", image: "" });
    setEditIndex(-1);
    
    toast.success(editIndex >= 0 ? "Team member updated" : "Team member added");
  };

  const handleEdit = (index) => {
    setCurrentMember(teamMembers[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedTeam = [...teamMembers];
    updatedTeam.splice(index, 1);
    setTeamMembers(updatedTeam);
    localStorage.setItem('utu-team', JSON.stringify(updatedTeam));
    toast.success("Team member removed");
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Team Members Management</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
            <Input 
              id="name" 
              name="name" 
              value={currentMember.name}
              onChange={handleInputChange}
              placeholder="Member name"
            />
          </div>
          
          <div>
            <label htmlFor="role" className="block text-sm font-medium mb-1">Role</label>
            <Input 
              id="role" 
              name="role" 
              value={currentMember.role}
              onChange={handleInputChange}
              placeholder="Member role"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="bio" className="block text-sm font-medium mb-1">Bio</label>
          <Textarea 
            id="bio" 
            name="bio" 
            value={currentMember.bio}
            onChange={handleInputChange}
            placeholder="Short biography"
            rows={3}
          />
        </div>
        
        <div>
          <label htmlFor="image" className="block text-sm font-medium mb-1">Image URL</label>
          <Input 
            id="image" 
            name="image" 
            value={currentMember.image}
            onChange={handleInputChange}
            placeholder="Image URL (use uploaded images path)"
          />
        </div>
        
        <div className="flex justify-end space-x-2">
          {editIndex >= 0 && (
            <Button 
              type="button" 
              variant="outline"
              onClick={() => {
                setCurrentMember({ name: "", role: "", bio: "", image: "" });
                setEditIndex(-1);
              }}
            >
              Cancel
            </Button>
          )}
          <Button type="submit">
            {editIndex >= 0 ? "Update Member" : "Add Member"}
          </Button>
        </div>
      </form>
      
      <div className="mt-8">
        <h4 className="font-medium text-lg mb-4">Current Team Members</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teamMembers.map((member, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  {member.image && (
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <h5 className="font-bold">{member.name}</h5>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                </div>
                {member.bio && <p className="text-sm mb-3">{member.bio}</p>}
                <div className="flex justify-end space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// Testimonials Management Component
const TestimonialsManagement = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState({
    quote: "",
    name: "",
    role: "",
    image: ""
  });
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    const savedTestimonials = localStorage.getItem('utu-testimonials');
    if (savedTestimonials) {
      try {
        setTestimonials(JSON.parse(savedTestimonials));
      } catch (error) {
        console.error("Error parsing testimonials data:", error);
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTestimonial(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!currentTestimonial.quote || !currentTestimonial.name) {
      toast.error("Quote and name are required");
      return;
    }
    
    let updatedTestimonials;
    
    if (editIndex >= 0) {
      // Edit existing testimonial
      updatedTestimonials = [...testimonials];
      updatedTestimonials[editIndex] = currentTestimonial;
    } else {
      // Add new testimonial
      updatedTestimonials = [...testimonials, currentTestimonial];
    }
    
    setTestimonials(updatedTestimonials);
    localStorage.setItem('utu-testimonials', JSON.stringify(updatedTestimonials));
    
    // Reset form
    setCurrentTestimonial({ quote: "", name: "", role: "", image: "" });
    setEditIndex(-1);
    
    toast.success(editIndex >= 0 ? "Testimonial updated" : "Testimonial added");
  };

  const handleEdit = (index) => {
    setCurrentTestimonial(testimonials[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedTestimonials = [...testimonials];
    updatedTestimonials.splice(index, 1);
    setTestimonials(updatedTestimonials);
    localStorage.setItem('utu-testimonials', JSON.stringify(updatedTestimonials));
    toast.success("Testimonial removed");
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Testimonials Management</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="quote" className="block text-sm font-medium mb-1">Quote</label>
          <Textarea 
            id="quote" 
            name="quote" 
            value={currentTestimonial.quote}
            onChange={handleInputChange}
            placeholder="Testimonial quote"
            rows={3}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
            <Input 
              id="name" 
              name="name" 
              value={currentTestimonial.name}
              onChange={handleInputChange}
              placeholder="Person's name"
            />
          </div>
          
          <div>
            <label htmlFor="role" className="block text-sm font-medium mb-1">Role/Location</label>
            <Input 
              id="role" 
              name="role" 
              value={currentTestimonial.role}
              onChange={handleInputChange}
              placeholder="Role or location"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="image" className="block text-sm font-medium mb-1">Image URL</label>
          <Input 
            id="image" 
            name="image" 
            value={currentTestimonial.image}
            onChange={handleInputChange}
            placeholder="Image URL (use uploaded images path)"
          />
        </div>
        
        <div className="flex justify-end space-x-2">
          {editIndex >= 0 && (
            <Button 
              type="button" 
              variant="outline"
              onClick={() => {
                setCurrentTestimonial({ quote: "", name: "", role: "", image: "" });
                setEditIndex(-1);
              }}
            >
              Cancel
            </Button>
          )}
          <Button type="submit">
            {editIndex >= 0 ? "Update Testimonial" : "Add Testimonial"}
          </Button>
        </div>
      </form>
      
      <div className="mt-8">
        <h4 className="font-medium text-lg mb-4">Current Testimonials</h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <p className="italic mb-3">"{testimonial.quote}"</p>
                <div className="flex items-center space-x-3 mb-3">
                  {testimonial.image && (
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <h5 className="font-medium">{testimonial.name}</h5>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// Programs Management Component
const ProgramsManagement = () => {
  const [programs, setPrograms] = useState([]);
  const [currentProgram, setCurrentProgram] = useState({
    title: "",
    description: "",
    image: ""
  });
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    const savedPrograms = localStorage.getItem('utu-programs');
    if (savedPrograms) {
      try {
        setPrograms(JSON.parse(savedPrograms));
      } catch (error) {
        console.error("Error parsing programs data:", error);
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProgram(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!currentProgram.title || !currentProgram.description) {
      toast.error("Title and description are required");
      return;
    }
    
    let updatedPrograms;
    
    if (editIndex >= 0) {
      // Edit existing program
      updatedPrograms = [...programs];
      updatedPrograms[editIndex] = currentProgram;
    } else {
      // Add new program
      updatedPrograms = [...programs, currentProgram];
    }
    
    setPrograms(updatedPrograms);
    localStorage.setItem('utu-programs', JSON.stringify(updatedPrograms));
    
    // Reset form
    setCurrentProgram({ title: "", description: "", image: "" });
    setEditIndex(-1);
    
    toast.success(editIndex >= 0 ? "Program updated" : "Program added");
  };

  const handleEdit = (index) => {
    setCurrentProgram(programs[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedPrograms = [...programs];
    updatedPrograms.splice(index, 1);
    setPrograms(updatedPrograms);
    localStorage.setItem('utu-programs', JSON.stringify(updatedPrograms));
    toast.success("Program removed");
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Programs Management</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
          <Input 
            id="title" 
            name="title" 
            value={currentProgram.title}
            onChange={handleInputChange}
            placeholder="Program title"
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
          <Textarea 
            id="description" 
            name="description" 
            value={currentProgram.description}
            onChange={handleInputChange}
            placeholder="Program description"
            rows={3}
          />
        </div>
        
        <div>
          <label htmlFor="image" className="block text-sm font-medium mb-1">Image URL</label>
          <Input 
            id="image" 
            name="image" 
            value={currentProgram.image}
            onChange={handleInputChange}
            placeholder="Image URL (use uploaded images path)"
          />
        </div>
        
        <div className="flex justify-end space-x-2">
          {editIndex >= 0 && (
            <Button 
              type="button" 
              variant="outline"
              onClick={() => {
                setCurrentProgram({ title: "", description: "", image: "" });
                setEditIndex(-1);
              }}
            >
              Cancel
            </Button>
          )}
          <Button type="submit">
            {editIndex >= 0 ? "Update Program" : "Add Program"}
          </Button>
        </div>
      </form>
      
      <div className="mt-8">
        <h4 className="font-medium text-lg mb-4">Current Programs</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {programs.map((program, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  {program.image && (
                    <img 
                      src={program.image} 
                      alt={program.title} 
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <h5 className="font-bold">{program.title}</h5>
                </div>
                <p className="text-sm mb-3">{program.description}</p>
                <div className="flex justify-end space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// Impact Management Component
const ImpactManagement = () => {
  const [impact, setImpact] = useState({
    stats: [],
    successStories: []
  });
  
  const [currentStat, setCurrentStat] = useState({
    value: "",
    label: ""
  });
  
  const [currentStory, setCurrentStory] = useState({
    title: "",
    description: "",
    image: ""
  });
  
  const [editStatIndex, setEditStatIndex] = useState(-1);
  const [editStoryIndex, setEditStoryIndex] = useState(-1);

  useEffect(() => {
    const savedImpact = localStorage.getItem('utu-impact');
    if (savedImpact) {
      try {
        setImpact(JSON.parse(savedImpact));
      } catch (error) {
        console.error("Error parsing impact data:", error);
      }
    }
  }, []);

  const handleStatInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentStat(prev => ({ 
      ...prev, 
      [name]: name === 'value' ? (value === '' ? '' : parseInt(value, 10) || 0) : value 
    }));
  };

  const handleStoryInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentStory(prev => ({ ...prev, [name]: value }));
  };

  const handleStatSubmit = (e) => {
    e.preventDefault();
    
    if (currentStat.label === "" || currentStat.value === "") {
      toast.error("Value and label are required");
      return;
    }
    
    let updatedStats;
    
    if (editStatIndex >= 0) {
      // Edit existing stat
      updatedStats = [...impact.stats];
      updatedStats[editStatIndex] = currentStat;
    } else {
      // Add new stat
      updatedStats = [...impact.stats, currentStat];
    }
    
    const updatedImpact = { ...impact, stats: updatedStats };
    setImpact(updatedImpact);
    localStorage.setItem('utu-impact', JSON.stringify(updatedImpact));
    
    // Reset form
    setCurrentStat({ value: "", label: "" });
    setEditStatIndex(-1);
    
    toast.success(editStatIndex >= 0 ? "Impact stat updated" : "Impact stat added");
  };

  const handleStorySubmit = (e) => {
    e.preventDefault();
    
    if (!currentStory.title || !currentStory.description) {
      toast.error("Title and description are required");
      return;
    }
    
    let updatedStories;
    
    if (editStoryIndex >= 0) {
      // Edit existing story
      updatedStories = [...impact.successStories];
      updatedStories[editStoryIndex] = currentStory;
    } else {
      // Add new story
      updatedStories = [...impact.successStories, currentStory];
    }
    
    const updatedImpact = { ...impact, successStories: updatedStories };
    setImpact(updatedImpact);
    localStorage.setItem('utu-impact', JSON.stringify(updatedImpact));
    
    // Reset form
    setCurrentStory({ title: "", description: "", image: "" });
    setEditStoryIndex(-1);
    
    toast.success(editStoryIndex >= 0 ? "Success story updated" : "Success story added");
  };

  const handleEditStat = (index) => {
    setCurrentStat(impact.stats[index]);
    setEditStatIndex(index);
  };

  const handleDeleteStat = (index) => {
    const updatedStats = [...impact.stats];
    updatedStats.splice(index, 1);
    const updatedImpact = { ...impact, stats: updatedStats };
    setImpact(updatedImpact);
    localStorage.setItem('utu-impact', JSON.stringify(updatedImpact));
    toast.success("Impact stat removed");
  };

  const handleEditStory = (index) => {
    setCurrentStory(impact.successStories[index]);
    setEditStoryIndex(index);
  };

  const handleDeleteStory = (index) => {
    const updatedStories = [...impact.successStories];
    updatedStories.splice(index, 1);
    const updatedImpact = { ...impact, successStories: updatedStories };
    setImpact(updatedImpact);
    localStorage.setItem('utu-impact', JSON.stringify(updatedImpact));
    toast.success("Success story removed");
  };

  return (
    <div className="space-y-10">
      {/* Stats Management */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Impact Statistics</h3>
        
        <form onSubmit={handleStatSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="value" className="block text-sm font-medium mb-1">Value</label>
              <Input 
                id="value" 
                name="value" 
                type="number"
                value={currentStat.value}
                onChange={handleStatInputChange}
                placeholder="Numeric value"
              />
            </div>
            
            <div>
              <label htmlFor="label" className="block text-sm font-medium mb-1">Label</label>
              <Input 
                id="label" 
                name="label" 
                value={currentStat.label}
                onChange={handleStatInputChange}
                placeholder="Label description"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            {editStatIndex >= 0 && (
              <Button 
                type="button" 
                variant="outline"
                onClick={() => {
                  setCurrentStat({ value: "", label: "" });
                  setEditStatIndex(-1);
                }}
              >
                Cancel
              </Button>
            )}
            <Button type="submit">
              {editStatIndex >= 0 ? "Update Stat" : "Add Stat"}
            </Button>
          </div>
        </form>
        
        <div className="mt-4">
          <h4 className="font-medium text-lg mb-4">Current Impact Stats</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {impact.stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-gray-600">{stat.label}</p>
                  <div className="flex justify-center space-x-2 mt-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEditStat(index)}
                    >
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleDeleteStat(index)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      {/* Success Stories Management */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Success Stories</h3>
        
        <form onSubmit={handleStorySubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
            <Input 
              id="title" 
              name="title" 
              value={currentStory.title}
              onChange={handleStoryInputChange}
              placeholder="Story title"
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
            <Textarea 
              id="description" 
              name="description" 
              value={currentStory.description}
              onChange={handleStoryInputChange}
              placeholder="Story description"
              rows={3}
            />
          </div>
          
          <div>
            <label htmlFor="image" className="block text-sm font-medium mb-1">Image URL</label>
            <Input 
              id="image" 
              name="image" 
              value={currentStory.image}
              onChange={handleStoryInputChange}
              placeholder="Image URL (use uploaded images path)"
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            {editStoryIndex >= 0 && (
              <Button 
                type="button" 
                variant="outline"
                onClick={() => {
                  setCurrentStory({ title: "", description: "", image: "" });
                  setEditStoryIndex(-1);
                }}
              >
                Cancel
              </Button>
            )}
            <Button type="submit">
              {editStoryIndex >= 0 ? "Update Story" : "Add Story"}
            </Button>
          </div>
        </form>
        
        <div className="mt-4">
          <h4 className="font-medium text-lg mb-4">Current Success Stories</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {impact.successStories.map((story, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    {story.image && (
                      <img 
                        src={story.image} 
                        alt={story.title} 
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                    <h5 className="font-bold">{story.title}</h5>
                  </div>
                  <p className="text-sm mb-3">{story.description}</p>
                  <div className="flex justify-end space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEditStory(index)}
                    >
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleDeleteStory(index)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ContentManagement = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Content Management</h2>
      
      <Tabs defaultValue="team">
        <TabsList className="mb-6 flex flex-wrap">
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="programs">Programs</TabsTrigger>
          <TabsTrigger value="impact">Impact & Success</TabsTrigger>
        </TabsList>
        
        <TabsContent value="team" className="space-y-6">
          <TeamManagement />
        </TabsContent>
        
        <TabsContent value="testimonials" className="space-y-6">
          <TestimonialsManagement />
        </TabsContent>
        
        <TabsContent value="programs" className="space-y-6">
          <ProgramsManagement />
        </TabsContent>
        
        <TabsContent value="impact" className="space-y-6">
          <ImpactManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManagement;
