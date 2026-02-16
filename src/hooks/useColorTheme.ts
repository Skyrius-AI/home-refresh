import { useEffect, useMemo, useState } from "react";

export const COLOR_THEMES = [
  { id: "default", label: "Default", colors: ["hsl(0 0% 0%)", "hsl(0 0% 96%)", "hsl(0 0% 90%)"] },
  { id: "serika", label: "Serika", colors: ["hsl(40 96% 67%)", "hsl(38 73% 55%)", "hsl(36 45% 46%)"] },
  { id: "olivia", label: "Olivia", colors: ["hsl(41 35% 64%)", "hsl(43 45% 63%)", "hsl(43 20% 45%)"] },
  { id: "botanical", label: "Botanical", colors: ["hsl(171 51% 36%)", "hsl(171 40% 48%)", "hsl(171 26% 36%)"] },
  { id: "midnight", label: "Midnight", colors: ["hsl(220 80% 60%)", "hsl(215 60% 45%)", "hsl(210 35% 32%)"] },
  { id: "rose-dawn", label: "Rose Dawn", colors: ["hsl(342 75% 62%)", "hsl(12 85% 68%)", "hsl(22 45% 46%)"] },
  { id: "solarized", label: "Solarized", colors: ["hsl(45 88% 56%)", "hsl(20 76% 58%)", "hsl(205 55% 46%)"] },
  { id: "oceanic", label: "Oceanic", colors: ["hsl(192 65% 46%)", "hsl(176 54% 42%)", "hsl(206 42% 38%)"] },
  { id: "lavender-mist", label: "Lavender Mist", colors: ["hsl(265 61% 63%)", "hsl(285 55% 68%)", "hsl(250 36% 48%)"] },
  { id: "ember", label: "Ember", colors: ["hsl(8 84% 58%)", "hsl(28 88% 56%)", "hsl(16 54% 44%)"] },
  { id: "forest-night", label: "Forest Night", colors: ["hsl(146 45% 42%)", "hsl(125 35% 36%)", "hsl(156 28% 32%)"] },
  { id: "arctic", label: "Arctic", colors: ["hsl(205 88% 52%)", "hsl(188 74% 48%)", "hsl(220 46% 40%)"] },
  { id: "grape-soda", label: "Grape Soda", colors: ["hsl(274 68% 58%)", "hsl(294 62% 62%)", "hsl(256 44% 46%)"] },
  { id: "sunset", label: "Sunset", colors: ["hsl(24 92% 58%)", "hsl(339 82% 64%)", "hsl(12 56% 48%)"] },
  { id: "mint-chip", label: "Mint Chip", colors: ["hsl(160 56% 40%)", "hsl(152 42% 46%)", "hsl(176 34% 36%)"] },
  { id: "coffeehouse", label: "Coffeehouse", colors: ["hsl(24 44% 48%)", "hsl(34 46% 56%)", "hsl(16 30% 38%)"] },
  { id: "neon-cyber", label: "Neon Cyber", colors: ["hsl(192 94% 54%)", "hsl(316 88% 60%)", "hsl(272 78% 58%)"] },
  { id: "paper-ink", label: "Paper Ink", colors: ["hsl(227 31% 20%)", "hsl(198 22% 36%)", "hsl(220 16% 46%)"] },
  { id: "sakura", label: "Sakura", colors: ["hsl(332 70% 62%)", "hsl(352 78% 70%)", "hsl(317 38% 48%)"] },
  { id: "cobalt", label: "Cobalt", colors: ["hsl(223 89% 57%)", "hsl(210 79% 54%)", "hsl(234 51% 40%)"] },
  { id: "terracotta", label: "Terracotta", colors: ["hsl(14 62% 54%)", "hsl(30 56% 52%)", "hsl(20 44% 44%)"] },
] as const;

export type ColorTheme = (typeof COLOR_THEMES)[number]["id"];

const STORAGE_KEY = "color-theme";
const DEFAULT_THEME: ColorTheme = "default";

const THEME_IDS = new Set<string>(COLOR_THEMES.map((theme) => theme.id));

const isColorTheme = (value: string | null): value is ColorTheme => {
  return value !== null && THEME_IDS.has(value);
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

  const selectedThemeMeta = useMemo(
    () => COLOR_THEMES.find((theme) => theme.id === colorTheme) ?? COLOR_THEMES[0],
    [colorTheme],
  );

  return { colorTheme, setColorTheme, selectedThemeMeta };
}
