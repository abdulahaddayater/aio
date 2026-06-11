"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X, SlidersHorizontal, ChevronDown } from "lucide-react";
import { searchRecipes } from "@/lib/data";
import { Recipe } from "@/lib/types";
import RecipeCard from "@/components/RecipeCard";
import { cn } from "@/lib/utils";

const CUISINES = ["Indian", "Italian", "Chinese", "Japanese", "Mexican", "Thai", "French", "Arabic", "Turkish", "Korean", "American"];
const DIETARY = ["Vegetarian", "Non-Vegetarian", "Vegan", "Keto", "High Protein", "Low Carb"];
const RELIGION = ["Halal", "Jain", "Hindu Vegetarian", "Buddhist Vegetarian", "Kosher"];
const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner", "Snacks", "Desserts", "Beverages"];
const COOKING_TIMES = ["Under 15 min", "Under 30 min", "Under 60 min"];
const CALORIE_RANGES = ["Low Calorie", "Medium Calorie", "High Calorie"];

type MultiFilter = { cuisine: string[]; dietary: string[]; religion: string[]; mealType: string[] };

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3.5 py-2 sm:py-1.5 rounded-full text-xs font-medium transition-all border min-h-[36px] sm:min-h-0 active:scale-[0.98]",
        active
          ? "bg-[#FF6B35] text-white border-[#FF6B35]"
          : "bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-[#FF6B35] hover:text-[#FF6B35]"
      )}
    >
      {label}
    </button>
  );
}

function FilterGroup({ title, options, selected, onToggle }: {
  title: string; options: string[]; selected: string[]; onToggle: (v: string) => void;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="pb-4 mb-4 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0 last:mb-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-xs font-semibold tracking-wider uppercase text-gray-400 mb-3"
      >
        {title}
        <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", open ? "rotate-180" : "")} strokeWidth={1.75} />
      </button>
      {open && (
        <div className="flex flex-wrap gap-1.5">
          {options.map((o) => (
            <Chip key={o} label={o} active={selected.includes(o)} onClick={() => onToggle(o)} />
          ))}
        </div>
      )}
    </div>
  );
}

function SearchContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [filters, setFilters] = useState<MultiFilter>({
    cuisine: searchParams.get("cuisine") ? [searchParams.get("cuisine")!] : [],
    dietary: searchParams.get("dietary") ? [searchParams.get("dietary")!] : [],
    religion: searchParams.get("religion") ? [searchParams.get("religion")!] : [],
    mealType: searchParams.get("mealType") ? [searchParams.get("mealType")!] : [],
  });
  const [cookingTime, setCookingTime] = useState<string | null>(searchParams.get("cookingTime"));
  const [calorieRange, setCalorieRange] = useState<string | null>(searchParams.get("calorieRange"));
  // Compute initial results synchronously so the correct recipes render on first
  // paint — avoids a flash of "No recipes found" before the effect runs.
  const [results, setResults] = useState<Recipe[]>(() =>
    searchRecipes({
      query: searchParams.get("q") || "",
      cuisine: searchParams.get("cuisine") ? [searchParams.get("cuisine")!] : [],
      dietary: searchParams.get("dietary") ? [searchParams.get("dietary")!] : [],
      religion: searchParams.get("religion") ? [searchParams.get("religion")!] : [],
      mealType: searchParams.get("mealType") ? [searchParams.get("mealType")!] : [],
      cookingTime: searchParams.get("cookingTime"),
      calorieRange: searchParams.get("calorieRange"),
    })
  );
  const [showFilters, setShowFilters] = useState(false);

  const toggle = (key: keyof MultiFilter, value: string) =>
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter((v) => v !== value) : [...prev[key], value],
    }));

  const clearAll = () => {
    setQuery("");
    setFilters({ cuisine: [], dietary: [], religion: [], mealType: [] });
    setCookingTime(null);
    setCalorieRange(null);
  };

  const activeCount =
    filters.cuisine.length + filters.dietary.length +
    filters.religion.length + filters.mealType.length +
    (cookingTime ? 1 : 0) + (calorieRange ? 1 : 0);

  useEffect(() => {
    setResults(searchRecipes({
      query, cuisine: filters.cuisine, dietary: filters.dietary,
      religion: filters.religion, mealType: filters.mealType,
      cookingTime: cookingTime as never, calorieRange: calorieRange as never,
    }));
  }, [query, filters, cookingTime, calorieRange]);

  useEffect(() => {
    document.body.style.overflow = showFilters ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showFilters]);

  const activeLabels = [
    ...filters.cuisine,
    ...filters.dietary,
    ...filters.religion,
    ...filters.mealType,
    ...(cookingTime ? [cookingTime] : []),
    ...(calorieRange ? [calorieRange] : []),
  ];

  const FilterPanelContent = () => (
    <>
      <FilterGroup title="Cuisine" options={CUISINES} selected={filters.cuisine} onToggle={(v) => toggle("cuisine", v)} />
      <FilterGroup title="Dietary" options={DIETARY} selected={filters.dietary} onToggle={(v) => toggle("dietary", v)} />
      <FilterGroup title="Religion-friendly" options={RELIGION} selected={filters.religion} onToggle={(v) => toggle("religion", v)} />
      <FilterGroup title="Meal type" options={MEAL_TYPES} selected={filters.mealType} onToggle={(v) => toggle("mealType", v)} />
      <div className="pb-4 mb-4 border-b border-gray-100 dark:border-gray-800">
        <p className="text-xs font-semibold tracking-wider uppercase text-gray-400 mb-3">Cooking time</p>
        <div className="flex flex-wrap gap-1.5">
          {COOKING_TIMES.map((t) => (
            <Chip key={t} label={t} active={cookingTime === t} onClick={() => setCookingTime(cookingTime === t ? null : t)} />
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold tracking-wider uppercase text-gray-400 mb-3">Calories</p>
        <div className="flex flex-wrap gap-1.5">
          {CALORIE_RANGES.map((c) => (
            <Chip key={c} label={c} active={calorieRange === c} onClick={() => setCalorieRange(calorieRange === c ? null : c)} />
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen pt-14 sm:pt-16 bg-[#FAF8F5] dark:bg-gray-950">

      {/* ── Sticky search bar ── */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-14 sm:top-16 z-30 safe-top">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3">
          <div className="flex gap-2 items-center">
            <div className="flex-1 relative min-w-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" strokeWidth={1.75} />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search recipes…"
                className="w-full pl-9 pr-9 py-3 sm:py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent text-base sm:text-sm transition"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 tap-target flex items-center justify-center text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" strokeWidth={1.75} />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "tap-target flex items-center justify-center gap-1.5 px-3 sm:px-3.5 rounded-xl sm:rounded-lg border text-sm font-medium transition flex-shrink-0",
                activeCount > 0
                  ? "bg-[#FF6B35] text-white border-[#FF6B35]"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-gray-400"
              )}
              aria-label="Open filters"
            >
              <SlidersHorizontal className="w-4 h-4" strokeWidth={1.75} />
              <span className="hidden sm:inline">Filters</span>
              {activeCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-white text-[#FF6B35] text-xs font-bold flex items-center justify-center">
                  {activeCount}
                </span>
              )}
            </button>
          </div>

          {/* Active filter pills — mobile */}
          {activeLabels.length > 0 && (
            <div className="flex gap-2 overflow-x-auto pt-2.5 pb-0.5 scrollbar-hide lg:hidden">
              {activeLabels.map((label) => (
                <span
                  key={label}
                  className="flex-shrink-0 text-[11px] font-medium px-2.5 py-1 rounded-full bg-orange-50 dark:bg-orange-900/20 text-[#FF6B35] border border-orange-100 dark:border-orange-800/40"
                >
                  {label}
                </span>
              ))}
              <button
                onClick={clearAll}
                className="flex-shrink-0 text-[11px] font-medium text-gray-400 underline px-1"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex gap-7">

          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5 sticky top-36">
              <div className="flex items-center justify-between mb-5">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">Filters</span>
                {activeCount > 0 && (
                  <button onClick={clearAll} className="text-xs text-gray-400 hover:text-[#FF6B35] transition">
                    Clear all
                  </button>
                )}
              </div>
              <FilterPanelContent />
            </div>
          </aside>

          {/* Mobile filter — bottom sheet */}
          {showFilters && (
            <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end">
              <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} aria-hidden />
              <div className="relative bg-white dark:bg-gray-900 rounded-t-2xl max-h-[88dvh] flex flex-col shadow-2xl safe-bottom animate-[slideUp_0.25s_ease-out]">
                <div className="flex-shrink-0 flex items-center justify-between px-4 py-4 border-b border-gray-100 dark:border-gray-800">
                  <span className="font-semibold text-gray-900 dark:text-white">Filters</span>
                  <div className="flex items-center gap-3">
                    {activeCount > 0 && (
                      <button onClick={clearAll} className="text-xs font-medium text-gray-400 hover:text-[#FF6B35]">
                        Clear all
                      </button>
                    )}
                    <button onClick={() => setShowFilters(false)} className="tap-target flex items-center justify-center" aria-label="Close filters">
                      <X className="w-5 h-5 text-gray-400" strokeWidth={1.75} />
                    </button>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto px-4 py-4 overscroll-contain">
                  <FilterPanelContent />
                </div>
                <div className="flex-shrink-0 px-4 py-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                  <button
                    onClick={() => setShowFilters(false)}
                    className="w-full py-3.5 bg-[#FF6B35] text-white text-sm font-semibold rounded-xl hover:bg-orange-600 active:bg-orange-700 transition min-h-[48px]"
                  >
                    Show {results.length} result{results.length !== 1 ? "s" : ""}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-400 mb-5">
              <span className="font-semibold text-gray-700 dark:text-gray-200">{results.length}</span> recipes found
            </p>

            {results.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-4xl mb-4 select-none">—</p>
                <p className="font-semibold text-gray-700 dark:text-gray-200 mb-1">No recipes found</p>
                <p className="text-sm text-gray-400 mb-5">Try adjusting your search or removing some filters</p>
                <button onClick={clearAll} className="text-sm font-medium text-[#FF6B35] underline">Clear all filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-5">
                {results.map((r) => <RecipeCard key={r.id} recipe={r} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5] dark:bg-gray-950">
        <div className="text-sm text-gray-400">Loading…</div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
