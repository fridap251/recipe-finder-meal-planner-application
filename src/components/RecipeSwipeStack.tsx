import React, { useState, useEffect } from 'react';
import { Heart, X, Star, RotateCcw, Info } from 'lucide-react';
import RecipeSwipeCard from './RecipeSwipeCard';
import { Recipe } from '../types';
import { cn } from '../lib/utils';

interface RecipeSwipeStackProps {
  recipes: Recipe[];
  onLike: (recipe: Recipe) => void;
  onDislike: (recipe: Recipe) => void;
  onSuperLike: (recipe: Recipe) => void;
  onFinish: () => void;
  className?: string;
}

const RecipeSwipeStack: React.FC<RecipeSwipeStackProps> = ({
  recipes,
  onLike,
  onDislike,
  onSuperLike,
  onFinish,
  className
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipedRecipes, setSwipedRecipes] = useState<{
    recipe: Recipe;
    action: 'like' | 'dislike' | 'superlike';
  }[]>([]);

  const currentRecipe = recipes[currentIndex];
  const hasMore = currentIndex < recipes.length;

  const handleSwipe = (action: 'like' | 'dislike' | 'superlike') => {
    if (!currentRecipe) return;

    setSwipedRecipes(prev => [...prev, { recipe: currentRecipe, action }]);

    switch (action) {
      case 'like':
        onLike(currentRecipe);
        break;
      case 'dislike':
        onDislike(currentRecipe);
        break;
      case 'superlike':
        onSuperLike(currentRecipe);
        break;
    }

    setCurrentIndex(prev => prev + 1);
  };

  const handleUndo = () => {
    if (swipedRecipes.length === 0) return;
    
    setSwipedRecipes(prev => prev.slice(0, -1));
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  useEffect(() => {
    if (!hasMore && currentIndex > 0) {
      onFinish();
    }
  }, [hasMore, currentIndex, onFinish]);

  if (!hasMore) {
    return (
      <div className={cn("flex flex-col items-center justify-center h-full text-center p-8", className)}>
        <div className="bg-primary-100 p-6 rounded-full mb-6">
          <Heart className="w-12 h-12 text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          That's all for now!
        </h2>
        <p className="text-gray-600 mb-6 max-w-md">
          You've swiped through all available recipes. Check out your liked recipes or discover more!
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => {
              setCurrentIndex(0);
              setSwipedRecipes([]);
            }}
            className="btn-outline"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Start Over
          </button>
          <button
            onClick={onFinish}
            className="btn-primary"
          >
            View Liked Recipes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">
            {currentIndex + 1} of {recipes.length}
          </span>
          <span className="text-sm text-gray-500">
            {swipedRecipes.filter(s => s.action === 'like' || s.action === 'superlike').length} liked
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex) / recipes.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Card stack */}
      <div className="relative h-[600px] max-w-sm mx-auto">
        {/* Background cards */}
        {recipes.slice(currentIndex + 1, currentIndex + 3).map((recipe, index) => (
          <div
            key={`${recipe.id}-${currentIndex + index + 1}`}
            className="absolute inset-0 bg-white rounded-2xl shadow-lg"
            style={{
              zIndex: 2 - index,
              transform: `scale(${1 - (index + 1) * 0.05}) translateY(${(index + 1) * 10}px)`,
              opacity: 1 - (index + 1) * 0.3,
            }}
          >
            <div className="w-full h-3/5 bg-gray-200 rounded-t-2xl overflow-hidden">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}

        {/* Active card */}
        {currentRecipe && (
          <RecipeSwipeCard
            key={`${currentRecipe.id}-${currentIndex}`}
            recipe={currentRecipe}
            onSwipeLeft={() => handleSwipe('dislike')}
            onSwipeRight={() => handleSwipe('like')}
            onSwipeUp={() => handleSwipe('superlike')}
            isActive={true}
            zIndex={10}
          />
        )}
      </div>

      {/* Action buttons */}
      <div className="flex justify-center items-center gap-6 mt-8">
        <button
          onClick={() => handleSwipe('dislike')}
          className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center text-error-500 hover:bg-error-50 transition-colors border-2 border-error-200"
          title="Pass"
        >
          <X className="w-7 h-7" />
        </button>

        {swipedRecipes.length > 0 && (
          <button
            onClick={handleUndo}
            className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors border-2 border-gray-200"
            title="Undo"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        )}

        <button
          onClick={() => handleSwipe('superlike')}
          className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-primary-500 hover:bg-primary-50 transition-colors border-2 border-primary-200"
          title="Super Like"
        >
          <Star className="w-6 h-6" />
        </button>

        <button
          onClick={() => handleSwipe('like')}
          className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center text-success-500 hover:bg-success-50 transition-colors border-2 border-success-200"
          title="Like"
        >
          <Heart className="w-7 h-7" />
        </button>
      </div>

      {/* Instructions */}
      <div className="mt-6 text-center">
        <div className="inline-flex items-center gap-2 text-sm text-gray-500 bg-gray-50 rounded-full px-4 py-2">
          <Info className="w-4 h-4" />
          Swipe or use buttons • Up for Super Like
        </div>
      </div>
    </div>
  );
};

export default RecipeSwipeStack;