import React from 'react';
import { useRecipes } from '../context/RecipeContext';
import SearchFilters from '../components/SearchFilters';
import RecipeGrid from '../components/RecipeGrid';

const RecipesPage: React.FC = () => {
  const { filteredRecipes, loading } = useRecipes();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Recipe Collection</h1>
        <p className="text-gray-600">
          Discover delicious recipes from around the world
        </p>
      </div>
      
      <SearchFilters />
      
      <RecipeGrid 
        recipes={filteredRecipes} 
        loading={loading}
        emptyMessage="No recipes found. Try adjusting your search filters."
      />
    </div>
  );
};

export default RecipesPage;