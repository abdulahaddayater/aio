"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, BookOpen, History, Calendar, Flame, ChefHat, Star, Clock, Trash2, Plus, TrendingUp } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { recipes } from "@/lib/data";
import { formatTime } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import RecipeCard from "@/components/RecipeCard";

const TABS = [
  { id: "favorites", label: "Favorites", icon: Heart },
  { id: "collections", label: "Collections", icon: BookOpen },
  { id: "history", label: "History", icon: History },
  { id: "stats", label: "My Stats", icon: TrendingUp },
];

const SAMPLE_COLLECTIONS = [
  { id: "c1", name: "Weeknight Dinners", count: 5, cover: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80" },
  { id: "c2", name: "Healthy Breakfasts", count: 3, cover: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=400&q=80" },
  { id: "c3", name: "Party Snacks", count: 7, cover: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80" },
];

export default function DashboardPage() {
  const { favorites, toggleFavorite } = useAppStore();
  const [activeTab, setActiveTab] = useState("favorites");

  const favoriteRecipes = recipes.filter((r) => favorites.includes(r.id));

  const totalCalories = favoriteRecipes.reduce((sum, r) => sum + r.calories, 0);
  const avgRating = favoriteRecipes.length
    ? (favoriteRecipes.reduce((sum, r) => sum + r.rating, 0) / favoriteRecipes.length).toFixed(1)
    : "—";

  return (
    <div className="min-h-screen pt-header bg-gray-50 dark:bg-gray-950">

      {/* ── Top banner ── */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-orange-500 uppercase tracking-widest mb-1">My Account</p>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">
              {favorites.length} saved recipe{favorites.length !== 1 ? "s" : ""} · {SAMPLE_COLLECTIONS.length} collections
            </p>
          </div>
          <Link href="/search">
            <Button size="md">Browse Recipes</Button>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Saved Recipes", value: favorites.length, icon: Heart, color: "text-red-500", bg: "bg-red-50 dark:bg-red-900/20" },
            { label: "Avg Rating", value: avgRating, icon: Star, color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-900/20" },
            { label: "Total Calories", value: `${(totalCalories).toLocaleString()}`, icon: Flame, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900/20" },
            { label: "Collections", value: SAMPLE_COLLECTIONS.length, icon: BookOpen, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
          ].map((s) => (
            <div key={s.label} className={`${s.bg} rounded-2xl p-5`}>
              <s.icon className={`w-5 h-5 ${s.color} mb-2`} />
              <div className="text-2xl font-black text-gray-900 dark:text-white">{s.value}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white dark:bg-gray-900 rounded-2xl p-1 shadow-sm mb-6 sm:mb-8 overflow-x-auto scrollbar-hide -mx-1 px-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 sm:py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition min-h-[44px] sm:min-h-0 flex-shrink-0 ${
                activeTab === tab.id
                  ? "bg-orange-500 text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Favorites Tab */}
        {activeTab === "favorites" && (
          <div>
            {favoriteRecipes.length === 0 ? (
              <div className="text-center py-20">
                <Heart className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No favorites yet</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">Start saving recipes you love!</p>
                <Link href="/search">
                  <Button>Explore Recipes</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favoriteRecipes.map((r) => (
                  <RecipeCard key={r.id} recipe={r} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Collections Tab */}
        {activeTab === "collections" && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {SAMPLE_COLLECTIONS.map((col) => (
                <div key={col.id} className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition group">
                  <div className="relative h-40 overflow-hidden">
                    <Image src={col.cover} alt={col.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="400px" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-4">
                      <h3 className="text-white font-bold text-lg">{col.name}</h3>
                      <p className="text-gray-300 text-xs">{col.count} recipes</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add Collection */}
              <button className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl h-40 flex flex-col items-center justify-center text-gray-400 hover:border-orange-400 hover:text-orange-500 transition group">
                <Plus className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold">New Collection</span>
              </button>
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6">
            <h3 className="font-black text-gray-900 dark:text-white text-lg mb-4">Recently Viewed</h3>
            <div className="space-y-3">
              {recipes.slice(0, 6).map((r) => (
                <Link key={r.id} href={`/recipe/${r.id}`}>
                  <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                      <Image src={r.image} alt={r.name} fill className="object-cover" sizes="48px" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">{r.name}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                        <Clock className="w-3 h-3" />{formatTime(r.cookingTime)}
                        <span>·</span>
                        <Flame className="w-3 h-3 text-orange-400" />{r.calories} kcal
                      </div>
                    </div>
                    <Badge variant="orange">{r.cuisine}</Badge>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Stats Tab */}
        {activeTab === "stats" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6">
              <h3 className="font-black text-gray-900 dark:text-white mb-4">Cuisine Preferences</h3>
              {["Indian", "Italian", "Japanese", "Thai", "Mexican"].map((c, i) => {
                const pct = [45, 30, 20, 15, 10][i];
                return (
                  <div key={c} className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 w-20">{c}</span>
                    <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-orange-500 to-rose-500 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-xs text-gray-400">{pct}%</span>
                  </div>
                );
              })}
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6">
              <h3 className="font-black text-gray-900 dark:text-white mb-4">Dietary Breakdown</h3>
              {[
                { label: "Vegetarian", pct: 35, color: "bg-emerald-500" },
                { label: "Non-Veg", pct: 45, color: "bg-red-500" },
                { label: "Vegan", pct: 12, color: "bg-green-500" },
                { label: "Keto", pct: 8, color: "bg-purple-500" },
              ].map((d) => (
                <div key={d.label} className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 w-20">{d.label}</span>
                  <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className={`h-full ${d.color} rounded-full`} style={{ width: `${d.pct}%` }} />
                  </div>
                  <span className="text-xs text-gray-400">{d.pct}%</span>
                </div>
              ))}
            </div>

            <div className="sm:col-span-2 bg-gradient-to-br from-orange-50 to-rose-50 dark:from-orange-900/20 dark:to-rose-900/20 rounded-2xl p-6 text-center">
              <div className="text-5xl font-black text-orange-500 mb-1">{favorites.length}</div>
              <div className="text-gray-600 dark:text-gray-400 mb-4">Total recipes saved</div>
              <Link href="/search">
                <Button>Discover More Recipes</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
