import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Theme } from "../types";

interface ThemeCtx {
  theme: Theme;
  themeChange: () => void;
}

const ThemeContext = createContext<ThemeCtx>({
  theme: "light",
  themeChange: () => {}
});

export const useTheme = () => useContext(ThemeContext);

const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("light");

  // Set to Dark Theme
  const setDark = () => {
    document.documentElement.setAttribute("class", "dark");
    localStorage.setItem("theme", "dark");
  };

  // Set to Light Theme
  const setLight = () => {
    document.documentElement.removeAttribute("class");
    localStorage.setItem("theme", "light");
  };

  // Theme toggle handler
  const themeChange = useCallback(() => {
    setTheme(prev => {
      if (prev === "light") {
        setDark();
        return "dark";
      }

      setLight();
      return "light";
    });
  }, []);

  useEffect(() => {
    // Get initial theme
    (() => {
      // Get item with "theme" key from localStorage
      const storage = localStorage.getItem("theme");

      if (storage === "dark" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setTheme("dark");
        return setDark();
      }
      return setLight();
    })();
  }, []);

  return <ThemeContext.Provider value={{ theme, themeChange }}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
