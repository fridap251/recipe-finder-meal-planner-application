import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Utensils, Search, Clock, Calendar, Sparkles, Zap, Heart } from 'lucide-react';
import { useRecipes } from '../context/RecipeContext';
import RecipeGrid from '../components/RecipeGrid';
import ImageUpload from '../components/ImageUpload';

const HomePage: React.FC = () => {
  const { recipes, setSearchFilters, addToFavorites, getRecommendations } = useRecipes();
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const navigate = useNavigate();
  
  const handleImageUpload = async (file: File) => {
    setUploadedImage(file);
    setAnalyzing(true);

    try {
      // Get recommendations based on the uploaded image
      await getRecommendations('food image analysis', file);
      
      // Navigate to swipe mode with image-based recommendations
      navigate('/swipe');
    } catch (error) {
      console.error('Error analyzing image:', error);
      // Still navigate to swipe mode even if analysis fails
      navigate('/swipe');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get('searchQuery') as string;
    
    setSearchFilters({ query });
    navigate('/recipes');
  };

  const featuredRecipes = recipes.slice(0, 3);

  return (
    <div className="bg-gradient-to-b from-primary-50 to-white">
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-10 pb-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Discover <span className="text-primary-600">Delicious</span> Recipes for Every Taste
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Find and plan perfect meals based on your preferences, dietary needs, and what's in your kitchen.
          </p>
          
          <form 
            onSubmit={handleSearch}
            className="max-w-2xl mx-auto relative group"
          >
            <input
              type="text"
              name="searchQuery"
              placeholder="Search for recipes, ingredients, or cuisines..."
              className="input py-3 pl-12 pr-4 w-full text-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-500" />
            <button 
              type="submit" 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 btn-primary py-1.5"
            >
              Search
            </button>
          </form>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center transform hover:-translate-y-1 transition-transform duration-300">
            <div className="bg-primary-100 p-4 rounded-full mb-6">
              <Utensils className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Browse Recipes</h2>
            <p className="text-gray-600 mb-6 text-sm">
              Explore our collection of recipes with advanced filtering and search capabilities.
            </p>
            <button 
              onClick={() => navigate('/recipes')}
              className="btn-primary px-6 py-2"
            >
              Explore Recipes
            </button>
          </div>

          <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl shadow-md p-6 flex flex-col items-center text-center transform hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden">
            <div className="absolute top-2 right-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs px-2 py-1 rounded-full font-bold">
              NEW
            </div>
            <div className="bg-gradient-to-r from-pink-200 to-purple-200 p-4 rounded-full mb-6">
              <Zap className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Swipe Mode</h2>
            <p className="text-gray-600 mb-6 text-sm">
              Discover recipes like never before! Swipe right to like, left to pass, up to super like.
            </p>
            <button 
              onClick={() => navigate('/swipe')}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-md font-medium hover:from-pink-600 hover:to-purple-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <Heart className="w-4 h-4 inline mr-2" />
              Start Swiping
            </button>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center transform hover:-translate-y-1 transition-transform duration-300">
            <div className="bg-secondary-100 p-4 rounded-full mb-6">
              <Calendar className="w-8 h-8 text-secondary-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Meal Planning</h2>
            <p className="text-gray-600 mb-6 text-sm">
              Plan your meals for the week ahead with personalized recommendations.
            </p>
            <button 
              onClick={() => navigate('/meal-planner')}
              className="btn-secondary px-6 py-2"
            >
              Plan Your Meals
            </button>
          </div>
        </div>
      </section>
      
      <section className="bg-gradient-to-r from-secondary-50 to-secondary-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Find Recipes from Your Food Photos
              </h2>
              <p className="text-gray-700 mb-6">
                Take a photo of your meal or ingredients, and we'll identify similar recipes. Perfect for recreating restaurant dishes or using up ingredients.
              </p>
              <div className="flex items-center text-gray-700 mb-4">
                <Clock className="w-5 h-5 mr-2 text-secondary-500" />
                <span>Save time with instant recipe matches</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Search className="w-5 h-5 mr-2 text-secondary-500" />
                <span>Discover new recipes inspired by your favorite meals</span>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload a Food Image</h3>
                <ImageUpload onImageUpload={handleImageUpload} />
                {analyzing && (
                  <div className="mt-4 text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary-500 border-t-transparent"></div>
                    <p className="mt-2 text-primary-600">Analyzing your image...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Featured Recipes</h2>
          <button 
            onClick={() => navigate('/recipes')}
            className="text-primary-600 hover:text-primary-800 font-medium flex items-center"
          >
            View All
            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        <RecipeGrid recipes={featuredRecipes} />
      </section>
    </div>
  );
};

export default HomePage;