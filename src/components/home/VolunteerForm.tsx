
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2 } from 'lucide-react';
import MobileFormLayout from '@/components/forms/MobileFormLayout';
import { useIsMobile } from '@/hooks/use-mobile';

interface VolunteerFormProps {
  onSubmit: (formData: any) => void;
  isLoading?: boolean;
}

const VolunteerForm = ({ onSubmit, isLoading = false }: VolunteerFormProps) => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    age: '',
    occupation: '',
    education: '',
    volunteerArea: '',
    experience: '',
    availability: '',
    motivation: '',
    skills: '',
    languages: '',
    emergencyContact: '',
    emergencyPhone: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.volunteerArea) {
      toast({
        variant: "destructive",
        title: "Missing required fields",
        description: "Please fill in all required fields marked with *",
      });
      return;
    }

    onSubmit(formData);
  };

  // Create form sections for mobile progressive disclosure
  const formSections = [
    {
      id: 'personal',
      title: 'Personal Information',
      description: 'Tell us about yourself',
      isRequired: true,
      children: (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="Enter your first name"
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Enter your last name"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                placeholder="Enter your country"
              />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="Enter your city"
              />
            </div>
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                placeholder="Enter your age"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="occupation">Current Occupation</Label>
              <Input
                id="occupation"
                value={formData.occupation}
                onChange={(e) => handleInputChange('occupation', e.target.value)}
                placeholder="Enter your occupation"
              />
            </div>
            <div>
              <Label htmlFor="education">Education Level</Label>
              <Select onValueChange={(value) => handleInputChange('education', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select education level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="secondary">Secondary School</SelectItem>
                  <SelectItem value="diploma">Diploma</SelectItem>
                  <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                  <SelectItem value="master">Master's Degree</SelectItem>
                  <SelectItem value="phd">PhD</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </>
      )
    },
    {
      id: 'volunteer',
      title: 'Volunteer Information',
      description: 'Tell us about your volunteer interests',
      isRequired: true,
      children: (
        <>
          <div>
            <Label htmlFor="volunteerArea">Preferred Volunteer Area *</Label>
            <Select onValueChange={(value) => handleInputChange('volunteerArea', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your preferred area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="education">Education & Youth Development</SelectItem>
                <SelectItem value="health">Health & Sanitation</SelectItem>
                <SelectItem value="gender">Gender & Women Empowerment</SelectItem>
                <SelectItem value="communications">Communications & Advocacy</SelectItem>
                <SelectItem value="finance">Finance & Administration</SelectItem>
                <SelectItem value="partnerships">Partnerships & Resource Mobilization</SelectItem>
                <SelectItem value="programs">Programs & Outreach</SelectItem>
                <SelectItem value="technology">Technology & Innovation</SelectItem>
                <SelectItem value="legal">Legal Affairs</SelectItem>
                <SelectItem value="fundraising">Fundraising & Events</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="availability">Availability</Label>
            <Select onValueChange={(value) => handleInputChange('availability', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="weekends">Weekends only</SelectItem>
                <SelectItem value="evenings">Evenings</SelectItem>
                <SelectItem value="flexible">Flexible</SelectItem>
                <SelectItem value="remote">Remote work</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="experience">Previous Volunteer Experience</Label>
            <Textarea
              id="experience"
              value={formData.experience}
              onChange={(e) => handleInputChange('experience', e.target.value)}
              placeholder="Describe your previous volunteer experience (if any)"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="skills">Skills & Expertise</Label>
            <Textarea
              id="skills"
              value={formData.skills}
              onChange={(e) => handleInputChange('skills', e.target.value)}
              placeholder="List your relevant skills and areas of expertise"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="languages">Languages Spoken</Label>
            <Input
              id="languages"
              value={formData.languages}
              onChange={(e) => handleInputChange('languages', e.target.value)}
              placeholder="e.g., English, Swahili, French"
            />
          </div>

          <div>
            <Label htmlFor="motivation">Why do you want to volunteer with Utu wa Ki Afrika?</Label>
            <Textarea
              id="motivation"
              value={formData.motivation}
              onChange={(e) => handleInputChange('motivation', e.target.value)}
              placeholder="Tell us about your motivation and what you hope to contribute"
              rows={4}
            />
          </div>
        </>
      )
    },
    {
      id: 'emergency',
      title: 'Emergency Contact',
      description: 'Emergency contact information',
      children: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
            <Input
              id="emergencyContact"
              value={formData.emergencyContact}
              onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
              placeholder="Emergency contact name"
            />
          </div>
          <div>
            <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
            <Input
              id="emergencyPhone"
              value={formData.emergencyPhone}
              onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
              placeholder="Emergency contact phone"
            />
          </div>
        </div>
      )
    }
  ];

  return (
    <MobileFormLayout
      sections={formSections}
      onSubmit={handleFormSubmit}
      submitText={isLoading ? "Submitting..." : "Submit Application"}
      isSubmitting={isLoading}
      className="max-h-[70vh] overflow-y-auto"
    />
  );
};

export default VolunteerForm;
