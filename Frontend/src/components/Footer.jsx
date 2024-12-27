import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#A594F9] text-[#4A0E5C] md:ml-64">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">EduHire</h3>
            <p className="text-sm">Connecting Educators and Institutions</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-[#4A0E5C] hover:text-[#A594F9]">
              About
            </a>
            <a href="#" className="text-[#4A0E5C] hover:text-[#A594F9]">
              Contact
            </a>
            <a href="#" className="text-[#4A0E5C] hover:text-[#A594F9]">
              Privacy Policy
            </a>
          </div>
        </div>
        <div className="mt-4 text-center text-sm">
          © {new Date().getFullYear()} EduHire. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;