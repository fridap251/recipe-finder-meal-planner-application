import React, { createContext, useContext, useState, useEffect } from 'react';
import { Recipe, SearchFilters, MealPlan } from '../types';
import { mockRecipes } from '../data/mockRecipes';

interface RecipeContextType {
  recipes: Recipe[];
  favorites: Recipe[];
  mealPlans: MealPlan[];
  filteredRecipes: Recipe[];
  searchFilters: SearchFilters;
  setSearchFilters: (filters: SearchFilters) => void;
  addToFavorites: (recipe: Recipe) => void;
  removeFromFavorites: (recipeId: string) => void;
  isFavorite: (recipeId: string) => boolean;
  getRecipeById: (id: string) => Recipe | undefined;
  createMealPlan: (name: string) => void;
  currentMealPlan: MealPlan | null;
  setCurrentMealPlan: (mealPlan: MealPlan | null) => void;
  addRecipeToMealPlan: (recipe: Recipe, day: string, mealType: string) => void;
  removeRecipeFromMealPlan: (day: string, mealType: string) => void;
  loading: boolean;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const RecipeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>(mockRecipes);
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [currentMealPlan, setCurrentMealPlan] = useState<MealPlan | null>(null);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({ query: '' });
  const [loading, setLoading] = useState(false);

  // Load saved data from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    const savedMealPlans = localStorage.getItem('mealPlans');
    if (savedMealPlans) {
      setMealPlans(JSON.parse(savedMealPlans));
    }
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('mealPlans', JSON.stringify(mealPlans));
  }, [mealPlans]);

  // Filter recipes based on search filters
  useEffect(() => {
    setLoading(true);
    let filtered = [...recipes];

    if (searchFilters.query) {
      const query = searchFilters.query.toLowerCase();
      filtered = filtered.filter(recipe => 
        recipe.title.toLowerCase().includes(query) ||
        recipe.ingredients.some(ing => ing.toLowerCase().includes(query))
      );
    }

    if (searchFilters.cuisine && searchFilters.cuisine.length > 0) {
      filtered = filtered.filter(recipe => 
        searchFilters.cuisine?.includes(recipe.cuisine)
      );
    }

    if (searchFilters.dietaryRestrictions && searchFilters.dietaryRestrictions.length > 0) {
      filtered = filtered.filter(recipe => 
        searchFilters.dietaryRestrictions?.some(restriction => 
          recipe.dietaryRestrictions.includes(restriction)
        )
      );
    }

    if (searchFilters.mealType && searchFilters.mealType.length > 0) {
      filtered = filtered.filter(recipe => 
        searchFilters.mealType?.includes(recipe.mealType)
      );
    }

    if (searchFilters.difficulty && searchFilters.difficulty.length > 0) {
      filtered = filtered.filter(recipe => 
        searchFilters.difficulty?.includes(recipe.difficulty)
      );
    }

    if (searchFilters.cookTime) {
      filtered = filtered.filter(recipe => 
        recipe.cookTime <= searchFilters.cookTime!
      );
    }

    setFilteredRecipes(filtered);
    setLoading(false);
  }, [recipes, searchFilters]);

  const addToFavorites = (recipe: Recipe) => {
    if (!favorites.some(fav => fav.id === recipe.id)) {
      setFavorites([...favorites, recipe]);
    }
  };

  const removeFromFavorites = (recipeId: string) => {
    setFavorites(favorites.filter(recipe => recipe.id !== recipeId));
  };

  const isFavorite = (recipeId: string) => {
    return favorites.some(recipe => recipe.id === recipeId);
  };

  const getRecipeById = (id: string) => {
    return recipes.find(recipe => recipe.id === id);
  };

  const createMealPlan = (name: string) => {
    const newMealPlan: MealPlan = {
      id: Date.now().toString(),
      name,
      days: [
        { day: 'Monday' },
        { day: 'Tuesday' },
        { day: 'Wednesday' },
        { day: 'Thursday' },
        { day: 'Friday' },
        { day: 'Saturday' },
        { day: 'Sunday' }
      ],
      createdAt: new Date()
    };
    
    setMealPlans([...mealPlans, newMealPlan]);
    setCurrentMealPlan(newMealPlan);
    return newMealPlan;
  };

  const addRecipeToMealPlan = (recipe: Recipe, day: string, mealType: string) => {
    if (!currentMealPlan) return;
    
    const updatedMealPlan = { ...currentMealPlan };
    const dayIndex = updatedMealPlan.days.findIndex(d => d.day === day);
    
    if (dayIndex !== -1) {
      updatedMealPlan.days[dayIndex] = {
        ...updatedMealPlan.days[dayIndex],
        [mealType.toLowerCase()]: recipe
      };
      
      setCurrentMealPlan(updatedMealPlan);
      
      // Update in mealPlans array
      const planIndex = mealPlans.findIndex(plan => plan.id === currentMealPlan.id);
      if (planIndex !== -1) {
        const updatedPlans = [...mealPlans];
        updatedPlans[planIndex] = updatedMealPlan;
        setMealPlans(updatedPlans);
      }
    }
  };

  const removeRecipeFromMealPlan = (day: string, mealType: string) => {
    if (!currentMealPlan) return;
    
    const updatedMealPlan = { ...currentMealPlan };
    const dayIndex = updatedMealPlan.days.findIndex(d => d.day === day);
    
    if (dayIndex !== -1) {
      const updatedDay = { ...updatedMealPlan.days[dayIndex] };
      delete updatedDay[mealType.toLowerCase() as keyof typeof updatedDay];
      updatedMealPlan.days[dayIndex] = updatedDay;
      
      setCurrentMealPlan(updatedMealPlan);
      
      // Update in mealPlans array
      const planIndex = mealPlans.findIndex(plan => plan.id === currentMealPlan.id);
      if (planIndex !== -1) {
        const updatedPlans = [...mealPlans];
        updatedPlans[planIndex] = updatedMealPlan;
        setMealPlans(updatedPlans);
      }
    }
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        favorites,
        mealPlans,
        filteredRecipes,
        searchFilters,
        setSearchFilters,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        getRecipeById,
        createMealPlan,
        currentMealPlan,
        setCurrentMealPlan,
        addRecipeToMealPlan,
        removeRecipeFromMealPlan,
        loading
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
};