
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { 
  UploadCloud, Save, Users, FileText, Image, DollarSign, 
  Calendar, Trash2, Edit, PlusCircle, LockKeyhole, BarChart,
  CheckCircle2, XCircle, User, MessageSquare, Award
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

const Admin = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);
  const [isPaypalEnabled, setIsPaypalEnabled] = useState(true);
  const [isMobileMoneyEnabled, setIsMobileMoneyEnabled] = useState(true);
  const [isBankTransferEnabled, setIsBankTransferEnabled] = useState(true);
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "David Kimani",
      position: "Executive Director",
      bio: "With over 10 years of experience in NGO management, David leads our strategic initiatives and operations across Africa.",
      image: "/lovable-uploads/7e1302ab-dabd-404d-b089-b1c7bdf0e631.png"
    },
    {
      id: 2,
      name: "Michael Odhiambo",
      position: "Program Director",
      bio: "Michael oversees the development and implementation of all our programs, ensuring they create maximum impact.",
      image: "/lovable-uploads/23b57522-ea5d-4ead-b599-c148558a4474.png"
    },
    // Add more team members here
  ]);
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      quote: "The educational support provided by Utu Wa Kiafrika changed my life. I was able to complete my education and now I'm giving back to my community as a teacher.",
      name: "Grace Muthoni",
      role: "Teacher, Kenya",
      image: "/lovable-uploads/f18d343d-5225-4a78-9319-ab494bfd2de3.png"
    },
    {
      id: 2,
      quote: "The clean water project in our village has dramatically reduced waterborne diseases. Children now spend more time in school instead of fetching water from distant sources.",
      name: "Joseph Onyango",
      role: "Community Leader, Tanzania",
      image: "/lovable-uploads/eccb4f96-1438-49ba-947c-c55ac2356fd0.png"
    }
  ]);
  const [successMetrics, setSuccessMetrics] = useState([
    {
      id: 1,
      title: "Education Support",
      description: "Provided scholarships to 500 students across East Africa",
      achieved: true,
      target: "500 students",
      actual: "500 students",
      year: "2024"
    },
    {
      id: 2,
      title: "Clean Water Projects",
      description: "Built 50 wells in rural communities",
      achieved: true,
      target: "50 wells",
      actual: "52 wells",
      year: "2024"
    }
  ]);
  
  const [editingTeamMember, setEditingTeamMember] = useState(null);
  const [newTeamMember, setNewTeamMember] = useState({
    name: "",
    position: "",
    bio: "",
    image: "/placeholder.svg"
  });
  
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [newTestimonial, setNewTestimonial] = useState({
    quote: "",
    name: "",
    role: "",
    image: "/placeholder.svg"
  });
  
  const [editingSuccess, setEditingSuccess] = useState(null);
  const [newSuccess, setNewSuccess] = useState({
    title: "",
    description: "",
    achieved: false,
    target: "",
    actual: "",
    year: new Date().getFullYear().toString()
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, you would validate against a secure database
    // For now, we're using a simple condition for demo purposes
    if (username === 'admin' && password === 'password') {
      setShowOtpField(true);
      toast({
        title: "OTP Verification Required",
        description: "Please enter the OTP sent to your registered phone number.",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid username or password.",
        variant: "destructive"
      });
    }
  };

  const handleVerifyOtp = () => {
    // In a real app, verify OTP against what was sent to user's phone
    // Using a hardcoded value for demo purposes
    if (otp === '123456') {
      setIsAuthenticated(true);
      setShowOtpField(false);
      toast({
        title: "Login Successful",
        description: "Welcome to the admin dashboard.",
      });
    } else {
      toast({
        title: "Verification Failed",
        description: "Invalid OTP. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleChangePassword = () => {
    // Validate current password
    if (currentPassword !== 'password') {
      toast({
        title: "Password Change Failed",
        description: "Current password is incorrect.",
        variant: "destructive"
      });
      return;
    }
    
    // Validate new password
    if (newPassword !== confirmPassword) {
      toast({
        title: "Password Change Failed",
        description: "New passwords don't match.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, update password in database
    toast({
      title: "Password Changed",
      description: "Your admin password has been updated successfully.",
    });
    
    // Reset form
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSave = (section: string) => {
    toast({
      title: `${section} Updated`,
      description: `Your changes to ${section.toLowerCase()} have been saved successfully.`,
    });
  };

  const handleAddTeamMember = () => {
    // Validate
    if (!newTeamMember.name || !newTeamMember.position) {
      toast({
        title: "Validation Error",
        description: "Name and position are required.",
        variant: "destructive"
      });
      return;
    }
    
    const id = teamMembers.length > 0 
      ? Math.max(...teamMembers.map(m => m.id)) + 1 
      : 1;
      
    setTeamMembers([...teamMembers, {...newTeamMember, id}]);
    
    // Reset form
    setNewTeamMember({
      name: "",
      position: "",
      bio: "",
      image: "/placeholder.svg"
    });
    
    toast({
      title: "Team Member Added",
      description: `${newTeamMember.name} has been added to the team.`,
    });
  };

  const handleUpdateTeamMember = () => {
    if (!editingTeamMember) return;
    
    setTeamMembers(teamMembers.map(member => 
      member.id === editingTeamMember.id ? editingTeamMember : member
    ));
    
    setEditingTeamMember(null);
    
    toast({
      title: "Team Member Updated",
      description: `${editingTeamMember.name}'s information has been updated.`,
    });
  };

  const handleDeleteTeamMember = (id: number) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
    
    toast({
      title: "Team Member Removed",
      description: "The team member has been removed successfully.",
    });
  };

  const handleAddTestimonial = () => {
    // Validate
    if (!newTestimonial.name || !newTestimonial.quote) {
      toast({
        title: "Validation Error",
        description: "Name and testimonial are required.",
        variant: "destructive"
      });
      return;
    }
    
    const id = testimonials.length > 0 
      ? Math.max(...testimonials.map(t => t.id)) + 1 
      : 1;
      
    setTestimonials([...testimonials, {...newTestimonial, id}]);
    
    // Reset form
    setNewTestimonial({
      quote: "",
      name: "",
      role: "",
      image: "/placeholder.svg"
    });
    
    toast({
      title: "Testimonial Added",
      description: `${newTestimonial.name}'s testimonial has been added.`,
    });
  };

  const handleUpdateTestimonial = () => {
    if (!editingTestimonial) return;
    
    setTestimonials(testimonials.map(testimonial => 
      testimonial.id === editingTestimonial.id ? editingTestimonial : testimonial
    ));
    
    setEditingTestimonial(null);
    
    toast({
      title: "Testimonial Updated",
      description: `${editingTestimonial.name}'s testimonial has been updated.`,
    });
  };

  const handleDeleteTestimonial = (id: number) => {
    setTestimonials(testimonials.filter(testimonial => testimonial.id !== id));
    
    toast({
      title: "Testimonial Removed",
      description: "The testimonial has been removed successfully.",
    });
  };

  const handleAddSuccess = () => {
    // Validate
    if (!newSuccess.title || !newSuccess.description) {
      toast({
        title: "Validation Error",
        description: "Title and description are required.",
        variant: "destructive"
      });
      return;
    }
    
    const id = successMetrics.length > 0 
      ? Math.max(...successMetrics.map(s => s.id)) + 1 
      : 1;
      
    setSuccessMetrics([...successMetrics, {...newSuccess, id}]);
    
    // Reset form
    setNewSuccess({
      title: "",
      description: "",
      achieved: false,
      target: "",
      actual: "",
      year: new Date().getFullYear().toString()
    });
    
    toast({
      title: "Success Metric Added",
      description: `${newSuccess.title} has been added to success metrics.`,
    });
  };

  const handleUpdateSuccess = () => {
    if (!editingSuccess) return;
    
    setSuccessMetrics(successMetrics.map(success => 
      success.id === editingSuccess.id ? editingSuccess : success
    ));
    
    setEditingSuccess(null);
    
    toast({
      title: "Success Metric Updated",
      description: `${editingSuccess.title} has been updated.`,
    });
  };

  const handleDeleteSuccess = (id: number) => {
    setSuccessMetrics(successMetrics.filter(success => success.id !== id));
    
    toast({
      title: "Success Metric Removed",
      description: "The success metric has been removed successfully.",
    });
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="bg-utu-light-gray py-16 min-h-screen">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Admin Login</CardTitle>
                  <CardDescription>Please sign in to access the admin dashboard</CardDescription>
                </CardHeader>
                <CardContent>
                  {!showOtpField ? (
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input 
                          id="username" 
                          value={username} 
                          onChange={(e) => setUsername(e.target.value)} 
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input 
                          id="password" 
                          type="password" 
                          value={password} 
                          onChange={(e) => setPassword(e.target.value)} 
                          required 
                        />
                      </div>
                      <Button type="submit" className="w-full bg-utu-red hover:bg-red-700">
                        Login
                      </Button>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="otp">Enter OTP</Label>
                        <div className="flex justify-center">
                          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </div>
                        <p className="text-xs text-center text-gray-500 mt-2">
                          For demo purposes, enter 123456
                        </p>
                      </div>
                      <Button onClick={handleVerifyOtp} className="w-full bg-utu-red hover:bg-red-700">
                        Verify OTP
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setShowOtpField(false)} 
                        className="w-full"
                      >
                        Back to Login
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-utu-light-gray py-8 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-utu-black">Admin Dashboard</h1>
              <p className="text-utu-gray">Manage your website content and settings</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  <LockKeyhole className="mr-2 h-4 w-4" />
                  Change Password
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change Admin Password</DialogTitle>
                  <DialogDescription>
                    Update your admin password for security purposes.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input 
                      id="current-password" 
                      type="password" 
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input 
                      id="new-password" 
                      type="password" 
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input 
                      id="confirm-password" 
                      type="password" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleChangePassword} className="bg-utu-red hover:bg-red-700">
                    Update Password
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Tabs defaultValue="team" className="w-full">
            <TabsList className="grid w-full grid-cols-7 mb-8">
              <TabsTrigger value="team">
                <Users className="mr-2 h-4 w-4" />
                Team
              </TabsTrigger>
              <TabsTrigger value="testimonials">
                <MessageSquare className="mr-2 h-4 w-4" />
                Testimonials
              </TabsTrigger>
              <TabsTrigger value="success">
                <Award className="mr-2 h-4 w-4" />
                Success
              </TabsTrigger>
              <TabsTrigger value="content">
                <FileText className="mr-2 h-4 w-4" />
                Content
              </TabsTrigger>
              <TabsTrigger value="images">
                <Image className="mr-2 h-4 w-4" />
                Images
              </TabsTrigger>
              <TabsTrigger value="donations">
                <DollarSign className="mr-2 h-4 w-4" />
                Payments
              </TabsTrigger>
              <TabsTrigger value="events">
                <Calendar className="mr-2 h-4 w-4" />
                Events
              </TabsTrigger>
            </TabsList>
            
            {/* Team Management Tab */}
            <TabsContent value="team" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="mr-2 h-5 w-5" />
                    Manage Team Members
                  </CardTitle>
                  <CardDescription>
                    Add, edit, or remove team members displayed on the website
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Add New Team Member Form */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Add New Team Member</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="team-name">Name</Label>
                              <Input 
                                id="team-name" 
                                value={newTeamMember.name}
                                onChange={(e) => setNewTeamMember({...newTeamMember, name: e.target.value})}
                                placeholder="Full Name"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="team-position">Position</Label>
                              <Input 
                                id="team-position" 
                                value={newTeamMember.position}
                                onChange={(e) => setNewTeamMember({...newTeamMember, position: e.target.value})}
                                placeholder="Job Title"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="team-bio">Bio</Label>
                              <Textarea 
                                id="team-bio" 
                                value={newTeamMember.bio}
                                onChange={(e) => setNewTeamMember({...newTeamMember, bio: e.target.value})}
                                placeholder="Short biography"
                                className="min-h-[100px]"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Profile Image</Label>
                              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                                <div className="mx-auto flex flex-col items-center justify-center">
                                  <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />
                                  <p className="mb-2 text-sm text-muted-foreground">
                                    Drag and drop your image here or click to browse
                                  </p>
                                  <Input id="team-image" type="file" className="hidden" />
                                  <Button
                                    variant="outline"
                                    onClick={() => document.getElementById('team-image')?.click()}
                                    className="mt-2"
                                  >
                                    Upload Image
                                  </Button>
                                </div>
                              </div>
                            </div>
                            <Button onClick={handleAddTeamMember} className="w-full bg-utu-red hover:bg-red-700">
                              <PlusCircle className="mr-2 h-4 w-4" />
                              Add Team Member
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      {/* Edit Team Member Dialog */}
                      <Dialog open={!!editingTeamMember} onOpenChange={(open) => !open && setEditingTeamMember(null)}>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Team Member</DialogTitle>
                          </DialogHeader>
                          {editingTeamMember && (
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-team-name">Name</Label>
                                <Input 
                                  id="edit-team-name" 
                                  value={editingTeamMember.name}
                                  onChange={(e) => setEditingTeamMember({...editingTeamMember, name: e.target.value})}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-team-position">Position</Label>
                                <Input 
                                  id="edit-team-position" 
                                  value={editingTeamMember.position}
                                  onChange={(e) => setEditingTeamMember({...editingTeamMember, position: e.target.value})}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-team-bio">Bio</Label>
                                <Textarea 
                                  id="edit-team-bio" 
                                  value={editingTeamMember.bio}
                                  onChange={(e) => setEditingTeamMember({...editingTeamMember, bio: e.target.value})}
                                  className="min-h-[100px]"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Profile Image</Label>
                                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                                  <div className="mx-auto flex flex-col items-center justify-center">
                                    <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />
                                    <p className="mb-2 text-sm text-muted-foreground">
                                      Upload a new image
                                    </p>
                                    <Input id="edit-team-image" type="file" className="hidden" />
                                    <Button
                                      variant="outline"
                                      onClick={() => document.getElementById('edit-team-image')?.click()}
                                      className="mt-2"
                                    >
                                      Change Image
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setEditingTeamMember(null)}>
                              Cancel
                            </Button>
                            <Button onClick={handleUpdateTeamMember} className="bg-utu-red hover:bg-red-700">
                              Save Changes
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      
                      {/* Team Members List */}
                      <div className="md:col-span-2">
                        <h3 className="text-lg font-medium mb-4">Current Team Members</h3>
                        <div className="rounded-lg border overflow-hidden">
                          <div className="grid grid-cols-12 gap-4 p-4 border-b bg-gray-50">
                            <div className="col-span-1 font-medium">Image</div>
                            <div className="col-span-2 font-medium">Name</div>
                            <div className="col-span-2 font-medium">Position</div>
                            <div className="col-span-5 font-medium">Bio</div>
                            <div className="col-span-2 font-medium text-right">Actions</div>
                          </div>
                          {teamMembers.map((member) => (
                            <div key={member.id} className="grid grid-cols-12 gap-4 p-4 border-b items-center">
                              <div className="col-span-1">
                                <img src={member.image} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
                              </div>
                              <div className="col-span-2">{member.name}</div>
                              <div className="col-span-2">{member.position}</div>
                              <div className="col-span-5 text-sm truncate">{member.bio}</div>
                              <div className="col-span-2 flex justify-end space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => setEditingTeamMember(member)}
                                >
                                  <Edit size={16} />
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="text-red-500"
                                  onClick={() => handleDeleteTeamMember(member.id)}
                                >
                                  <Trash2 size={16} />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <Button onClick={() => handleSave('Team Members')} className="bg-utu-red hover:bg-red-700">
                      <Save className="mr-2 h-4 w-4" />
                      Save All Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Testimonials Management Tab */}
            <TabsContent value="testimonials" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Manage Testimonials
                  </CardTitle>
                  <CardDescription>
                    Add, edit, or remove testimonials displayed on the website
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Add New Testimonial Form */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Add New Testimonial</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="testimonial-name">Name</Label>
                              <Input 
                                id="testimonial-name" 
                                value={newTestimonial.name}
                                onChange={(e) => setNewTestimonial({...newTestimonial, name: e.target.value})}
                                placeholder="Full Name"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="testimonial-role">Role/Location</Label>
                              <Input 
                                id="testimonial-role" 
                                value={newTestimonial.role}
                                onChange={(e) => setNewTestimonial({...newTestimonial, role: e.target.value})}
                                placeholder="e.g., Teacher, Kenya"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="testimonial-quote">Testimonial</Label>
                              <Textarea 
                                id="testimonial-quote" 
                                value={newTestimonial.quote}
                                onChange={(e) => setNewTestimonial({...newTestimonial, quote: e.target.value})}
                                placeholder="Their experience with our organization"
                                className="min-h-[100px]"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Profile Image</Label>
                              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                                <div className="mx-auto flex flex-col items-center justify-center">
                                  <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />
                                  <p className="mb-2 text-sm text-muted-foreground">
                                    Drag and drop your image here or click to browse
                                  </p>
                                  <Input id="testimonial-image" type="file" className="hidden" />
                                  <Button
                                    variant="outline"
                                    onClick={() => document.getElementById('testimonial-image')?.click()}
                                    className="mt-2"
                                  >
                                    Upload Image
                                  </Button>
                                </div>
                              </div>
                            </div>
                            <Button onClick={handleAddTestimonial} className="w-full bg-utu-red hover:bg-red-700">
                              <PlusCircle className="mr-2 h-4 w-4" />
                              Add Testimonial
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      {/* Edit Testimonial Dialog */}
                      <Dialog open={!!editingTestimonial} onOpenChange={(open) => !open && setEditingTestimonial(null)}>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Testimonial</DialogTitle>
                          </DialogHeader>
                          {editingTestimonial && (
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-testimonial-name">Name</Label>
                                <Input 
                                  id="edit-testimonial-name" 
                                  value={editingTestimonial.name}
                                  onChange={(e) => setEditingTestimonial({...editingTestimonial, name: e.target.value})}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-testimonial-role">Role/Location</Label>
                                <Input 
                                  id="edit-testimonial-role" 
                                  value={editingTestimonial.role}
                                  onChange={(e) => setEditingTestimonial({...editingTestimonial, role: e.target.value})}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-testimonial-quote">Testimonial</Label>
                                <Textarea 
                                  id="edit-testimonial-quote" 
                                  value={editingTestimonial.quote}
                                  onChange={(e) => setEditingTestimonial({...editingTestimonial, quote: e.target.value})}
                                  className="min-h-[100px]"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Profile Image</Label>
                                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                                  <div className="mx-auto flex flex-col items-center justify-center">
                                    <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />
                                    <p className="mb-2 text-sm text-muted-foreground">
                                      Upload a new image
                                    </p>
                                    <Input id="edit-testimonial-image" type="file" className="hidden" />
                                    <Button
                                      variant="outline"
                                      onClick={() => document.getElementById('edit-testimonial-image')?.click()}
                                      className="mt-2"
                                    >
                                      Change Image
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setEditingTestimonial(null)}>
                              Cancel
                            </Button>
                            <Button onClick={handleUpdateTestimonial} className="bg-utu-red hover:bg-red-700">
                              Save Changes
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      
                      {/* Testimonials List */}
                      <div className="md:col-span-2">
                        <h3 className="text-lg font-medium mb-4">Current Testimonials</h3>
                        <div className="rounded-lg border overflow-hidden">
                          <div className="grid grid-cols-12 gap-4 p-4 border-b bg-gray-50">
                            <div className="col-span-1 font-medium">Image</div>
                            <div className="col-span-2 font-medium">Name</div>
                            <div className="col-span-2 font-medium">Role</div>
                            <div className="col-span-5 font-medium">Testimonial</div>
                            <div className="col-span-2 font-medium text-right">Actions</div>
                          </div>
                          {testimonials.map((testimonial) => (
                            <div key={testimonial.id} className="grid grid-cols-12 gap-4 p-4 border-b items-center">
                              <div className="col-span-1">
                                <img src={testimonial.image} alt={testimonial.name} className="w-10 h-10 rounded-full object-cover" />
                              </div>
                              <div className="col-span-2">{testimonial.name}</div>
                              <div className="col-span-2">{testimonial.role}</div>
                              <div className="col-span-5 text-sm truncate">{testimonial.quote}</div>
                              <div className="col-span-2 flex justify-end space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => setEditingTestimonial(testimonial)}
                                >
                                  <Edit size={16} />
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="text-red-500"
                                  onClick={() => handleDeleteTestimonial(testimonial.id)}
                                >
                                  <Trash2 size={16} />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <Button onClick={() => handleSave('Testimonials')} className="bg-utu-red hover:bg-red-700">
                      <Save className="mr-2 h-4 w-4" />
                      Save All Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Success Metrics Tab */}
            <TabsContent value="success" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="mr-2 h-5 w-5" />
                    Manage Success Metrics
                  </CardTitle>
                  <CardDescription>
                    Track and showcase the impact of your programs and initiatives
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Add New Success Metric Form */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Add New Success Metric</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="success-title">Title</Label>
                              <Input 
                                id="success-title" 
                                value={newSuccess.title}
                                onChange={(e) => setNewSuccess({...newSuccess, title: e.target.value})}
                                placeholder="Project or Initiative Name"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="success-description">Description</Label>
                              <Textarea 
                                id="success-description" 
                                value={newSuccess.description}
                                onChange={(e) => setNewSuccess({...newSuccess, description: e.target.value})}
                                placeholder="Brief description of the success"
                                className="min-h-[80px]"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="success-target">Target</Label>
                                <Input 
                                  id="success-target" 
                                  value={newSuccess.target}
                                  onChange={(e) => setNewSuccess({...newSuccess, target: e.target.value})}
                                  placeholder="e.g., 500 students"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="success-actual">Actual</Label>
                                <Input 
                                  id="success-actual" 
                                  value={newSuccess.actual}
                                  onChange={(e) => setNewSuccess({...newSuccess, actual: e.target.value})}
                                  placeholder="e.g., 520 students"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="success-year">Year</Label>
                                <Input 
                                  id="success-year" 
                                  value={newSuccess.year}
                                  onChange={(e) => setNewSuccess({...newSuccess, year: e.target.value})}
                                  placeholder="e.g., 2024"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="block mb-2">Status</Label>
                                <div className="flex items-center space-x-2">
                                  <Switch 
                                    id="success-achieved"
                                    checked={newSuccess.achieved}
                                    onCheckedChange={(checked) => setNewSuccess({...newSuccess, achieved: checked})}
                                  />
                                  <Label htmlFor="success-achieved">
                                    {newSuccess.achieved ? 'Achieved' : 'In Progress'}
                                  </Label>
                                </div>
                              </div>
                            </div>
                            <Button onClick={handleAddSuccess} className="w-full bg-utu-red hover:bg-red-700">
                              <PlusCircle className="mr-2 h-4 w-4" />
                              Add Success Metric
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      {/* Edit Success Dialog */}
                      <Dialog open={!!editingSuccess} onOpenChange={(open) => !open && setEditingSuccess(null)}>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Success Metric</DialogTitle>
                          </DialogHeader>
                          {editingSuccess && (
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-success-title">Title</Label>
                                <Input 
                                  id="edit-success-title" 
                                  value={editingSuccess.title}
                                  onChange={(e) => setEditingSuccess({...editingSuccess, title: e.target.value})}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-success-description">Description</Label>
                                <Textarea 
                                  id="edit-success-description" 
                                  value={editingSuccess.description}
                                  onChange={(e) => setEditingSuccess({...editingSuccess, description: e.target.value})}
                                  className="min-h-[80px]"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="edit-success-target">Target</Label>
                                  <Input 
                                    id="edit-success-target" 
                                    value={editingSuccess.target}
                                    onChange={(e) => setEditingSuccess({...editingSuccess, target: e.target.value})}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-success-actual">Actual</Label>
                                  <Input 
                                    id="edit-success-actual" 
                                    value={editingSuccess.actual}
                                    onChange={(e) => setEditingSuccess({...editingSuccess, actual: e.target.value})}
                                  />
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="edit-success-year">Year</Label>
                                  <Input 
                                    id="edit-success-year" 
                                    value={editingSuccess.year}
                                    onChange={(e) => setEditingSuccess({...editingSuccess, year: e.target.value})}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label className="block mb-2">Status</Label>
                                  <div className="flex items-center space-x-2">
                                    <Switch 
                                      id="edit-success-achieved"
                                      checked={editingSuccess.achieved}
                                      onCheckedChange={(checked) => setEditingSuccess({...editingSuccess, achieved: checked})}
                                    />
                                    <Label htmlFor="edit-success-achieved">
                                      {editingSuccess.achieved ? 'Achieved' : 'In Progress'}
                                    </Label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setEditingSuccess(null)}>
                              Cancel
                            </Button>
                            <Button onClick={handleUpdateSuccess} className="bg-utu-red hover:bg-red-700">
                              Save Changes
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      
                      {/* Success Metrics Chart */}
                      <div className="col-span-1 md:col-span-2">
                        <h3 className="text-lg font-medium mb-4">Impact Dashboard</h3>
                        <div className="rounded-lg border bg-white p-6">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                            <div className="bg-gray-50 p-4 rounded-lg text-center">
                              <h4 className="text-lg font-medium mb-2">Total Metrics</h4>
                              <p className="text-3xl font-bold text-utu-red">{successMetrics.length}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg text-center">
                              <h4 className="text-lg font-medium mb-2">Achieved</h4>
                              <p className="text-3xl font-bold text-green-600">
                                {successMetrics.filter(s => s.achieved).length}
                              </p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg text-center">
                              <h4 className="text-lg font-medium mb-2">In Progress</h4>
                              <p className="text-3xl font-bold text-yellow-600">
                                {successMetrics.filter(s => !s.achieved).length}
                              </p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg text-center">
                              <h4 className="text-lg font-medium mb-2">Success Rate</h4>
                              <p className="text-3xl font-bold text-blue-600">
                                {successMetrics.length > 0 
                                  ? Math.round((successMetrics.filter(s => s.achieved).length / successMetrics.length) * 100) 
                                  : 0}%
                              </p>
                            </div>
                          </div>
                          
                          {/* Bar Chart Visualization */}
                          <div className="h-[200px] mb-6 flex items-end justify-around bg-gray-50 p-4 rounded-lg">
                            {successMetrics.map((metric, index) => (
                              <div key={index} className="flex flex-col items-center">
                                <div 
                                  className={`w-12 ${metric.achieved ? 'bg-green-500' : 'bg-yellow-500'}`} 
                                  style={{ 
                                    height: `${Math.min(Math.max(30, metric.description.length), 150)}px` 
                                  }}
                                ></div>
                                <p className="text-xs mt-2 max-w-[80px] truncate">{metric.title}</p>
                              </div>
                            ))}
                          </div>
                          
                          {/* Success Metrics List */}
                          <div className="rounded-lg border overflow-hidden">
                            <div className="grid grid-cols-12 gap-4 p-4 border-b bg-gray-50">
                              <div className="col-span-2 font-medium">Title</div>
                              <div className="col-span-3 font-medium">Description</div>
                              <div className="col-span-2 font-medium">Target/Actual</div>
                              <div className="col-span-1 font-medium">Year</div>
                              <div className="col-span-2 font-medium">Status</div>
                              <div className="col-span-2 font-medium text-right">Actions</div>
                            </div>
                            {successMetrics.map((metric) => (
                              <div key={metric.id} className="grid grid-cols-12 gap-4 p-4 border-b items-center">
                                <div className="col-span-2 font-medium">{metric.title}</div>
                                <div className="col-span-3 text-sm truncate">{metric.description}</div>
                                <div className="col-span-2">
                                  <div>{metric.target}</div>
                                  <div className="text-sm text-gray-500">{metric.actual}</div>
                                </div>
                                <div className="col-span-1">{metric.year}</div>
                                <div className="col-span-2">
                                  <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full
                                    ${metric.achieved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                                  >
                                    {metric.achieved ? 'Achieved' : 'In Progress'}
                                  </span>
                                </div>
                                <div className="col-span-2 flex justify-end space-x-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={() => setEditingSuccess(metric)}
                                  >
                                    <Edit size={16} />
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="text-red-500"
                                    onClick={() => handleDeleteSuccess(metric.id)}
                                  >
                                    <Trash2 size={16} />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Button onClick={() => handleSave('Success Metrics')} className="bg-utu-red hover:bg-red-700">
                      <Save className="mr-2 h-4 w-4" />
                      Save All Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Content Management Tab */}
            <TabsContent value="content" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    Edit Website Content
                  </CardTitle>
                  <CardDescription>
                    Update text content for various sections of your website
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="hero-title">Hero Title</Label>
                      <Input id="hero-title" defaultValue="A Helping Hand For Every African" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="hero-description">Hero Description</Label>
                      <Textarea 
                        id="hero-description" 
                        defaultValue="We provide sustainable solutions and support to African communities through various initiatives and programs."
                        className="min-h-[100px]"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="about-text">About Us Text</Label>
                      <Textarea 
                        id="about-text" 
                        defaultValue="Utu Wa Kiafrika Charity Network is a non-profit organization dedicated to improving the lives of people across Africa through sustainable development initiatives, education programs, healthcare support, and community empowerment projects."
                        className="min-h-[150px]"
                      />
                    </div>
                    
                    <Button onClick={() => handleSave('Website Content')} className="bg-utu-red hover:bg-red-700">
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Image Management Tab */}
            <TabsContent value="images" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Image className="mr-2 h-5 w-5" />
                    Manage Website Images
                  </CardTitle>
                  <CardDescription>
                    Upload and manage images for your website
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>Hero Background Image</Label>
                      <div className="border-2 border-dashed rounded-lg p-4 text-center">
                        <div className="mx-auto flex flex-col items-center justify-center">
                          <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />
                          <p className="mb-2 text-sm text-muted-foreground">
                            Drag and drop your image here or click to browse
                          </p>
                          <Input id="hero-image" type="file" className="hidden" />
                          <Button
                            variant="outline"
                            onClick={() => document.getElementById('hero-image')?.click()}
                            className="mt-2"
                          >
                            Upload Image
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Logo Image</Label>
                      <div className="border-2 border-dashed rounded-lg p-4 text-center">
                        <div className="mx-auto flex flex-col items-center justify-center">
                          <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />
                          <p className="mb-2 text-sm text-muted-foreground">
                            Drag and drop your image here or click to browse
                          </p>
                          <Input id="logo-image" type="file" className="hidden" />
                          <Button
                            variant="outline"
                            onClick={() => document.getElementById('logo-image')?.click()}
                            className="mt-2"
                          >
                            Upload Image
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <Button onClick={() => handleSave('Website Images')} className="bg-utu-red hover:bg-red-700">
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Payment Management Tab */}
            <TabsContent value="donations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="mr-2 h-5 w-5" />
                    Payment Management
                  </CardTitle>
                  <CardDescription>
                    Manage payment methods and view donations received
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      {/* Payment Method Settings */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Payment Methods</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <DollarSign className="h-5 w-5 text-utu-red" />
                                <Label htmlFor="mobile-money-toggle">Mobile Money</Label>
                              </div>
                              <Switch 
                                id="mobile-money-toggle"
                                checked={isMobileMoneyEnabled}
                                onCheckedChange={setIsMobileMoneyEnabled}
                              />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <DollarSign className="h-5 w-5 text-utu-red" />
                                <Label htmlFor="bank-transfer-toggle">Bank Transfer</Label>
                              </div>
                              <Switch 
                                id="bank-transfer-toggle"
                                checked={isBankTransferEnabled}
                                onCheckedChange={setIsBankTransferEnabled}
                              />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <DollarSign className="h-5 w-5 text-utu-red" />
                                <Label htmlFor="paypal-toggle">PayPal</Label>
                              </div>
                              <Switch 
                                id="paypal-toggle"
                                checked={isPaypalEnabled}
                                onCheckedChange={setIsPaypalEnabled}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      {/* Payment Account Settings */}
                      <Card className="md:col-span-2">
                        <CardHeader>
                          <CardTitle className="text-lg">Payment Account Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="bank-account">Bank Account Number</Label>
                              <Input id="bank-account" defaultValue="1234567890" />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="bank-name">Bank Name</Label>
                              <Input id="bank-name" defaultValue="Standard Chartered Bank" />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="mobile-money">Mobile Money Number</Label>
                              <Input id="mobile-money" defaultValue="+256 744 552 195" />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="paypal-email">PayPal Email</Label>
                              <Input id="paypal-email" defaultValue="utuwakiafrikacharity@gmail.com" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    {/* Donation History */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Donation History</h3>
                      <div className="rounded-lg border">
                        <div className="flex items-center p-4 border-b">
                          <div className="flex-1 font-medium">Date</div>
                          <div className="flex-1 font-medium">Name</div>
                          <div className="flex-1 font-medium">Amount</div>
                          <div className="flex-1 font-medium">Method</div>
                          <div className="flex-1 font-medium">Status</div>
                        </div>
                        <div className="flex items-center p-4 border-b">
                          <div className="flex-1">2025-04-10</div>
                          <div className="flex-1">John Doe</div>
                          <div className="flex-1">$100.00</div>
                          <div className="flex-1">Mobile Money</div>
                          <div className="flex-1">
                            <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                              Completed
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center p-4 border-b">
                          <div className="flex-1">2025-04-09</div>
                          <div className="flex-1">Jane Smith</div>
                          <div className="flex-1">$50.00</div>
                          <div className="flex-1">Bank Transfer</div>
                          <div className="flex-1">
                            <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Pending
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center p-4">
                          <div className="flex-1">2025-04-08</div>
                          <div className="flex-1">Robert Johnson</div>
                          <div className="flex-1">$25.00</div>
                          <div className="flex-1">PayPal</div>
                          <div className="flex-1">
                            <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                              Completed
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Button onClick={() => handleSave('Payment Settings')} className="bg-utu-red hover:bg-red-700">
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Events Tab */}
            <TabsContent value="events" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    Manage Events
                  </CardTitle>
                  <CardDescription>
                    Add and manage upcoming events
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="event-title">Event Title</Label>
                      <Input id="event-title" placeholder="Enter event title" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="event-date">Event Date</Label>
                      <Input id="event-date" type="date" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="event-location">Event Location</Label>
                      <Input id="event-location" placeholder="Enter event location" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="event-description">Event Description</Label>
                      <Textarea 
                        id="event-description" 
                        placeholder="Enter event description"
                        className="min-h-[100px]"
                      />
                    </div>
                    
                    <Button className="bg-utu-red hover:bg-red-700">
                      Add Event
                    </Button>
                    
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-4">Upcoming Events</h3>
                      <div className="rounded-lg border">
                        <div className="flex items-center p-4 border-b">
                          <div className="flex-1 font-medium">Date</div>
                          <div className="flex-2 font-medium">Title</div>
                          <div className="flex-2 font-medium">Location</div>
                          <div className="flex-1 font-medium">Actions</div>
                        </div>
                        <div className="flex items-center p-4 border-b">
                          <div className="flex-1">2025-05-15</div>
                          <div className="flex-2">Fundraising Gala</div>
                          <div className="flex-2">Kampala Serena Hotel</div>
                          <div className="flex-1">
                            <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                            <Button variant="outline" size="sm" className="text-red-500">Delete</Button>
                          </div>
                        </div>
                        <div className="flex items-center p-4">
                          <div className="flex-1">2025-06-01</div>
                          <div className="flex-2">Community Outreach</div>
                          <div className="flex-2">Gulu District</div>
                          <div className="flex-1">
                            <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                            <Button variant="outline" size="sm" className="text-red-500">Delete</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
