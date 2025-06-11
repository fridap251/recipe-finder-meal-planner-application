import React from 'react';
import { useAuth } from '../context/AuthContext';
import UserProfile from '../components/UserProfile';
import ProtectedRoute from '../components/ProtectedRoute';
import { useRecipes } from '../context/RecipeContext';
import RecipeGrid from '../components/RecipeGrid';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { favorites } = useRecipes();

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">
            Manage your account and view your recipe collection.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <UserProfile />
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">My Favorite Recipes</h2>
              {favorites.length > 0 ? (
                <RecipeGrid recipes={favorites.slice(0, 6)} />
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No favorite recipes yet.</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Start exploring recipes and add them to your favorites!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ProfilePage;