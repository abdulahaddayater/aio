"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Search, ArrowUpRight, Sparkles, Calendar, UtensilsCrossed, Heart } from "lucide-react";
import { getFeaturedRecipes, getTrendingRecipes, recipes } from "@/lib/data";
import RecipeCard from "@/components/RecipeCard";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const MOSAIC = [
  { src: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=900&q=85", alt: "Butter Chicken" },
  { src: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=900&q=85", alt: "Biryani" },
  { src: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=900&q=85", alt: "Dessert" },
  { src: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=900&q=85", alt: "Sushi" },
  { src: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=900&q=85", alt: "Pad Thai" },
];

const CATEGORIES = [
  {
    name: "Indian",
    tagline: "Rich spices, bold flavours",
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=800&q=85",
  },
  {
    name: "Italian",
    tagline: "Pasta, pizza & passion",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=85",
  },
  {
    name: "Japanese",
    tagline: "Precision meets umami",
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&q=85",
  },
  {
    name: "Desserts",
    tagline: "Sweet endings",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=85",
  },
  {
    name: "Mexican",
    tagline: "Street food classics",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=85",
  },
  {
    name: "Chinese",
    tagline: "Wok & wonder",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800&q=85",
  },
];

const QUICK_FILTERS: { label: string; param: "dietary" | "cookingTime"; value: string }[] = [
  { label: "Vegetarian", param: "dietary", value: "Vegetarian" },
  { label: "Under 30 min", param: "cookingTime", value: "Under 30 min" },
  { label: "High Protein", param: "dietary", value: "High Protein" },
  { label: "Keto", param: "dietary", value: "Keto" },
  { label: "Vegan", param: "dietary", value: "Vegan" },
];

export default function HomePage() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const featured = getFeaturedRecipes();
  const trending = getTrendingRecipes();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(query.trim() ? `/search?q=${encodeURIComponent(query)}` : "/search");
  };

  return (
    <div className="bg-[#FAF8F5] dark:bg-gray-950 overflow-x-hidden">

      {/* ══════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════ */}
      <section className="grid lg:grid-cols-[1fr_1fr] pt-14 sm:pt-16 min-h-0 lg:min-h-screen">

        {/* ── Left: text ── */}
        <div className="flex flex-col justify-center px-4 sm:px-10 lg:px-16 xl:px-24 py-10 sm:py-14 lg:py-0">

          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#FF6B35] mb-5">
            10,000+ Recipes · 50+ Cuisines
          </p>

          <h1 className="text-[1.75rem] leading-tight sm:text-5xl xl:text-[3.4rem] font-extrabold text-gray-900 dark:text-white tracking-tight mb-4 sm:mb-5">
            Find Any Recipe.<br />
            <span className="text-[#FF6B35]">Cook With</span><br className="sm:hidden" />
            <span className="hidden sm:inline"><br /></span>
            Confidence.
          </h1>

          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm mb-6 sm:mb-8">
            Step-by-step instructions, calories, and expert video guidance for
            every cuisine and dietary preference.
          </p>

          {/* Mobile image strip — shown only on < lg */}
          <div className="flex gap-2 overflow-x-auto pb-1 mb-8 lg:hidden -mx-5 px-5 scrollbar-hide">
            {MOSAIC.map((m, i) => (
              <div key={i} className="flex-shrink-0 w-28 h-20 relative rounded-xl overflow-hidden bg-gray-200">
                <Image src={m.src} alt={m.alt} fill className="object-cover" sizes="112px" />
              </div>
            ))}
          </div>

          {/* Search bar — stacks on very small screens */}
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white dark:bg-gray-900 rounded-xl shadow-[0_2px_20px_rgba(0,0,0,0.08)] border border-gray-100 dark:border-gray-800 overflow-hidden mb-4 max-w-md"
          >
            <div className="flex flex-1 items-center min-w-0">
              <Search className="w-4 h-4 text-gray-400 ml-4 flex-shrink-0" strokeWidth={1.75} />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Dish, ingredient, or cuisine…"
                className="flex-1 min-w-0 px-3 py-3.5 sm:py-3.5 text-base sm:text-sm text-gray-800 dark:text-white placeholder-gray-400 bg-transparent focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="m-1.5 sm:m-1.5 px-4 py-3 sm:py-2 bg-[#FF6B35] hover:bg-orange-600 active:bg-orange-700 text-white text-sm font-semibold rounded-lg transition-colors flex-shrink-0 min-h-[44px]"
            >
              Search
            </button>
          </form>

          {/* Quick chips — horizontal scroll on mobile */}
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap scrollbar-hide max-w-md">
            {QUICK_FILTERS.map((f) => (
              <button
                key={f.label}
                onClick={() => router.push(`/search?${f.param}=${encodeURIComponent(f.value)}`)}
                className="flex-shrink-0 px-3.5 py-2 text-xs font-medium rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 active:border-[#FF6B35] active:text-[#FF6B35] transition-colors min-h-[36px]"
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Right: photo mosaic (desktop only) ── */}
        <div className="hidden lg:grid grid-cols-2 grid-rows-3 gap-2 h-screen p-2 bg-gray-100 dark:bg-gray-900">
          <div className="row-span-2 relative overflow-hidden rounded-2xl">
            <Image src={MOSAIC[0].src} alt={MOSAIC[0].alt} fill className="object-cover hover:scale-[1.03] transition-transform duration-700" sizes="25vw" priority />
          </div>
          <div className="relative overflow-hidden rounded-2xl">
            <Image src={MOSAIC[1].src} alt={MOSAIC[1].alt} fill className="object-cover hover:scale-[1.03] transition-transform duration-700" sizes="25vw" />
          </div>
          <div className="relative overflow-hidden rounded-2xl">
            <Image src={MOSAIC[2].src} alt={MOSAIC[2].alt} fill className="object-cover hover:scale-[1.03] transition-transform duration-700" sizes="25vw" />
          </div>
          <div className="relative overflow-hidden rounded-2xl">
            <Image src={MOSAIC[3].src} alt={MOSAIC[3].alt} fill className="object-cover hover:scale-[1.03] transition-transform duration-700" sizes="25vw" />
          </div>
          <div className="relative overflow-hidden rounded-2xl">
            <Image src={MOSAIC[4].src} alt={MOSAIC[4].alt} fill className="object-cover hover:scale-[1.03] transition-transform duration-700" sizes="25vw" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          STATS — minimal text strip
      ══════════════════════════════════════════════ */}
      <div className="border-y border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 py-5 grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-0 sm:divide-x sm:divide-gray-200 dark:divide-gray-800">
          {[
            { value: "10,000+", label: "Recipes" },
            { value: "50+", label: "Cuisines" },
            { value: "500K+", label: "Cooks" },
            { value: "2M+", label: "Reviews" },
          ].map((s) => (
            <div key={s.label} className="text-center sm:px-4">
              <p className="text-xl font-bold text-gray-900 dark:text-white">{s.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          CATEGORIES
      ══════════════════════════════════════════════ */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-end justify-between mb-6 sm:mb-8 gap-4">
            <div className="min-w-0">
              <h2 className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                Browse by cuisine
              </h2>
              <p className="text-gray-400 mt-1 text-xs sm:text-sm">Authentic flavours from every corner of the world</p>
            </div>
            <Link href="/search" className="flex-shrink-0 sm:hidden text-xs font-medium text-[#FF6B35]">
              View all
            </Link>
            <Link href="/search" className="hidden sm:flex text-sm font-medium text-gray-400 hover:text-[#FF6B35] transition-colors items-center gap-1">
              View all <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} />
            </Link>
          </div>

          {/* Mobile: horizontal scroll */}
          <div className="flex gap-3 overflow-x-auto pb-2 sm:hidden -mx-5 px-5">
            {CATEGORIES.map((c) => (
              <Link key={c.name} href={`/search?cuisine=${c.name}`} className="flex-shrink-0 w-40 h-52 group relative overflow-hidden rounded-2xl">
                <Image src={c.image} alt={c.name} fill className="object-cover group-hover:scale-[1.04] transition-transform duration-500" sizes="160px" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-3.5">
                  <p className="text-white font-semibold text-sm">{c.name}</p>
                  <p className="text-gray-300 text-[10px] mt-0.5">{c.tagline}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Tablet: 3-col equal grid */}
          <div className="hidden sm:grid lg:hidden grid-cols-3 gap-3">
            {CATEGORIES.map((c) => (
              <Link key={c.name} href={`/search?cuisine=${c.name}`} className="group relative overflow-hidden rounded-2xl aspect-[4/3]">
                <Image src={c.image} alt={c.name} fill className="object-cover group-hover:scale-[1.04] transition-transform duration-500" sizes="33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <p className="text-white font-semibold text-base">{c.name}</p>
                  <p className="text-gray-300 text-xs mt-0.5">{c.tagline}</p>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow">
                    <ArrowUpRight className="w-3.5 h-3.5 text-gray-800" strokeWidth={1.75} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Desktop: Pinterest mosaic */}
          <div className="hidden lg:grid grid-cols-4 auto-rows-[260px] gap-3">
            {/* Big card: Indian */}
            <Link href="/search?cuisine=Indian" className="group relative overflow-hidden rounded-2xl col-span-2 row-span-2">
              <Image src={CATEGORIES[0].image} alt="Indian" fill className="object-cover group-hover:scale-[1.03] transition-transform duration-500" sizes="40vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <p className="text-white font-bold text-2xl">{CATEGORIES[0].name}</p>
                <p className="text-gray-300 text-sm mt-1">{CATEGORIES[0].tagline}</p>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200">
                <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md">
                  <ArrowUpRight className="w-4 h-4 text-gray-900" strokeWidth={1.75} />
                </div>
              </div>
            </Link>
            {/* Smaller cards */}
            {CATEGORIES.slice(1).map((c) => (
              <Link key={c.name} href={`/search?cuisine=${c.name}`} className="group relative overflow-hidden rounded-2xl">
                <Image src={c.image} alt={c.name} fill className="object-cover group-hover:scale-[1.04] transition-transform duration-500" sizes="20vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <p className="text-white font-semibold text-base">{c.name}</p>
                  <p className="text-gray-300 text-xs mt-0.5">{c.tagline}</p>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow">
                    <ArrowUpRight className="w-3.5 h-3.5 text-gray-900" strokeWidth={1.75} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FEATURED RECIPES
      ══════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[11px] font-semibold tracking-widest uppercase text-[#FF6B35] mb-1.5">Editor's picks</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Featured recipes</h2>
            </div>
            <Link href="/search" className="text-sm font-medium text-gray-400 hover:text-[#FF6B35] transition-colors flex items-center gap-1">
              See all <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
            {featured.map((r) => <RecipeCard key={r.id} recipe={r} />)}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          AI CHEF — dark editorial panel
      ══════════════════════════════════════════════ */}
      <section className="py-12 sm:py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl overflow-hidden grid lg:grid-cols-2 bg-gray-900 dark:bg-gray-800 min-h-0 lg:min-h-[380px]">
            <div className="flex flex-col justify-center px-6 sm:px-12 py-10 sm:py-12 order-2 lg:order-1">
              <span className="text-[11px] font-semibold tracking-widest uppercase text-[#FF6B35] mb-4">AI-Powered</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-4 tracking-tight">
                Tell us what's in your fridge. Get a recipe instantly.
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
                Type whatever ingredients you have — eggs, tomatoes, cheese — and our AI builds a
                full recipe with steps, time, and calories.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <Link href="/ai-chef" className="flex-1 sm:flex-none">
                  <button className="w-full sm:w-auto px-5 py-3 sm:py-2.5 bg-[#FF6B35] hover:bg-orange-600 active:bg-orange-700 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 min-h-[44px]">
                    <Sparkles className="w-4 h-4" strokeWidth={1.5} /> Try AI Chef
                  </button>
                </Link>
                <Link href="/meal-planner" className="flex-1 sm:flex-none">
                  <button className="w-full sm:w-auto px-5 py-3 sm:py-2.5 bg-white/10 hover:bg-white/15 active:bg-white/20 text-white text-sm font-semibold rounded-lg transition-colors border border-white/10 flex items-center justify-center gap-2 min-h-[44px]">
                    <Calendar className="w-4 h-4" strokeWidth={1.5} /> Meal Planner
                  </button>
                </Link>
              </div>
            </div>
            <div className="relative h-44 sm:h-56 lg:h-auto order-1 lg:order-2">
              <Image
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=85"
                alt="Chef cooking"
                fill
                className="object-cover opacity-80 lg:opacity-70"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-gray-900/90 via-gray-900/40 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          TRENDING
      ══════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 bg-[#FAF8F5] dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[11px] font-semibold tracking-widest uppercase text-[#10B981] mb-1.5">This week</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Trending now</h2>
            </div>
            <Link href="/search" className="text-sm font-medium text-gray-400 hover:text-[#FF6B35] transition-colors flex items-center gap-1">
              See all <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
            {trending.map((r) => <RecipeCard key={r.id} recipe={r} />)}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          HOW IT WORKS — text-only, no icons
      ══════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              From craving to plate
            </h2>
            <p className="text-gray-400 mt-3 text-sm max-w-sm mx-auto">
              AIO makes finding and cooking the right dish completely effortless.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
            {[
              {
                n: "01",
                title: "Search or browse",
                desc: "Find recipes by name, ingredient, cuisine, or dietary preference — instantly.",
              },
              {
                n: "02",
                title: "Cook step-by-step",
                desc: "Clear instructions, adjustable servings, pro tips, and a tutorial video for every dish.",
              },
              {
                n: "03",
                title: "Save and plan",
                desc: "Bookmark favourites, build collections, and plan your full week of meals.",
              },
            ].map((s) => (
              <div key={s.n}>
                <p className="text-4xl font-black text-gray-100 dark:text-gray-800 mb-4 font-mono leading-none select-none">
                  {s.n}
                </p>
                <h3 className="font-semibold text-gray-900 dark:text-white text-base mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          ALL RECIPES
      ══════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 bg-[#FAF8F5] dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">All recipes</h2>
              <p className="text-gray-400 mt-1 text-sm">{recipes.length} recipes and growing</p>
            </div>
            <Link href="/search">
              <button className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors bg-white dark:bg-gray-900">
                <Search className="w-3.5 h-3.5" strokeWidth={1.75} /> Filter
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
            {recipes.map((r) => <RecipeCard key={r.id} recipe={r} />)}
          </div>
        </div>
      </section>

    </div>
  );
}
