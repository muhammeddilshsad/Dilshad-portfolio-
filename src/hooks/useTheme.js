import { useEffect, useState } from 'react';

const THEME_COLORS = { dark: '#060405', light: '#fbf6f6' };

export function useTheme() {
  const [theme, setTheme] = useState(() =>
    document.documentElement.dataset.theme === 'light' ? 'light' : 'dark',
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // Storage can be unavailable (private mode); the theme still applies.
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return { theme, toggleTheme };
}
