import React from 'react';
import { Utensils, Github, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center">
              <Utensils className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">RecipeFinder</span>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Discover delicious recipes and plan your meals with ease.
              Our platform helps you find recipes based on your preferences and dietary needs.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Github</span>
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Navigation</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary-600">Home</Link>
              </li>
              <li>
                <Link to="/recipes" className="text-gray-600 hover:text-primary-600">Recipes</Link>
              </li>
              <li>
                <Link to="/meal-planner" className="text-gray-600 hover:text-primary-600">Meal Planner</Link>
              </li>
              <li>
                <Link to="/favorites" className="text-gray-600 hover:text-primary-600">Favorites</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-600">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-600">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-600">Cookie Policy</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} RecipeFinder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;