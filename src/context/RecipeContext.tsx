import React, { createContext, useContext, useState, useEffect } from 'react';
import { Recipe, SearchFilters, MealPlan } from '../types';
import { mockRecipes } from '../data/mockRecipes';
import { supabase } from '../lib/supabase';
import apiClient from '../lib/api';

interface RecipeContextType {
  recipes: Recipe[];
  favorites: Recipe[];
  mealPlans: MealPlan[];
  filteredRecipes: Recipe[];
  searchFilters: SearchFilters;
  loading: boolean;
  error: string | null;
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
  fetchRecipes: () => Promise<void>;
  getRecommendations: (query: string, image?: File) => Promise<Recipe[]>;
  clearError: () => void;
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
  const [error, setError] = useState<string | null>(null);

  // Load saved data from localStorage and Supabase
  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Load favorites from localStorage (fallback)
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        }

        // Load meal plans from localStorage (fallback)
        const savedMealPlans = localStorage.getItem('mealPlans');
        if (savedMealPlans) {
          setMealPlans(JSON.parse(savedMealPlans));
        }

        // If user is authenticated, try to load from Supabase
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          // TODO: Load user-specific data from Supabase when user tables are ready
          console.log('User authenticated, could load user-specific data');
        }
      } catch (err) {
        console.warn('Failed to load user data:', err);
      }
    };

    loadUserData();
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (err) {
      console.warn('Failed to save favorites to localStorage:', err);
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('mealPlans', JSON.stringify(mealPlans));
    } catch (err) {
      console.warn('Failed to save meal plans to localStorage:', err);
    }
  }, [mealPlans]);

  // Fetch recipes from multiple sources
  const fetchRecipes = async () => {
    setLoading(true);
    setError(null);

    try {
      // Add timeout for API requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      let fetchedRecipes: Recipe[] = [];

      // Try to fetch from Supabase first
      try {
        const { data: supabaseRecipes, error: supabaseError } = await supabase
          .from('recipes')
          .select('*')
          .order('created_at', { ascending: false });

        if (supabaseError) {
          console.warn('Supabase fetch failed:', supabaseError);
        } else if (supabaseRecipes && supabaseRecipes.length > 0) {
          // Transform Supabase recipes to match our Recipe interface
          fetchedRecipes = supabaseRecipes.map((recipe: any) => ({
            id: recipe.id,
            title: recipe.title,
            image: recipe.image_url || `https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg`,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions,
            cookTime: recipe.cook_time,
            prepTime: recipe.prep_time,
            servings: recipe.servings,
            calories: recipe.calories,
            cuisine: recipe.cuisine,
            dietaryRestrictions: recipe.dietary_restrictions,
            difficulty: recipe.difficulty as 'Easy' | 'Medium' | 'Hard',
            mealType: recipe.meal_type as 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Dessert',
            nutritionalInfo: {
              protein: Math.round(recipe.calories * 0.15 / 4), // Estimate protein
              carbs: Math.round(recipe.calories * 0.55 / 4), // Estimate carbs
              fat: Math.round(recipe.calories * 0.30 / 9), // Estimate fat
              fiber: Math.round(recipe.calories * 0.02) // Estimate fiber
            }
          }));
        }
      } catch (supabaseErr) {
        console.warn('Supabase not available:', supabaseErr);
      }

      // If no Supabase recipes, try API client
      if (fetchedRecipes.length === 0) {
        try {
          const response = await apiClient.getRecipes();
          if (response.data?.recipes) {
            fetchedRecipes = response.data.recipes.map((recipe: any) => ({
              ...recipe,
              nutritionalInfo: recipe.nutritionalInfo || {
                protein: 15,
                carbs: 30,
                fat: 10,
                fiber: 5
              }
            }));
          }
        } catch (apiErr) {
          console.warn('API client failed:', apiErr);
        }
      }

      clearTimeout(timeoutId);

      // Use fetched recipes or fall back to mock data
      if (fetchedRecipes.length > 0) {
        setRecipes(fetchedRecipes);
      } else {
        console.log('Using mock data as fallback');
        setRecipes(mockRecipes);
      }

    } catch (err) {
      console.error('Failed to fetch recipes:', err);
      
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          setError('Request timed out. Please check your internet connection.');
        } else if (err.message.includes('Failed to fetch')) {
          setError('Unable to connect to the server. Please check your internet connection or try again later.');
        } else {
          setError(err.message);
        }
      } else {
        setError('An unexpected error occurred while fetching recipes.');
      }
      
      // Fallback to mock data
      setRecipes(mockRecipes);
    } finally {
      setLoading(false);
    }
  };

  // Get recommendations from API or generate from existing recipes
  const getRecommendations = async (query: string, image?: File): Promise<Recipe[]> => {
    try {
      const response = await apiClient.getRecommendations(query, image);
      if (response.data?.recipes) {
        return response.data.recipes.map((recipe: any) => ({
          ...recipe,
          nutritionalInfo: recipe.nutritionalInfo || {
            protein: 15,
            carbs: 30,
            fat: 10,
            fiber: 5
          }
        }));
      }
    } catch (error) {
      console.warn('Failed to get recommendations from API:', error);
    }
    
    // Fallback to shuffled existing recipes
    return [...recipes].sort(() => Math.random() - 0.5).slice(0, 10);
  };

  // Filter recipes based on search filters
  useEffect(() => {
    let filtered = [...recipes];

    if (searchFilters.query) {
      const query = searchFilters.query.toLowerCase();
      filtered = filtered.filter(recipe => 
        recipe.title.toLowerCase().includes(query) ||
        recipe.ingredients.some(ing => ing.toLowerCase().includes(query)) ||
        recipe.cuisine.toLowerCase().includes(query)
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
  }, [recipes, searchFilters]);

  // Initialize recipes on mount
  useEffect(() => {
    fetchRecipes();
  }, []);

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

  const clearError = () => {
    setError(null);
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        favorites,
        mealPlans,
        filteredRecipes,
        searchFilters,
        loading,
        error,
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
        fetchRecipes,
        getRecommendations,
        clearError
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

// Error Boundary Component
export class RecipeErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Recipe context error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-error-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-error-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h2>
            <p className="text-gray-600 mb-6">{this.state.error?.message}</p>
            <button 
              onClick={() => this.setState({ hasError: false, error: null })}
              className="btn-primary w-full"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}