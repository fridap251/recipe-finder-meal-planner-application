import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Utensils, Calendar, Heart, Search, User } from 'lucide-react';
import { cn } from '../lib/utils';
import AuthButton from './AuthButton';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: <Utensils className="w-5 h-5" /> },
    { name: 'Recipes', path: '/recipes', icon: <Search className="w-5 h-5" /> },
    { name: 'Meal Planner', path: '/meal-planner', icon: <Calendar className="w-5 h-5" /> },
    { name: 'Favorites', path: '/favorites', icon: <Heart className="w-5 h-5" /> },
    { name: 'Profile', path: '/profile', icon: <User className="w-5 h-5" /> },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Utensils className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">RecipeFinder</span>
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  location.pathname === link.path
                    ? "text-primary-700 bg-primary-50"
                    : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                )}
              >
                <span className="mr-2">{link.icon}</span>
                {link.name}
              </Link>
            ))}
            <div className="ml-4 pl-4 border-l border-gray-200">
              <AuthButton />
            </div>
          </div>
          
          <div className="flex md:hidden items-center space-x-2">
            <AuthButton />
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
            >
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200",
                location.pathname === link.path
                  ? "border-primary-500 text-primary-700 bg-primary-50"
                  : "border-transparent text-gray-600 hover:text-primary-700 hover:bg-gray-50 hover:border-primary-300"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <span className="mr-2">{link.icon}</span>
                {link.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;