"use client";
import Link from "next/link";
import Image from "next/image";
import { Heart, Clock, Star, Flame } from "lucide-react";
import { Recipe } from "@/lib/types";
import { isHighProtein } from "@/lib/data";
import { useAppStore } from "@/lib/store";
import { cn, formatTime } from "@/lib/utils";

interface RecipeCardProps {
  recipe: Recipe;
  className?: string;
}

export default function RecipeCard({ recipe, className }: RecipeCardProps) {
  const { toggleFavorite, isFavorite } = useAppStore();
  const fav = isFavorite(recipe.id);

  return (
    <Link href={`/recipe/${recipe.id}`} className="block active:opacity-95">
      <article
        className={cn(
          "group bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-[0_6px_24px_rgba(0,0,0,0.09)] active:shadow-[0_2px_12px_rgba(0,0,0,0.06)]",
          className
        )}
      >
        <div className="relative h-32 sm:h-52 overflow-hidden bg-gray-100 dark:bg-gray-800">
          <Image
            src={recipe.image}
            alt={recipe.name}
            fill
            className="object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {isHighProtein(recipe) && (
            <span className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 max-w-[calc(100%-3rem)] truncate bg-[#10B981] text-white text-[8px] sm:text-[10px] font-semibold px-1.5 sm:px-2 py-0.5 rounded-full backdrop-blur-sm shadow-sm">
              High protein
            </span>
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(recipe.id);
            }}
            className={cn(
              "absolute top-1.5 right-1.5 sm:top-3 sm:right-3 w-9 h-9 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm",
              fav
                ? "bg-[#FF6B35] text-white"
                : "bg-white/90 dark:bg-gray-900/90 text-gray-400 active:text-[#FF6B35]"
            )}
            aria-label={fav ? "Remove from saved" : "Save recipe"}
          >
            <Heart className={cn("w-4 h-4 sm:w-3.5 sm:h-3.5", fav && "fill-current")} strokeWidth={2} />
          </button>

          <div className="absolute bottom-1.5 right-1.5 sm:bottom-3 sm:right-3 flex items-center gap-0.5 sm:gap-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-800 dark:text-white text-[9px] sm:text-xs font-semibold px-1 sm:px-1.5 py-0.5 rounded-full shadow-sm">
            <Star className="w-2 h-2 sm:w-3 sm:h-3 fill-yellow-400 text-yellow-400" strokeWidth={0} />
            {recipe.rating}
          </div>
        </div>

        <div className="p-2.5 sm:p-4">
          <p className="text-[9px] sm:text-[11px] font-semibold tracking-wider uppercase text-[#FF6B35] mb-0.5 sm:mb-1 truncate">
            {recipe.cuisine}
          </p>
          <h3 className="font-semibold text-gray-900 dark:text-white text-[13px] sm:text-[15px] leading-snug line-clamp-2 mb-2 sm:mb-2.5 group-hover:text-[#FF6B35] transition-colors duration-200">
            {recipe.name}
          </h3>
          <div className="flex items-center gap-1.5 sm:gap-3 text-[9px] sm:text-xs text-gray-400">
            <span className="flex items-center gap-0.5 sm:gap-1 min-w-0">
              <Clock className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 flex-shrink-0" strokeWidth={1.5} />
              <span className="truncate">{formatTime(recipe.cookingTime)}</span>
            </span>
            <span className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
              <Flame className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" strokeWidth={1.5} />
              {recipe.calories}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
