"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "black";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("black");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved === "dark") {
      setTheme("dark");
      document.documentElement.classList.remove("black");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "black" : "dark";
    setTheme(next);
    document.documentElement.classList.remove("dark", "black");
    document.documentElement.classList.add(next);
    localStorage.setItem("theme", next);
  };

  return (
    <button
      onClick={toggle}
      className="text-sm text-zinc-400 hover:text-[#e8855c] transition-colors cursor-pointer"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? "black" : "dark"}
    </button>
  );
}
