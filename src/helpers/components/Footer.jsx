import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white w-full border-t border-gray-200 px-4 sm:px-8 md:px-36 py-6 pb-10 md:pb-20">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 max-w-7xl mx-auto">
        <div className="text-xl md:text-2xl font-semibold text-gray-800 poppins-medium mb-4 md:mb-0">RIZO.</div>

        <div className="flex flex-wrap justify-center md:justify-end gap-x-4 md:gap-x-6 gap-y-2 text-xs text-gray-600">
          <a href="#" className="px-1">Support Center</a>
          <a href="#" className="px-1">Invoicing</a>
          <a href="#" className="px-1">Contract</a>
          <a href="#" className="px-1">Careers</a>
          <a href="#" className="px-1">Blog</a>
          <a href="#" className="px-1">FAQ,s</a>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-5 max-w-7xl mx-auto">
        Copyright © 2022 FASCO . All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;