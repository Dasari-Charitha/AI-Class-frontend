import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="h-11 w-11 flex items-center justify-center rounded-full 
      bg-white/80 text-slate-900 border border-slate-200 shadow-md
      dark:bg-white/10 dark:text-yellow-300 dark:border-white/10
      hover:scale-110 transition"
      title="Toggle theme"
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}