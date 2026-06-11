"use client";
import { useEffect } from "react";
import { useAppStore } from "@/lib/store";

export default function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const darkMode = useAppStore((s) => s.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return <>{children}</>;
}
