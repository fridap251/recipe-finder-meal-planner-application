export interface Recipe {
  id: string;
  title: string;
  image: string;
  ingredients: string[];
  instructions: string;
  cookTime: number;
  prepTime: number;
  servings: number;
  calories: number;
  cuisine: string;
  dietaryRestrictions: string[];
  nutritionalInfo: {
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  difficulty: 'Easy' | 'Medium' | 'Hard';
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Dessert';
}

export interface MealPlan {
  id: string;
  name: string;
  days: MealPlanDay[];
  createdAt: Date;
}

export interface MealPlanDay {
  day: string;
  breakfast?: Recipe;
  lunch?: Recipe;
  dinner?: Recipe;
  snacks?: Recipe[];
}

export interface SearchFilters {
  query: string;
  cuisine?: string[];
  dietaryRestrictions?: string[];
  mealType?: string[];
  difficulty?: string[];
  cookTime?: number;
  ingredients?: string[];
}