"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/contexts/theme-context";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="bg-white/60 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60 p-0.5 h-9 shadow-sm rounded-lg flex items-center">
      <button
        onClick={() => setTheme("light")}
        className={`inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
          theme === "light"
            ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-sm"
            : "text-neutral-600 dark:text-neutral-400"
        }`}
      >
        <Sun className="h-4 w-4" />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
          theme === "dark"
            ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-sm"
            : "text-neutral-600 dark:text-neutral-400"
        }`}
      >
        <Moon className="h-4 w-4" />
      </button>
    </div>
  );
}
