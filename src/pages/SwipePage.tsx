import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, Filter } from 'lucide-react';
import RecipeSwipeStack from '../components/RecipeSwipeStack';
import { useRecipes } from '../context/RecipeContext';
import { Recipe } from '../types';

const SwipePage: React.FC = () => {
  const navigate = useNavigate();
  const { recipes, addToFavorites } = useRecipes();
  const [swipeRecipes, setSwipeRecipes] = useState<Recipe[]>([]);
  const [likedRecipes, setLikedRecipes] = useState<Recipe[]>([]);
  const [superLikedRecipes, setSuperLikedRecipes] = useState<Recipe[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    maxCookTime: 60,
    cuisine: '',
    difficulty: '',
    mealType: '',
  });

  useEffect(() => {
    // Filter and shuffle recipes for swiping
    let filtered = [...recipes];

    if (filters.maxCookTime < 60) {
      filtered = filtered.filter(recipe => recipe.cookTime <= filters.maxCookTime);
    }
    if (filters.cuisine) {
      filtered = filtered.filter(recipe => recipe.cuisine === filters.cuisine);
    }
    if (filters.difficulty) {
      filtered = filtered.filter(recipe => recipe.difficulty === filters.difficulty);
    }
    if (filters.mealType) {
      filtered = filtered.filter(recipe => recipe.mealType === filters.mealType);
    }

    // Shuffle the filtered recipes
    const shuffled = filtered.sort(() => Math.random() - 0.5);
    setSwipeRecipes(shuffled.slice(0, 20)); // Limit to 20 recipes per session
  }, [recipes, filters]);

  const handleLike = (recipe: Recipe) => {
    setLikedRecipes(prev => [...prev, recipe]);
    addToFavorites(recipe);
  };

  const handleDislike = (recipe: Recipe) => {
    // Just track for analytics, no action needed
    console.log('Disliked recipe:', recipe.title);
  };

  const handleSuperLike = (recipe: Recipe) => {
    setSuperLikedRecipes(prev => [...prev, recipe]);
    setLikedRecipes(prev => [...prev, recipe]);
    addToFavorites(recipe);
  };

  const handleFinish = () => {
    navigate('/favorites');
  };

  const resetFilters = () => {
    setFilters({
      maxCookTime: 60,
      cuisine: '',
      difficulty: '',
      mealType: '',
    });
  };

  const cuisines = [...new Set(recipes.map(r => r.cuisine))];
  const difficulties = ['Easy', 'Medium', 'Hard'];
  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            
            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-900">Recipe Discovery</h1>
              <p className="text-sm text-gray-500">Swipe to find your next meal</p>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Filter className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="max-w-lg mx-auto space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Filters</h3>
              <button
                onClick={resetFilters}
                className="text-sm text-primary-600 hover:text-primary-800"
              >
                Reset
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Cook Time: {filters.maxCookTime} minutes
              </label>
              <input
                type="range"
                min="15"
                max="120"
                step="15"
                value={filters.maxCookTime}
                onChange={(e) => setFilters(prev => ({ ...prev, maxCookTime: parseInt(e.target.value) }))}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cuisine
                </label>
                <select
                  value={filters.cuisine}
                  onChange={(e) => setFilters(prev => ({ ...prev, cuisine: e.target.value }))}
                  className="w-full text-sm border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="">Any</option>
                  {cuisines.map(cuisine => (
                    <option key={cuisine} value={cuisine}>{cuisine}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty
                </label>
                <select
                  value={filters.difficulty}
                  onChange={(e) => setFilters(prev => ({ ...prev, difficulty: e.target.value }))}
                  className="w-full text-sm border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="">Any</option>
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>{difficulty}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meal Type
              </label>
              <select
                value={filters.mealType}
                onChange={(e) => setFilters(prev => ({ ...prev, mealType: e.target.value }))}
                className="w-full text-sm border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Any</option>
                {mealTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="max-w-lg mx-auto px-4 py-8">
        {swipeRecipes.length > 0 ? (
          <RecipeSwipeStack
            recipes={swipeRecipes}
            onLike={handleLike}
            onDislike={handleDislike}
            onSuperLike={handleSuperLike}
            onFinish={handleFinish}
          />
        ) : (
          <div className="text-center py-16">
            <div className="bg-gray-100 p-6 rounded-full inline-block mb-4">
              <Settings className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              No recipes match your filters
            </h2>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters to see more recipes
            </p>
            <button
              onClick={resetFilters}
              className="btn-primary"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Stats */}
      {(likedRecipes.length > 0 || superLikedRecipes.length > 0) && (
        <div className="fixed bottom-4 left-4 right-4 max-w-lg mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-gray-200">
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-success-500 rounded-full"></div>
                <span className="font-medium">{likedRecipes.length} Liked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                <span className="font-medium">{superLikedRecipes.length} Super Liked</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SwipePage;