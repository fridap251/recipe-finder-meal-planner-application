import { useState, useEffect } from 'react';
import { recipeService, DatabaseRecipe } from '../lib/supabase';
import { Recipe } from '../types';

// Transform database recipe to app recipe format
const transformDatabaseRecipe = (dbRecipe: DatabaseRecipe): Recipe => ({
  id: dbRecipe.id,
  title: dbRecipe.title,
  image: dbRecipe.image_url || `https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg`,
  ingredients: dbRecipe.ingredients,
  instructions: dbRecipe.instructions,
  cookTime: dbRecipe.cook_time,
  prepTime: dbRecipe.prep_time,
  servings: dbRecipe.servings,
  calories: dbRecipe.calories,
  cuisine: dbRecipe.cuisine,
  dietaryRestrictions: dbRecipe.dietary_restrictions,
  difficulty: dbRecipe.difficulty as 'Easy' | 'Medium' | 'Hard',
  mealType: dbRecipe.meal_type as 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Dessert',
  nutritionalInfo: {
    protein: Math.round(dbRecipe.calories * 0.15 / 4), // Estimate protein
    carbs: Math.round(dbRecipe.calories * 0.55 / 4), // Estimate carbs
    fat: Math.round(dbRecipe.calories * 0.30 / 9), // Estimate fat
    fiber: Math.round(dbRecipe.calories * 0.02) // Estimate fiber
  }
});

export const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const dbRecipes = await recipeService.getAllRecipes();
      const transformedRecipes = dbRecipes.map(transformDatabaseRecipe);
      setRecipes(transformedRecipes);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch recipes');
      console.error('Error fetching recipes:', err);
    } finally {
      setLoading(false);
    }
  };

  const searchRecipes = async (query: string) => {
    try {
      setLoading(true);
      const dbRecipes = await recipeService.searchRecipes(query);
      const transformedRecipes = dbRecipes.map(transformDatabaseRecipe);
      setRecipes(transformedRecipes);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search recipes');
      console.error('Error searching recipes:', err);
    } finally {
      setLoading(false);
    }
  };

  const getRecipeById = async (id: string): Promise<Recipe | null> => {
    try {
      const dbRecipe = await recipeService.getRecipeById(id);
      return transformDatabaseRecipe(dbRecipe);
    } catch (err) {
      console.error('Error fetching recipe:', err);
      return null;
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return {
    recipes,
    loading,
    error,
    fetchRecipes,
    searchRecipes,
    getRecipeById,
    refetch: fetchRecipes
  };
};