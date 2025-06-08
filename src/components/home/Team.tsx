
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
import { useAdminMode } from '@/hooks/useAdminMode';

const Team = () => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isVolunteerFormOpen, setIsVolunteerFormOpen] = useState(false);
  const { isAdmin } = useAdminMode();
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
  const boardMembers = teamMembers.filter(member => 
    member.role && (
      member.role.toLowerCase().includes("trustee") ||
      member.role.toLowerCase().includes("board") ||
      member.role.toLowerCase().includes("advisor")
    )
  );

  const executiveLeadership = teamMembers.filter(member => 
    member.role && (
      member.role.toLowerCase().includes("executive") ||
      member.role.toLowerCase().includes("deputy director") ||
      member.role.toLowerCase().includes("ceo") ||
      member.role.toLowerCase().includes("founder")
    )
  );

  const departmentalHeads = teamMembers.filter(member => 
    member.role && (
      member.role.toLowerCase().includes("director") ||
      member.role.toLowerCase().includes("head") ||
      member.role.toLowerCase().includes("manager")
    ) && !executiveLeadership.includes(member)
  );

  const coordinators = teamMembers.filter(member => 
    member.role && (
      member.role.toLowerCase().includes("coordinator") ||
      member.role.toLowerCase().includes("regional") ||
      member.role.toLowerCase().includes("district") ||
      member.role.toLowerCase().includes("national")
    )
  );

  const otherMembers = teamMembers.filter(member => 
    !boardMembers.includes(member) &&
    !executiveLeadership.includes(member) &&
    !departmentalHeads.includes(member) &&
    !coordinators.includes(member)
  );

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
          onEditMember={handleEditMemberWrapper}
          isAdmin={isAdmin}
        />

        <TeamSection
          title="Executive Leadership"
          description="Driving the vision and strategic implementation of our mission across the continent."
          members={executiveLeadership}
          onEditMember={handleEditMemberWrapper}
          isAdmin={isAdmin}
        />

        <TeamSection
          title="Departmental Heads"
          description="Leading specialized teams in Programs & Outreach, Education & Youth Development, Health & Sanitation, Gender & Women Empowerment, Communications & Advocacy, Finance & Administration, and Partnerships & Resource Mobilization."
          members={departmentalHeads}
          gridCols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          onEditMember={handleEditMemberWrapper}
          isAdmin={isAdmin}
        />

        {coordinators.length > 0 && (
          <div className="mb-16">
            <TeamSection
              title="National, Regional & District Coordinators"
              description="Leaders overseeing operations across African countries, working directly with communities to implement programs and support volunteers at the grassroots level."
              members={coordinators}
              gridCols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              onEditMember={handleEditMemberWrapper}
              isAdmin={isAdmin}
            />
            
            <ExpandingCountries />
          </div>
        )}

        <YouthVolunteersSection
          members={otherMembers}
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
