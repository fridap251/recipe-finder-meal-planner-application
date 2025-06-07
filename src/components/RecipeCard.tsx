import React from 'react';
import { Heart, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Recipe } from '../types';
import { useRecipes } from '../context/RecipeContext';
import { cn } from '../lib/utils';

interface RecipeCardProps {
  recipe: Recipe;
  className?: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, className }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useRecipes();
  const favorite = isFavorite(recipe.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (favorite) {
      removeFromFavorites(recipe.id);
    } else {
      addToFavorites(recipe);
    }
  };

  return (
    <div className={cn("recipe-card group", className)}>
      <Link to={`/recipes/${recipe.id}`}>
        <div className="relative h-48 overflow-hidden">
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2">
            <button 
              onClick={handleFavoriteClick}
              className="p-2 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-colors"
            >
              <Heart 
                className={cn(
                  "w-5 h-5 transition-colors",
                  favorite ? "fill-error-500 text-error-500" : "text-gray-600"
                )} 
              />
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-medium px-2 py-1 bg-primary-500 text-white rounded-full">
                {recipe.mealType}
              </span>
              <span className="text-xs font-medium px-2 py-1 bg-white/90 text-gray-800 rounded-full">
                {recipe.cuisine}
              </span>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{recipe.title}</h3>
          
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {recipe.cookTime + recipe.prepTime} mins
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {recipe.servings} servings
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {recipe.dietaryRestrictions.map((restriction, index) => (
              <span 
                key={index}
                className="text-xs px-2 py-1 bg-secondary-100 text-secondary-800 rounded-full"
              >
                {restriction}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-800">
              {recipe.calories} calories
            </span>
            <span className={cn(
              "text-xs font-medium px-2 py-1 rounded-full",
              recipe.difficulty === 'Easy' ? "bg-success-100 text-success-800" :
              recipe.difficulty === 'Medium' ? "bg-warning-100 text-warning-800" :
              "bg-error-100 text-error-800"
            )}>
              {recipe.difficulty}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;