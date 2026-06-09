import React, { createContext, useContext, useMemo } from "react";
import { defaultLightTheme, defaultDarkTheme } from "./defaultTheme";

const ThemeContext = createContext(undefined);

export const ThemeProvider = ({
  children,
  theme: customTheme,
  darkMode = false,
  onDarkModeChange,
}) => {
  const baseTheme = darkMode ? defaultDarkTheme : defaultLightTheme;

  const theme = useMemo(
    () => ({
      ...baseTheme,
      ...customTheme,
      colors: { ...baseTheme.colors, ...customTheme?.colors },
    }),
    [baseTheme, customTheme],
  );

  const setDarkMode = (dark) => {
    onDarkModeChange?.(dark);
  };

  return (
    <ThemeContext.Provider value={{ theme, darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
