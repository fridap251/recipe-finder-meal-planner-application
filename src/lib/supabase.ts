import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ertsozhibvhpzgcygnmz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVydHNvemhpYnZocHpnY3lnbm16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMDA3NzYsImV4cCI6MjA2NjY3Njc3Nn0.QkeYc56CVBEzHOr61AllhJSjgDb5pdO6LT0oOdnnhs8';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
});

// Database types
export interface DatabaseRecipe {
  id: string;
  title: string;
  image_url?: string;
  ingredients: string[];
  instructions: string;
  cook_time: number;
  prep_time: number;
  servings: number;
  calories: number;
  cuisine: string;
  dietary_restrictions: string[];
  difficulty: string;
  meal_type: string;
  created_at?: string;
  user_id?: string;
}

export interface DatabaseMealPlan {
  id: string;
  name: string;
  user_id?: string;
  created_at?: string;
}

export interface DatabaseMealPlanItem {
  id: string;
  meal_plan_id?: string;
  recipe_id?: string;
  day_of_week: string;
  meal_type: string;
  created_at?: string;
}

// Recipe service functions
export const recipeService = {
  // Get all recipes
  async getAllRecipes() {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Get recipe by ID
  async getRecipeById(id: string) {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Create new recipe
  async createRecipe(recipe: Omit<DatabaseRecipe, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('recipes')
      .insert([recipe])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Update recipe
  async updateRecipe(id: string, updates: Partial<DatabaseRecipe>) {
    const { data, error } = await supabase
      .from('recipes')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Delete recipe
  async deleteRecipe(id: string) {
    const { error } = await supabase
      .from('recipes')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Search recipes
  async searchRecipes(query: string) {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .or(`title.ilike.%${query}%,cuisine.ilike.%${query}%`)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }
};

// Meal plan service functions
export const mealPlanService = {
  // Get all meal plans for user
  async getUserMealPlans(userId: string) {
    const { data, error } = await supabase
      .from('meal_plans')
      .select(`
        *,
        meal_plan_items (
          *,
          recipes (*)
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Create meal plan
  async createMealPlan(mealPlan: Omit<DatabaseMealPlan, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('meal_plans')
      .insert([mealPlan])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Add recipe to meal plan
  async addRecipeToMealPlan(item: Omit<DatabaseMealPlanItem, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('meal_plan_items')
      .insert([item])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Remove recipe from meal plan
  async removeRecipeFromMealPlan(mealPlanId: string, dayOfWeek: string, mealType: string) {
    const { error } = await supabase
      .from('meal_plan_items')
      .delete()
      .eq('meal_plan_id', mealPlanId)
      .eq('day_of_week', dayOfWeek)
      .eq('meal_type', mealType);
    
    if (error) throw error;
  }
};