import { Recipe } from '../types';

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: "Classic Margherita Pizza",
    image: "https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg",
    ingredients: [
      "1 pizza dough",
      "1/2 cup pizza sauce",
      "8 oz fresh mozzarella",
      "1/4 cup fresh basil leaves",
      "2 tbsp olive oil",
      "Salt and pepper",
      "1 tsp dried oregano"
    ],
    instructions: "Preheat oven to 475°F. Roll out pizza dough on a floured surface. Transfer dough to a pizza stone or baking sheet. Spread pizza sauce evenly over dough, leaving a 1-inch border. Add sliced mozzarella and drizzle with olive oil. Bake for 12-15 minutes until crust is golden and cheese is bubbly. Remove from oven and top with fresh basil leaves. Season with salt, pepper, and oregano.",
    cookTime: 15,
    prepTime: 10,
    servings: 4,
    calories: 285,
    cuisine: "Italian",
    dietaryRestrictions: ["Vegetarian"],
    nutritionalInfo: {
      protein: 12,
      carbs: 35,
      fat: 15,
      fiber: 2
    },
    difficulty: "Medium",
    mealType: "Dinner"
  },
  {
    id: '2',
    title: "Chicken Teriyaki Bowl",
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
    ingredients: [
      "2 chicken breasts, sliced",
      "2 cups cooked rice",
      "1/4 cup teriyaki sauce",
      "1 cup broccoli florets",
      "1 carrot, julienned",
      "2 tbsp sesame oil",
      "1 tbsp sesame seeds",
      "2 green onions, chopped"
    ],
    instructions: "Heat sesame oil in a large pan over medium-high heat. Add chicken and cook until golden brown. Add vegetables and stir-fry for 3-4 minutes. Pour teriyaki sauce over chicken and vegetables. Serve over rice and garnish with sesame seeds and green onions.",
    cookTime: 20,
    prepTime: 15,
    servings: 4,
    calories: 420,
    cuisine: "Asian",
    dietaryRestrictions: ["Gluten-Free"],
    nutritionalInfo: {
      protein: 28,
      carbs: 45,
      fat: 12,
      fiber: 4
    },
    difficulty: "Easy",
    mealType: "Dinner"
  },
  {
    id: '3',
    title: "Mediterranean Quinoa Salad",
    image: "https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg",
    ingredients: [
      "1 cup quinoa, cooked",
      "1 cucumber, diced",
      "1 cup cherry tomatoes, halved",
      "1/2 red onion, diced",
      "1/2 cup kalamata olives",
      "1/2 cup feta cheese, crumbled",
      "1/4 cup olive oil",
      "2 tbsp lemon juice",
      "2 tbsp fresh herbs (parsley, mint)"
    ],
    instructions: "Cook quinoa according to package directions and let cool. In a large bowl, combine quinoa, cucumber, tomatoes, red onion, and olives. Whisk together olive oil, lemon juice, salt, and pepper. Pour dressing over salad and toss. Top with feta cheese and fresh herbs.",
    cookTime: 0,
    prepTime: 20,
    servings: 6,
    calories: 320,
    cuisine: "Mediterranean",
    dietaryRestrictions: ["Vegetarian", "Gluten-Free"],
    nutritionalInfo: {
      protein: 12,
      carbs: 35,
      fat: 18,
      fiber: 6
    },
    difficulty: "Easy",
    mealType: "Lunch"
  },
  {
    id: '4',
    title: "Beef Tacos with Avocado Salsa",
    image: "https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg",
    ingredients: [
      "1 lb ground beef",
      "8 corn tortillas",
      "1 packet taco seasoning",
      "2 avocados, diced",
      "1 tomato, diced",
      "1/4 red onion, minced",
      "2 tbsp lime juice",
      "1/4 cup cilantro, chopped",
      "1 cup shredded lettuce",
      "1/2 cup Mexican cheese blend"
    ],
    instructions: "Brown ground beef in a large skillet. Add taco seasoning and water according to package directions. Simmer until thickened. For salsa, combine avocados, tomato, onion, lime juice, and cilantro. Warm tortillas and fill with beef, lettuce, cheese, and avocado salsa.",
    cookTime: 15,
    prepTime: 15,
    servings: 4,
    calories: 485,
    cuisine: "Mexican",
    dietaryRestrictions: ["Gluten-Free"],
    nutritionalInfo: {
      protein: 25,
      carbs: 32,
      fat: 28,
      fiber: 8
    },
    difficulty: "Easy",
    mealType: "Dinner"
  },
  {
    id: '5',
    title: "Salmon with Lemon Herb Butter",
    image: "https://images.pexels.com/photos/1516415/pexels-photo-1516415.jpeg",
    ingredients: [
      "4 salmon fillets",
      "4 tbsp butter, softened",
      "2 tbsp fresh dill, chopped",
      "2 tbsp fresh parsley, chopped",
      "2 cloves garlic, minced",
      "1 lemon, zested and juiced",
      "Salt and pepper to taste",
      "2 tbsp olive oil"
    ],
    instructions: "Preheat oven to 400°F. Mix butter, herbs, garlic, lemon zest, salt, and pepper. Heat olive oil in an oven-safe skillet over medium-high heat. Season salmon with salt and pepper, then sear for 3 minutes. Flip salmon and top with herb butter. Transfer to oven and bake for 8-10 minutes. Drizzle with lemon juice before serving.",
    cookTime: 15,
    prepTime: 10,
    servings: 4,
    calories: 380,
    cuisine: "American",
    dietaryRestrictions: ["Gluten-Free", "Low-Carb"],
    nutritionalInfo: {
      protein: 35,
      carbs: 2,
      fat: 25,
      fiber: 0
    },
    difficulty: "Medium",
    mealType: "Dinner"
  },
  {
    id: '6',
    title: "Vegetarian Buddha Bowl",
    image: "https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg",
    ingredients: [
      "1 cup brown rice, cooked",
      "1 cup roasted sweet potato, cubed",
      "1 cup steamed broccoli",
      "1/2 cup edamame",
      "1/4 cup red cabbage, shredded",
      "2 tbsp tahini",
      "1 tbsp lemon juice",
      "1 tbsp maple syrup",
      "1 tsp sesame oil",
      "1 tbsp pumpkin seeds"
    ],
    instructions: "Roast sweet potato cubes at 425°F for 25 minutes. Steam broccoli until tender. Cook edamame according to package directions. Whisk together tahini, lemon juice, maple syrup, and sesame oil for dressing. Arrange all ingredients in a bowl over rice and drizzle with dressing. Top with pumpkin seeds.",
    cookTime: 30,
    prepTime: 15,
    servings: 2,
    calories: 450,
    cuisine: "Asian",
    dietaryRestrictions: ["Vegan", "Gluten-Free"],
    nutritionalInfo: {
      protein: 18,
      carbs: 65,
      fat: 15,
      fiber: 12
    },
    difficulty: "Easy",
    mealType: "Lunch"
  },
  {
    id: '7',
    title: "Chocolate Chip Banana Pancakes",
    image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg",
    ingredients: [
      "2 cups all-purpose flour",
      "2 tbsp sugar",
      "2 tsp baking powder",
      "1/2 tsp salt",
      "2 eggs",
      "1 3/4 cups milk",
      "1/4 cup melted butter",
      "2 ripe bananas, mashed",
      "1/2 cup chocolate chips",
      "Maple syrup for serving"
    ],
    instructions: "Mix dry ingredients in a large bowl. In another bowl, whisk eggs, milk, melted butter, and mashed bananas. Pour wet ingredients into dry ingredients and stir until just combined. Fold in chocolate chips. Heat griddle over medium heat. Pour 1/4 cup batter for each pancake. Cook until bubbles form, then flip and cook until golden. Serve with maple syrup.",
    cookTime: 15,
    prepTime: 10,
    servings: 4,
    calories: 385,
    cuisine: "American",
    dietaryRestrictions: ["Vegetarian"],
    nutritionalInfo: {
      protein: 12,
      carbs: 58,
      fat: 14,
      fiber: 4
    },
    difficulty: "Easy",
    mealType: "Breakfast"
  },
  {
    id: '8',
    title: "Thai Green Curry",
    image: "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg",
    ingredients: [
      "1 lb chicken thigh, cubed",
      "1 can coconut milk",
      "2 tbsp green curry paste",
      "1 eggplant, cubed",
      "1 bell pepper, sliced",
      "1/4 cup Thai basil",
      "2 tbsp fish sauce",
      "1 tbsp brown sugar",
      "2 kaffir lime leaves",
      "Jasmine rice for serving"
    ],
    instructions: "Heat 1/4 cup coconut milk in a large pan over medium heat. Add curry paste and cook for 2 minutes. Add chicken and cook until no longer pink. Add remaining coconut milk, eggplant, bell pepper, fish sauce, and brown sugar. Simmer for 15 minutes. Add lime leaves and basil. Serve over jasmine rice.",
    cookTime: 25,
    prepTime: 15,
    servings: 4,
    calories: 420,
    cuisine: "Thai",
    dietaryRestrictions: ["Gluten-Free", "Dairy-Free"],
    nutritionalInfo: {
      protein: 28,
      carbs: 18,
      fat: 28,
      fiber: 4
    },
    difficulty: "Medium",
    mealType: "Dinner"
  },
  {
    id: '9',
    title: "Greek Yogurt Parfait",
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg",
    ingredients: [
      "2 cups Greek yogurt",
      "1/4 cup honey",
      "1 cup mixed berries",
      "1/2 cup granola",
      "2 tbsp chia seeds",
      "1/4 cup chopped almonds",
      "1 tsp vanilla extract",
      "Fresh mint for garnish"
    ],
    instructions: "Mix Greek yogurt with honey and vanilla extract. In glasses or bowls, layer yogurt mixture, berries, and granola. Repeat layers. Top with chia seeds, chopped almonds, and fresh mint. Serve immediately or refrigerate for up to 2 hours.",
    cookTime: 0,
    prepTime: 10,
    servings: 4,
    calories: 285,
    cuisine: "Greek",
    dietaryRestrictions: ["Vegetarian", "Gluten-Free"],
    nutritionalInfo: {
      protein: 18,
      carbs: 35,
      fat: 8,
      fiber: 6
    },
    difficulty: "Easy",
    mealType: "Breakfast"
  },
  {
    id: '10',
    title: "Mushroom Risotto",
    image: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg",
    ingredients: [
      "1 1/2 cups Arborio rice",
      "4 cups warm vegetable broth",
      "1 lb mixed mushrooms, sliced",
      "1 onion, diced",
      "3 cloves garlic, minced",
      "1/2 cup white wine",
      "1/2 cup Parmesan cheese, grated",
      "3 tbsp butter",
      "2 tbsp olive oil",
      "Fresh thyme and parsley"
    ],
    instructions: "Heat olive oil in a large pan and sauté mushrooms until golden. Remove and set aside. In the same pan, sauté onion until translucent. Add garlic and rice, stirring for 2 minutes. Add wine and stir until absorbed. Add warm broth one ladle at a time, stirring constantly until absorbed. Continue for 18-20 minutes. Stir in mushrooms, butter, and Parmesan. Garnish with herbs.",
    cookTime: 30,
    prepTime: 15,
    servings: 4,
    calories: 420,
    cuisine: "Italian",
    dietaryRestrictions: ["Vegetarian", "Gluten-Free"],
    nutritionalInfo: {
      protein: 12,
      carbs: 65,
      fat: 12,
      fiber: 3
    },
    difficulty: "Hard",
    mealType: "Dinner"
  },
  {
    id: '11',
    title: "Caprese Stuffed Chicken",
    image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg",
    ingredients: [
      "4 chicken breasts",
      "4 oz fresh mozzarella, sliced",
      "2 large tomatoes, sliced",
      "1/4 cup fresh basil leaves",
      "2 tbsp balsamic glaze",
      "2 tbsp olive oil",
      "2 cloves garlic, minced",
      "Salt and pepper to taste",
      "Toothpicks for securing"
    ],
    instructions: "Preheat oven to 375°F. Cut a pocket in each chicken breast. Season inside and out with salt, pepper, and garlic. Stuff each breast with mozzarella, tomato, and basil. Secure with toothpicks. Heat olive oil in an oven-safe skillet. Sear chicken for 3 minutes per side. Transfer to oven and bake for 20-25 minutes. Drizzle with balsamic glaze before serving.",
    cookTime: 30,
    prepTime: 15,
    servings: 4,
    calories: 385,
    cuisine: "Italian",
    dietaryRestrictions: ["Gluten-Free", "Low-Carb"],
    nutritionalInfo: {
      protein: 42,
      carbs: 8,
      fat: 18,
      fiber: 2
    },
    difficulty: "Medium",
    mealType: "Dinner"
  },
  {
    id: '12',
    title: "Avocado Toast with Poached Egg",
    image: "https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg",
    ingredients: [
      "4 slices whole grain bread",
      "2 ripe avocados",
      "4 eggs",
      "2 tbsp lemon juice",
      "1 tbsp white vinegar",
      "Red pepper flakes",
      "Everything bagel seasoning",
      "Salt and pepper to taste",
      "Microgreens for garnish"
    ],
    instructions: "Toast bread until golden. Mash avocados with lemon juice, salt, and pepper. Bring water to a gentle simmer, add vinegar. Crack eggs into small bowls and gently slide into water. Poach for 3-4 minutes. Spread avocado on toast, top with poached egg. Season with red pepper flakes, everything seasoning, and microgreens.",
    cookTime: 10,
    prepTime: 10,
    servings: 4,
    calories: 320,
    cuisine: "American",
    dietaryRestrictions: ["Vegetarian"],
    nutritionalInfo: {
      protein: 16,
      carbs: 28,
      fat: 18,
      fiber: 12
    },
    difficulty: "Medium",
    mealType: "Breakfast"
  },
  {
    id: '13',
    title: "Beef and Broccoli Stir Fry",
    image: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg",
    ingredients: [
      "1 lb beef sirloin, sliced thin",
      "4 cups broccoli florets",
      "3 tbsp soy sauce",
      "2 tbsp oyster sauce",
      "1 tbsp cornstarch",
      "2 tbsp vegetable oil",
      "3 cloves garlic, minced",
      "1 tbsp fresh ginger, minced",
      "2 green onions, chopped",
      "Cooked rice for serving"
    ],
    instructions: "Marinate beef in 1 tbsp soy sauce and cornstarch for 15 minutes. Heat oil in a wok over high heat. Stir-fry beef until browned, remove. Add broccoli and stir-fry for 3 minutes. Add garlic and ginger, cook 30 seconds. Return beef to wok, add remaining soy sauce and oyster sauce. Stir-fry for 2 minutes. Garnish with green onions and serve over rice.",
    cookTime: 15,
    prepTime: 20,
    servings: 4,
    calories: 380,
    cuisine: "Chinese",
    dietaryRestrictions: ["Dairy-Free"],
    nutritionalInfo: {
      protein: 32,
      carbs: 18,
      fat: 22,
      fiber: 4
    },
    difficulty: "Easy",
    mealType: "Dinner"
  },
  {
    id: '14',
    title: "Lemon Garlic Shrimp Pasta",
    image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg",
    ingredients: [
      "1 lb linguine pasta",
      "1 1/2 lbs large shrimp, peeled",
      "6 cloves garlic, minced",
      "1/4 cup olive oil",
      "1/4 cup white wine",
      "3 lemons, juiced and zested",
      "1/4 cup fresh parsley, chopped",
      "1/4 cup Parmesan cheese",
      "Red pepper flakes",
      "Salt and pepper to taste"
    ],
    instructions: "Cook pasta according to package directions. Heat olive oil in a large skillet over medium-high heat. Season shrimp with salt and pepper, cook for 2 minutes per side. Remove shrimp. Add garlic to pan, cook 30 seconds. Add wine, lemon juice, and zest. Return shrimp to pan. Toss with drained pasta, parsley, and Parmesan. Season with red pepper flakes.",
    cookTime: 15,
    prepTime: 10,
    servings: 6,
    calories: 420,
    cuisine: "Italian",
    dietaryRestrictions: ["Dairy-Free"],
    nutritionalInfo: {
      protein: 28,
      carbs: 48,
      fat: 12,
      fiber: 3
    },
    difficulty: "Easy",
    mealType: "Dinner"
  },
  {
    id: '15',
    title: "Moroccan Chickpea Stew",
    image: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg",
    ingredients: [
      "2 cans chickpeas, drained",
      "1 can diced tomatoes",
      "1 onion, diced",
      "3 cloves garlic, minced",
      "2 tsp ground cumin",
      "1 tsp ground cinnamon",
      "1 tsp ground ginger",
      "1/2 tsp cayenne pepper",
      "2 cups vegetable broth",
      "1/4 cup dried apricots, chopped",
      "2 tbsp olive oil",
      "Fresh cilantro for garnish"
    ],
    instructions: "Heat olive oil in a large pot over medium heat. Sauté onion until softened. Add garlic and spices, cook for 1 minute. Add tomatoes, chickpeas, broth, and apricots. Bring to a boil, then simmer for 20 minutes until thickened. Season with salt and pepper. Garnish with fresh cilantro. Serve with couscous or rice.",
    cookTime: 25,
    prepTime: 15,
    servings: 4,
    calories: 320,
    cuisine: "Moroccan",
    dietaryRestrictions: ["Vegan", "Gluten-Free"],
    nutritionalInfo: {
      protein: 14,
      carbs: 52,
      fat: 8,
      fiber: 12
    },
    difficulty: "Easy",
    mealType: "Dinner"
  },
  {
    id: '16',
    title: "Blueberry Lemon Muffins",
    image: "https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg",
    ingredients: [
      "2 cups all-purpose flour",
      "3/4 cup sugar",
      "2 tsp baking powder",
      "1/2 tsp salt",
      "1/3 cup melted butter",
      "1 egg",
      "1 cup milk",
      "1 cup fresh blueberries",
      "2 tbsp lemon zest",
      "2 tbsp lemon juice",
      "1 tsp vanilla extract"
    ],
    instructions: "Preheat oven to 400°F. Line muffin tin with paper liners. Mix flour, sugar, baking powder, and salt. In another bowl, whisk melted butter, egg, milk, lemon zest, lemon juice, and vanilla. Pour wet ingredients into dry ingredients and stir until just combined. Fold in blueberries. Fill muffin cups 2/3 full. Bake for 20-25 minutes until golden.",
    cookTime: 25,
    prepTime: 15,
    servings: 12,
    calories: 185,
    cuisine: "American",
    dietaryRestrictions: ["Vegetarian"],
    nutritionalInfo: {
      protein: 4,
      carbs: 32,
      fat: 5,
      fiber: 1
    },
    difficulty: "Easy",
    mealType: "Breakfast"
  },
  {
    id: '17',
    title: "Korean Bibimbap",
    image: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg",
    ingredients: [
      "2 cups cooked white rice",
      "1/2 lb beef bulgogi, sliced thin",
      "1 cup spinach, blanched",
      "1 cup bean sprouts",
      "1 carrot, julienned",
      "1 zucchini, julienned",
      "4 shiitake mushrooms, sliced",
      "4 eggs",
      "4 tbsp gochujang",
      "2 tbsp sesame oil",
      "2 tbsp soy sauce"
    ],
    instructions: "Cook beef in a hot pan until browned. Sauté each vegetable separately with a little sesame oil and soy sauce. Fry eggs sunny-side up. Place rice in bowls, arrange vegetables and beef on top. Top with fried egg. Mix gochujang with sesame oil for sauce. Serve with sauce on the side.",
    cookTime: 30,
    prepTime: 20,
    servings: 4,
    calories: 485,
    cuisine: "Korean",
    dietaryRestrictions: ["Gluten-Free", "Dairy-Free"],
    nutritionalInfo: {
      protein: 28,
      carbs: 52,
      fat: 18,
      fiber: 6
    },
    difficulty: "Medium",
    mealType: "Dinner"
  },
  {
    id: '18',
    title: "Stuffed Bell Peppers",
    image: "https://images.pexels.com/photos/1640775/pexels-photo-1640775.jpeg",
    ingredients: [
      "6 bell peppers, tops cut and seeded",
      "1 lb ground turkey",
      "1 cup cooked rice",
      "1 onion, diced",
      "2 cloves garlic, minced",
      "1 can diced tomatoes",
      "1 cup shredded cheese",
      "2 tbsp olive oil",
      "1 tsp Italian seasoning",
      "Salt and pepper to taste"
    ],
    instructions: "Preheat oven to 375°F. Heat olive oil in a large skillet. Cook onion until softened, add garlic and cook 1 minute. Add ground turkey and cook until browned. Stir in rice, tomatoes, Italian seasoning, salt, and pepper. Fill peppers with mixture, top with cheese. Place in baking dish with 1/4 cup water. Cover and bake 35-40 minutes.",
    cookTime: 45,
    prepTime: 20,
    servings: 6,
    calories: 320,
    cuisine: "American",
    dietaryRestrictions: ["Gluten-Free"],
    nutritionalInfo: {
      protein: 22,
      carbs: 28,
      fat: 12,
      fiber: 5
    },
    difficulty: "Medium",
    mealType: "Dinner"
  },
  {
    id: '19',
    title: "Coconut Curry Soup",
    image: "https://images.pexels.com/photos/1640776/pexels-photo-1640776.jpeg",
    ingredients: [
      "1 can coconut milk",
      "2 cups vegetable broth",
      "1 tbsp red curry paste",
      "1 lb shrimp, peeled",
      "1 bell pepper, sliced",
      "1 cup snap peas",
      "1 can bamboo shoots",
      "2 tbsp fish sauce",
      "1 tbsp brown sugar",
      "2 tbsp lime juice",
      "Fresh cilantro and basil"
    ],
    instructions: "Heat 1/4 cup coconut milk in a large pot. Add curry paste and cook for 2 minutes. Add remaining coconut milk and broth, bring to a simmer. Add vegetables and cook for 5 minutes. Add shrimp and cook until pink. Stir in fish sauce, brown sugar, and lime juice. Garnish with fresh herbs.",
    cookTime: 20,
    prepTime: 15,
    servings: 4,
    calories: 285,
    cuisine: "Thai",
    dietaryRestrictions: ["Gluten-Free", "Dairy-Free"],
    nutritionalInfo: {
      protein: 24,
      carbs: 15,
      fat: 16,
      fiber: 3
    },
    difficulty: "Easy",
    mealType: "Lunch"
  },
  {
    id: '20',
    title: "Apple Cinnamon Oatmeal",
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg",
    ingredients: [
      "1 cup rolled oats",
      "2 cups milk",
      "1 apple, diced",
      "2 tbsp brown sugar",
      "1 tsp cinnamon",
      "1/4 tsp nutmeg",
      "1/4 cup chopped walnuts",
      "2 tbsp maple syrup",
      "1 tsp vanilla extract",
      "Pinch of salt"
    ],
    instructions: "Combine oats, milk, diced apple, brown sugar, cinnamon, nutmeg, and salt in a saucepan. Bring to a boil, then reduce heat and simmer for 5-7 minutes, stirring occasionally. Stir in vanilla and maple syrup. Serve topped with chopped walnuts and additional cinnamon if desired.",
    cookTime: 10,
    prepTime: 5,
    servings: 4,
    calories: 285,
    cuisine: "American",
    dietaryRestrictions: ["Vegetarian"],
    nutritionalInfo: {
      protein: 10,
      carbs: 45,
      fat: 8,
      fiber: 6
    },
    difficulty: "Easy",
    mealType: "Breakfast"
  }
];

export const cuisines = [
  "Italian",
  "American",
  "Mexican",
  "Asian",
  "Mediterranean",
  "Indian",
  "French",
  "Greek",
  "Thai",
  "Chinese",
  "Korean",
  "Moroccan"
];

export const mealTypes = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Snack",
  "Dessert"
];

export const difficulties = [
  "Easy",
  "Medium",
  "Hard"
];

export const dietaryRestrictions = [
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Dairy-Free",
  "Nut-Free",
  "Low-Carb"
];