import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Enable CORS for your frontend
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// Mock recipes data
const mockRecipes = [
  {
    id: '1',
    title: 'Classic Margherita Pizza',
    image: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg',
    ingredients: ['1 pizza dough', '1/2 cup pizza sauce', '8 oz fresh mozzarella', '1/4 cup fresh basil leaves', '2 tbsp olive oil', 'Salt and pepper', '1 tsp dried oregano'],
    instructions: 'Preheat oven to 475°F. Roll out pizza dough on a floured surface. Transfer dough to a pizza stone or baking sheet. Spread pizza sauce evenly over dough, leaving a 1-inch border. Add sliced mozzarella and drizzle with olive oil. Bake for 12-15 minutes until crust is golden and cheese is bubbly. Remove from oven and top with fresh basil leaves. Season with salt, pepper, and oregano.',
    cookTime: 15,
    prepTime: 10,
    servings: 4,
    calories: 285,
    cuisine: 'Italian',
    dietaryRestrictions: ['Vegetarian'],
    nutritionalInfo: { protein: 12, carbs: 35, fat: 15, fiber: 2 },
    difficulty: 'Medium',
    mealType: 'Dinner'
  },
  {
    id: '2',
    title: 'Chicken Teriyaki Bowl',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    ingredients: ['2 chicken breasts, sliced', '2 cups cooked rice', '1/4 cup teriyaki sauce', '1 cup broccoli florets', '1 carrot, julienned', '2 tbsp sesame oil', '1 tbsp sesame seeds', '2 green onions, chopped'],
    instructions: 'Heat sesame oil in a large pan over medium-high heat. Add chicken and cook until golden brown. Add vegetables and stir-fry for 3-4 minutes. Pour teriyaki sauce over chicken and vegetables. Serve over rice and garnish with sesame seeds and green onions.',
    cookTime: 20,
    prepTime: 15,
    servings: 4,
    calories: 420,
    cuisine: 'Asian',
    dietaryRestrictions: ['Gluten-Free'],
    nutritionalInfo: { protein: 28, carbs: 45, fat: 12, fiber: 4 },
    difficulty: 'Easy',
    mealType: 'Dinner'
  },
  {
    id: '3',
    title: 'Mediterranean Quinoa Salad',
    image: 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg',
    ingredients: ['1 cup quinoa, cooked', '1 cucumber, diced', '1 cup cherry tomatoes, halved', '1/2 red onion, diced', '1/2 cup kalamata olives', '1/2 cup feta cheese, crumbled', '1/4 cup olive oil', '2 tbsp lemon juice', '2 tbsp fresh herbs (parsley, mint)'],
    instructions: 'Cook quinoa according to package directions and let cool. In a large bowl, combine quinoa, cucumber, tomatoes, red onion, and olives. Whisk together olive oil, lemon juice, salt, and pepper. Pour dressing over salad and toss. Top with feta cheese and fresh herbs.',
    cookTime: 0,
    prepTime: 20,
    servings: 6,
    calories: 320,
    cuisine: 'Mediterranean',
    dietaryRestrictions: ['Vegetarian', 'Gluten-Free'],
    nutritionalInfo: { protein: 12, carbs: 35, fat: 18, fiber: 6 },
    difficulty: 'Easy',
    mealType: 'Lunch'
  },
  {
    id: '4',
    title: 'Avocado Toast with Poached Egg',
    image: 'https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg',
    ingredients: ['4 slices whole grain bread', '2 ripe avocados', '4 eggs', '2 tbsp lemon juice', '1 tbsp white vinegar', 'Red pepper flakes', 'Everything bagel seasoning', 'Salt and pepper to taste', 'Microgreens for garnish'],
    instructions: 'Toast bread until golden. Mash avocados with lemon juice, salt, and pepper. Bring water to a gentle simmer, add vinegar. Crack eggs into small bowls and gently slide into water. Poach for 3-4 minutes. Spread avocado on toast, top with poached egg. Season with red pepper flakes, everything seasoning, and microgreens.',
    cookTime: 10,
    prepTime: 10,
    servings: 4,
    calories: 320,
    cuisine: 'American',
    dietaryRestrictions: ['Vegetarian'],
    nutritionalInfo: { protein: 16, carbs: 28, fat: 18, fiber: 12 },
    difficulty: 'Medium',
    mealType: 'Breakfast'
  },
  {
    id: '5',
    title: 'Thai Green Curry',
    image: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg',
    ingredients: ['1 lb chicken thigh, cubed', '1 can coconut milk', '2 tbsp green curry paste', '1 eggplant, cubed', '1 bell pepper, sliced', '1/4 cup Thai basil', '2 tbsp fish sauce', '1 tbsp brown sugar', '2 kaffir lime leaves', 'Jasmine rice for serving'],
    instructions: 'Heat 1/4 cup coconut milk in a large pan over medium heat. Add curry paste and cook for 2 minutes. Add chicken and cook until no longer pink. Add remaining coconut milk, eggplant, bell pepper, fish sauce, and brown sugar. Simmer for 15 minutes. Add lime leaves and basil. Serve over jasmine rice.',
    cookTime: 25,
    prepTime: 15,
    servings: 4,
    calories: 420,
    cuisine: 'Thai',
    dietaryRestrictions: ['Gluten-Free', 'Dairy-Free'],
    nutritionalInfo: { protein: 28, carbs: 18, fat: 28, fiber: 4 },
    difficulty: 'Medium',
    mealType: 'Dinner'
  }
];

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Mock auth endpoints
app.get('/api/auth/gitlab/url', (req, res) => {
  res.json({ 
    url: 'http://localhost:5173?mock_auth=true' 
  });
});

app.post('/api/auth/callback', (req, res) => {
  res.json({
    access_token: 'mock-token-123',
    token_type: 'bearer',
    user: {
      id: 'mock-user-123',
      name: 'Mock User',
      username: 'mockuser',
      email: 'mock@example.com',
      avatar_url: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=100'
    }
  });
});

// Mock recipes endpoints
app.get('/api/recipes', (req, res) => {
  const query = req.query.q || '';
  const cuisine = req.query.cuisine;
  const difficulty = req.query.difficulty;
  const mealType = req.query.mealType;
  
  let filteredRecipes = [...mockRecipes];
  
  if (query) {
    filteredRecipes = filteredRecipes.filter(recipe => 
      recipe.title.toLowerCase().includes(query.toLowerCase()) ||
      recipe.ingredients.some(ing => ing.toLowerCase().includes(query.toLowerCase())) ||
      recipe.cuisine.toLowerCase().includes(query.toLowerCase())
    );
  }
  
  if (cuisine) {
    filteredRecipes = filteredRecipes.filter(recipe => recipe.cuisine === cuisine);
  }
  
  if (difficulty) {
    filteredRecipes = filteredRecipes.filter(recipe => recipe.difficulty === difficulty);
  }
  
  if (mealType) {
    filteredRecipes = filteredRecipes.filter(recipe => recipe.mealType === mealType);
  }
  
  res.json({ recipes: filteredRecipes });
});

app.get('/api/recipes/:id', (req, res) => {
  const recipe = mockRecipes.find(r => r.id === req.params.id);
  if (!recipe) {
    return res.status(404).json({ error: 'Recipe not found' });
  }
  res.json({ recipe });
});

// Mock recommendation endpoint
app.post('/api/recommend', (req, res) => {
  // Simulate image analysis and recipe recommendation
  const shuffledRecipes = [...mockRecipes].sort(() => Math.random() - 0.5);
  res.json({ 
    recipes: shuffledRecipes.slice(0, 3),
    message: 'Recommendations based on your preferences'
  });
});

// Mock meal plan endpoint
app.post('/api/meal-plan', (req, res) => {
  const { query, calorie_target = 2000 } = req.body;
  
  const mealPlan = [
    {
      day: 'Monday',
      meals: {
        breakfast: mockRecipes.find(r => r.mealType === 'Breakfast'),
        lunch: mockRecipes.find(r => r.mealType === 'Lunch'),
        dinner: mockRecipes.find(r => r.mealType === 'Dinner')
      }
    },
    {
      day: 'Tuesday',
      meals: {
        breakfast: mockRecipes.find(r => r.mealType === 'Breakfast'),
        lunch: mockRecipes.find(r => r.mealType === 'Lunch'),
        dinner: mockRecipes.find(r => r.mealType === 'Dinner')
      }
    }
  ];
  
  res.json({ meal_plan: mealPlan });
});

// Mock rating endpoint
app.post('/api/rate', (req, res) => {
  const { recipe_id, rating, feedback } = req.body;
  console.log(`Recipe ${recipe_id} rated ${rating}/5: ${feedback || 'No feedback'}`);
  res.json({ message: 'Rating submitted successfully' });
});

app.listen(PORT, () => {
  console.log(`Mock server running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('- GET /api/health');
  console.log('- GET /api/auth/gitlab/url');
  console.log('- POST /api/auth/callback');
  console.log('- GET /api/recipes?q=search_term');
  console.log('- GET /api/recipes/:id');
  console.log('- POST /api/recommend');
  console.log('- POST /api/meal-plan');
  console.log('- POST /api/rate');
});