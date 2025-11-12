
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface TeamMember {
  id: string;
  image: string;
  name: string;
  position: string;
  bio: string;
  role: string;
}

const uploadImage = async (file: File, folder: string = 'team'): Promise<string> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${folder}/${Math.random().toString(36).substring(2)}.${fileExt}`;
  
  const { error: uploadError } = await supabase.storage
    .from('uploads')
    .upload(fileName, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from('uploads')
    .getPublicUrl(fileName);

  return data.publicUrl;
};

export const useTeamManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [currentTeamMember, setCurrentTeamMember] = useState<TeamMember | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { data: teamMembers = [], isLoading } = useQuery({
    queryKey: ['team-members'],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from('team_members')
        .select('*')
        .eq('active', true)
        .order('display_order');
      
      if (error) throw error;
      return (data as any[]).map((member: any) => ({
        id: member.id,
        image: member.image_url || '',
        name: member.name,
        position: member.position,
        bio: member.bio,
        role: member.role
      }));
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ member, file }: { member: TeamMember; file?: File }) => {
      let imageUrl = member.image;
      
      if (file) {
        imageUrl = await uploadImage(file, 'team');
      }

      const { error } = await (supabase as any)
        .from('team_members')
        .update({
          name: member.name,
          position: member.position,
          bio: member.bio,
          role: member.role,
          image_url: imageUrl
        })
        .eq('id', member.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      toast({
        title: "Success",
        description: "Team member updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update team member.",
        variant: "destructive",
      });
      console.error(error);
    }
  });

  const addMutation = useMutation({
    mutationFn: async ({ member, file }: { member: Omit<TeamMember, 'id'>; file?: File }) => {
      let imageUrl = member.image;
      
      if (file) {
        imageUrl = await uploadImage(file, 'team');
      }

      const { error } = await (supabase as any)
        .from('team_members')
        .insert({
          name: member.name,
          position: member.position,
          bio: member.bio,
          role: member.role,
          image_url: imageUrl
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      toast({
        title: "Success",
        description: "Team member added successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add team member.",
        variant: "destructive",
      });
      console.error(error);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any)
        .from('team_members')
        .update({ active: false })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      toast({
        title: "Success",
        description: "Team member deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete team member.",
        variant: "destructive",
      });
      console.error(error);
    }
  });

  const handleEditMember = (id: string) => {
    const member = teamMembers.find((m: any) => m.id === id);
    if (member) {
      setCurrentTeamMember(member);
      setImagePreview(member.image);
    }
  };

  const handleAddMember = () => {
    setCurrentTeamMember({
      id: '',
      image: '',
      name: '',
      position: '',
      bio: '',
      role: ''
    });
    setImagePreview(null);
  };

  const handleInputChange = (field: string, value: string) => {
    if (currentTeamMember) {
      setCurrentTeamMember({
        ...currentTeamMember,
        [field]: value
      });
      
      if (field === 'image') {
        setImagePreview(value);
      }
    }
  };

  const handleSaveMember = async () => {
    if (currentTeamMember && currentTeamMember.id) {
      await updateMutation.mutateAsync(currentTeamMember);
      resetForm();
    }
  };

  const handleAddNewMember = async () => {
    if (currentTeamMember) {
      const { id, ...memberData } = currentTeamMember;
      await addMutation.mutateAsync(memberData);
      resetForm();
    }
  };

  const handleDeleteMember = async () => {
    if (currentTeamMember && currentTeamMember.id) {
      await deleteMutation.mutateAsync(currentTeamMember.id);
      resetForm();
    }
  };

  const resetForm = () => {
    setCurrentTeamMember(null);
    setImagePreview(null);
  };

  return {
    teamMembers,
    loading: isLoading,
    currentTeamMember,
    imagePreview,
    handleEditMember,
    handleAddMember,
    handleInputChange,
    handleSaveMember,
    handleAddNewMember,
    handleDeleteMember,
    resetForm,
  };
};
