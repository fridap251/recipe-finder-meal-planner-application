import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Clock, Heart, Share2, ChevronLeft, Users, 
  ChefHat, Star, Plus, Timer 
} from 'lucide-react';
import { useRecipes } from '../context/RecipeContext';
import NutritionFacts from '../components/NutritionFacts';
import { cn } from '../lib/utils';

const RecipeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getRecipeById, addToFavorites, removeFromFavorites, isFavorite, createMealPlan, addRecipeToMealPlan, mealPlans, setCurrentMealPlan } = useRecipes();
  const [recipe, setRecipe] = useState(getRecipeById(id || ''));
  const [selectedTab, setSelectedTab] = useState<'ingredients' | 'instructions'>('ingredients');
  const [showMealPlanOptions, setShowMealPlanOptions] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMealType, setSelectedMealType] = useState('');
  
  useEffect(() => {
    if (!recipe) {
      navigate('/recipes');
    }
  }, [recipe, navigate]);
  
  if (!recipe) {
    return null;
  }
  
  const favorite = isFavorite(recipe.id);
  
  const handleFavoriteClick = () => {
    if (favorite) {
      removeFromFavorites(recipe.id);
    } else {
      addToFavorites(recipe);
    }
  };
  
  const handleAddToMealPlan = () => {
    setShowMealPlanOptions(true);
  };
  
  const handleMealPlanSelect = (day: string, mealType: string) => {
    if (mealPlans.length === 0) {
      const newPlan = createMealPlan('My Meal Plan');
      setCurrentMealPlan(newPlan);
      addRecipeToMealPlan(recipe, day, mealType);
    } else {
      addRecipeToMealPlan(recipe, day, mealType);
    }
    setShowMealPlanOptions(false);
    navigate('/meal-planner');
  };
  
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const mealTypes = ['Breakfast', 'Lunch', 'Dinner'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-primary-600 mb-6 transition-colors"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        Back to recipes
      </button>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="relative h-64 md:h-96 bg-gray-100">
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-xs font-medium px-2 py-1 bg-primary-500 text-white rounded-full">
                {recipe.mealType}
              </span>
              <span className="text-xs font-medium px-2 py-1 bg-secondary-500 text-white rounded-full">
                {recipe.cuisine}
              </span>
              {recipe.dietaryRestrictions.map((restriction, index) => (
                <span key={index} className="text-xs font-medium px-2 py-1 bg-white/90 text-gray-800 rounded-full">
                  {restriction}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">{recipe.title}</h1>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex flex-wrap gap-6 border-b border-gray-200 pb-6 mb-6">
            <div className="flex items-center">
              <Timer className="w-5 h-5 text-primary-500 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Prep Time</p>
                <p className="font-medium">{recipe.prepTime} mins</p>
              </div>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-primary-500 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Cook Time</p>
                <p className="font-medium">{recipe.cookTime} mins</p>
              </div>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 text-primary-500 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Servings</p>
                <p className="font-medium">{recipe.servings}</p>
              </div>
            </div>
            <div className="flex items-center">
              <ChefHat className="w-5 h-5 text-primary-500 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Difficulty</p>
                <p className="font-medium">{recipe.difficulty}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Star className="w-5 h-5 text-primary-500 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Calories</p>
                <p className="font-medium">{recipe.calories} kcal</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap md:flex-nowrap gap-8">
            <div className="w-full md:w-2/3">
              <div className="mb-6">
                <div className="flex border-b border-gray-200">
                  <button
                    className={cn(
                      "flex-1 py-3 font-medium text-sm border-b-2 focus:outline-none",
                      selectedTab === 'ingredients' 
                        ? "border-primary-500 text-primary-600" 
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    )}
                    onClick={() => setSelectedTab('ingredients')}
                  >
                    Ingredients
                  </button>
                  <button
                    className={cn(
                      "flex-1 py-3 font-medium text-sm border-b-2 focus:outline-none",
                      selectedTab === 'instructions' 
                        ? "border-primary-500 text-primary-600" 
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    )}
                    onClick={() => setSelectedTab('instructions')}
                  >
                    Instructions
                  </button>
                </div>
                
                <div className="py-6">
                  {selectedTab === 'ingredients' ? (
                    <ul className="space-y-3">
                      {recipe.ingredients.map((ingredient, index) => (
                        <li key={index} className="flex items-start">
                          <span className="inline-block w-2 h-2 rounded-full bg-primary-500 mt-2 mr-3"></span>
                          <span>{ingredient}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="prose max-w-none">
                      {recipe.instructions.split('. ').map((step, index) => (
                        <div key={index} className="mb-4">
                          <div className="flex items-start">
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-800 font-medium text-sm mr-3">
                              {index + 1}
                            </span>
                            <p>{step}.</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/3 space-y-6">
              <NutritionFacts recipe={recipe} />
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <h3 className="text-lg font-bold mb-4">Recipe Actions</h3>
                <div className="space-y-3">
                  <button 
                    onClick={handleFavoriteClick}
                    className={cn(
                      "btn w-full justify-center",
                      favorite 
                        ? "bg-error-50 text-error-600 border border-error-200 hover:bg-error-100" 
                        : "btn-outline"
                    )}
                  >
                    <Heart className={cn("w-5 h-5 mr-2", favorite ? "fill-error-500" : "")} />
                    {favorite ? 'Remove from Favorites' : 'Add to Favorites'}
                  </button>
                  
                  <button className="btn btn-outline w-full justify-center">
                    <Share2 className="w-5 h-5 mr-2" />
                    Share Recipe
                  </button>
                  
                  <div className="relative">
                    <button 
                      onClick={handleAddToMealPlan}
                      className="btn btn-primary w-full justify-center"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Add to Meal Plan
                    </button>
                    
                    {showMealPlanOptions && (
                      <div className="absolute z-10 mt-2 w-full bg-white rounded-md shadow-lg border border-gray-200 py-2">
                        {selectedDay ? (
                          <>
                            <button 
                              onClick={() => setSelectedDay('')}
                              className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 flex items-center w-full"
                            >
                              <ChevronLeft className="w-4 h-4 mr-1" />
                              Back
                            </button>
                            <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">
                              Select Meal Type
                            </div>
                            {mealTypes.map(mealType => (
                              <button 
                                key={mealType}
                                onClick={() => handleMealPlanSelect(selectedDay, mealType)}
                                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary-600 w-full text-left"
                              >
                                {mealType}
                              </button>
                            ))}
                          </>
                        ) : (
                          <>
                            <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">
                              Select Day
                            </div>
                            {daysOfWeek.map(day => (
                              <button 
                                key={day}
                                onClick={() => setSelectedDay(day)}
                                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary-600 w-full text-left"
                              >
                                {day}
                              </button>
                            ))}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;