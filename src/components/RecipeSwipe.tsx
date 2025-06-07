import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, Check } from 'lucide-react';
import { Recipe } from '../types';
import { cn } from '../lib/utils';

interface RecipeSwipeProps {
  recipes: Recipe[];
  onLike: (recipe: Recipe) => void;
  onDislike: (recipe: Recipe) => void;
  onFinish: () => void;
}

const RecipeSwipe: React.FC<RecipeSwipeProps> = ({ recipes, onLike, onDislike, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const currentRecipe = recipes[currentIndex];

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart.current || !cardRef.current) return;

    const deltaX = e.touches[0].clientX - touchStart.current.x;
    const deltaY = e.touches[0].clientY - touchStart.current.y;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      e.preventDefault();
      cardRef.current.style.transform = `translateX(${deltaX}px) rotate(${deltaX * 0.1}deg)`;
      setSwipeDirection(deltaX > 0 ? 'right' : 'left');
    }
  };

  const handleTouchEnd = () => {
    if (!cardRef.current || !touchStart.current) return;

    const deltaX = touchStart.current.x - (touchStart.current?.x || 0);
    cardRef.current.style.transform = '';

    if (Math.abs(deltaX) > 100) {
      handleSwipe(deltaX > 0 ? 'right' : 'left');
    }

    touchStart.current = null;
    setSwipeDirection(null);
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      onLike(currentRecipe);
    } else {
      onDislike(currentRecipe);
    }

    if (currentIndex === recipes.length - 1) {
      onFinish();
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (!currentRecipe) return null;

  return (
    <div className="relative w-full max-w-md mx-auto h-[500px]">
      <div
        ref={cardRef}
        className="absolute inset-0 bg-white rounded-2xl shadow-xl overflow-hidden transition-transform"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative h-3/5">
          <img
            src={currentRecipe.image}
            alt={currentRecipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <h3 className="text-2xl font-bold text-white mb-2">{currentRecipe.title}</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 rounded-full bg-primary-500 text-white text-sm">
                {currentRecipe.cuisine}
              </span>
              <span className="px-2 py-1 rounded-full bg-secondary-500 text-white text-sm">
                {currentRecipe.mealType}
              </span>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-600">{currentRecipe.cookTime + currentRecipe.prepTime} mins</span>
            <span className="text-sm text-gray-600">{currentRecipe.calories} calories</span>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-700 line-clamp-3">{currentRecipe.instructions}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {currentRecipe.dietaryRestrictions.map((restriction, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full"
                >
                  {restriction}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
        <button
          onClick={() => handleSwipe('left')}
          className={cn(
            "p-4 rounded-full bg-white shadow-lg text-error-500 transition-transform",
            swipeDirection === 'left' && "scale-110"
          )}
        >
          <X className="w-8 h-8" />
        </button>
        <button
          onClick={() => handleSwipe('right')}
          className={cn(
            "p-4 rounded-full bg-white shadow-lg text-success-500 transition-transform",
            swipeDirection === 'right' && "scale-110"
          )}
        >
          <Check className="w-8 h-8" />
        </button>
      </div>

      <div className="absolute top-4 left-0 right-0 flex justify-center">
        <div className="bg-white/80 rounded-full px-3 py-1 text-sm">
          {currentIndex + 1} of {recipes.length}
        </div>
      </div>
    </div>
  );
};

export default RecipeSwipe;