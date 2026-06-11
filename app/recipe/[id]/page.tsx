"use client";
import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Heart, Clock, Star, Users, Share2,
  CheckCircle, ChevronLeft
} from "lucide-react";
import VideoCard from "@/components/VideoCard";
import { getRecipeById, getSimilarRecipes } from "@/lib/data";
import { useAppStore } from "@/lib/store";
import { cn, formatTime } from "@/lib/utils";
import RecipeCard from "@/components/RecipeCard";

export default function RecipePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const recipe = getRecipeById(id);
  if (!recipe) notFound();

  const similar = getSimilarRecipes(recipe);
  const { toggleFavorite, isFavorite } = useAppStore();
  const fav = isFavorite(recipe.id);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<"ingredients" | "instructions" | "nutrition">("ingredients");
  const [servings, setServings] = useState(recipe.servings);
  const multiplier = servings / recipe.servings;
  const progress = recipe.steps.length ? (completedSteps.length / recipe.steps.length) * 100 : 0;

  const toggleStep = (n: number) =>
    setCompletedSteps((p) => p.includes(n) ? p.filter((s) => s !== n) : [...p, n]);

  return (
    <div className="min-h-screen pt-16 bg-[#FAF8F5] dark:bg-gray-950">

      {/* ── Back ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-2">
        <Link href="/search" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
          <ChevronLeft className="w-4 h-4" strokeWidth={1.75} /> Back to recipes
        </Link>
      </div>

      {/* ── Hero image ── */}
      <div className="relative h-64 sm:h-80 lg:h-[480px] overflow-hidden">
        <Image src={recipe.image} alt={recipe.name} fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-5 sm:px-10 pb-6 sm:pb-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-1.5 mb-3">
              <span className="text-xs font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white border border-white/20">
                {recipe.cuisine}
              </span>
              {recipe.dietary.slice(0, 2).map((d) => (
                <span key={d} className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm text-gray-200 border border-white/15">
                  {d}
                </span>
              ))}
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-2">{recipe.name}</h1>
            <p className="text-gray-300 text-sm max-w-xl line-clamp-2 hidden sm:block">{recipe.description}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

          {/* ════ LEFT: main ════ */}
          <div className="lg:col-span-2">

            {/* ── Meta strip ── */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 py-5 border-b border-gray-200 dark:border-gray-800 mb-6">
              <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300">
                <Clock className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
                <span>{formatTime(recipe.cookingTime)}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300">
                <Users className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
                <span>{recipe.servings} servings</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                <span className="text-gray-400 mr-1">Difficulty</span>
                {recipe.difficulty}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                <span className="text-gray-400 mr-1">Calories</span>
                {recipe.calories} kcal / serving
              </div>
              {/* Rating */}
              <div className="flex items-center gap-1.5 ml-auto">
                <div className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map((i) => (
                    <Star key={i} className={cn("w-3.5 h-3.5", i <= Math.round(recipe.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200 dark:text-gray-700")} strokeWidth={0} />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{recipe.rating}</span>
                <span className="text-xs text-gray-400">({recipe.reviewCount.toLocaleString()})</span>
              </div>
            </div>

            {/* ── Action row ── */}
            <div className="flex items-center gap-2 mb-8 flex-wrap">
              <button
                onClick={() => toggleFavorite(recipe.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition border",
                  fav
                    ? "bg-[#FF6B35] text-white border-[#FF6B35]"
                    : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-[#FF6B35] hover:text-[#FF6B35]"
                )}
              >
                <Heart className={cn("w-4 h-4", fav && "fill-current")} strokeWidth={1.75} />
                {fav ? "Saved" : "Save recipe"}
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-400 transition">
                <Share2 className="w-4 h-4" strokeWidth={1.75} />
                Share
              </button>
            </div>

            {/* ── Tabs ── */}
            <div className="flex border-b border-gray-200 dark:border-gray-800 mb-7">
              {(["ingredients", "instructions", "nutrition"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-4 py-2.5 text-sm font-medium capitalize border-b-2 -mb-px transition-colors",
                    activeTab === tab
                      ? "border-[#FF6B35] text-[#FF6B35]"
                      : "border-transparent text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* ── Ingredients ── */}
            {activeTab === "ingredients" && (
              <div>
                {/* Servings adjuster */}
                <div className="flex items-center justify-between mb-5 px-4 py-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Servings</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setServings(Math.max(1, servings - 1))}
                      className="w-7 h-7 rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 flex items-center justify-center hover:border-[#FF6B35] hover:text-[#FF6B35] transition text-base font-medium leading-none"
                    >−</button>
                    <span className="font-semibold text-gray-900 dark:text-white w-4 text-center">{servings}</span>
                    <button
                      onClick={() => setServings(servings + 1)}
                      className="w-7 h-7 rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 flex items-center justify-center hover:border-[#FF6B35] hover:text-[#FF6B35] transition text-base font-medium leading-none"
                    >+</button>
                  </div>
                </div>
                <div>
                  {recipe.ingredients.map((ing, i) => {
                    const rawAmt = parseFloat(ing.amount);
                    const adjusted = isNaN(rawAmt) ? ing.amount :
                      ((rawAmt * multiplier) % 1 === 0 ? (rawAmt * multiplier).toString() : (rawAmt * multiplier).toFixed(1));
                    return (
                      <div key={i} className="flex items-baseline justify-between py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
                        <span className="text-sm text-gray-700 dark:text-gray-300">{ing.name}</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white ml-4 text-right">
                          {adjusted} {ing.unit}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Instructions ── */}
            {activeTab === "instructions" && (
              <div>
                {/* Progress bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                    <span>{completedSteps.length} of {recipe.steps.length} steps done</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#FF6B35] rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  {recipe.steps.map((step) => {
                    const done = completedSteps.includes(step.step);
                    return (
                      <button
                        key={step.step}
                        onClick={() => toggleStep(step.step)}
                        className={cn(
                          "w-full text-left rounded-xl border p-4 sm:p-5 transition-all duration-200",
                          done
                            ? "bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-800 opacity-60"
                            : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
                        )}
                      >
                        <div className="flex gap-4">
                          {/* Step number / check */}
                          <div className="flex-shrink-0 pt-0.5">
                            {done ? (
                              <CheckCircle className="w-5 h-5 text-[#10B981]" strokeWidth={1.75} />
                            ) : (
                              <span className="block w-5 h-5 text-center text-xs font-bold text-gray-400 font-mono leading-5">
                                {step.step}
                              </span>
                            )}
                          </div>
                          <div>
                            <p className={cn("text-sm leading-relaxed text-gray-700 dark:text-gray-200", done && "line-through text-gray-400")}>
                              {step.instruction}
                            </p>
                            {step.tip && !done && (
                              <p className="mt-2 text-xs text-gray-400 italic border-l-2 border-gray-200 dark:border-gray-700 pl-3">
                                Tip — {step.tip}
                              </p>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Nutrition ── */}
            {activeTab === "nutrition" && (
              <div>
                <div className="space-y-0 divide-y divide-gray-100 dark:divide-gray-800 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                  {[
                    { label: "Calories", value: recipe.nutrition.calories, unit: "kcal", pct: 60 },
                    { label: "Protein", value: recipe.nutrition.protein, unit: "g", pct: Math.min(100, (recipe.nutrition.protein / 50) * 100) },
                    { label: "Carbohydrates", value: recipe.nutrition.carbs, unit: "g", pct: Math.min(100, (recipe.nutrition.carbs / 300) * 100) },
                    { label: "Fat", value: recipe.nutrition.fat, unit: "g", pct: Math.min(100, (recipe.nutrition.fat / 65) * 100) },
                    { label: "Fibre", value: recipe.nutrition.fiber, unit: "g", pct: Math.min(100, (recipe.nutrition.fiber / 30) * 100) },
                  ].map((n) => (
                    <div key={n.label} className="flex items-center gap-4 px-4 sm:px-5 py-4 bg-white dark:bg-gray-900">
                      <span className="text-sm text-gray-500 dark:text-gray-400 w-28 flex-shrink-0">{n.label}</span>
                      <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-[#FF6B35] rounded-full" style={{ width: `${n.pct}%` }} />
                      </div>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white w-20 text-right flex-shrink-0">
                        {n.value} {n.unit}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-3 text-center">Per serving · Approximate values</p>
              </div>
            )}

            {/* ── Reviews ── */}
            <div className="mt-12">
              <h2 className="font-semibold text-gray-900 dark:text-white text-lg mb-5">Reviews</h2>
              {recipe.reviews.length === 0 ? (
                <p className="text-sm text-gray-400 py-6 border-t border-gray-100 dark:border-gray-800">No reviews yet.</p>
              ) : (
                <div className="space-y-4 border-t border-gray-100 dark:border-gray-800 pt-5">
                  {recipe.reviews.map((review) => (
                    <div key={review.id} className="flex gap-3">
                      <Image src={review.userAvatar} alt={review.userName} width={36} height={36} className="rounded-full flex-shrink-0" />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{review.userName}</span>
                          <div className="flex gap-0.5">
                            {[1,2,3,4,5].map((i) => (
                              <Star key={i} className={cn("w-3 h-3", i <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200")} strokeWidth={0} />
                            ))}
                          </div>
                          <span className="text-xs text-gray-400">{review.date}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{review.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ════ RIGHT: sidebar ════ */}
          <div className="space-y-6">

            {/* Video — smart validated card */}
            <VideoCard
              video={recipe.video}
              fallbackImage={recipe.image}
              recipeTitle={recipe.name}
            />

            {/* Tags */}
            {recipe.tags.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {recipe.tags.map((tag) => (
                    <Link key={tag} href={`/search?q=${tag}`}>
                      <span className="text-xs px-2.5 py-1 rounded-full border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors">
                        {tag}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Similar recipes */}
            {similar.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">You may also like</p>
                <div className="space-y-3">
                  {similar.map((r) => (
                    <Link key={r.id} href={`/recipe/${r.id}`}>
                      <div className="flex gap-3 p-2.5 rounded-xl hover:bg-white dark:hover:bg-gray-900 transition group">
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                          <Image src={r.image} alt={r.name} fill className="object-cover" sizes="56px" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 group-hover:text-[#FF6B35] transition-colors leading-snug">
                            {r.name}
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                            <Clock className="w-3 h-3" strokeWidth={1.5} />
                            {formatTime(r.cookingTime)}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
