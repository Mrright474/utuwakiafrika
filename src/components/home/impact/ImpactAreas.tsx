
import React from 'react';

const ProgressBar = ({ label, percentage }: { label: string; percentage: number }) => (
  <div>
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium text-utu-black">{label}</span>
      <span className="text-sm font-medium text-utu-black">{percentage}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div className="bg-utu-red h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
    </div>
  </div>
);

const ImpactAreaCard = ({ 
  title, 
  description, 
  progressItems 
}: { 
  title: string; 
  description: string; 
  progressItems: Array<{ label: string; percentage: number }>;
}) => (
  <div className="bg-white p-8 rounded-lg shadow-md">
    <h4 className="text-xl font-bold mb-3 text-utu-black">{title}</h4>
    <p className="text-utu-gray mb-4">{description}</p>
    <div className="bg-utu-light-gray rounded-lg p-4">
      {progressItems.map((item, index) => (
        <div key={index} className={index > 0 ? "mt-3" : ""}>
          <ProgressBar label={item.label} percentage={item.percentage} />
        </div>
      ))}
    </div>
  </div>
);

const ImpactAreas = () => {
  const impactAreas = [
    {
      title: "Education",
      description: "We've built 15 schools, provided over 2,000 scholarships, and distributed learning materials to more than 5,000 students across East Africa. Our teacher training programs have equipped 300+ educators with improved teaching methodologies.",
      progressItems: [
        { label: "School Construction", percentage: 60 },
        { label: "Scholarship Programs", percentage: 75 }
      ]
    },
    {
      title: "Healthcare",
      description: "Our mobile clinics have served over 7,500 patients in remote areas. We've conducted health education campaigns reaching 12,000+ community members, and provided essential medical supplies to 22 rural health centers across Uganda, Kenya, and Tanzania.",
      progressItems: [
        { label: "Mobile Clinics", percentage: 85 },
        { label: "Medication Supply", percentage: 70 }
      ]
    },
    {
      title: "Clean Water",
      description: "We've installed 75 water wells and 30 rainwater harvesting systems, providing clean water to over 15,000 people. Our water purification initiatives have reduced waterborne diseases by 65% in the communities we serve.",
      progressItems: [
        { label: "Well Construction", percentage: 80 },
        { label: "Water Treatment", percentage: 65 }
      ]
    },
    {
      title: "Economic Empowerment",
      description: "Our microfinance programs have supported 500+ entrepreneurs with small business loans. We've conducted vocational training for 1,200 youth and women, with 78% of graduates securing employment or starting their own businesses.",
      progressItems: [
        { label: "Entrepreneurship", percentage: 70 },
        { label: "Skills Development", percentage: 85 }
      ]
    }
  ];

  console.log("ImpactAreas component rendering");

  return (
    <div className="mb-16">
      <h3 className="text-xl sm:text-2xl font-bold mb-8 text-center font-heading text-utu-black">Areas of Impact</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {impactAreas.map((area, index) => (
          <ImpactAreaCard 
            key={index}
            title={area.title}
            description={area.description}
            progressItems={area.progressItems}
          />
        ))}
      </div>
    </div>
  );
};

export default ImpactAreas;
