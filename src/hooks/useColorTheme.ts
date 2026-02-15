import { useEffect, useState } from "react";

export type ColorTheme = "default" | "serika" | "olivia" | "botanical";

const STORAGE_KEY = "color-theme";
const DEFAULT_THEME: ColorTheme = "default";

const isColorTheme = (value: string | null): value is ColorTheme => {
  return value === "default" || value === "serika" || value === "olivia" || value === "botanical";
};

export function useColorTheme() {
  const [colorTheme, setColorThemeState] = useState<ColorTheme>(() => {
    if (typeof window === "undefined") return DEFAULT_THEME;

    const storedTheme = window.localStorage.getItem(STORAGE_KEY);
    return isColorTheme(storedTheme) ? storedTheme : DEFAULT_THEME;
  });

  useEffect(() => {
    document.documentElement.dataset.colorTheme = colorTheme;
    window.localStorage.setItem(STORAGE_KEY, colorTheme);
  }, [colorTheme]);

  const setColorTheme = (value: string) => {
    if (isColorTheme(value)) {
      setColorThemeState(value);
    }
  };

  return { colorTheme, setColorTheme };
}
