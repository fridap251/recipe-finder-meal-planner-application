import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Utensils, Search, Clock, Calendar, Sparkles } from 'lucide-react';
import ImageUpload from '../components/ImageUpload';
import apiClient from '../lib/api';

const HomePage: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const handleImageUpload = async (file: File) => {
    setUploadedImage(file);
    setAnalyzing(true);

    try {
      const response = await apiClient.getRecommendations('', file);
      
      if (response.error) {
        throw new Error(response.error);
      }

      if (response.data?.recipes) {
        setRecommendations(response.data.recipes);
      }
    } catch (error) {
      console.error('Error analyzing image:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setAnalyzing(true);
    try {
      const response = await apiClient.getRecommendations(searchQuery);
      
      if (response.error) {
        throw new Error(response.error);
      }

      if (response.data?.recipes) {
        setRecommendations(response.data.recipes);
      }
    } catch (error) {
      console.error('Error searching recipes:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-primary-50 to-white">
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-10 pb-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            AI-Powered <span className="text-primary-600">Recipe Discovery</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Upload food images or describe what you want to cook. Our AI will find perfect recipes tailored to your taste.
          </p>
          
          <form 
            onSubmit={handleSearch}
            className="max-w-2xl mx-auto relative group"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Describe what you want to cook or ingredients you have..."
              className="input py-3 pl-12 pr-4 w-full text-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-500" />
            <button 
              type="submit" 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 btn-primary py-1.5"
              disabled={analyzing}
            >
              {analyzing ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Search'
              )}
            </button>
          </form>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8 flex flex-col items-center text-center transform hover:-translate-y-1 transition-transform duration-300">
            <div className="bg-primary-100 p-4 rounded-full mb-6">
              <Sparkles className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">AI Recipe Recommendations</h2>
            <p className="text-gray-600 mb-6">
              Get personalized recipe suggestions based on your preferences, dietary restrictions, and available ingredients.
            </p>
            <button 
              onClick={() => navigate('/recipes')}
              className="btn-primary px-6 py-2.5"
            >
              Explore AI Recipes
            </button>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8 flex flex-col items-center text-center transform hover:-translate-y-1 transition-transform duration-300">
            <div className="bg-secondary-100 p-4 rounded-full mb-6">
              <Calendar className="w-8 h-8 text-secondary-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Smart Meal Planning</h2>
            <p className="text-gray-600 mb-6">
              Generate personalized meal plans with AI that considers your calorie goals and macro preferences.
            </p>
            <button 
              onClick={() => navigate('/meal-planner')}
              className="btn-secondary px-6 py-2.5"
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
                AI-Powered Image Recognition
              </h2>
              <p className="text-gray-700 mb-6">
                Upload a photo of food or ingredients, and our AI will identify them and suggest similar recipes. Perfect for recreating dishes or using up ingredients.
              </p>
              <div className="flex items-center text-gray-700 mb-4">
                <Clock className="w-5 h-5 mr-2 text-secondary-500" />
                <span>Instant ingredient recognition</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Search className="w-5 h-5 mr-2 text-secondary-500" />
                <span>Smart recipe matching with similarity scores</span>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload a Food Image</h3>
                <ImageUpload onImageUpload={handleImageUpload} />
                {analyzing && (
                  <div className="mt-4 text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary-500 border-t-transparent"></div>
                    <p className="mt-2 text-primary-600">AI is analyzing your image...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {recommendations.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">AI Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.slice(0, 6).map((recipe, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{recipe.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Similarity: {(recipe.similarity * 100).toFixed(1)}%
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{recipe.nutritional_info?.calories || 'N/A'} cal</span>
                    <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
                      AI Match
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;