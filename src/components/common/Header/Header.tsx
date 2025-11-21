// components/common/Header/Header.tsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { LogOut, Package, Layers, Tags, Home } from 'lucide-react';

const Header: React.FC = () => {
  const { user,handleLogout } = useAuth();
  const navigate = useNavigate()

  const navLinks = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/category', label: 'Categories', icon: Layers },
    { path: '/sub-category', label: 'Sub Categories', icon: Tags },
    { path: '/product', label: 'Products', icon: Package },
  ];

  const logout = async() => {
    try {
     const response= await handleLogout()
     if(response){
       navigate('/login', { replace: true })
     }
    } catch (error) {
      console.log("Logout error",error);
      
    }
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo/Brand */}
          <div className="flex-shrink-0 flex items-center">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Package className="h-6 w-6 text-white" />
            </div>
            <span className="ml-3 text-xl font-bold text-gray-900">
              Admin Panel
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => {
              const Icon = link.icon;

              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${isActive
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {link.label}
                </NavLink>
              );
            })}
          </nav>

          {/* User Info & Logout */}
          <div className="flex items-center space-x-4">
            {user && (
              <>
                <span className="text-sm text-gray-700 hidden sm:block">
                  Welcome, <span className="font-medium">{user?.firstname}</span>
                </span>
                <button
                  onClick={logout}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-gray-50 border-t">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            // const isActive = location.pathname === link.path;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`
                }
              >
                <Icon className="h-4 w-4 mr-3" />
                {link.label}
              </NavLink>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Header;