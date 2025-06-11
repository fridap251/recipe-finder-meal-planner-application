import React, { useState } from 'react';
import { Plus, FileText, Calendar } from 'lucide-react';
import { useRecipes } from '../context/RecipeContext';
import MealPlanCalendar from '../components/MealPlanCalendar';
import RecipeGrid from '../components/RecipeGrid';
import ProtectedRoute from '../components/ProtectedRoute';
import { cn } from '../lib/utils';

const MealPlannerPage: React.FC = () => {
  const { 
    recipes, 
    mealPlans, 
    createMealPlan, 
    currentMealPlan,
    setCurrentMealPlan 
  } = useRecipes();
  
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPlanName, setNewPlanName] = useState('');
  const [showRecipes, setShowRecipes] = useState(false);

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPlanName.trim()) {
      createMealPlan(newPlanName.trim());
      setNewPlanName('');
      setShowCreateForm(false);
    }
  };

  const handleSelectPlan = (planId: string) => {
    const plan = mealPlans.find(p => p.id === planId);
    if (plan) {
      setCurrentMealPlan(plan);
    }
  };

  const fallback = (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Meal Planner</h1>
        <p className="text-gray-600">
          Sign in to create and manage your meal plans.
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="bg-primary-100 p-4 rounded-full inline-block mb-6">
          <Calendar className="w-8 h-8 text-primary-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Sign In to Plan Your Meals</h3>
        <p className="text-gray-600 mb-6">
          Create an account to organize your weekly meal plans and shopping lists.
        </p>
      </div>
    </div>
  );

  return (
    <ProtectedRoute fallback={fallback}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Meal Planner</h1>
            <p className="text-gray-600">
              Plan your meals for the week and create shopping lists.
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowRecipes(!showRecipes)}
              className="btn-outline"
            >
              <FileText className="w-5 h-5 mr-2" />
              {showRecipes ? 'Hide Recipes' : 'Browse Recipes'}
            </button>
            
            <button
              onClick={() => setShowCreateForm(true)}
              className="btn-primary"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Meal Plan
            </button>
          </div>
        </div>
        
        {showCreateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-fade-in">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Meal Plan</h2>
              <form onSubmit={handleCreatePlan}>
                <div className="mb-4">
                  <label htmlFor="planName" className="block text-sm font-medium text-gray-700 mb-1">
                    Plan Name
                  </label>
                  <input
                    type="text"
                    id="planName"
                    value={newPlanName}
                    onChange={(e) => setNewPlanName(e.target.value)}
                    placeholder="e.g., Weekly Plan, Family Dinners"
                    className="input"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="btn-outline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    Create Plan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {mealPlans.length > 0 ? (
          <div className="space-y-8">
            {mealPlans.length > 1 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Your Meal Plans</h3>
                <div className="flex flex-wrap gap-3">
                  {mealPlans.map(plan => (
                    <button
                      key={plan.id}
                      onClick={() => handleSelectPlan(plan.id)}
                      className={cn(
                        "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                        currentMealPlan?.id === plan.id
                          ? "bg-primary-100 text-primary-800 border border-primary-300"
                          : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                      )}
                    >
                      {plan.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {currentMealPlan && (
              <MealPlanCalendar mealPlan={currentMealPlan} />
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="bg-primary-100 p-4 rounded-full inline-block mb-6">
              <Calendar className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Meal Plans Yet</h3>
            <p className="text-gray-600 mb-6">
              Create your first meal plan to start organizing your meals for the week.
            </p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="btn-primary"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Meal Plan
            </button>
          </div>
        )}
        
        {showRecipes && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Browse Recipes</h2>
              <p className="text-gray-600">
                Click on a recipe to add it to your meal plan
              </p>
            </div>
            <RecipeGrid recipes={recipes.slice(0, 8)} />
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default MealPlannerPage;