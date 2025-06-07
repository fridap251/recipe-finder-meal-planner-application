// This is a utility script to help extract and format recipes from the Excel data
// Since we can't directly read Excel files in the browser, this serves as a reference
// for the data structure we expect

export const processRecipeData = (recipes) => {
  return recipes.map((recipe, index) => ({
    id: (index + 1).toString(),
    title: recipe.title || recipe.name || `Recipe ${index + 1}`,
    image: recipe.image_url || recipe.image || `https://images.pexels.com/photos/${1146760 + index}/pexels-photo-${1146760 + index}.jpeg`,
    ingredients: Array.isArray(recipe.ingredients) 
      ? recipe.ingredients 
      : (recipe.ingredients || '').split(',').map(ing => ing.trim()).filter(Boolean),
    instructions: recipe.instructions || recipe.directions || "Instructions not available",
    cookTime: parseInt(recipe.cook_time || recipe.cookTime || 30),
    prepTime: parseInt(recipe.prep_time || recipe.prepTime || 15),
    servings: parseInt(recipe.servings || 4),
    calories: parseInt(recipe.calories || 250),
    cuisine: recipe.cuisine || "International",
    dietaryRestrictions: Array.isArray(recipe.dietary_restrictions) 
      ? recipe.dietary_restrictions 
      : (recipe.dietary_restrictions || '').split(',').map(dr => dr.trim()).filter(Boolean),
    nutritionalInfo: {
      protein: parseInt(recipe.protein || 15),
      carbs: parseInt(recipe.carbs || 30),
      fat: parseInt(recipe.fat || 10),
      fiber: parseInt(recipe.fiber || 5)
    },
    difficulty: recipe.difficulty || "Medium",
    mealType: recipe.meal_type || recipe.mealType || "Dinner"
  }));
};