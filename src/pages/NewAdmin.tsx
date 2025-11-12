import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Users, MessageSquare, Mail, LogOut, Calendar, ExternalLink, User, Phone, MapPin, Settings } from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useAdminData } from '@/hooks/useAdminData';

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'new':
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'active':
    case 'approved':
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'rejected':
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    case 'in_progress':
      return 'bg-blue-100 text-blue-800';
    case 'unsubscribed':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const NewAdmin = () => {
  const { user, isAdmin, loading, signOut } = useAdminAuth();
  const { 
    contactSubmissions, 
    newsletterSubscribers, 
    volunteerProfiles, 
    loading: dataLoading,
    updateContactStatus,
    updateVolunteerStatus,
    deleteContactSubmission 
  } = useAdminData(isAdmin);

  // Redirect if not authenticated or not admin
  if (!loading && (!user || !isAdmin)) {
    return <Navigate to="/admin/auth" replace />;
  }

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-utu-red" />
        </div>
      </Layout>
    );
  }

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <Layout>
      <div className="bg-utu-light-gray py-8 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-utu-black">Admin Dashboard</h1>
              <p className="text-utu-gray">Manage website content and user data</p>
            </div>
            <div className="flex gap-2">
              <Link to="/admin/content">
                <Button variant="outline" className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  Content Management
                </Button>
              </Link>
              <Button 
                onClick={handleSignOut}
                variant="outline" 
                className="flex items-center"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>

          {dataLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-utu-red" />
            </div>
          ) : (
            <Tabs defaultValue="volunteers" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="volunteers">
                  <Users className="mr-2 h-4 w-4" />
                  Volunteers ({volunteerProfiles.length})
                </TabsTrigger>
                <TabsTrigger value="contacts">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Contacts ({contactSubmissions.length})
                </TabsTrigger>
                <TabsTrigger value="newsletter">
                  <Mail className="mr-2 h-4 w-4" />
                  Newsletter ({newsletterSubscribers.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="volunteers">
                <Card>
                  <CardHeader>
                    <CardTitle>Volunteer Applications</CardTitle>
                    <CardDescription>
                      Manage volunteer applications and user profiles.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {volunteerProfiles.map((volunteer) => (
                        <div key={volunteer.id} className="border rounded-lg p-4 space-y-3">
                          <div className="flex justify-between items-start">
                            <div className="space-y-2">
                              <h3 className="font-semibold text-lg">
                                {volunteer.first_name} {volunteer.last_name}
                              </h3>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <User className="h-4 w-4" />
                                  {volunteer.volunteer_id || 'No ID assigned'}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Mail className="h-4 w-4" />
                                  {volunteer.email}
                                </div>
                                {volunteer.phone && (
                                  <div className="flex items-center gap-1">
                                    <Phone className="h-4 w-4" />
                                    {volunteer.phone}
                                  </div>
                                )}
                              </div>
                              {volunteer.city && volunteer.country && (
                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                  <MapPin className="h-4 w-4" />
                                  {volunteer.city}, {volunteer.country}
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getStatusColor(volunteer.status)}>
                                {volunteer.status}
                              </Badge>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateVolunteerStatus(volunteer.id, 
                                    volunteer.status === 'pending' ? 'approved' : 'pending'
                                  )}
                                >
                                  {volunteer.status === 'pending' ? 'Approve' : 'Set Pending'}
                                </Button>
                              </div>
                            </div>
                          </div>
                          
                          {volunteer.skills && (
                            <div>
                              <span className="font-medium text-sm">Skills: </span>
                              <span className="text-sm">{volunteer.skills}</span>
                            </div>
                          )}
                          
                          {volunteer.experience && (
                            <div>
                              <span className="font-medium text-sm">Experience: </span>
                              <span className="text-sm">{volunteer.experience}</span>
                            </div>
                          )}
                          
                          <div className="text-xs text-gray-500">
                            Applied: {formatDate(volunteer.created_at)}
                          </div>
                        </div>
                      ))}
                      
                      {volunteerProfiles.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          No volunteer applications yet.
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="contacts">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Submissions</CardTitle>
                    <CardDescription>
                      Review and respond to contact form submissions.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {contactSubmissions.map((contact) => (
                        <div key={contact.id} className="border rounded-lg p-4 space-y-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold">{contact.name}</h3>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Mail className="h-4 w-4" />
                                  {contact.email}
                                </div>
                                {contact.phone && (
                                  <div className="flex items-center gap-1">
                                    <Phone className="h-4 w-4" />
                                    {contact.phone}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getStatusColor(contact.status)}>
                                {contact.status}
                              </Badge>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateContactStatus(contact.id, 
                                    contact.status === 'new' ? 'in_progress' : 'completed'
                                  )}
                                >
                                  {contact.status === 'new' ? 'Mark In Progress' : 'Complete'}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => deleteContactSubmission(contact.id)}
                                >
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </div>
                          
                          {contact.subject && (
                            <div>
                              <span className="font-medium text-sm">Subject: </span>
                              <span className="text-sm">{contact.subject}</span>
                            </div>
                          )}
                          
                          <div>
                            <span className="font-medium text-sm">Message:</span>
                            <p className="text-sm mt-1 p-2 bg-gray-50 rounded">{contact.message}</p>
                          </div>
                          
                          <div className="text-xs text-gray-500">
                            Submitted: {formatDate(contact.created_at)}
                          </div>
                        </div>
                      ))}
                      
                      {contactSubmissions.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          No contact submissions yet.
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="newsletter">
                <Card>
                  <CardHeader>
                    <CardTitle>Newsletter Subscribers</CardTitle>
                    <CardDescription>
                      View and manage newsletter subscriptions.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {newsletterSubscribers.map((subscriber) => (
                        <div key={subscriber.id} className="border rounded-lg p-4 flex justify-between items-center">
                          <div>
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-gray-500" />
                              <span className="font-medium">{subscriber.email}</span>
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              Subscribed: {formatDate(subscriber.subscribed_at)}
                              {subscriber.unsubscribed_at && (
                                <span className="ml-2">
                                  • Unsubscribed: {formatDate(subscriber.unsubscribed_at)}
                                </span>
                              )}
                            </div>
                          </div>
                          <Badge className={getStatusColor(subscriber.status)}>
                            {subscriber.status}
                          </Badge>
                        </div>
                      ))}
                      
                      {newsletterSubscribers.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          No newsletter subscribers yet.
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default NewAdmin;