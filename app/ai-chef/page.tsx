"use client";
import { useState } from "react";
import Image from "next/image";
import {
  Sparkles, Plus, X, ChefHat, Flame, Clock, Loader2, Lightbulb,
  RefreshCw, ArrowRight, Leaf
} from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface GeneratedRecipe {
  name: string;
  description: string;
  ingredients: string[];
  steps: string[];
  calories: number;
  time: number;
  difficulty: string;
  dietaryTags: string[];
}

const INGREDIENT_SUGGESTIONS = [
  "eggs", "onions", "tomatoes", "cheese", "chicken", "pasta", "rice",
  "spinach", "garlic", "potatoes", "butter", "milk", "lemon", "olive oil",
  "ginger", "mushrooms", "bell pepper", "broccoli", "shrimp", "tofu"
];

const AI_RECIPES: GeneratedRecipe[] = [
  {
    name: "Cheesy Scrambled Eggs with Tomatoes",
    description: "A quick and satisfying breakfast with fluffy eggs, juicy tomatoes, and melted cheese.",
    ingredients: ["3 large eggs", "1 tomato, diced", "1/4 onion, minced", "2 tbsp cheddar cheese", "1 tbsp butter", "salt & pepper"],
    steps: [
      "Beat eggs with a pinch of salt and pepper.",
      "Melt butter in a non-stick pan over medium heat.",
      "Sauté onions until soft, about 2 minutes.",
      "Add tomatoes and cook for 1 minute.",
      "Pour in eggs and stir gently with a spatula.",
      "When almost set, add cheese and fold in.",
      "Serve immediately on toast."
    ],
    calories: 320,
    time: 10,
    difficulty: "Easy",
    dietaryTags: ["Vegetarian", "High Protein"],
  },
  {
    name: "Tomato & Egg Stir-Fry",
    description: "A classic Chinese-style stir-fry with silky eggs and tangy tomatoes — ready in 10 minutes.",
    ingredients: ["3 eggs", "2 tomatoes, wedged", "1/2 onion, sliced", "2 tsp soy sauce", "1 tsp sugar", "2 tbsp oil", "2 green onions"],
    steps: [
      "Beat eggs and scramble in hot oil until just set. Remove.",
      "In the same pan, stir-fry onions and tomatoes for 3 minutes.",
      "Season with soy sauce, sugar, and salt.",
      "Add eggs back, toss everything together.",
      "Garnish with green onions and serve with rice."
    ],
    calories: 280,
    time: 12,
    difficulty: "Easy",
    dietaryTags: ["Vegetarian", "Low Carb"],
  },
  {
    name: "Stuffed Omelette",
    description: "A fluffy omelette stuffed with sautéed onions, tomatoes, and gooey cheese.",
    ingredients: ["3 eggs", "1 tomato, diced", "1/2 onion, diced", "3 tbsp mozzarella", "1 tbsp oil", "herbs to taste"],
    steps: [
      "Beat eggs with salt, pepper, and fresh herbs.",
      "Sauté onions and tomatoes until softened.",
      "Pour eggs into a buttered pan. Cook edges first.",
      "Add filling to one half. Sprinkle cheese.",
      "Fold omelette in half and cook 1 more minute.",
      "Slide onto plate and serve."
    ],
    calories: 340,
    time: 15,
    difficulty: "Easy",
    dietaryTags: ["Vegetarian", "Keto", "High Protein"],
  },
];

export default function AIChefPage() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<GeneratedRecipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<GeneratedRecipe | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  const addIngredient = (ing: string) => {
    const trimmed = ing.trim().toLowerCase();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients([...ingredients, trimmed]);
    }
    setInputValue("");
  };

  const removeIngredient = (ing: string) => {
    setIngredients(ingredients.filter((i) => i !== ing));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addIngredient(inputValue);
    }
  };

  const generateRecipes = async () => {
    if (ingredients.length === 0) return;
    setLoading(true);
    setResults([]);
    setSelectedRecipe(null);
    await new Promise((r) => setTimeout(r, 2200));
    setResults(AI_RECIPES);
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-purple-50 via-white to-orange-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" /> AI-Powered
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-3">
            AI Chef
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">
            Tell me what ingredients you have and I&apos;ll create amazing recipes for you instantly.
          </p>
        </div>

        {!selectedRecipe ? (
          <>
            {/* Ingredient Input */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-6 sm:p-8 mb-6">
              <h2 className="font-black text-gray-900 dark:text-white text-xl mb-2">
                🧺 What&apos;s in Your Fridge?
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                Add ingredients you have. Press Enter or comma to add each one.
              </p>

              {/* Ingredient Tags */}
              <div className="flex flex-wrap gap-2 mb-4 min-h-12">
                {ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="flex items-center gap-1.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-3 py-1.5 rounded-full text-sm font-semibold"
                  >
                    {ing}
                    <button onClick={() => removeIngredient(ing)} className="hover:text-red-500 transition">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-3 mb-5">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="e.g. eggs, tomatoes, cheese..."
                  className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                />
                <button
                  onClick={() => addIngredient(inputValue)}
                  className="px-4 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {/* Suggestions */}
              <div>
                <p className="text-xs text-gray-400 mb-3 font-semibold">Quick Add:</p>
                <div className="flex flex-wrap gap-2">
                  {INGREDIENT_SUGGESTIONS.filter((s) => !ingredients.includes(s)).slice(0, 12).map((s) => (
                    <button
                      key={s}
                      onClick={() => addIngredient(s)}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full text-xs font-medium hover:bg-orange-100 hover:text-orange-600 dark:hover:bg-orange-900/30 dark:hover:text-orange-400 transition"
                    >
                      + {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center mb-8">
              <Button
                onClick={generateRecipes}
                disabled={ingredients.length === 0 || loading}
                size="lg"
                className="px-10 rounded-2xl"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    AI is cooking up recipes...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Recipes ({ingredients.length} ingredients)
                  </>
                )}
              </Button>
            </div>

            {/* Results */}
            {loading && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ChefHat className="w-8 h-8 text-purple-500 animate-bounce" />
                </div>
                <p className="text-gray-600 dark:text-gray-300 font-semibold">
                  AI Chef is crafting personalized recipes...
                </p>
                <p className="text-sm text-gray-400 mt-1">Analyzing {ingredients.length} ingredients</p>
              </div>
            )}

            {results.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  <h2 className="text-xl font-black text-gray-900 dark:text-white">
                    {results.length} Recipes Generated
                  </h2>
                  <button
                    onClick={generateRecipes}
                    className="ml-auto flex items-center gap-2 text-sm text-purple-500 hover:text-purple-600 font-semibold"
                  >
                    <RefreshCw className="w-4 h-4" /> Regenerate
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {results.map((recipe, i) => (
                    <button
                      key={i}
                      onClick={() => { setSelectedRecipe(recipe); setActiveStep(0); }}
                      className="text-left bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100 dark:border-gray-800"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-rose-500 rounded-xl flex items-center justify-center">
                          <ChefHat className="w-5 h-5 text-white" />
                        </div>
                        <Badge variant="green">{recipe.difficulty}</Badge>
                      </div>
                      <h3 className="font-black text-gray-900 dark:text-white mb-1.5">{recipe.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{recipe.description}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{recipe.time} min</span>
                        <span className="flex items-center gap-1 text-orange-500"><Flame className="w-3 h-3" />{recipe.calories} kcal</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {recipe.dietaryTags.map((tag) => (
                          <Badge key={tag} variant="purple" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-1 mt-3 text-orange-500 text-sm font-semibold">
                        View Recipe <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          /* Recipe Detail View */
          <div>
            <button
              onClick={() => setSelectedRecipe(null)}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-orange-500 transition mb-6"
            >
              ← Back to Results
            </button>

            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-br from-orange-500 to-rose-600 p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-5 h-5 text-orange-200" />
                      <span className="text-orange-200 text-sm font-semibold">AI Generated Recipe</span>
                    </div>
                    <h2 className="text-3xl font-black text-white mb-2">{selectedRecipe.name}</h2>
                    <p className="text-orange-100 text-sm">{selectedRecipe.description}</p>
                  </div>
                </div>
                <div className="flex gap-4 mt-5">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 text-center">
                    <Clock className="w-4 h-4 text-white mx-auto mb-1" />
                    <div className="text-white font-bold text-sm">{selectedRecipe.time} min</div>
                    <div className="text-orange-200 text-xs">Time</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 text-center">
                    <Flame className="w-4 h-4 text-white mx-auto mb-1" />
                    <div className="text-white font-bold text-sm">{selectedRecipe.calories}</div>
                    <div className="text-orange-200 text-xs">Calories</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 text-center">
                    <ChefHat className="w-4 h-4 text-white mx-auto mb-1" />
                    <div className="text-white font-bold text-sm">{selectedRecipe.difficulty}</div>
                    <div className="text-orange-200 text-xs">Level</div>
                  </div>
                </div>
              </div>

              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Ingredients */}
                <div>
                  <h3 className="font-black text-gray-900 dark:text-white text-lg mb-4 flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-emerald-500" /> Ingredients
                  </h3>
                  <ul className="space-y-2">
                    {selectedRecipe.ingredients.map((ing, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Instructions */}
                <div>
                  <h3 className="font-black text-gray-900 dark:text-white text-lg mb-4 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-500" /> Instructions
                  </h3>
                  <div className="space-y-3">
                    {selectedRecipe.steps.map((step, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveStep(i)}
                        className={cn(
                          "w-full text-left flex gap-3 p-3 rounded-xl transition",
                          activeStep === i
                            ? "bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700"
                            : "hover:bg-gray-50 dark:hover:bg-gray-800"
                        )}
                      >
                        <div className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0",
                          activeStep === i ? "bg-orange-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                        )}>
                          {i + 1}
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{step}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
