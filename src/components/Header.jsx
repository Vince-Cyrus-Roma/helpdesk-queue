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
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
    </header>
  );
}
