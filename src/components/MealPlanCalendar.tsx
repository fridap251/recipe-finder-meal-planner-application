import React from 'react';
import { Trash2 } from 'lucide-react';
import { useRecipes } from '../context/RecipeContext';
import { MealPlan, Recipe } from '../types';
import { Link } from 'react-router-dom';

interface MealPlanCalendarProps {
  mealPlan: MealPlan;
}

const MealPlanCalendar: React.FC<MealPlanCalendarProps> = ({ mealPlan }) => {
  const { removeRecipeFromMealPlan } = useRecipes();

  const mealTypes = ['breakfast', 'lunch', 'dinner'] as const;

  const handleRemove = (day: string, mealType: string) => {
    removeRecipeFromMealPlan(day, mealType);
  };
  
  const MealSlot: React.FC<{ 
    day: string; 
    mealType: string; 
    recipe?: Recipe;
  }> = ({ day, mealType, recipe }) => {
    if (!recipe) {
      return (
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-3 h-24 flex items-center justify-center">
          <p className="text-gray-400 text-sm">Add a {mealType}</p>
        </div>
      );
    }
    
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden h-24 flex flex-col">
        <div className="relative h-10 w-full">
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="w-full h-full object-cover"
          />
          <button 
            onClick={() => handleRemove(day, mealType)}
            className="absolute top-1 right-1 p-1 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-80 transition-colors"
            aria-label="Remove recipe"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
        <div className="p-2 flex-1 flex flex-col justify-between">
          <Link to={`/recipes/${recipe.id}`} className="hover:text-primary-600 transition-colors">
            <h4 className="text-xs font-medium line-clamp-2">{recipe.title}</h4>
          </Link>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-gray-500">{recipe.cookTime + recipe.prepTime} mins</span>
            <span className="text-xs text-gray-500">{recipe.calories} cal</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
      <div className="bg-primary-50 p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">{mealPlan.name}</h3>
        <p className="text-sm text-gray-600">Created on {new Date(mealPlan.createdAt).toLocaleDateString()}</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                Day
              </th>
              {mealTypes.map(mealType => (
                <th key={mealType} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {mealType}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mealPlan.days.map((day) => (
              <tr key={day.day} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{day.day}</div>
                </td>
                {mealTypes.map(mealType => (
                  <td key={mealType} className="px-4 py-4">
                    <MealSlot 
                      day={day.day} 
                      mealType={mealType} 
                      recipe={day[mealType as keyof typeof day] as Recipe | undefined} 
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MealPlanCalendar;