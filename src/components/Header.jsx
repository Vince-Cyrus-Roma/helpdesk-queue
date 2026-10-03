import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <h1>HelpDesk Student Assistance Queue</h1>
      <button
        type="button"
        className="theme-toggle-btn"
        onClick={toggleTheme}
        aria-label="Toggle display theme"
      >
        {theme === "light" ? (
          <>
            <Moon size={16} />
            <span>Dark Mode</span>
          </>
        ) : (
          <>
            <Sun size={16} />
            <span>Light Mode</span>
          </>
        )}
      </button>
    </header>
  );
}
