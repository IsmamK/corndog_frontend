import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-400 text-white py-4">
      <div className="container mx-auto text-center">
        {/* FoodPark Logo */}
        <img src="/thefoodpark.jpg" alt="FoodPark" className="h-8 w-auto mx-auto" />
        <p className="text-sm mt-2">A child concern of The Food Park</p>
        
        {/* Social Media Links */}
        {/* <div className="flex justify-center mt-4">
          <a href="#" className="text-white hover:text-gray-300 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 9V7a4 4 0 00-4-4H8a4 4 0 00-4 4v2m8 12v2m-4 0h4m-4 0a8 8 0 11-4-6.928" />
            </svg>
          </a>
          <a href="#" className="text-white hover:text-gray-300 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v9l3-3m6 9a9 9 0 11-18 0 9 9 0 0118 0zm-6 2a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </a>
          <a href="#" className="text-white hover:text-gray-300 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-6-4v8m-6 4H3" />
            </svg>
          </a>
        </div> */}
        
        {/* Copyright Text */}
        <p className="text-xs mt-4">© 2024 The Corndog Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
