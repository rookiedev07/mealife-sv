import React from 'react';

function Footer() {
  return (
    <footer className="text-gray-800 h-auto mt-32 p-4 w-full bg-gray-300">
      {/* Navigation Links */}
      <div className="flex flex-wrap justify-evenly md:justify-center gap-4 md:gap-8">
        <p className="cursor-pointer text-center md:text-left">Contact Us</p>
        <p className="cursor-pointer text-center md:text-left">FAQs</p>
        <p className="cursor-pointer text-center md:text-left">For Business</p>
        <p className="cursor-pointer text-center md:text-left">For Restaurant</p>
        <p className="cursor-pointer text-center md:text-left">Blog</p>
        <p className="cursor-pointer text-center md:text-left">Careers</p>
      </div>

      {/* Social Icons */}
      <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-6 mb-8 text-xl">
        <i className="fab fa-twitter text-gray-600 cursor-pointer hover:text-gray-900"></i>
        <i className="fab fa-facebook text-gray-600 cursor-pointer hover:text-gray-900"></i>
        <i className="fab fa-instagram text-gray-600 cursor-pointer hover:text-gray-900"></i>
        <i className="fab fa-linkedin text-gray-600 cursor-pointer hover:text-gray-900"></i>
      </div>

      {/* Footer Text */}
      <p className="text-center text-sm md:text-base">
        &copy; 2024, All Rights Reserved. MeaLife.
      </p>
    </footer>
  );
}

export default Footer;
