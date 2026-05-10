"use client";

import { useTheme } from "next-themes";

import { useEffect, useState } from "react";

import { Button } from "../ui/button";

export default function ModeToggleButton() {
  const { theme, setTheme } = useTheme();
  const [systemTheme, setSystemTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const switch_theme = () => {
    switch (theme) {
      case "dark":
        setTheme("light");
        break;
      case "light":
        setTheme("dark");
        break;
      case "system":
        setTheme(systemTheme === "light" ? "dark" : "light");
        break;
      default:
        return;
    }
  };
  return (
    <Button
      onClick={switch_theme}
      className="border-none bg-transparent hover:bg-transparent"
    >
      <span className="font-tertiary text-muted-foreground hover:text-foreground text-xs tracking-widest uppercase transition-colors duration-300">
        {theme === "dark" || (theme === "system" && systemTheme === "dark")
          ? "Light Mode"
          : "Dark Mode"}
      </span>
    </Button>
  );
}
