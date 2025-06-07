import React, { useState } from 'react';
import { X, ChevronDown, Filter } from 'lucide-react';
import { useRecipes } from '../context/RecipeContext';
import { cuisines, dietaryRestrictions, mealTypes, difficulties } from '../data/mockRecipes';
import { cn } from '../lib/utils';

const SearchFilters: React.FC = () => {
  const { searchFilters, setSearchFilters } = useRecipes();
  const [expanded, setExpanded] = useState(false);
  const [cookTimeValue, setCookTimeValue] = useState<number>(60);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilters({ ...searchFilters, query: e.target.value });
  };

  const handleFilterChange = (filterType: string, value: string) => {
    const currentFilters = searchFilters[filterType as keyof typeof searchFilters] as string[] || [];
    
    if (currentFilters.includes(value)) {
      setSearchFilters({
        ...searchFilters,
        [filterType]: currentFilters.filter(item => item !== value)
      });
    } else {
      setSearchFilters({
        ...searchFilters,
        [filterType]: [...currentFilters, value]
      });
    }
  };

  const handleCookTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setCookTimeValue(value);
    setSearchFilters({ ...searchFilters, cookTime: value });
  };

  const clearFilters = () => {
    setSearchFilters({ query: searchFilters.query });
    setCookTimeValue(60);
  };

  const isAnyFilterActive = () => {
    return (
      (searchFilters.cuisine && searchFilters.cuisine.length > 0) ||
      (searchFilters.dietaryRestrictions && searchFilters.dietaryRestrictions.length > 0) ||
      (searchFilters.mealType && searchFilters.mealType.length > 0) ||
      (searchFilters.difficulty && searchFilters.difficulty.length > 0) ||
      searchFilters.cookTime !== undefined
    );
  };

  const FilterChip: React.FC<{
    label: string;
    filterType: string;
    value: string;
    isActive: boolean;
  }> = ({ label, filterType, value, isActive }) => (
    <button
      className={cn(
        "px-3 py-1.5 text-sm font-medium rounded-full transition-colors",
        isActive 
          ? "bg-primary-100 text-primary-800 border border-primary-300" 
          : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
      )}
      onClick={() => handleFilterChange(filterType, value)}
    >
      {label}
    </button>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="relative">
        <input
          type="text"
          value={searchFilters.query}
          onChange={handleQueryChange}
          placeholder="Search for recipes, ingredients, or cuisines..."
          className="input pr-10"
        />
        {searchFilters.query && (
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={() => setSearchFilters({ ...searchFilters, query: '' })}
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="flex justify-between items-center mt-4 mb-2">
        <button
          className="flex items-center text-sm font-medium text-gray-700 hover:text-primary-600"
          onClick={() => setExpanded(!expanded)}
        >
          <Filter className="w-4 h-4 mr-1" />
          Filters
          <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>
        
        {isAnyFilterActive() && (
          <button
            className="text-sm text-primary-600 hover:text-primary-800"
            onClick={clearFilters}
          >
            Clear All Filters
          </button>
        )}
      </div>

      {expanded && (
        <div className="mt-4 space-y-4 animate-slide-up">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Cuisine</h3>
            <div className="flex flex-wrap gap-2">
              {cuisines.slice(0, 8).map((cuisine) => (
                <FilterChip
                  key={cuisine}
                  label={cuisine}
                  filterType="cuisine"
                  value={cuisine}
                  isActive={(searchFilters.cuisine || []).includes(cuisine)}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Dietary Restrictions</h3>
            <div className="flex flex-wrap gap-2">
              {dietaryRestrictions.slice(0, 6).map((restriction) => (
                <FilterChip
                  key={restriction}
                  label={restriction}
                  filterType="dietaryRestrictions"
                  value={restriction}
                  isActive={(searchFilters.dietaryRestrictions || []).includes(restriction)}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Meal Type</h3>
            <div className="flex flex-wrap gap-2">
              {mealTypes.map((type) => (
                <FilterChip
                  key={type}
                  label={type}
                  filterType="mealType"
                  value={type}
                  isActive={(searchFilters.mealType || []).includes(type)}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Difficulty</h3>
            <div className="flex flex-wrap gap-2">
              {difficulties.map((difficulty) => (
                <FilterChip
                  key={difficulty}
                  label={difficulty}
                  filterType="difficulty"
                  value={difficulty}
                  isActive={(searchFilters.difficulty || []).includes(difficulty)}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Cook Time: {cookTimeValue} minutes or less
            </h3>
            <input
              type="range"
              min="15"
              max="120"
              step="5"
              value={cookTimeValue}
              onChange={handleCookTimeChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>15 min</span>
              <span>120 min</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;