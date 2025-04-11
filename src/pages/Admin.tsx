
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { UploadCloud, Save, Users, FileText, Image, DollarSign, Calendar } from 'lucide-react';

const Admin = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple authentication for demo purposes
    // In a real app, this would be done through a secure API
    if (username === 'admin' && password === 'password') {
      setIsAuthenticated(true);
      toast({
        title: "Login Successful",
        description: "Welcome to the admin dashboard.",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid username or password.",
        variant: "destructive"
      });
    }
  };

  const handleSave = () => {
    toast({
      title: "Changes Saved",
      description: "Your changes have been saved successfully.",
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-utu-black">Admin Dashboard</h1>
            <p className="text-utu-gray">Manage your website content and settings</p>
          </div>

          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
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
                Donations
              </TabsTrigger>
              <TabsTrigger value="events">
                <Calendar className="mr-2 h-4 w-4" />
                Events
              </TabsTrigger>
            </TabsList>
            
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
                    
                    <Button onClick={handleSave} className="bg-utu-red hover:bg-red-700">
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
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
                    
                    <Button onClick={handleSave} className="bg-utu-red hover:bg-red-700">
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="donations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="mr-2 h-5 w-5" />
                    Donation Management
                  </CardTitle>
                  <CardDescription>
                    View and manage donations received
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
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
                        <div className="flex-1">Card</div>
                        <div className="flex-1">
                          <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            Completed
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bank-account">Update Bank Account</Label>
                      <Input id="bank-account" defaultValue="1234567890" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="mobile-money">Update Mobile Money Number</Label>
                      <Input id="mobile-money" defaultValue="+256 744 552 195" />
                    </div>
                    
                    <Button onClick={handleSave} className="bg-utu-red hover:bg-red-700">
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
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
