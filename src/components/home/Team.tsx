
import React, { useState } from 'react';
import { Dialog } from "@/components/ui/dialog";
import TeamMemberDialog from './TeamMemberDialog';
import TeamHeader from './TeamHeader';
import VolunteerFormDialog from './VolunteerFormDialog';
import TeamIntroduction from './team/TeamIntroduction';
import TeamSection from './team/TeamSection';
import ExpandingCountries from './team/ExpandingCountries';
import OrganizationalOverview from './team/OrganizationalOverview';
import WorkWithUsSection from './team/WorkWithUsSection';
import YouthVolunteersSection from './team/YouthVolunteersSection';
import UbuntuMessage from './team/UbuntuMessage';
import { useTeamManagement } from '@/hooks/useTeamManagement';
import { useAdminAuth } from '@/hooks/useAdminAuth';

const Team = () => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isVolunteerFormOpen, setIsVolunteerFormOpen] = useState(false);
  const { isAdmin } = useAdminAuth();
  const {
    teamMembers,
    currentTeamMember,
    handleEditMember,
    handleAddMember,
    handleInputChange,
    handleSaveMember,
    handleAddNewMember,
    handleDeleteMember,
  } = useTeamManagement();

  // Filter team members by category
  const boardMembers: any[] = []; // Empty placeholder

  const executiveLeadership = teamMembers.filter(member => 
    member.role && (
      member.role.toLowerCase().includes("executive") ||
      member.role.toLowerCase().includes("deputy director") ||
      member.role.toLowerCase().includes("ceo") ||
      member.role.toLowerCase().includes("founder") ||
      member.role.toLowerCase().includes("director") ||
      member.role.toLowerCase().includes("secretary") ||
      member.role.toLowerCase().includes("manager")
    )
  );

  const advisoryCouncil: any[] = []; // Empty placeholder for Advisory Council

  const nationalCoordinators: any[] = []; // Empty placeholder for National Coordinators

  const handleEditMemberWrapper = (id: string) => {
    handleEditMember(id);
    setIsEditDialogOpen(true);
  };

  const handleVolunteerFormOpen = () => {
    setIsVolunteerFormOpen(true);
  };

  return (
    <section id="team" className="py-16 md:py-24 bg-utu-light-gray">
      <div className="container mx-auto px-4">
        <TeamHeader isAdmin={isAdmin} onAddMember={() => {
          handleAddMember();
          setIsAddDialogOpen(true);
        }} />

        <TeamIntroduction />

        <TeamSection
          title="Board of Trustees"
          description="Visionary advisors ensuring ethical and strategic direction for our Pan-African mission."
          members={boardMembers}
          gridCols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          onEditMember={handleEditMemberWrapper}
          isAdmin={isAdmin}
        />

        <TeamSection
          title="Executive Leadership"
          description="Our dedicated leadership team driving the vision and strategic implementation of our mission across the continent."
          members={executiveLeadership}
          gridCols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          onEditMember={handleEditMemberWrapper}
          isAdmin={isAdmin}
        />

        <TeamSection
          title="Advisory Council"
          description="Expert advisors providing strategic guidance and specialized knowledge to enhance our programs and organizational effectiveness."
          members={advisoryCouncil}
          gridCols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          onEditMember={handleEditMemberWrapper}
          isAdmin={isAdmin}
        />

        <TeamSection
          title="National Coordinators"
          description="Leaders overseeing operations across African countries, working directly with communities to implement programs and support volunteers at the grassroots level."
          members={nationalCoordinators}
          gridCols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          onEditMember={handleEditMemberWrapper}
          isAdmin={isAdmin}
        />

        <ExpandingCountries />

        <YouthVolunteersSection
          members={[]}
          onEditMember={handleEditMemberWrapper}
          onVolunteerClick={handleVolunteerFormOpen}
          isAdmin={isAdmin}
        />

        <OrganizationalOverview />

        <WorkWithUsSection onVolunteerClick={handleVolunteerFormOpen} />

        <UbuntuMessage />
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        {currentTeamMember && (
          <TeamMemberDialog
            mode="edit"
            member={currentTeamMember}
            onClose={() => setIsEditDialogOpen(false)}
            onSave={handleSaveMember}
            onDelete={handleDeleteMember}
            onChange={handleInputChange}
          />
        )}
      </Dialog>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        {currentTeamMember && (
          <TeamMemberDialog
            mode="add"
            member={currentTeamMember}
            onClose={() => setIsAddDialogOpen(false)}
            onSave={handleAddNewMember}
            onChange={handleInputChange}
          />
        )}
      </Dialog>

      <VolunteerFormDialog 
        open={isVolunteerFormOpen} 
        onOpenChange={setIsVolunteerFormOpen} 
      />
    </section>
  );
};

export default Team;
