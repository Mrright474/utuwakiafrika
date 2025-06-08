
import React from 'react';

const OrganizationalOverview = () => {
  return (
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
  );
};

export default OrganizationalOverview;
