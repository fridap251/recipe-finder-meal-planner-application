import React from 'react';
import { useRecipes } from '../context/RecipeContext';
import RecipeGrid from '../components/RecipeGrid';
import { Heart } from 'lucide-react';

const FavoritesPage: React.FC = () => {
  const { favorites } = useRecipes();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Favorite Recipes</h1>
        <p className="text-gray-600">
          Your saved recipes collection for easy access.
        </p>
      </div>
      
      {favorites.length > 0 ? (
        <RecipeGrid recipes={favorites} />
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="bg-error-100 p-4 rounded-full inline-block mb-6">
            <Heart className="w-8 h-8 text-error-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Favorite Recipes Yet</h3>
          <p className="text-gray-600 mb-6">
            Browse recipes and click the heart icon to add them to your favorites.
          </p>
          <button
            onClick={() => window.location.href = '/recipes'}
            className="btn-primary"
          >
            Browse Recipes
          </button>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;