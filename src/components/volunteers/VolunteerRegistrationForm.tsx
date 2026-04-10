import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const VolunteerRegistrationForm = () => {
  const { signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    // Authentication fields
    email: '',
    password: '',
    confirmPassword: '',
    
    // Personal Information
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    country: '',
    age: '',
    occupation: '',
    education: '',
    
    // Volunteer Information
    volunteerArea: '',
    availability: '',
    skills: '',
    languages: '',
    experience: '',
    motivation: '',
    
    // Emergency Contact
    emergencyContact: '',
    emergencyPhone: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate passwords match
      if (formData.password !== formData.confirmPassword) {
        toast({
          variant: "destructive",
          title: "Password Mismatch",
          description: "Passwords do not match. Please check and try again.",
        });
        return;
      }

      // Validate required fields
      const requiredFields = ['email', 'password', 'firstName', 'lastName'];
      const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
      
      if (missingFields.length > 0) {
        toast({
          variant: "destructive",
          title: "Missing Information",
          description: "Please fill in all required fields.",
        });
        return;
      }

      // Sign up user
      const { data: authData, error: authError } = await signUp(
        formData.email,
        formData.password,
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
        }
      );

      if (authError) {
        // Handle specific error cases
        let errorMessage = authError.message;
        if (authError.message.includes('already registered') || authError.message.includes('already exists')) {
          errorMessage = "This email is already registered. Please try logging in instead.";
        } else if (authError.message.includes('Failed to fetch')) {
          errorMessage = "Network error. Please check your connection and try again.";
        }
        
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: errorMessage,
        });
        return;
      }

      if (authData.user) {
        // Create volunteer profile via edge function (uses service role to bypass RLS)
        const { error: profileError } = await supabase.functions.invoke('create-volunteer-profile', {
          body: {
            user_id: authData.user.id,
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            city: formData.city,
            country: formData.country,
            age: formData.age,
            occupation: formData.occupation,
            education: formData.education,
            volunteer_area: formData.volunteerArea,
            availability: formData.availability,
            skills: formData.skills,
            languages: formData.languages,
            experience: formData.experience,
            motivation: formData.motivation,
            emergency_contact: formData.emergencyContact,
            emergency_phone: formData.emergencyPhone,
          },
        });

        if (profileError) {
          console.error('Profile creation error:', profileError);
          toast({
            variant: "destructive",
            title: "Profile Creation Failed",
            description: "Your account was created but there was an issue setting up your profile. Please contact support.",
          });
          return;
        }

        toast({
          title: "Registration Successful!",
          description: "Please check your email to verify your account, then you can log in.",
        });

        // Reset form and switch to login tab
        setFormData({
          email: '', password: '', confirmPassword: '', firstName: '', lastName: '',
          phone: '', city: '', country: '', age: '', occupation: '', education: '',
          volunteerArea: '', availability: '', skills: '', languages: '', experience: '',
          motivation: '', emergencyContact: '', emergencyPhone: ''
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        variant: "destructive",
        title: "Registration Error",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Authentication Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password *</Label>
          <Input
            id="password"
            type="password"
            placeholder="Create a strong password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            required
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="confirmPassword">Confirm Password *</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            required
          />
        </div>
      </div>

      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-utu-black">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              placeholder="John"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              placeholder="Doe"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              placeholder="+1 (555) 123-4567"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              placeholder="25"
              value={formData.age}
              onChange={(e) => handleInputChange('age', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              placeholder="Your city"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              placeholder="Your country"
              value={formData.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Volunteer Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-utu-black">Volunteer Information</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="volunteerArea">Preferred Volunteer Area</Label>
            <Select onValueChange={(value) => handleInputChange('volunteerArea', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your preferred area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="education">Education & Schools</SelectItem>
                <SelectItem value="health">Health & Wellness</SelectItem>
                <SelectItem value="community">Community Development</SelectItem>
                <SelectItem value="environment">Environmental</SelectItem>
                <SelectItem value="youth">Youth Programs</SelectItem>
                <SelectItem value="elderly">Elderly Care</SelectItem>
                <SelectItem value="admin">Administrative Support</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="skills">Skills & Talents</Label>
            <Textarea
              id="skills"
              placeholder="List your skills, talents, and areas of expertise..."
              value={formData.skills}
              onChange={(e) => handleInputChange('skills', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="motivation">Why do you want to volunteer with us?</Label>
            <Textarea
              id="motivation"
              placeholder="Share your motivation and what you hope to achieve..."
              value={formData.motivation}
              onChange={(e) => handleInputChange('motivation', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-utu-black">Emergency Contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
            <Input
              id="emergencyContact"
              placeholder="Contact person name"
              value={formData.emergencyContact}
              onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
            <Input
              id="emergencyPhone"
              placeholder="Emergency contact phone"
              value={formData.emergencyPhone}
              onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
            />
          </div>
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? "Creating Account..." : "Create Volunteer Account"}
      </Button>
    </form>
  );
};

export default VolunteerRegistrationForm;