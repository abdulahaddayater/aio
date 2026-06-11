"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, Moon, Sun, Heart, Menu, X, Sparkles } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { darkMode, toggleDarkMode, favorites } = useAppStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const links = [
    { href: "/search", label: "Explore" },
    { href: "/ai-chef", label: "AI Chef", icon: Sparkles },
    { href: "/meal-planner", label: "Meal Planner" },
    { href: "/community", label: "Community" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 safe-top">
      <div
        role="status"
        aria-live="polite"
        className="bg-[#FFF7ED] dark:bg-orange-950/40 border-b border-orange-200/60 dark:border-orange-900/40"
      >
        <p className="max-w-7xl mx-auto px-4 sm:px-8 py-2 text-center text-[11px] sm:text-xs leading-tight text-amber-900/90 dark:text-orange-100/90">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF6B35] animate-pulse mr-1.5 align-middle" aria-hidden />
          <span className="font-semibold text-[#C2410C] dark:text-orange-300">Under development</span>
          <span className="mx-1.5 hidden sm:inline text-amber-800/50 dark:text-orange-200/50">·</span>
          <span className="hidden sm:inline">We&apos;re still building — features may change.</span>
          <span className="sm:hidden"> More coming soon</span>
        </p>
      </div>
      <nav
        className={cn(
          "transition-all duration-200",
          scrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800"
            : "bg-[#FAF8F5]/80 dark:bg-gray-950/80 backdrop-blur-sm"
        )}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">

          <Link href="/" className="flex items-center gap-1.5 tap-target -ml-1 px-1">
            <span className="text-lg font-extrabold text-gray-900 dark:text-white tracking-tight">
              AIO
            </span>
            <span className="hidden sm:block text-lg font-light text-gray-400 dark:text-gray-500">
              Recipes
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1"
              >
                {l.icon && <l.icon className="w-3.5 h-3.5 text-[#FF6B35]" strokeWidth={1.5} />}
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-0.5 sm:gap-1">
            <Link
              href="/search"
              className="tap-target flex items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Search"
            >
              <Search className="w-[18px] h-[18px]" strokeWidth={1.75} />
            </Link>
            <Link
              href="/dashboard"
              className="relative tap-target flex items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Saved recipes"
            >
              <Heart className="w-[18px] h-[18px]" strokeWidth={1.75} />
              {favorites.length > 0 && (
                <span className="absolute top-2.5 right-2.5 w-[7px] h-[7px] bg-[#FF6B35] rounded-full" />
              )}
            </Link>
            <button
              onClick={toggleDarkMode}
              className="tap-target flex items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode
                ? <Sun className="w-[18px] h-[18px]" strokeWidth={1.75} />
                : <Moon className="w-[18px] h-[18px]" strokeWidth={1.75} />
              }
            </button>
            <button
              className="md:hidden tap-target flex items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen
                ? <X className="w-[18px] h-[18px]" strokeWidth={1.75} />
                : <Menu className="w-[18px] h-[18px]" strokeWidth={1.75} />
              }
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 top-header bg-black/40 z-40"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <div className="md:hidden fixed left-0 right-0 top-header z-50 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-lg max-h-[calc(100dvh-var(--header-h))] overflow-y-auto safe-bottom">
            <div className="px-4 py-2">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 py-4 px-2 text-base font-medium text-gray-700 dark:text-gray-200 active:text-[#FF6B35] border-b border-gray-50 dark:border-gray-800 last:border-0 transition-colors min-h-[52px]"
                >
                  {l.icon && <l.icon className="w-4 h-4 text-[#FF6B35]" strokeWidth={1.5} />}
                  {l.label}
                </Link>
              ))}
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 py-4 px-2 text-base font-medium text-gray-700 dark:text-gray-200 active:text-[#FF6B35] min-h-[52px]"
              >
                <Heart className="w-4 h-4 text-[#FF6B35]" strokeWidth={1.5} />
                Saved recipes
                {favorites.length > 0 && (
                  <span className="ml-auto text-xs font-semibold bg-[#FF6B35] text-white px-2 py-0.5 rounded-full">
                    {favorites.length}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </>
      )}
      </nav>
    </header>
  );
}
