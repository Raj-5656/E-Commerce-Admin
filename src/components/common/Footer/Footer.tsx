// components/common/Footer/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <div className="text-sm text-gray-600">
            © {currentYear} Admin Panel. All rights reserved.
          </div>
          
          {/* Version/Links */}
          <div className="mt-2 md:mt-0 text-sm text-gray-500">
            v1.0.0 • Built with React & Node.js
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;