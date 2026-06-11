export type Cuisine =
  | "Indian" | "Italian" | "Chinese" | "Japanese" | "Mexican"
  | "Thai" | "French" | "Arabic" | "Turkish" | "Korean" | "American";

export type DietaryType =
  | "Vegetarian" | "Non-Vegetarian" | "Vegan" | "Keto" | "High Protein" | "Low Carb";

export type ReligionFilter =
  | "Halal" | "Jain" | "Hindu Vegetarian" | "Buddhist Vegetarian" | "Kosher";

export type MealType =
  | "Breakfast" | "Lunch" | "Dinner" | "Snacks" | "Desserts" | "Beverages";

export type Difficulty = "Easy" | "Medium" | "Hard";

export type CalorieRange = "Low Calorie" | "Medium Calorie" | "High Calorie";

export type CookingTime = "Under 15 min" | "Under 30 min" | "Under 60 min";

export interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

export interface Ingredient {
  amount: string;
  unit: string;
  name: string;
}

export interface CookingStep {
  step: number;
  instruction: string;
  tip?: string;
}

export interface Video {
  /** YouTube video ID — used to attempt thumbnail + direct link */
  youtubeId: string;
  /** Exact search query sent to YouTube if youtubeId is unavailable */
  searchQuery: string;
  title: string;
  creator: string;
  /** Approximate duration shown in the card */
  duration: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  photo?: string;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  image: string;
  cuisine: Cuisine;
  dietary: DietaryType[];
  religion: ReligionFilter[];
  mealType: MealType[];
  difficulty: Difficulty;
  cookingTime: number;
  servings: number;
  calories: number;
  nutrition: Nutrition;
  ingredients: Ingredient[];
  steps: CookingStep[];
  video: Video;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  tags: string[];
  isFeatured?: boolean;
  isTrending?: boolean;
}

export interface SearchFilters {
  query: string;
  cuisine: Cuisine[];
  dietary: DietaryType[];
  religion: ReligionFilter[];
  mealType: MealType[];
  cookingTime: CookingTime | null;
  calorieRange: CalorieRange | null;
}

export interface MealPlan {
  id: string;
  day: string;
  breakfast?: Recipe;
  lunch?: Recipe;
  dinner?: Recipe;
  snack?: Recipe;
  totalCalories: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  favorites: string[];
  collections: Collection[];
  mealPlans: MealPlan[];
  calorieGoal: number;
  dietaryPreferences: DietaryType[];
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  recipes: string[];
  cover: string;
}
