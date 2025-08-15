
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import VolunteerForm from './VolunteerForm';
import { Heart } from 'lucide-react';

interface VolunteerFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const VolunteerFormDialog = ({ open, onOpenChange }: VolunteerFormDialogProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (formData: any) => {
    setIsSubmitting(true);
    
    try {
      // Simulate form submission - In a real app, this would send to your backend
      console.log('Volunteer application submitted:', formData);
      
      // Create email content
      const emailSubject = `New Volunteer Application - ${formData.firstName} ${formData.lastName}`;
      const emailBody = `
New volunteer application received:

Personal Information:
- Name: ${formData.firstName} ${formData.lastName}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Location: ${formData.city}, ${formData.country}
- Age: ${formData.age}
- Occupation: ${formData.occupation}
- Education: ${formData.education}

Volunteer Information:
- Preferred Area: ${formData.volunteerArea}
- Availability: ${formData.availability}
- Skills: ${formData.skills}
- Languages: ${formData.languages}
- Previous Experience: ${formData.experience}
- Motivation: ${formData.motivation}

Emergency Contact:
- Name: ${formData.emergencyContact}
- Phone: ${formData.emergencyPhone}

Application submitted on: ${new Date().toLocaleString()}
      `.trim();

      toast({
        title: "Ready to Join?",
        description: "Complete your volunteer registration through our secure portal for a better experience.",
      });
      
      onOpenChange(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: "There was an error submitting your application. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-utu-black flex items-center">
            <Heart className="w-6 h-6 mr-2 text-utu-red" />
            Join Our Volunteer Family
          </DialogTitle>
          <p className="text-utu-gray">
            Thank you for your interest in volunteering with Utu wa Ki Afrika. Please fill out this application form to get started.
          </p>
        </DialogHeader>
        
        <VolunteerForm onSubmit={handleFormSubmit} isLoading={isSubmitting} />
      </DialogContent>
    </Dialog>
  );
};

export default VolunteerFormDialog;
