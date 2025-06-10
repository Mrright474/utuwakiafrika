
import React from 'react';

const FooterCopyright = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="mt-10 pt-6 border-t border-gray-800 text-center text-gray-500 text-xs sm:text-sm">
      <p>&copy; {currentYear} Utu Wa Kiafrika Charity Network. All rights reserved.</p>
    </div>
  );
};

export default FooterCopyright;
