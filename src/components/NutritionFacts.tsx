import React from 'react';
import { Recipe } from '../types';

interface NutritionFactsProps {
  recipe: Recipe;
  className?: string;
}

const NutritionFacts: React.FC<NutritionFactsProps> = ({ recipe, className }) => {
  const nutrients = [
    { name: 'Calories', value: `${recipe.calories} kcal`, color: 'bg-accent-500' },
    { name: 'Protein', value: `${recipe.nutritionalInfo.protein}g`, color: 'bg-success-500' },
    { name: 'Carbs', value: `${recipe.nutritionalInfo.carbs}g`, color: 'bg-primary-500' },
    { name: 'Fat', value: `${recipe.nutritionalInfo.fat}g`, color: 'bg-warning-500' },
    { name: 'Fiber', value: `${recipe.nutritionalInfo.fiber}g`, color: 'bg-secondary-500' },
  ];

  const totalMacros = recipe.nutritionalInfo.protein + recipe.nutritionalInfo.carbs + recipe.nutritionalInfo.fat;
  
  const calculatePercentage = (value: number) => {
    return (value / totalMacros) * 100;
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-5 ${className}`}>
      <h3 className="text-lg font-bold mb-4">Nutrition Facts</h3>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xl font-bold">{recipe.calories}</span>
          <span className="text-gray-500">Calories per serving</span>
        </div>
        
        <div className="h-2 w-full flex rounded-full overflow-hidden">
          <div 
            className="bg-success-500" 
            style={{ width: `${calculatePercentage(recipe.nutritionalInfo.protein)}%` }}
          ></div>
          <div 
            className="bg-primary-500" 
            style={{ width: `${calculatePercentage(recipe.nutritionalInfo.carbs)}%` }}
          ></div>
          <div 
            className="bg-warning-500" 
            style={{ width: `${calculatePercentage(recipe.nutritionalInfo.fat)}%` }}
          ></div>
        </div>
        
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="flex items-center">
            <span className="w-3 h-3 bg-success-500 rounded-full mr-1"></span>
            Protein
          </span>
          <span className="flex items-center">
            <span className="w-3 h-3 bg-primary-500 rounded-full mr-1"></span>
            Carbs
          </span>
          <span className="flex items-center">
            <span className="w-3 h-3 bg-warning-500 rounded-full mr-1"></span>
            Fat
          </span>
        </div>
        
        <div className="space-y-3 mt-4">
          {nutrients.map((nutrient, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-2 h-6 ${nutrient.color} rounded-sm mr-3`}></div>
                <span className="text-gray-700">{nutrient.name}</span>
              </div>
              <span className="font-medium">{nutrient.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NutritionFacts;