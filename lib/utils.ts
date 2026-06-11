import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case "Easy": return "text-emerald-500";
    case "Medium": return "text-orange-400";
    case "Hard": return "text-rose-500";
    default: return "text-gray-500";
  }
}

export function getCalorieLabel(calories: number): string {
  if (calories <= 300) return "Low Calorie";
  if (calories <= 600) return "Medium Calorie";
  return "High Calorie";
}
