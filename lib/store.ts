"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  favorites: string[];
  darkMode: boolean;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  toggleDarkMode: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      favorites: [],
      darkMode: false,
      toggleFavorite: (id: string) => {
        const current = get().favorites;
        set({
          favorites: current.includes(id)
            ? current.filter((f) => f !== id)
            : [...current, id],
        });
      },
      isFavorite: (id: string) => get().favorites.includes(id),
      toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),
    }),
    { name: "aio-store" }
  )
);
