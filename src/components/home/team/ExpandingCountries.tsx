
import React from 'react';
import { Globe } from 'lucide-react';

const ExpandingCountries = () => {
  const countries = [
    "Nigeria", "Ghana", "Senegal", "Mali", "Burkina Faso", "Niger",
    "Chad", "Cameroon", "Central African Republic", "Democratic Republic of Congo",
    "Angola", "Zambia", "Malawi", "Mozambique", "Zimbabwe", "Botswana",
    "Namibia", "South Africa", "Lesotho", "Eswatini", "Madagascar",
    "Mauritius", "Seychelles", "Comoros", "Djibouti", "Eritrea",
    "Ethiopia", "Somalia", "South Sudan", "Sudan", "Egypt", "Libya",
    "Tunisia", "Algeria", "Morocco", "Mauritania", "Guinea", "Sierra Leone",
    "Liberia", "Côte d'Ivoire", "Togo", "Benin", "Gabon", "Equatorial Guinea",
    "São Tomé and Príncipe", "Cape Verde", "Gambia", "Guinea-Bissau"
  ];

  return (
    <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
      <h4 className="text-xl font-bold mb-4 text-center text-utu-black flex items-center justify-center">
        <Globe className="w-5 h-5 mr-2 text-utu-red" />
        Expanding Across Africa
      </h4>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center">
        {countries.map((country) => (
          <div key={country} className="p-2 bg-utu-light-gray rounded text-sm">
            <span className="font-medium text-utu-black">{country}</span>
            <br />
            <span className="text-xs text-utu-red">Coming Soon</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpandingCountries;
