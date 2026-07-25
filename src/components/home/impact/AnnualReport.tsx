
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import reportCover from '@/assets/annual-report-cover.jpg';

const AnnualReport = () => {
  const handleDownloadReport = () => {
    // This would typically download a PDF file
    // For now, we'll show an alert since we don't have a real file
    alert('Annual Report download would be available here. Please contact us for the latest report.');
  };

  return (
    <div className="mb-16 bg-white p-8 rounded-lg shadow-md">
      <div className="md:flex items-center">
        <div className="md:w-1/3 mb-6 md:mb-0 md:pr-8">
          <img 
            src={reportCover}
            alt="Utu Wa Kiafrika 2024 Annual Report cover featuring smiling community members and children"
            loading="lazy"
            width={1024}
            height={1024}
            className="rounded-lg shadow-md w-full"
          />
        </div>
        <div className="md:w-2/3">
          <h3 className="text-xl font-bold mb-4 text-utu-black">2024 Annual Impact Report</h3>
          <p className="text-utu-gray mb-4">
            Our latest impact report details the progress we've made across our key focus areas,
            highlights successful initiatives, and outlines our strategic priorities for the coming year.
          </p>
          <ul className="list-disc pl-5 mb-4 text-utu-gray">
            <li>25% increase in educational support programs</li>
            <li>35% growth in healthcare services provided</li>
            <li>18 new water projects completed</li>
            <li>200+ new businesses supported through microfinance</li>
          </ul>
          <Button 
            onClick={handleDownloadReport}
            className="bg-utu-red hover:bg-red-700 text-white flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download Full Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnnualReport;
