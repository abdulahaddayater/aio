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

  const links = [
    { href: "/search", label: "Explore" },
    { href: "/ai-chef", label: "AI Chef", icon: Sparkles },
    { href: "/meal-planner", label: "Meal Planner" },
    { href: "/community", label: "Community" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
        scrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800"
          : "bg-[#FAF8F5]/80 dark:bg-gray-950/80 backdrop-blur-sm"
      )}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo — wordmark only, clean */}
          <Link href="/" className="flex items-center gap-1.5">
            <span className="text-lg font-extrabold text-gray-900 dark:text-white tracking-tight">
              AIO
            </span>
            <span className="hidden sm:block text-lg font-light text-gray-400 dark:text-gray-500">
              Recipes
            </span>
          </Link>

          {/* Desktop nav links */}
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

          {/* Actions */}
          <div className="flex items-center gap-1">
            <Link
              href="/search"
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Search className="w-[18px] h-[18px]" strokeWidth={1.75} />
            </Link>
            <Link
              href="/dashboard"
              className="relative p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Heart className="w-[18px] h-[18px]" strokeWidth={1.75} />
              {favorites.length > 0 && (
                <span className="absolute top-1 right-1 w-[7px] h-[7px] bg-[#FF6B35] rounded-full" />
              )}
            </Link>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {darkMode
                ? <Sun className="w-[18px] h-[18px]" strokeWidth={1.75} />
                : <Moon className="w-[18px] h-[18px]" strokeWidth={1.75} />
              }
            </button>
            <button
              className="md:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen
                ? <X className="w-[18px] h-[18px]" strokeWidth={1.75} />
                : <Menu className="w-[18px] h-[18px]" strokeWidth={1.75} />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
          <div className="px-5 py-3 space-y-0.5">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 py-3 px-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-[#FF6B35] border-b border-gray-50 dark:border-gray-800 last:border-0 transition-colors"
              >
                {l.icon && <l.icon className="w-3.5 h-3.5 text-[#FF6B35]" strokeWidth={1.5} />}
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
