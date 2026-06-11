"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Flame, Plus, RefreshCw, ChevronRight, Target, Loader2, Sparkles, CheckCircle, ShoppingCart } from "lucide-react";
import { recipes } from "@/lib/data";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { formatTime } from "@/lib/utils";

type MealSlot = "breakfast" | "lunch" | "dinner" | "snack";

interface DayPlan {
  day: string;
  breakfast?: typeof recipes[0];
  lunch?: typeof recipes[0];
  dinner?: typeof recipes[0];
  snack?: typeof recipes[0];
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const MEAL_IMAGES = {
  breakfast: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=300&q=80",
  lunch: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&q=80",
  dinner: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=300&q=80",
  snack: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300&q=80",
};

const GOALS = [
  { id: "weight-loss", label: "Weight Loss", cal: 1500, icon: "🏃" },
  { id: "maintenance", label: "Maintenance", cal: 2000, icon: "⚖️" },
  { id: "muscle-gain", label: "Muscle Gain", cal: 2500, icon: "💪" },
  { id: "keto", label: "Keto Diet", cal: 1800, icon: "🥑" },
];

function getRandomRecipesForSlot(slot: MealSlot) {
  const mealTypeMap: Record<MealSlot, string> = {
    breakfast: "Breakfast",
    lunch: "Lunch",
    dinner: "Dinner",
    snack: "Snacks",
  };
  const filtered = recipes.filter((r) => r.mealType.includes(mealTypeMap[slot] as never));
  const pool = filtered.length > 0 ? filtered : recipes;
  return pool[Math.floor(Math.random() * pool.length)];
}

function generateWeekPlan(): DayPlan[] {
  return DAYS.map((day) => ({
    day,
    breakfast: getRandomRecipesForSlot("breakfast"),
    lunch: getRandomRecipesForSlot("lunch"),
    dinner: getRandomRecipesForSlot("dinner"),
    snack: getRandomRecipesForSlot("snack"),
  }));
}

function getDayCalories(day: DayPlan) {
  return (
    (day.breakfast?.calories || 0) +
    (day.lunch?.calories || 0) +
    (day.dinner?.calories || 0) +
    (day.snack?.calories || 0)
  );
}

export default function MealPlannerPage() {
  const [selectedGoal, setSelectedGoal] = useState(GOALS[1]);
  const [weekPlan, setWeekPlan] = useState<DayPlan[]>([]);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);

  const handleGenerate = async () => {
    setLoading(true);
    setGenerated(false);
    await new Promise((r) => setTimeout(r, 1800));
    setWeekPlan(generateWeekPlan());
    setLoading(false);
    setGenerated(true);
  };

  const currentDay = weekPlan[selectedDay];

  const totalWeekCalories = weekPlan.reduce((sum, day) => sum + getDayCalories(day), 0);

  return (
    <div className="min-h-screen pt-header bg-gray-50 dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" /> AI-Powered
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-3">
            Smart Meal Planner
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">
            Get a personalized weekly meal plan tailored to your health goals and dietary preferences.
          </p>
        </div>

        {/* Goal Selection */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm p-6 mb-6">
          <h2 className="font-black text-gray-900 dark:text-white text-xl mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-orange-500" /> Choose Your Goal
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {GOALS.map((goal) => (
              <button
                key={goal.id}
                onClick={() => setSelectedGoal(goal)}
                className={`p-4 rounded-2xl border-2 text-center transition-all ${
                  selectedGoal.id === goal.id
                    ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-orange-300"
                }`}
              >
                <div className="text-3xl mb-2">{goal.icon}</div>
                <div className="font-bold text-gray-900 dark:text-white text-sm">{goal.label}</div>
                <div className="text-xs text-gray-400">{goal.cal} kcal/day</div>
              </button>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between flex-wrap gap-4">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Daily calorie target:{" "}
              <span className="font-black text-orange-500 text-base">{selectedGoal.cal} kcal</span>
            </div>
            <Button onClick={handleGenerate} disabled={loading} size="lg">
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Generating Plan...</>
              ) : (
                <><Calendar className="w-4 h-4" /> {generated ? "Regenerate" : "Generate"} Weekly Plan</>
              )}
            </Button>
          </div>
        </div>

        {/* Week Plan */}
        {generated && weekPlan.length > 0 && (
          <div>
            {/* Summary */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 text-center">
                <div className="text-2xl font-black text-orange-500">{totalWeekCalories.toLocaleString()}</div>
                <div className="text-xs text-gray-500">Total Weekly Calories</div>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 text-center">
                <div className="text-2xl font-black text-emerald-500">{Math.round(totalWeekCalories / 7).toLocaleString()}</div>
                <div className="text-xs text-gray-500">Avg Daily Calories</div>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 text-center">
                <div className="text-2xl font-black text-blue-500">{DAYS.length * 4}</div>
                <div className="text-xs text-gray-500">Total Meals</div>
              </div>
            </div>

            {/* Day Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
              {DAYS.map((day, i) => {
                const dayCalories = getDayCalories(weekPlan[i]);
                const isOk = Math.abs(dayCalories - selectedGoal.cal) < 300;
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(i)}
                    className={`flex-shrink-0 px-4 py-3 rounded-2xl text-sm font-semibold transition-all border ${
                      selectedDay === i
                        ? "bg-orange-500 text-white border-orange-500"
                        : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    <div>{day.slice(0, 3)}</div>
                    <div className={`text-xs mt-0.5 ${selectedDay === i ? "text-orange-100" : isOk ? "text-emerald-500" : "text-red-400"}`}>
                      {dayCalories} kcal
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Current Day Detail */}
            {currentDay && (
              <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white">{currentDay.day}</h2>
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <span className="font-black text-orange-500 text-lg">{getDayCalories(currentDay)} kcal</span>
                    {Math.abs(getDayCalories(currentDay) - selectedGoal.cal) < 300 && (
                      <Badge variant="green"><CheckCircle className="w-3 h-3 mr-1" /> On Target</Badge>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {(["breakfast", "lunch", "dinner", "snack"] as MealSlot[]).map((slot) => {
                    const recipe = currentDay[slot];
                    if (!recipe) return null;
                    return (
                      <div key={slot} className="bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden">
                        <div className="relative h-32">
                          <Image
                            src={recipe.image}
                            alt={recipe.name}
                            fill
                            className="object-cover"
                            sizes="200px"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute top-2 left-2">
                            <span className="bg-black/60 text-white text-xs px-2 py-0.5 rounded-full font-semibold capitalize">
                              {slot}
                            </span>
                          </div>
                          <div className="absolute bottom-2 right-2">
                            <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                              {recipe.calories} kcal
                            </span>
                          </div>
                        </div>
                        <div className="p-3">
                          <p className="font-bold text-gray-900 dark:text-white text-xs line-clamp-2 mb-2">{recipe.name}</p>
                          <Link href={`/recipe/${recipe.id}`}>
                            <span className="text-orange-500 text-xs font-semibold flex items-center gap-1">
                              View Recipe <ChevronRight className="w-3 h-3" />
                            </span>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Shopping List CTA */}
            <div className="mt-6 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 flex items-center justify-between">
              <div>
                <h3 className="text-white font-black text-lg">Generate Shopping List</h3>
                <p className="text-emerald-100 text-sm">Get all ingredients for this week in one click</p>
              </div>
              <button className="flex items-center gap-2 bg-white text-emerald-600 font-bold px-5 py-2.5 rounded-xl hover:bg-emerald-50 transition">
                <ShoppingCart className="w-4 h-4" /> Generate List
              </button>
            </div>
          </div>
        )}

        {!generated && !loading && (
          <div className="text-center py-16">
            <Calendar className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Ready to Plan Your Week?</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Select your goal above and generate a personalized meal plan.</p>
          </div>
        )}
      </div>
    </div>
  );
}
