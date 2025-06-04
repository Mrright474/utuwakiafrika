
import React, { useState } from 'react';
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Users, Globe, Heart } from 'lucide-react';
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
      member.role.toLowerCase().includes("executive director") ||
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

  return (
    <section id="team" className="py-16 md:py-24 bg-utu-light-gray">
      <div className="container mx-auto px-4">
        <TeamHeader isAdmin={isAdmin} onAddMember={() => {
          handleAddMember();
          setIsAddDialogOpen(true);
        }} />

        {/* Ubuntu-inspired Introduction */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-utu-red">
            <div className="flex justify-center mb-4">
              <Heart className="w-8 h-8 text-utu-red" />
            </div>
            <p className="text-lg text-utu-gray leading-relaxed italic mb-4">
              "Behind every act of compassion is a dedicated team. At Utu wa Ki Afrika, our strength lies in our people — young, wise, bold, and compassionate individuals across Africa, united by the dream of a dignified and empowered continent."
            </p>
            <div className="w-16 h-1 bg-utu-red mx-auto"></div>
          </div>
        </div>

        {/* Board of Trustees */}
        {boardMembers.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-3 text-utu-black">Board of Trustees</h3>
              <p className="text-utu-gray max-w-2xl mx-auto">
                Visionary advisors ensuring ethical and strategic direction for our Pan-African mission.
              </p>
              <div className="w-16 h-1 bg-utu-red mx-auto mt-4"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {boardMembers.map((member) => (
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
        )}

        {/* Executive Leadership */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-3 text-utu-black">Executive Leadership</h3>
            <p className="text-utu-gray max-w-2xl mx-auto">
              Driving the vision and strategic implementation of our mission across the continent.
            </p>
            <div className="w-16 h-1 bg-utu-red mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {executiveLeadership.map((member) => (
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

        {/* Departmental Heads */}
        {departmentalHeads.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-3 text-utu-black">Departmental Heads</h3>
              <p className="text-utu-gray max-w-2xl mx-auto">
                Leading specialized teams in Programs & Outreach, Education & Youth Development, Health & Sanitation, 
                Gender & Women Empowerment, Communications & Advocacy, Finance & Administration, and Partnerships & Resource Mobilization.
              </p>
              <div className="w-16 h-1 bg-utu-red mx-auto mt-4"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {departmentalHeads.map((member) => (
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
        )}

        {/* National, Regional & District Coordinators */}
        {coordinators.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-3 text-utu-black">National, Regional & District Coordinators</h3>
              <p className="text-utu-gray max-w-2xl mx-auto">
                Leaders overseeing operations across African countries, working directly with communities 
                to implement programs and support volunteers at the grassroots level.
              </p>
              <div className="w-16 h-1 bg-utu-red mx-auto mt-4"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {coordinators.map((member) => (
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
            
            {/* Coming Soon Countries */}
            <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold mb-4 text-center text-utu-black flex items-center justify-center">
                <Globe className="w-5 h-5 mr-2 text-utu-red" />
                Expanding Across Africa
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center">
                {[
                  "Nigeria", "Ghana", "Senegal", "Mali", "Burkina Faso", "Niger",
                  "Chad", "Cameroon", "Central African Republic", "Democratic Republic of Congo",
                  "Angola", "Zambia", "Malawi", "Mozambique", "Zimbabwe", "Botswana",
                  "Namibia", "South Africa", "Lesotho", "Eswatini", "Madagascar",
                  "Mauritius", "Seychelles", "Comoros", "Djibouti", "Eritrea",
                  "Ethiopia", "Somalia", "South Sudan", "Sudan", "Egypt", "Libya",
                  "Tunisia", "Algeria", "Morocco", "Mauritania", "Guinea", "Sierra Leone",
                  "Liberia", "Côte d'Ivoire", "Togo", "Benin", "Gabon", "Equatorial Guinea",
                  "São Tomé and Príncipe", "Cape Verde", "Gambia", "Guinea-Bissau"
                ].map((country) => (
                  <div key={country} className="p-2 bg-utu-light-gray rounded text-sm">
                    <span className="font-medium text-utu-black">{country}</span>
                    <br />
                    <span className="text-xs text-utu-red">Coming Soon</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Youth Ambassadors & Volunteers */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-3 text-utu-black">Youth Ambassadors & Volunteers</h3>
            <p className="text-utu-gray max-w-2xl mx-auto">
              Young changemakers across the continent driving grassroots impact and community transformation.
            </p>
            <div className="w-16 h-1 bg-utu-red mx-auto mt-4"></div>
          </div>
          
          {otherMembers.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8">
              {otherMembers.map((member) => (
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
          )}

          <div className="text-center">
            <Button className="bg-utu-red hover:bg-red-700 text-white px-8 py-3 rounded-md transition-colors text-lg">
              <Users className="w-5 h-5 mr-2" />
              Join Our Volunteer Family
            </Button>
          </div>
        </div>

        {/* Organizational Structure Overview */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-12">
          <h3 className="text-xl font-bold mb-6 text-center text-utu-black">Our Organizational Structure</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold mb-3 text-utu-black border-b border-utu-red pb-2">Governance</h4>
              <ul className="space-y-2 text-utu-gray">
                <li>• Board of Trustees</li>
                <li>• Executive Leadership</li>
                <li>• Advisory Council</li>
                <li>• Ethics Committee</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-3 text-utu-black border-b border-utu-red pb-2">Operations</h4>
              <ul className="space-y-2 text-utu-gray">
                <li>• Program Departments</li>
                <li>• National Coordinators</li>
                <li>• Regional Teams</li>
                <li>• District Implementation</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-3 text-utu-black border-b border-utu-red pb-2">Community Impact</h4>
              <ul className="space-y-2 text-utu-gray">
                <li>• Youth Ambassadors</li>
                <li>• Community Volunteers</li>
                <li>• Local Partners</li>
                <li>• Beneficiary Networks</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Work With Us Section */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-12">
          <h3 className="text-xl font-bold mb-4 text-center text-utu-black">Work With Us</h3>
          <p className="text-utu-gray text-center mb-6 max-w-2xl mx-auto">
            We're always looking for passionate individuals to join our team, whether as staff, volunteers, or
            board members. If you're committed to making a difference in African communities, we'd love to hear from you.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-utu-red hover:bg-red-700 text-white px-6 py-2 rounded-md transition-colors">
              View Open Positions
            </button>
            <button className="border border-utu-red text-utu-red hover:bg-utu-red hover:text-white px-6 py-2 rounded-md transition-colors">
              Volunteer With Us
            </button>
          </div>
        </div>

        {/* Closing Ubuntu Message */}
        <div className="text-center bg-gradient-to-r from-utu-red to-utu-green p-8 rounded-lg text-white">
          <Heart className="w-8 h-8 mx-auto mb-4 opacity-80" />
          <p className="text-lg italic leading-relaxed max-w-3xl mx-auto">
            "Every member of our team brings heart and hope to the Utu mission. Together, we are building a compassionate Africa — one village, one child, one act at a time."
          </p>
          <div className="w-20 h-1 bg-white mx-auto mt-4 opacity-60"></div>
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
