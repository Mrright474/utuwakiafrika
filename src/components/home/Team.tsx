
import React, { useState } from 'react';
import { Dialog } from "@/components/ui/dialog";
import TeamMemberCard from './TeamMemberCard';
import TeamMemberDialog from './TeamMemberDialog';
import TeamHeader from './TeamHeader';
import { useTeamManagement } from '@/hooks/useTeamManagement';
import { useAdminMode } from '@/hooks/useAdminMode';

const Team = () => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
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

  return (
    <section id="team" className="py-16 md:py-24 bg-utu-light-gray">
      <div className="container mx-auto px-4">
        <TeamHeader isAdmin={isAdmin} onAddMember={() => {
          handleAddMember();
          setIsAddDialogOpen(true);
        }} />

        {/* Team Introduction */}
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <p className="text-lg text-utu-gray mb-6">
            Our dedicated team brings together diverse expertise, passion, and commitment to create lasting
            impact across African communities. From program development and implementation to strategic
            partnerships and community engagement, our team works tirelessly to fulfill our mission.
          </p>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-3 text-utu-black">Work With Us</h3>
            <p className="text-utu-gray mb-4">
              We're always looking for passionate individuals to join our team, whether as staff, volunteers, or
              board members. If you're committed to making a difference in African communities, we'd love to hear from you.
            </p>
            <button className="bg-utu-red hover:bg-red-700 text-white px-6 py-2 rounded-md transition-colors text-sm">
              View Open Positions
            </button>
          </div>
        </div>

        {/* Leadership Section */}
        <div className="mb-12">
          <h3 className="text-xl font-bold mb-6 text-center text-utu-black">Leadership Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {teamMembers.filter((member) => 
              member.role.includes("Director") || 
              member.role.includes("Executive") || 
              member.role.includes("President") ||
              member.role.includes("Secretary") ||
              member.role.includes("Advisor")
            ).map((member) => (
              <TeamMemberCard
                key={member.id}
                {...member}
                onEdit={() => {
                  handleEditMember(member.id);
                  setIsEditDialogOpen(true);
                }}
                isAdmin={isAdmin}
              />
            ))}
          </div>
        </div>

        {/* Program Team */}
        <div className="mb-12">
          <h3 className="text-xl font-bold mb-6 text-center text-utu-black">Program Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 md:gap-8">
            {teamMembers.filter((member) => 
              member.role.includes("Coordinator") || 
              member.role.includes("Manager") ||
              !(
                member.role.includes("Director") || 
                member.role.includes("Executive") || 
                member.role.includes("President") ||
                member.role.includes("Secretary") ||
                member.role.includes("Advisor")
              )
            ).map((member) => (
              <TeamMemberCard
                key={member.id}
                {...member}
                onEdit={() => {
                  handleEditMember(member.id);
                  setIsEditDialogOpen(true);
                }}
                isAdmin={isAdmin}
              />
            ))}
          </div>
        </div>

        {/* Board and Advisors */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-12">
          <h3 className="text-xl font-bold mb-6 text-center text-utu-black">Our Board Structure</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold mb-3 text-utu-black border-b border-utu-red pb-2">Board of Directors</h4>
              <ul className="space-y-2 text-utu-gray">
                <li>• Executive Committee</li>
                <li>• Finance Committee</li>
                <li>• Program Oversight Committee</li>
                <li>• Governance Committee</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-3 text-utu-black border-b border-utu-red pb-2">Advisory Council</h4>
              <ul className="space-y-2 text-utu-gray">
                <li>• Technical Advisors</li>
                <li>• Regional Representatives</li>
                <li>• Subject Matter Experts</li>
                <li>• Community Ambassadors</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-3 text-utu-black border-b border-utu-red pb-2">Operational Structure</h4>
              <ul className="space-y-2 text-utu-gray">
                <li>• Executive Leadership</li>
                <li>• Program Management</li>
                <li>• Administrative Support</li>
                <li>• Field Implementation Teams</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Join Our Team CTA */}
        <div className="text-center">
          <h3 className="text-xl font-bold mb-4 text-utu-black">Join Our Team</h3>
          <p className="text-utu-gray max-w-2xl mx-auto mb-6">
            We're always looking for passionate individuals to join our mission. Whether as staff, volunteers,
            or partners, there are many ways to contribute to creating positive change in African communities.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-utu-red hover:bg-red-700 text-white px-6 py-2 rounded-md transition-colors">
              View Opportunities
            </button>
            <button className="border border-utu-red text-utu-red hover:bg-utu-red hover:text-white px-6 py-2 rounded-md transition-colors">
              Volunteer With Us
            </button>
          </div>
        </div>
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
    </section>
  );
};

export default Team;
