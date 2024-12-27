import React, { useState } from "react";

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="bg-white shadow-md md:ml-64">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold text-[#4A0E5C]">EduHire</h2>
          </div>
          <div className="flex items-center">
            <button className="p-2 rounded-full text-[#4A0E5C] hover:bg-[#E5D9F2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A594F9] mr-4">
              <span className="sr-only">View notifications</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 text-[#4A0E5C] hover:text-[#A594F9] focus:outline-none"
              >
                <img
                  className="h-8 w-8 rounded-full"
                  src="logo192.png"
                  alt="User avatar"
                />
                <span className="hidden md:block font-medium">Prajakta Mahajan</span>
               
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;