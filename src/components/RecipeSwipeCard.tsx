import React, { useState, useRef, useEffect } from 'react';
import { Heart, X, Clock, Users, ChefHat, Star } from 'lucide-react';
import { Recipe } from '../types';
import { cn } from '../lib/utils';

interface RecipeSwipeCardProps {
  recipe: Recipe;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onSwipeUp: () => void;
  isActive: boolean;
  zIndex: number;
}

const RecipeSwipeCard: React.FC<RecipeSwipeCardProps> = ({
  recipe,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  isActive,
  zIndex
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });

  const handleStart = (clientX: number, clientY: number) => {
    if (!isActive) return;
    setIsDragging(true);
    startPos.current = { x: clientX, y: clientY };
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging || !isActive) return;

    const deltaX = clientX - startPos.current.x;
    const deltaY = clientY - startPos.current.y;
    
    setDragOffset({ x: deltaX, y: deltaY });
    setRotation(deltaX * 0.1);
  };

  const handleEnd = () => {
    if (!isDragging || !isActive) return;
    
    setIsDragging(false);
    
    const threshold = 100;
    const upThreshold = -150;
    
    if (Math.abs(dragOffset.x) > threshold) {
      if (dragOffset.x > 0) {
        onSwipeRight();
      } else {
        onSwipeLeft();
      }
    } else if (dragOffset.y < upThreshold) {
      onSwipeUp();
    } else {
      // Snap back
      setDragOffset({ x: 0, y: 0 });
      setRotation(0);
    }
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: MouseEvent) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  const getSwipeDirection = () => {
    if (Math.abs(dragOffset.x) > 50) {
      return dragOffset.x > 0 ? 'right' : 'left';
    }
    if (dragOffset.y < -50) {
      return 'up';
    }
    return null;
  };

  const swipeDirection = getSwipeDirection();

  return (
    <div
      ref={cardRef}
      className={cn(
        "absolute inset-0 w-full h-full cursor-grab select-none",
        isDragging && "cursor-grabbing"
      )}
      style={{
        zIndex,
        transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${rotation}deg)`,
        transition: isDragging ? 'none' : 'transform 0.3s ease-out',
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative w-full h-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Swipe indicators */}
        {swipeDirection && (
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            {swipeDirection === 'right' && (
              <div className="bg-success-500 text-white px-8 py-4 rounded-full text-2xl font-bold transform rotate-12 border-4 border-white shadow-lg">
                LIKE
              </div>
            )}
            {swipeDirection === 'left' && (
              <div className="bg-error-500 text-white px-8 py-4 rounded-full text-2xl font-bold transform -rotate-12 border-4 border-white shadow-lg">
                NOPE
              </div>
            )}
            {swipeDirection === 'up' && (
              <div className="bg-primary-500 text-white px-8 py-4 rounded-full text-2xl font-bold border-4 border-white shadow-lg">
                SUPER LIKE
              </div>
            )}
          </div>
        )}

        {/* Recipe image */}
        <div className="relative h-3/5 overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Recipe badges */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-primary-500 text-white text-sm font-medium">
                {recipe.cuisine}
              </span>
              <span className="px-3 py-1 rounded-full bg-secondary-500 text-white text-sm font-medium">
                {recipe.mealType}
              </span>
            </div>
            <div className="flex items-center bg-black/50 rounded-full px-3 py-1">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              <span className="text-white text-sm font-medium">
                {(Math.random() * 2 + 3).toFixed(1)}
              </span>
            </div>
          </div>

          {/* Recipe title */}
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-2xl font-bold text-white mb-2">{recipe.title}</h2>
            <div className="flex items-center text-white/90 text-sm space-x-4">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {recipe.cookTime + recipe.prepTime} min
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {recipe.servings} servings
              </div>
              <div className="flex items-center">
                <ChefHat className="w-4 h-4 mr-1" />
                {recipe.difficulty}
              </div>
            </div>
          </div>
        </div>

        {/* Recipe details */}
        <div className="p-6 h-2/5 overflow-y-auto">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg font-semibold text-gray-900">
                {recipe.calories} calories
              </span>
              <div className="flex flex-wrap gap-1">
                {recipe.dietaryRestrictions.slice(0, 2).map((restriction, index) => (
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

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Key Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {recipe.ingredients.slice(0, 4).map((ingredient, index) => (
                  <span
                    key={index}
                    className="text-sm px-3 py-1 bg-primary-50 text-primary-700 rounded-full"
                  >
                    {ingredient.split(',')[0].trim()}
                  </span>
                ))}
                {recipe.ingredients.length > 4 && (
                  <span className="text-sm px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
                    +{recipe.ingredients.length - 4} more
                  </span>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Quick Preview</h3>
              <p className="text-gray-600 text-sm line-clamp-3">
                {recipe.instructions.substring(0, 150)}...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeSwipeCard;