import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Clock, Plus } from 'lucide-react';

interface VolunteerHoursFormProps {
  volunteerId: string;
  onSuccess?: () => void;
}

const VolunteerHoursForm = ({ volunteerId, onSuccess }: VolunteerHoursFormProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    activityDate: new Date().toISOString().split('T')[0],
    hours: '',
    activityType: '',
    description: '',
    location: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!formData.hours || !formData.activityType || !formData.activityDate) {
        toast({
          variant: "destructive",
          title: "Missing Information",
          description: "Please fill in all required fields.",
        });
        return;
      }

      const hours = parseFloat(formData.hours);
      if (isNaN(hours) || hours <= 0 || hours > 24) {
        toast({
          variant: "destructive",
          title: "Invalid Hours",
          description: "Hours must be between 0 and 24.",
        });
        return;
      }

      const { error } = await supabase
        .from('volunteer_hours')
        .insert({
          volunteer_id: volunteerId,
          activity_date: formData.activityDate,
          hours: hours,
          activity_type: formData.activityType,
          description: formData.description || null,
          location: formData.location || null,
        });

      if (error) {
        console.error('Error logging hours:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not log your hours. Please try again.",
        });
        return;
      }

      toast({
        title: "Hours Logged!",
        description: `Successfully logged ${hours} hours of volunteer work.`,
      });

      setFormData({
        activityDate: new Date().toISOString().split('T')[0],
        hours: '',
        activityType: '',
        description: '',
        location: ''
      });
      setIsOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} className="bg-utu-red hover:bg-red-700">
        <Plus className="w-4 h-4 mr-2" />
        Log Hours
      </Button>
    );
  }

  return (
    <Card className="border-utu-red/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-utu-red" />
          Log Volunteer Hours
        </CardTitle>
        <CardDescription>
          Track your volunteer contributions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="activityDate">Date *</Label>
              <Input
                id="activityDate"
                type="date"
                value={formData.activityDate}
                onChange={(e) => handleInputChange('activityDate', e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hours">Hours *</Label>
              <Input
                id="hours"
                type="number"
                step="0.5"
                min="0.5"
                max="24"
                placeholder="e.g., 4"
                value={formData.hours}
                onChange={(e) => handleInputChange('hours', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="activityType">Activity Type *</Label>
            <Select 
              value={formData.activityType}
              onValueChange={(value) => handleInputChange('activityType', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select activity type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="education">Education & Tutoring</SelectItem>
                <SelectItem value="health">Health & Wellness</SelectItem>
                <SelectItem value="community">Community Outreach</SelectItem>
                <SelectItem value="environment">Environmental Work</SelectItem>
                <SelectItem value="youth">Youth Programs</SelectItem>
                <SelectItem value="elderly">Elderly Care</SelectItem>
                <SelectItem value="admin">Administrative Support</SelectItem>
                <SelectItem value="fundraising">Fundraising</SelectItem>
                <SelectItem value="event">Event Support</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="Where did you volunteer?"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe what you did..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex gap-2">
            <Button 
              type="submit" 
              className="flex-1 bg-utu-red hover:bg-red-700"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Log Hours"}
            </Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default VolunteerHoursForm;
