import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Heart, 
  User, 
  Activity, 
  Calendar, 
  LogOut, 
  Clock, 
  MapPin,
  Mail,
  Phone,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import VolunteerHoursForm from '@/components/volunteers/VolunteerHoursForm';
import VolunteerOpportunities from '@/components/volunteers/VolunteerOpportunities';

interface VolunteerProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  city?: string;
  country?: string;
  volunteer_area?: string;
  status: string;
  volunteer_id?: string;
  join_date: string;
  skills?: string;
  motivation?: string;
}

interface VolunteerActivity {
  id: string;
  activity_type: string;
  description?: string;
  hours_contributed: number;
  activity_date: string;
  project_name?: string;
  status: string;
}

interface VolunteerHours {
  id: string;
  activity_date: string;
  hours: number;
  activity_type: string;
  description?: string;
  location?: string;
  verified: boolean;
  created_at: string;
}

const VolunteerDashboard = () => {
  const { user, signOut, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState<VolunteerProfile | null>(null);
  const [activities, setActivities] = useState<VolunteerActivity[]>([]);
  const [hours, setHours] = useState<VolunteerHours[]>([]);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/volunteers/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchActivities();
    }
  }, [user]);

  const fetchHours = useCallback(async (profileId: string) => {
    try {
      const { data, error } = await supabase
        .from('volunteer_hours')
        .select('*')
        .eq('volunteer_id', profileId)
        .order('activity_date', { ascending: false });

      if (error) {
        console.error('Error fetching hours:', error);
        return;
      }

      setHours(data || []);
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  }, []);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('volunteer_profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        toast({
          variant: "destructive",
          title: "Profile Error",
          description: "Could not load your profile information.",
        });
        return;
      }

      setProfile(data);
      fetchHours(data.id);
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setLoadingProfile(false);
    }
  };

  const fetchActivities = async () => {
    try {
      const { data: profileData } = await supabase
        .from('volunteer_profiles')
        .select('id')
        .eq('user_id', user?.id)
        .single();

      if (profileData) {
        const { data, error } = await supabase
          .from('volunteer_activities')
          .select('*')
          .eq('volunteer_id', profileData.id)
          .order('activity_date', { ascending: false });

        if (error) {
          console.error('Error fetching activities:', error);
          return;
        }

        setActivities(data || []);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await signOut();
      if (error) {
        toast({
          variant: "destructive",
          title: "Sign Out Error",
          description: error.message,
        });
        return;
      }
      
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500';
      case 'active': return 'bg-blue-500';
      case 'pending': return 'bg-yellow-500';
      case 'inactive': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const totalActivityHours = activities.reduce((sum, activity) => sum + Number(activity.hours_contributed), 0);
  const totalLoggedHours = hours.reduce((sum, h) => sum + Number(h.hours), 0);
  const totalHours = totalActivityHours + totalLoggedHours;

  if (loading || loadingProfile) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-utu-cream via-white to-utu-cream flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-utu-red mb-4"></div>
            <p className="text-utu-gray font-medium">Loading your dashboard...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!profile) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-utu-cream via-white to-utu-cream flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-center">Profile Not Found</CardTitle>
              <CardDescription className="text-center">
                We couldn't find your volunteer profile. Please contact support.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate('/')} className="w-full">
                Return Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-utu-cream via-white to-utu-cream py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-utu-black mb-2">
                Welcome back, {profile.first_name}!
              </h1>
              <p className="text-utu-gray">
                Ubuntu Spirit in Action - Your volunteer dashboard
              </p>
            </div>
            <Button onClick={handleSignOut} variant="outline">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <Heart className="h-8 w-8 text-utu-red" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-utu-gray">Status</p>
                    <Badge className={getStatusColor(profile.status)}>
                      {profile.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <Clock className="h-8 w-8 text-utu-red" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-utu-gray">Total Hours</p>
                    <div className="text-2xl font-bold">{totalHours}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <Activity className="h-8 w-8 text-utu-red" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-utu-gray">Activities</p>
                    <div className="text-2xl font-bold">{activities.length}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-utu-red" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-utu-gray">Member Since</p>
                    <div className="text-sm font-bold">
                      {new Date(profile.join_date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">
                <User className="w-4 h-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="activities">
                <Activity className="w-4 h-4 mr-2" />
                Activities
              </TabsTrigger>
              <TabsTrigger value="opportunities">
                <Heart className="w-4 h-4 mr-2" />
                Opportunities
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Profile</CardTitle>
                  <CardDescription>
                    Your volunteer profile information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarFallback className="text-lg">
                        {profile.first_name.charAt(0)}{profile.last_name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold">
                        {profile.first_name} {profile.last_name}
                      </h3>
                      <p className="text-utu-gray">
                        Volunteer ID: {profile.volunteer_id}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-utu-gray" />
                        <span>{profile.email}</span>
                      </div>
                      
                      {profile.phone && (
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-utu-gray" />
                          <span>{profile.phone}</span>
                        </div>
                      )}
                      
                      {(profile.city || profile.country) && (
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-utu-gray" />
                          <span>
                            {[profile.city, profile.country].filter(Boolean).join(', ')}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      {profile.volunteer_area && (
                        <div>
                          <h4 className="font-semibold text-utu-black">Preferred Area</h4>
                          <p className="text-utu-gray">{profile.volunteer_area}</p>
                        </div>
                      )}
                      
                      {profile.skills && (
                        <div>
                          <h4 className="font-semibold text-utu-black">Skills</h4>
                          <p className="text-utu-gray">{profile.skills}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {profile.motivation && (
                    <div>
                      <h4 className="font-semibold text-utu-black">Motivation</h4>
                      <p className="text-utu-gray">{profile.motivation}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activities" className="mt-6 space-y-6">
              {/* Log Hours Form */}
              <VolunteerHoursForm 
                volunteerId={profile.id} 
                onSuccess={() => fetchHours(profile.id)}
              />

              {/* Logged Hours */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Your Logged Hours
                  </CardTitle>
                  <CardDescription>
                    Hours you've logged for your volunteer work
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {hours.length > 0 ? (
                    <div className="space-y-4">
                      {hours.map((h) => (
                        <div key={h.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold capitalize">{h.activity_type.replace('_', ' ')}</h4>
                            <div className="flex items-center gap-2">
                              {h.verified ? (
                                <Badge className="bg-green-500">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Verified
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                                  <XCircle className="w-3 h-3 mr-1" />
                                  Pending
                                </Badge>
                              )}
                              <Badge variant="secondary">{h.hours} hrs</Badge>
                            </div>
                          </div>
                          {h.description && (
                            <p className="text-utu-gray mb-2">{h.description}</p>
                          )}
                          <div className="flex justify-between text-sm text-utu-gray">
                            <span>{new Date(h.activity_date).toLocaleDateString()}</span>
                            {h.location && <span>📍 {h.location}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Clock className="w-12 h-12 text-utu-gray mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-utu-black mb-2">
                        No Hours Logged Yet
                      </h3>
                      <p className="text-utu-gray">
                        Use the "Log Hours" button above to track your volunteer contributions.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Past Activities */}
              {activities.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Past Activities</CardTitle>
                    <CardDescription>
                      Activities assigned by coordinators
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activities.map((activity) => (
                        <div key={activity.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold">{activity.activity_type}</h4>
                            <Badge variant="outline">{activity.status}</Badge>
                          </div>
                          {activity.description && (
                            <p className="text-utu-gray mb-2">{activity.description}</p>
                          )}
                          <div className="flex justify-between text-sm text-utu-gray">
                            <span>
                              {new Date(activity.activity_date).toLocaleDateString()}
                            </span>
                            <span>{activity.hours_contributed} hours</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="opportunities" className="mt-6 space-y-6">
              <VolunteerOpportunities />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default VolunteerDashboard;